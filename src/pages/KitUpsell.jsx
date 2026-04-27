import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Package, CheckCircle2, Truck, Shield, ArrowRight } from 'lucide-react';

export default function KitUpsell() {
  return (
    <div className="min-h-screen">
      <div className="relative border-b border-border/50 bg-gradient-to-br from-accent/8 via-card to-card">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">Limited Stock</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Build? <span className="text-accent">Get a Kit.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Pre-tested, verified components. Everything you need to build — shipped to your door.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 border-accent/25 bg-gradient-to-r from-accent/8 to-transparent mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Build Kit Pro</h2>
                <p className="text-muted-foreground mb-6">
                  Everything for 3 advanced build systems. All components tested and verified.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'Complete BOMs for 3 systems',
                    '100% tested components',
                    'Fast shipping included',
                    'Technical support',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 font-bold gap-2">
                  <Package className="w-5 h-5" />
                  Order Now — $599
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary">
                  <Shield className="w-8 h-8 text-accent mb-2" />
                  <p className="font-semibold">Quality Tested</p>
                  <p className="text-sm text-muted-foreground mt-1">Every component verified</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary">
                  <Truck className="w-8 h-8 text-accent mb-2" />
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground mt-1">Delivered in 3-5 days</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Not ready yet?</p>
          <Link to="/vault">
            <Button variant="outline" className="border-border/50">
              Continue exploring builds
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}