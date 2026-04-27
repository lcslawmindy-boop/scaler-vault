import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

export default function FinalCTA({ onCtaClick }) {
  return (
    <div className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent rounded-3xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Learn Advanced Systems?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Full access to courses, builds, and execution frameworks. Cancel anytime.
          </p>
          <Button
            onClick={onCtaClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 px-8 gap-2 text-lg"
          >
            <Zap className="w-5 h-5" />
            Unlock Full Access
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}