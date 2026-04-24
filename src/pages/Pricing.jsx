import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Shield, Zap, Package, ArrowRight, Users, Star, BookOpen } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    period: '/month',
    description: 'Learn core systems. Build with guidance.',
    cta: 'Start Learning',
    highlighted: false,
    features: [
      '12 core courses — limited selection',
      '15 build systems (rotating)',
      'Verified BOMs & schematics',
      'Execution frameworks',
      'Code & firmware downloads',
      'AI Assistant (20 queries/day)',
      'Community forum access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    period: '/month',
    description: 'Master advanced systems. Build like a pro.',
    cta: 'Unlock Full Access',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      '26 complete courses — full library',
      'All 29+ build systems, always',
      'Early access to new courses (48hr)',
      'Complete execution frameworks',
      'All schematics, BOMs, CAD files',
      'Weekly new courses & builds',
      'AI Assistant (unlimited)',
      'Priority support (24hr)',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 199,
    period: '/month',
    description: 'Deep mastery. 1-on-1 guidance. Advanced systems.',
    cta: 'Join Elite',
    highlighted: false,
    features: [
      'Everything in Pro',
      '2x monthly 1-on-1 mentorship (60 min)',
      'Custom course paths',
      'Advanced systems cohort',
      'Revenue share on published work',
      'Early access to high-ticket programs',
      'Free starter kit per quarter',
      'Personal architecture review',
    ],
  },
];

const ONE_TIME = [
  {
    name: 'Single Course',
    price: 397,
    description: 'Structured learning system with execution framework.',
    features: ['One complete course (5-8 modules)', 'Full course videos & materials', 'Related build systems access', 'Complete execution framework', 'Lifetime access'],
    cta: 'Buy Course',
    color: 'border-chart-3/30 bg-chart-3/5',
    badge: 'One-Time',
  },
  {
    name: 'Bundle (6 Courses)',
    price: 1497,
    description: 'Master a domain with a complete course bundle plus all builds.',
    features: ['6 related courses (advanced track)', 'All builds in the vault', 'Complete execution systems', 'Comprehensive learning path', 'Lifetime updates'],
    cta: 'Get Bundle',
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
              Choose Your Builder <span className="text-primary">Access</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Learn structured systems and build real prototypes. Most people stay at the surface level. Builders go deeper.
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
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Or buy individual courses</span>
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
                <Link to="/courses">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 gap-2">
                    <BookOpen className="w-4 h-4" />
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