import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STRIPE_API_KEY = Deno.env.get('STRIPE_API_KEY');
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:5173';

// Map tier IDs to Stripe price IDs
const PRICE_IDS = {
  'starter': 'price_starter',
  'pro': 'price_pro',
  'elite': 'price_elite',
  'build_build_1': 'price_build_1',
  'build_build_2': 'price_build_2',
  'build_build_3': 'price_build_3',
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { plan_id, build_data } = await req.json();
    const priceId = PRICE_IDS[plan_id];

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: `Unknown plan: ${plan_id}` }),
        { status: 400 }
      );
    }

    // Create or get Stripe customer
    const customerResponse = await fetch('https://api.stripe.com/v1/customers/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `query=email:"${user.email}"`,
    });

    let customerId;
    const customers = await customerResponse.json();

    if (customers.data && customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create new customer
      const createCustomerResponse = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: user.email,
          metadata: JSON.stringify({ user_id: user.id }),
        }).toString(),
      });

      const newCustomer = await createCustomerResponse.json();
      customerId = newCustomer.id;
    }

    // Create checkout session
    const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        customer: customerId,
        payment_method_types: 'card',
        line_items: JSON.stringify([
          {
            price: priceId,
            quantity: 1,
          },
        ]),
        mode: 'subscription',
        success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/marketplace`,
        metadata: JSON.stringify({
          plan_id,
          user_email: user.email,
          ...(build_data && { build_data: JSON.stringify(build_data) }),
        }),
      }).toString(),
    });

    const session = await sessionResponse.json();

    // Track analytics
    await base44.analytics.track({
      eventName: 'checkout_session_created',
      properties: { plan_id, session_id: session.id },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), { status: 200 });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});