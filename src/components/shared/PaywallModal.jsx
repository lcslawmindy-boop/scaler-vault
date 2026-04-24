import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Lock, CheckCircle2, ArrowRight, Zap, Shield,
  Clock, Users, TrendingUp, ChevronDown, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ─── A/B Headline Variants ───────────────────────────────────────────────────
const HEADLINES = [
  {
    headline: "Full Documentation Is Available to Members",
    sub: "Complete schematics, verified BOMs, and tested assembly sequences — unlocked with a membership.",
  },
  {
    headline: "The Preview Ends Here. Full Docs Begin Inside.",
    sub: "Every build reference includes complete schematics, sourced BOMs, and step-by-step assembly guidance.",
  },
  {
    headline: "This Build Has a Complete Reference Guide",
    sub: "Verified BOM, full schematics, and tested execution sequences — accessible with Pro membership.",
  },
  {
    headline: "Skip 40 Hours of Research",
    sub: "Full component documentation, sourcing links, and assembly sequences — all in one reference.",
  },
  {
    headline: "Built for Engineers Who Actually Prototype",
    sub: "Implementation-level documentation that goes beyond tutorials: failure modes, tolerances, integration tradeoffs.",
  },
];

// ─── Value Bullets ────────────────────────────────────────────────────────────
const VALUE_BULLETS = [
  { icon: CheckCircle2, text: 'Full schematics & wiring diagrams — print-ready' },
  { icon: CheckCircle2, text: 'Complete BOMs with exact part numbers & supplier links' },
  { icon: CheckCircle2, text: 'Step-by-step execution — no experience gaps' },
  { icon: CheckCircle2, text: 'Market context & monetization frameworks per build' },
  { icon: CheckCircle2, text: 'New builds added weekly — always expanding' },
];

// ─── Objection Handlers ───────────────────────────────────────────────────────
const OBJECTIONS = [
  {
    q: "Is this really worth $99/mo?",
    a: "One build here saves 40+ hours of research and $300+ in failed sourcing mistakes. Members recoup it on the first project.",
  },
  {
    q: "What if I'm not an expert?",
    a: "Every build is written for implementation, not academia. If you can follow a recipe, you can follow these guides.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — cancel from your dashboard in under 30 seconds. No emails, no retention calls.",
  },
];

// ─── Urgency Counter ──────────────────────────────────────────────────────────
function useViewerCount() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    // Simulated live viewer count (replace with real analytics if available)
    const base = 12 + Math.floor(Math.random() * 8);
    setCount(base);
    const interval = setInterval(() => {
      setCount(c => c + (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return count;
}

function ObjectionAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-2">
      {OBJECTIONS.map((obj, i) => (
        <div
          key={i}
          className="rounded-xl border border-border/40 bg-secondary/40 overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-secondary/60 transition-colors"
          >
            <span>{obj.q}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-2 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed">{obj.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function PaywallModal({ open, onOpenChange }) {
  const viewers = useViewerCount();

  // Pick a headline variant deterministically per session
  const variantIndex = React.useMemo(() => {
    const stored = sessionStorage.getItem('paywall_variant');
    if (stored) return parseInt(stored);
    const idx = Math.floor(Math.random() * HEADLINES.length);
    sessionStorage.setItem('paywall_variant', idx.toString());
    return idx;
  }, []);

  const { headline, sub } = HEADLINES[variantIndex];

  const handleCTAClick = (cta) => {
    base44.analytics.track({
      eventName: 'paywall_cta_click',
      properties: { cta_variant: cta, headline_variant: variantIndex },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* ── Top urgency bar ── */}
        {viewers && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              {viewers} engineers viewing this build right now
            </span>
          </div>
        )}

        {/* ── Hero ── */}
        <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <Badge className="bg-primary/15 text-primary border-primary/25 font-medium text-xs">
                Pro Members Only
              </Badge>
            </div>
          </div>

          <h2 className="text-xl font-bold leading-snug mb-2">{headline}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
        </div>

        {/* ── Value bullets ── */}
        <div className="px-6 py-4 border-t border-border/30">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            What unlocks immediately
          </p>
          <div className="space-y-2.5">
            {VALUE_BULLETS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2.5"
              >
                <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground/85">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Social proof strip ── */}
        <div className="px-6 py-3 border-t border-border/30 bg-secondary/30 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Early access — founding members</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">47 builds & growing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">30-day guarantee</span>
          </div>
        </div>

        {/* ── CTAs ── */}
        <div className="px-6 pt-4 pb-3 space-y-2.5">
          {/* Primary CTA */}
          <Link to="/pricing" onClick={() => { handleCTAClick('primary'); onOpenChange(false); }}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 text-sm gap-2 group">
              <Zap className="w-4 h-4" />
              Unlock the Full Build — $99/mo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>

          {/* Secondary CTA — lower friction */}
          <Link to="/pricing" onClick={() => { handleCTAClick('secondary'); onOpenChange(false); }}>
            <Button
              variant="outline"
              className="w-full border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 h-10 text-xs font-medium gap-2"
            >
              See all plans — starts at $49/mo
            </Button>
          </Link>

          {/* Ghost dismiss */}
          <button
            onClick={() => { handleCTAClick('dismiss'); onOpenChange(false); }}
            className="w-full text-xs text-muted-foreground/50 hover:text-muted-foreground py-1 transition-colors"
          >
            No thanks, I'll stick to free previews
          </button>
        </div>

        {/* ── Urgency footer ── */}
        <div className="px-6 pb-5">
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/15">
            <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-xs text-foreground/70">
              <span className="font-semibold text-primary">New build ships Friday.</span>{' '}
              Members get early access 48 hrs before public preview.
            </span>
          </div>
        </div>

        {/* ── Objection handling ── */}
        <div className="px-6 pb-6 border-t border-border/30 pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Common questions
          </p>
          <ObjectionAccordion />
        </div>

      </DialogContent>
    </Dialog>
  );
}