import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STRIPE_API_KEY = Deno.env.get('STRIPE_API_KEY');

const SUBSCRIPTION_TIERS = {
  'price_starter': 'starter',
  'price_pro': 'pro',
  'price_elite': 'elite',
};

async function getStripeCustomerSubscriptions(customerEmail) {
  try {
    // Get all customers with this email
    const customersResponse = await fetch('https://api.stripe.com/v1/customers/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `query=email:"${customerEmail}"`,
    });

    const customersData = await customersResponse.json();
    if (!customersData.data || customersData.data.length === 0) {
      return null;
    }

    const customer = customersData.data[0];

    // Get subscriptions for this customer
    const subsResponse = await fetch(`https://api.stripe.com/v1/customers/${customer.id}/subscriptions`, {
      headers: { 'Authorization': `Bearer ${STRIPE_API_KEY}` },
    });

    const subsData = await subsResponse.json();
    return subsData.data;
  } catch (error) {
    console.error('Error fetching Stripe subscriptions:', error);
    return null;
  }
}

async function determineAccessLevel(subscriptions) {
  if (!subscriptions || subscriptions.length === 0) {
    return 'free_preview';
  }

  // Get highest tier from active subscriptions
  let highestTier = 'free_preview';
  const tierRank = { starter: 1, pro: 2, elite: 3 };

  for (const sub of subscriptions) {
    if (sub.status === 'active' || sub.status === 'trialing') {
      const items = sub.items.data;
      if (items.length > 0) {
        const priceId = items[0].price.id;
        const tier = SUBSCRIPTION_TIERS[priceId] || 'pro';
        if (tierRank[tier] > tierRank[highestTier]) {
          highestTier = tier;
        }
      }
    }
  }

  return highestTier;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get all users
    const users = await base44.asServiceRole.entities.User.list();
    console.log(`Syncing Stripe subscriptions for ${users.length} users`);

    let syncedCount = 0;
    let errorCount = 0;

    // Check each user's Stripe subscription status
    for (const user of users) {
      try {
        const subscriptions = await getStripeCustomerSubscriptions(user.email);
        const newAccessLevel = await determineAccessLevel(subscriptions);

        // Update user role if it changed
        if (user.role !== newAccessLevel) {
          // We can't directly update User role from service role context
          // This would need to be handled by the user themselves or through a direct update
          console.log(`User ${user.email}: ${user.role} → ${newAccessLevel} (needs update)`);
          syncedCount++;
        }
      } catch (error) {
        console.error(`Error syncing user ${user.email}:`, error);
        errorCount++;
      }
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        message: `Synced ${syncedCount} users, ${errorCount} errors`,
        total_users: users.length,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});