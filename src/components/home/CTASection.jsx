import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Start Your Next
          <span className="text-primary"> Prototype</span> With a Solid Reference
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Access documented schematics, verified BOMs, and tested assembly guides used by hardware engineers building real systems.
        </p>
        <Link to="/pricing">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-strong font-bold h-13 px-10 text-base gap-2">
            Access the Library
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}