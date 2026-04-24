import React, { useEffect } from 'react';
import PricingCard from '../components/shared/PricingCard';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Shield } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const tiers = [
  {
    name: 'Starter',
    price: 49,
    description: 'Get started with preview access and limited builds.',
    cta: 'Start Building',
    highlighted: false,
    features: [
      'Access to limited builds',
      'Preview all build guides',
      'Basic BOM summaries',
      'Community access',
      'Monthly updates',
    ],
  },
  {
    name: 'Pro',
    price: 99,
    description: 'Full vault access for serious builders.',
    cta: 'Unlock Pro Access',
    highlighted: true,
    features: [
      'Full vault access',
      'All build guides & BOMs',
      'Execution frameworks',
      'Weekly new builds',
      'Priority community support',
      'Downloadable documents',
    ],
  },
  {
    name: 'Elite',
    price: 199,
    description: 'Everything plus early access and priority support.',
    cta: 'Go Elite',
    highlighted: false,
    features: [
      'Everything in Pro',
      'Advanced & classified builds',
      'Early release access',
      'Priority 1-on-1 support',
      'Custom build requests',
      'Exclusive webinars',
      'Kit discounts',
    ],
  },
];

export default function Pricing() {
  React.useEffect(() => {
    base44.analytics.track({ eventName: 'pricing_page_view' });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <Shield className="w-3 h-3 mr-1.5" />
              30-day money-back guarantee
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your <span className="text-primary">Access Level</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Invest in your engineering capabilities. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/20 bg-primary/5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">
              New builds are added every week — early members get the best value.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}