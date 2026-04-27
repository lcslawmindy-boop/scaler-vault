import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Zap, ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroSection({ onCtaClick }) {
  return (
    <div className="relative min-h-[90vh] overflow-hidden flex items-center">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Badge className="mb-6 bg-primary/15 text-primary border-primary/25">
            <Zap className="w-3 h-3 mr-1.5" />
            Access 20+ Advanced Systems
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          Learn Advanced Systems.
          <br />
          <span className="text-primary">Build Real Prototypes.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Access structured courses, guided build systems, and execution frameworks in one platform. Go from theory to working prototype.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-12"
        >
          <Button
            onClick={onCtaClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 px-8 gap-2 text-lg"
          >
            <Zap className="w-5 h-5" />
            Unlock the Vault
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Link to="/courses">
            <Button
              variant="outline"
              className="border-border/50 h-12 px-8 font-semibold text-base"
            >
              View Free Preview
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap"
        >
          <div>✓ 20+ courses</div>
          <div>✓ 30+ builds</div>
          <div>✓ Complete BOMs</div>
          <div>✓ Weekly updates</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  );
}