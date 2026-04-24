import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, ArrowRight, Zap, Package, BookOpen,
  Users, Sparkles, ChevronRight
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const NEXT_STEPS = [
  {
    icon: BookOpen,
    title: 'Browse the Full Library',
    description: 'All 47 build references are now unlocked. Start with any build that matches your current project.',
    action: 'Go to Vault',
    link: '/vault',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Package,
    title: 'Order a Starter Kit',
    description: 'Get pre-selected, tested components shipped to your door. Pro members save 20% on all kits.',
    action: 'Shop Kits',
    link: '/kits',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Users,
    title: 'Join the Community',
    description: 'Connect with other engineers, share your builds, and get support from practitioners.',
    action: 'Open Dashboard',
    link: '/dashboard',
    color: 'text-chart-3',
    bg: 'bg-chart-3/10',
  },
];

export default function StripeSuccess() {
  const [user, setUser] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    base44.analytics.track({ eventName: 'purchase_complete' });
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
      <div className="w-full max-w-2xl">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center glow-cyan-strong">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2"
            >
              <div className="w-8 h-8 rounded-full bg-chart-3/20 flex items-center justify-center border border-chart-3/30">
                <Sparkles className="w-4 h-4 text-chart-3" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/25 font-medium">
            <Zap className="w-3 h-3 mr-1.5" />
            Access Activated
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black mb-3">
            You're in.{' '}
            <span className="text-primary">Welcome to the Library.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {user?.full_name ? `${user.full_name}, your` : 'Your'} membership is active.
            You now have full access to all build references, schematics, and BOMs.
          </p>
        </motion.div>

        {/* What you unlocked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="p-6 border-primary/25 bg-gradient-to-br from-primary/8 to-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Unlocked immediately</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '47', label: 'Build References' },
                { value: '200+', label: 'Verified Components' },
                { value: 'Unlimited', label: 'AI Assistant' },
                { value: '20%', label: 'Kit Discount' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="space-y-3 mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recommended next steps</p>
          {NEXT_STEPS.map((step, i) => (
            <Link key={i} to={step.link}>
              <Card className="p-4 border-border/50 bg-card hover:border-primary/25 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary flex-shrink-0">
                    {step.action}
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link to="/vault">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-strong font-bold h-14 px-10 text-base gap-2 group"
            >
              <BookOpen className="w-5 h-5" />
              Start Browsing the Library
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            A receipt has been sent to your email. Manage subscription in{' '}
            <Link to="/dashboard" className="text-primary hover:underline">your dashboard</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}