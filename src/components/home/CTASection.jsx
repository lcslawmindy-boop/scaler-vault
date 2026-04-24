import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/12 to-primary/6" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto px-4 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-8">
          <Zap className="w-3 h-3" />
          Ready to build real systems?
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Start Your Next
          <span className="text-primary"> Prototype</span>
          <br />
          With a Solid Reference
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Access documented schematics, verified BOMs, and tested assembly guides used by hardware engineers building real systems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/pricing">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-strong font-bold h-14 px-10 text-base gap-2 group"
            >
              <Lock className="w-5 h-5" />
              Access the Library
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link to="/vault">
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 hover:border-primary/30 hover:bg-primary/5 h-14 px-8 text-base"
            >
              Free Previews
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">30-day money-back guarantee · Cancel anytime</p>
      </motion.div>
    </section>
  );
}