import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package, CheckCircle2, ArrowRight, Zap, Star, Shield,
  Truck, Clock, ChevronDown, ChevronUp
} from 'lucide-react';

const KITS = [
  {
    id: 'kit-starter',
    tier: 'Starter',
    name: 'EEG BCI Starter Kit',
    price: 199,
    retail_value: 340,
    savings: 141,
    ships: '3-5 business days',
    badge: 'Most Ordered',
    color: 'border-primary/30 bg-gradient-to-b from-primary/8 to-card',
    accentColor: 'text-primary',
    includes: [
      'ADS1299 analog front-end board (pre-assembled)',
      'Dry electrode set — 8 channels',
      'ESP32 development board',
      'PCB breakout board (pre-soldered)',
      'Conductive gel (30ml)',
      'Electrode headset mount (3D printed)',
      'USB-C power cable',
    ],
    description: 'Everything you need to start building and testing your EEG prototype. Pre-assembled front-end saves 4–6 hours of soldering.',
    guide: 'Pairs with: EEG Brain-Computer Interface build guide',
  },
  {
    id: 'kit-advanced',
    tier: 'Advanced',
    name: 'EMG Gesture Controller Kit',
    price: 799,
    retail_value: 1200,
    savings: 401,
    ships: '5-7 business days',
    badge: 'Best Value',
    color: 'border-accent/30 bg-gradient-to-b from-accent/8 to-card',
    accentColor: 'text-accent',
    includes: [
      'MyoWare 2.0 muscle sensor × 4',
      'Custom PCB (fully assembled & tested)',
      'NVIDIA Jetson Nano (4GB) dev kit',
      'Armband mount system (adjustable)',
      'Disposable electrodes × 200',
      'Snap connector kit × 40',
      'USB programming cable',
      'Pre-loaded ML gesture model (5 gestures)',
      'Priority email support (30 days)',
    ],
    description: 'Professional-grade kit for full-stack gesture recognition. Includes ML model pre-loaded and tested on real hardware.',
    guide: 'Pairs with: EMG Gesture Controller build guide',
  },
];

const FAQ = [
  { q: 'When does my kit ship?', a: 'Starter kits ship within 3-5 business days. Advanced kits require 5-7 days due to pre-assembly and testing. You\'ll receive tracking as soon as it ships.' },
  { q: 'Do I need the build guide separately?', a: 'The guide is included with Pro and Elite memberships. If you\'re purchasing a kit without a membership, you can add the digital guide at checkout for a discounted bundle price.' },
  { q: 'What if components are faulty?', a: 'All kits are tested before shipping. If anything is faulty on arrival, contact us and we\'ll replace components at no charge within 30 days.' },
  { q: 'Can I get a refund?', a: 'Physical kits cannot be refunded once shipped due to the nature of electronic components. We stand behind our quality — if something is wrong, we fix it.' },
];

function FaqItem({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/40 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="text-sm font-medium">{item.q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      {open && <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>}
    </div>
  );
}

export default function KitUpsell() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-5 bg-accent/15 text-accent border-accent/25 font-medium">
              <Package className="w-3 h-3 mr-1.5" />
              Hardware Starter Kits
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Skip the Sourcing.<br />
              <span className="text-primary">Start Building Today.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Pre-selected, tested components for your build. Everything you need, nothing you don't.
              Ships ready to assemble.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Kits */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {KITS.map((kit, i) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className={`border h-full flex flex-col overflow-hidden ${kit.color}`}>
                {/* Kit header */}
                <div className="p-6 border-b border-border/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-muted-foreground border-border/40 text-[10px] font-semibold">{kit.tier} Kit</Badge>
                        <Badge className={`border text-[10px] font-semibold ${i === 0 ? 'bg-primary/15 text-primary border-primary/25' : 'bg-accent/15 text-accent border-accent/25'}`}>
                          {kit.badge}
                        </Badge>
                      </div>
                      <h2 className="text-xl font-bold">{kit.name}</h2>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className={`text-4xl font-black ${kit.accentColor}`}>${kit.price}</div>
                      <div className="text-xs text-muted-foreground line-through">${kit.retail_value} retail</div>
                      <div className="text-xs text-chart-3 font-semibold">Save ${kit.savings}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{kit.description}</p>
                  <p className="text-xs text-primary/70 mt-2 font-medium">{kit.guide}</p>
                </div>

                {/* What's included */}
                <div className="p-6 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">What's included</p>
                  <div className="space-y-2.5">
                    {kit.includes.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${kit.accentColor}`} />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & CTA */}
                <div className="p-6 border-t border-border/30 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-chart-3" />
                      Ships: {kit.ships}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      30-day component warranty
                    </div>
                  </div>
                  <Button
                    className={`w-full font-bold h-12 gap-2 group ${
                      i === 0
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90 glow-purple'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Order Kit — ${kit.price}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Pro members save an additional 20%
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value props */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: Zap, label: 'Pre-Tested', sub: 'Every component verified' },
            { icon: Truck, label: 'Fast Ship', sub: 'US & international' },
            { icon: Star, label: 'Curated', sub: 'No substitutions' },
            { icon: Shield, label: 'Warranted', sub: '30-day replacement' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl border border-border/40 bg-card text-center">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Kit FAQ</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ.map((item, i) => <FaqItem key={i} item={item} i={i} />)}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-primary/20 bg-primary/5 text-center"
        >
          <h3 className="text-xl font-bold mb-2">Get the full library with your kit</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Pro membership includes 20% off all kits plus access to all 47 build references.
          </p>
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-11 px-8 gap-2">
              View Membership Plans <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}