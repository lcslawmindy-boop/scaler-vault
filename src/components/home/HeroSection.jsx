import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Lock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ROTATING_WORDS = ['Prototype', 'Deploy', 'Monetize', 'Scale'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />

      {/* Floating pill indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">Early Access Open — Founding Member Pricing</span>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/25 font-medium">
              <Zap className="w-3 h-3 mr-1.5" />
              Technical Reference Library — Hardware Engineers
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6">
              Build Advanced<br />Engineering Systems<br />
              <span className="text-primary">Most People Never See</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Access complete build frameworks, BOMs, prototype systems, and a <strong className="text-foreground">26-course advanced research library</strong> inside a private vault.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <Link to="/vault">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-strong font-bold h-14 px-8 text-base gap-2 group"
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
                  className="border-border/60 hover:border-primary/30 hover:bg-primary/5 h-14 px-8 text-base font-medium"
                >
                  View Free Preview
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: '26', label: 'Research Courses' },
                { value: '29+', label: 'Build Systems' },
                { value: 'Weekly', label: 'New Content' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: mock vault cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="space-y-3">
              {[
                { title: 'EEG Brain-Computer Interface', cat: 'Bio/Signal', cost: '$340', locked: false },
                { title: 'Tesla Coil Power Transmitter', cat: 'Energy Systems', cost: '$210', locked: true },
                { title: 'SDR Intelligence Station', cat: 'Communication', cost: '$120', locked: true },
                { title: 'EMG Gesture Controller', cat: 'Bio/Signal', cost: '$280', locked: true },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border bg-card/80 backdrop-blur-sm transition-all
                    ${card.locked ? 'border-border/40 opacity-70' : 'border-primary/30 glow-cyan'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${card.locked ? 'bg-secondary' : 'bg-primary/20'}`}>
                    {card.locked
                      ? <Lock className="w-4 h-4 text-muted-foreground" />
                      : <Zap className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{card.title}</div>
                    <div className="text-xs text-muted-foreground">{card.cat}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-sm font-bold ${card.locked ? 'text-muted-foreground' : 'text-primary'}`}>
                      {card.cost}
                    </div>
                    <div className="text-[10px] text-muted-foreground">est. build</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Gradient fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-muted-foreground/50">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground/40 animate-bounce" />
      </motion.div>
    </section>
  );
}