import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingCard({ tier, index = 0 }) {
  const isHighlighted = tier.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className={`relative overflow-hidden border-border/50 p-6 lg:p-8 transition-all duration-300 ${
        isHighlighted
          ? 'border-primary/50 glow-cyan-strong bg-gradient-to-b from-primary/5 to-card'
          : 'bg-card hover:border-primary/20'
      }`}>
        {isHighlighted && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-medium text-xs">
            Most Popular
          </Badge>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${tier.price}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </div>

        <Button
          className={`w-full font-semibold h-11 mb-6 ${
            isHighlighted
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {tier.cta}
        </Button>

        <div className="space-y-3">
          {tier.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighlighted ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}