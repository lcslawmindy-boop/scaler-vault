import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, ArrowRight, Package, Lightbulb } from 'lucide-react';

const UPSELLS = [
  {
    name: 'Starter Kit',
    price: 149,
    description: 'Pre-tested components for your first build.',
    features: ['Verified components', 'Quality tested', 'Free shipping'],
    cta: 'Get Starter Kit',
    color: 'border-chart-3/30 bg-chart-3/5',
  },
  {
    name: 'Advanced Course Bundle',
    price: 297,
    description: 'Master 6 related courses in one domain.',
    features: ['6 advanced courses', 'Curated path', 'Lifetime access'],
    cta: 'Get Bundle',
    color: 'border-accent/30 bg-accent/5',
    highlighted: true,
  },
];

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      }
      setLoading(false);
    });

    base44.analytics.track({
      eventName: 'checkout_success',
      properties: { session_id: searchParams.get('session_id') },
    });
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Success Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-br from-chart-3/10 via-card to-card">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-chart-3/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-chart-3" />
            </div>
            <h1 className="text-4xl font-bold mb-2">You're In!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Full access is live. Start learning immediately.
            </p>
            <Link to="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 px-8 gap-2">
                <Zap className="w-5 h-5" />
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Upsells */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold">Ready to Build Faster?</h2>
          </div>
          <p className="text-muted-foreground">Add physical hardware or bundle multiple courses.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {UPSELLS.map((upsell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Card className={`p-6 border h-full flex flex-col ${upsell.color}`}>
                <h3 className="text-xl font-bold mb-2">{upsell.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{upsell.description}</p>
                <div className="space-y-2 flex-1 mb-6">
                  {upsell.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/75">{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={`w-full font-bold h-11 gap-2 ${
                    upsell.highlighted
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  ${upsell.price}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-secondary/30 rounded-xl p-8 border border-border/40"
        >
          <h3 className="text-xl font-bold mb-4">Your Next Steps</h3>
          <div className="space-y-3">
            {[
              'Start with Course 1: Fundamentals Framework',
              'Watch the first 2 modules (1 hour)',
              'Browse the build vault for your first project',
              'Join the community Discord',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground w-6 h-6 p-0 flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </Badge>
                <p className="text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}