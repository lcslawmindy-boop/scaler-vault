import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
const STRIPE_API_URL = 'https://api.stripe.com/v1';

const PLAN_CONFIG = {
  starter: { price_id: 'price_starter', amount: 2900 },
  pro: { price_id: 'price_pro', amount: 9900 },
  elite: { price_id: 'price_elite', amount: 19900 },
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan_id } = await req.json();

    if (!PLAN_CONFIG[plan_id]) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const config = PLAN_CONFIG[plan_id];

    // Create Stripe checkout session
    const response = await fetch(`${STRIPE_API_URL}/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price]': config.price_id,
        'line_items[0][quantity]': '1',
        'mode': 'subscription',
        'success_url': `https://yourdomain.com/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `https://yourdomain.com/pricing`,
        'customer_email': user.email,
        'client_reference_id': user.email,
        'metadata[plan_id]': plan_id,
        'metadata[user_id]': user.id,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return Response.json({ error: error.error.message }, { status: 400 });
    }

    const session = await response.json();

    // Track event
    await base44.analytics.track({
      eventName: 'checkout_session_created',
      properties: {
        plan_id,
        user_email: user.email,
        session_id: session.id,
      },
    });

    return Response.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});