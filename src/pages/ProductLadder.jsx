import React, { useState } from 'react';
import { PRODUCT_LADDER, DIGITAL_PRODUCTS, STARTER_KITS, HIGH_TICKET, UPSELL_FLOWS } from '../lib/productLadder';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Copy, CheckCheck, TrendingUp, DollarSign, Package, Zap, Eye, Star, Crown, ArrowRight, ArrowDown, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const TIER_ICONS = { free: Eye, starter: Zap, pro: Star, elite: Crown };
const TIER_COLORS = {
  free:    'border-border/40 bg-card',
  starter: 'border-primary/30 bg-card',
  pro:     'border-primary/60 bg-gradient-to-b from-primary/10 to-card ring-1 ring-primary/20',
  elite:   'border-accent/50 bg-gradient-to-b from-accent/10 to-card',
};
const TIER_BADGE = {
  free:    'bg-muted text-muted-foreground border-border/40',
  starter: 'bg-primary/10 text-primary border-primary/25',
  pro:     'bg-primary/20 text-primary border-primary/40',
  elite:   'bg-accent/20 text-accent border-accent/40',
};

function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5 border-border/50" onClick={handle}>
      {copied ? <CheckCheck className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
      Copy
    </Button>
  );
}

function SubscriptionTiers() {
  return (
    <section className="mb-14">
      <SectionHeader icon={Zap} label="Subscription Tiers" color="text-primary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(PRODUCT_LADDER).map((tier, i) => {
          const Icon = TIER_ICONS[tier.id];
          return (
            <motion.div key={tier.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className={`p-5 border relative overflow-hidden h-full flex flex-col ${TIER_COLORS[tier.id]}`}>
                {tier.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className={`text-[9px] font-bold border ${TIER_BADGE[tier.id]}`}>{tier.badge}</Badge>
                  </div>
                )}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${tier.id === 'elite' ? 'bg-accent/20' : 'bg-primary/15'}`}>
                    <Icon className={`w-4 h-4 ${tier.id === 'elite' ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{tier.name}</h3>
                    <div className="flex items-baseline gap-1">
                      {tier.price === 0
                        ? <span className="text-lg font-bold text-muted-foreground">Free</span>
                        : <><span className="text-xl font-bold">${tier.price}</span><span className="text-xs text-muted-foreground">/mo</span></>}
                    </div>
                  </div>
                </div>
                {tier.annual_price && (
                  <p className="text-[10px] text-muted-foreground mb-3 -mt-1">
                    ${tier.annual_price}/mo billed annually
                  </p>
                )}
                <p className="text-xs text-muted-foreground italic mb-4 border-l-2 border-border pl-3">{tier.tagline}</p>
                <div className="flex-1 space-y-1.5 mb-4">
                  {tier.includes.map((item, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-border/30">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Upsell trigger</p>
                  <p className="text-[11px] text-foreground/70">{tier.upsell_trigger}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function DigitalProducts() {
  return (
    <section className="mb-14">
      <SectionHeader icon={DollarSign} label="Digital Products" color="text-chart-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DIGITAL_PRODUCTS.map((dp, i) => (
          <motion.div key={dp.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="p-5 border-border/50 bg-card h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-sm leading-snug pr-4">{dp.name}</h3>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-chart-3">${dp.price}</div>
                  <span className="text-[10px] text-muted-foreground">one-time</span>
                </div>
              </div>
              <div className="flex-1 space-y-1 mb-4">
                {dp.what_you_get.map((item, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-3 border-t border-border/30">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40">
                  <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="text-xs text-muted-foreground"><strong className="text-foreground">Upsell:</strong> {dp.upsell_to}</span>
                </div>
                <p className="text-[11px] text-muted-foreground italic">{dp.conversion_note}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StarterKits() {
  return (
    <section className="mb-14">
      <SectionHeader icon={Package} label="Starter Kits" color="text-chart-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STARTER_KITS.map((kit, i) => (
          <motion.div key={kit.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="p-5 border-border/50 bg-card h-full flex flex-col">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-sm pr-4">{kit.name}</h3>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-chart-4">${kit.member_price}</span>
                    <span className="text-xs text-muted-foreground line-through">${kit.price}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">members · RRP ${kit.retail_value}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Ships in {kit.ships_in}</p>
              <div className="flex-1 space-y-1 mb-4">
                {kit.includes.map((item, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border/30">
                <span className="text-[10px] font-mono text-muted-foreground">{kit.margin_note}</span>
                <div className="flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-[11px] text-muted-foreground">{kit.upsell_to}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HighTicket() {
  return (
    <section className="mb-14">
      <SectionHeader icon={Crown} label="High-Ticket Offers" color="text-accent" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HIGH_TICKET.map((ht, i) => (
          <motion.div key={ht.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Card className="p-5 border-accent/20 bg-gradient-to-b from-accent/5 to-card h-full flex flex-col">
              <div className="mb-3">
                <div className="text-2xl font-bold text-accent mb-0.5">${ht.price.toLocaleString()}</div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{ht.format}</span>
              </div>
              <h3 className="font-bold text-sm mb-1">{ht.name}</h3>
              <p className="text-xs text-muted-foreground italic mb-4">{ht.tagline}</p>
              <div className="flex-1 space-y-1.5 mb-4">
                {ht.includes.map((item, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border/30 space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Ideal for</p>
                <p className="text-xs text-foreground/70">{ht.ideal_for}</p>
                <p className="text-[10px] text-muted-foreground">From: {ht.conversion_from}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function UpsellFlows() {
  const copyAll = () => {
    const text = UPSELL_FLOWS.map(f =>
      `${f.from} → ${f.to}\nTrigger: ${f.trigger}\nMechanism: ${f.mechanism}\nOffer: ${f.offer}\nBenchmark: ${f.conversion_benchmark}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    toast.success('All upsell flows copied');
  };

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-5">
        <SectionHeader icon={TrendingUp} label="Upsell & Conversion Flows" color="text-chart-5" inline />
        <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border/50" onClick={copyAll}>
          <Copy className="w-3 h-3" /> Copy All
        </Button>
      </div>
      <div className="space-y-3">
        {UPSELL_FLOWS.map((flow, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="p-4 border-border/40 bg-card">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Flow arrow */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-bold">{flow.from}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  <span className="px-2.5 py-1 rounded-lg bg-primary/15 text-primary text-xs font-bold border border-primary/25">{flow.to}</span>
                </div>
                {/* Details */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Trigger</p>
                    <p className="text-xs text-foreground/80">{flow.trigger}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Offer</p>
                    <p className="text-xs text-foreground/80">{flow.offer}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Benchmark</p>
                    <p className="text-xs font-semibold text-chart-3">{flow.conversion_benchmark}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ icon: Icon, label, color, inline }) {
  if (inline) return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <h2 className="text-lg font-bold">{label}</h2>
    </div>
  );
  return (
    <div className="flex items-center gap-2 mb-5">
      <Icon className={`w-4 h-4 ${color}`} />
      <h2 className="text-lg font-bold">{label}</h2>
    </div>
  );
}

export default function ProductLadder() {
  const totalRevenuePotential = () => {
    const subRevenue = '299 × 50 Elite + 99 × 500 Pro + 49 × 2,000 Starter = ~$264k MRR';
    return subRevenue;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Product Ladder</h1>
                <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
                  Full monetization architecture — from free preview to high-ticket programs. Every tier designed to pull toward the next.
                </p>
              </div>
            </div>

            {/* Revenue overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { label: 'Entry Point', value: 'Free', sub: 'Preview access' },
                { label: 'Subscription Range', value: '$49–$299', sub: '/month' },
                { label: 'Digital Products', value: '$297–$4,997', sub: 'One-time' },
                { label: 'High-Ticket', value: '$497–$14,997', sub: 'Programs + licenses' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/40 border border-border/30">
                  <div className="text-lg font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-[10px] text-muted-foreground/60">{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Visual ladder */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          {[
            { label: 'Free', sub: '$0', color: 'bg-secondary border-border/40' },
            { label: 'Starter', sub: '$49/mo', color: 'bg-primary/10 border-primary/30' },
            { label: 'Pro', sub: '$99/mo', color: 'bg-primary/20 border-primary/50' },
            { label: 'Elite', sub: '$299/mo', color: 'bg-accent/15 border-accent/40' },
            { label: 'Products', sub: '$297–$4,997', color: 'bg-chart-3/10 border-chart-3/30' },
            { label: 'High-Ticket', sub: '$497–$14,997', color: 'bg-accent/20 border-accent/50' },
          ].map((step, i, arr) => (
            <React.Fragment key={step.label}>
              <div className={`px-4 py-2 rounded-xl border text-center min-w-[100px] ${step.color}`}>
                <div className="text-xs font-bold">{step.label}</div>
                <div className="text-[10px] text-muted-foreground">{step.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-primary/40 flex-shrink-0 rotate-0 sm:rotate-0 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SubscriptionTiers />
        <DigitalProducts />
        <StarterKits />
        <HighTicket />
        <UpsellFlows />
      </div>
    </div>
  );
}