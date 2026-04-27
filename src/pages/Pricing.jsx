import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Shield, Zap, Users, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Start learning with core courses.',
    features: [
      '12 core courses',
      '15 build systems',
      'Verified BOMs',
      'Execution frameworks',
      'Code & firmware',
    ],
    cta: 'Start with Starter',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    description: 'Full access. Master advanced systems.',
    features: [
      '20+ complete courses',
      'All 30+ builds',
      'Early access (48h)',
      'Complete frameworks',
      'All BOMs & CAD',
      'Weekly updates',
      'AI Assistant',
      'Priority support',
    ],
    cta: 'Unlock Pro Access',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199,
    description: 'Deep mastery. 1-on-1 guidance.',
    features: [
      'Everything in Pro',
      '2x monthly mentorship',
      'Custom learning paths',
      'Advanced systems cohort',
      'Revenue share program',
      'Early access programs',
      'Free starter kit/quarter',
      'Personal architecture review',
    ],
    cta: 'Join Elite',
    highlighted: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        setUser(await base44.auth.me());
      }
    });
    base44.analytics.track({ eventName: 'pricing_page_view' });
  }, []);

  const handleCheckout = async (planId) => {
    if (!user) {
      base44.auth.redirectToLogin(`/pricing?plan=${planId}`);
      return;
    }

    setLoading(true);
    try {
      // Call backend function to create Stripe checkout session
      const response = await base44.functions.invoke('createCheckoutSession', {
        plan_id: planId,
        user_email: user.email,
      });

      const stripe = await loadStripe(STRIPE_KEY);
      const { sessionId } = response.data;

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) console.error(result.error);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5">
              <Shield className="w-3 h-3 mr-1.5" />
              30-day guarantee. Cancel anytime.
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black mb-4">
              Choose Your <span className="text-primary">Access Level</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Full courses, complete builds, execution frameworks. All with instant access.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
            >
              <Card
                className={`relative flex flex-col h-full p-6 lg:p-8 border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary/50 bg-gradient-to-b from-primary/8 to-card glow-cyan-strong scale-[1.02]'
                    : 'border-border/50 bg-card hover:border-primary/25'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-1 shadow-lg">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loading}
                  className={`w-full font-bold h-12 gap-2 mb-6 ${
                    plan.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  {plan.cta}
                </Button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Shield, text: '30-day money-back' },
            { icon: Zap, text: 'Cancel anytime' },
            { icon: Users, text: '2,000+ engineers' },
            { icon: Clock, text: 'Instant access' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}