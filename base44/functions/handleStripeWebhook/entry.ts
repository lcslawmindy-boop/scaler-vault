import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STRIPE_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
const STRIPE_API_KEY = Deno.env.get('STRIPE_API_KEY');

// Map Stripe product/price IDs to access levels
const SUBSCRIPTION_TIERS = {
  'price_starter': 'starter',
  'price_pro': 'pro',
  'price_elite': 'elite',
};

async function verifyStripeSignature(req) {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  // Use async crypto for Stripe verification
  const encoder = new TextEncoder();
  const parts = signature.split(',').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts.t;
  const signedContent = `${timestamp}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(STRIPE_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const computedSignature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(signedContent)
  );

  const computedHex = Array.from(new Uint8Array(computedSignature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computedHex === parts.v1;
}

async function updateUserAccessLevel(base44, customerEmail, tier) {
  try {
    // Get user by email
    const users = await base44.asServiceRole.entities.User.filter({ email: customerEmail });
    if (!users || users.length === 0) {
      console.log(`User not found: ${customerEmail}`);
      return;
    }

    const user = users[0];

    // Update user's role to reflect access tier
    await base44.auth.updateMe({ role: tier || 'user' });

    console.log(`Updated ${customerEmail} access level to: ${tier || 'free_preview'}`);
  } catch (error) {
    console.error(`Failed to update user access level:`, error);
  }
}

async function handleSubscriptionEvent(base44, event) {
  const subscription = event.data.object;
  const customerEmail = subscription.metadata?.email;

  if (!customerEmail) {
    console.warn('No email in subscription metadata');
    return;
  }

  let accessTier = 'free_preview';

  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    // Active subscription
    if (subscription.status === 'active') {
      const items = subscription.items.data;
      if (items.length > 0) {
        const priceId = items[0].price.id;
        accessTier = SUBSCRIPTION_TIERS[priceId] || 'pro';
      }
    }
  } else if (event.type === 'customer.subscription.deleted') {
    // Cancelled subscription
    accessTier = 'free_preview';
  }

  await updateUserAccessLevel(base44, customerEmail, accessTier);
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Verify Stripe signature
    const isValid = await verifyStripeSignature(req.clone());
    if (!isValid) {
      console.warn('Invalid Stripe signature');
      return new Response('Invalid signature', { status: 403 });
    }

    const body = await req.json();
    const event = body;

    // Initialize Base44 client with service role
    const base44 = createClientFromRequest(req);

    // Handle subscription events
    if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) {
      await handleSubscriptionEvent(base44, event);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});