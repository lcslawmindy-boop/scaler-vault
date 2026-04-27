import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Package, Zap, ArrowRight, Shield, Truck } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Build Kit Starter',
    price: 299,
    description: 'Pre-tested components for one build system.',
    features: [
      'All verified components',
      'Quality tested',
      'Free shipping',
      'Quick start guide',
    ],
    cta: 'Order Kit',
  },
  {
    name: 'Build Kit Pro',
    price: 599,
    description: 'Components for 3 advanced build systems.',
    features: [
      'All 3 complete BOMs',
      '2x testing & verification',
      'Priority shipping',
      'Technical support',
    ],
    cta: 'Order Kit',
    highlighted: true,
  },
];

export default function Products() {
  return (
    <div className="min-h-screen">
      <div className="relative border-b border-border/50 bg-gradient-to-br from-primary/8 via-card to-card">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Hardware Kits</h1>
            <p className="text-muted-foreground max-w-xl">
              Pre-tested component kits ready to build. Everything verified and tested.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-8 flex flex-col h-full ${
                product.highlighted
                  ? 'border-primary/50 bg-gradient-to-b from-primary/8 to-card glow-cyan-strong'
                  : 'border-border/50'
              }`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-black">${product.price}</span>
                </div>

                <div className="space-y-3 flex-1 mb-8">
                  {product.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-11 font-semibold gap-2 ${
                    product.highlighted
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  {product.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: Shield, text: '100% tested & verified' },
            { icon: Truck, text: 'Free shipping on orders $200+' },
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