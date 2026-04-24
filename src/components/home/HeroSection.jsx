import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-8"
          >
            <Zap className="w-3 h-3" />
            Technical Reference Library for Hardware Engineers
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Structured Build References
            <br />
            <span className="text-primary">For Hardware Prototyping</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Documented schematics, verified BOMs, and tested execution guides for advanced engineering systems — researched, built, and maintained by working engineers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/vault">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-strong font-bold h-13 px-8 text-base gap-2">
                Browse the Library
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-border hover:border-primary/30 hover:bg-primary/5 h-13 px-8 text-base font-medium">
                View Plans
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16"
          >
            {[
              { value: '47', label: 'Build References' },
              { value: '200+', label: 'Verified Components' },
              { value: '1,200+', label: 'Engineers Using' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}