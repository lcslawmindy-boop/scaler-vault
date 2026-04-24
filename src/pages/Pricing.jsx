import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Shield, Zap, Package, ArrowRight, Users, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'Access to 15 build references and core documentation.',
    cta: 'Start Building',
    highlighted: false,
    features: [
      'Access to 15 build references (rotating)',
      'Full schematics & verified BOMs',
      'Step-by-step execution guides',
      'Code & firmware downloads',
      'AI Engineering Assistant (20 queries/day)',
      'Community forum access',
      'New build every Friday (1-week delay)',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    period: '/month',
    description: 'Full library access with early releases and priority support.',
    cta: 'Access the Library',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Full vault — all 47 builds, always',
      'Early access to new builds (48hr)',
      'Full schematics, BOMs, supplier links',
      'All code, firmware & CAD files',
      'AI Engineering Assistant (unlimited)',
      '20% discount on all starter kits',
      'Monthly build livestream',
      'Priority support (24hr response)',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199,
    period: '/month',
    description: 'Full library plus 1-on-1 mentorship and custom build reviews.',
    cta: 'Go Elite',
    highlighted: false,
    features: [
      'Everything in Pro',
      '2x monthly 1-on-1 sessions (60 min)',
      'Custom build consultation',
      'Elite cohort — private Slack',
      'Revenue share on published builds',
      'Early access to high-ticket programs',
      'Free starter kit per quarter',
      '48hr custom circuit review',
    ],
  },
];

const ONE_TIME = [
  {
    name: 'Individual Plan',
    price: 497,
    description: 'Single build complete documentation package.',
    features: ['80-page build guide (PDF)', 'Full schematics (KiCad + PDF)', 'Verified BOM — 3 supplier options', 'Full codebase (GitHub)', 'Lifetime updates'],
    cta: 'Buy Guide',
    color: 'border-chart-3/30 bg-chart-3/5',
    badge: 'One-Time',
  },
  {
    name: 'Advanced Plan',
    price: 997,
    description: 'Advanced build with professional documentation and consulting session.',
    features: ['Everything in Individual', '90-min consulting session included', 'Custom BOM for your use case', 'PCB design review', 'Priority email support (30 days)'],
    cta: 'Buy Advanced',
    color: 'border-accent/30 bg-accent/5',
    badge: 'Best Value',
  },
];

function PlanCard({ plan, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="flex flex-col"
    >
      <Card className={`relative flex flex-col h-full p-6 lg:p-8 border transition-all duration-300 ${
        plan.highlighted
          ? 'border-primary/50 bg-gradient-to-b from-primary/8 to-card glow-cyan-strong scale-[1.02]'
          : 'border-border/50 bg-card hover:border-primary/25'
      }`}>
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
            <span className="text-muted-foreground text-sm">{plan.period}</span>
          </div>
        </div>

        <Link to="/pricing" className="mb-6">
          <Button
            className={`w-full font-bold h-12 gap-2 group ${
              plan.highlighted
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <Lock className="w-4 h-4" />
            {plan.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>

        <div className="space-y-3 flex-1">
          {plan.features.map((feature, j) => (
            <div key={j} className="flex items-start gap-2.5">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function Pricing() {
  useEffect(() => {
    base44.analytics.track({ eventName: 'pricing_page_view' });
  }, []);

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
              30-day money-back guarantee
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              Reference Access <span className="text-primary">Plans</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Full library access, or buy a single guide. Engineers cancel when projects end — that's fine.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Subscription plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PLANS.map((plan, i) => <PlanCard key={plan.id} plan={plan} i={i} />)}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Shield, text: '30-day money-back guarantee' },
            { icon: Zap, text: 'Cancel from dashboard anytime' },
            { icon: Users, text: '1,200+ engineers using the library' },
            { icon: Star, text: 'Engineer-reviewed documentation' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="border-t border-border/40 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Or buy a single guide</span>
          </div>
        </div>
      </div>

      {/* One-time purchases */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ONE_TIME.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-6 border h-full flex flex-col ${plan.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="outline" className="text-xs border-border/50 mb-2">{plan.badge}</Badge>
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-3xl font-black">${plan.price}</div>
                    <div className="text-xs text-muted-foreground">one-time</div>
                  </div>
                </div>
                <div className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-chart-3 flex-shrink-0" />
                      <span className="text-sm text-foreground/75">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/vault">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 gap-2">
                    <Package className="w-4 h-4" />
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}