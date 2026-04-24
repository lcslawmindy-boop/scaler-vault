import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle2, Zap, Shield, BookOpen, ArrowRight } from 'lucide-react';

const benefits = [
  { icon: BookOpen, text: 'Full build guides & step-by-step breakdowns' },
  { icon: Shield, text: 'Complete BOMs with supplier links' },
  { icon: Zap, text: 'Weekly new builds & updates' },
  { icon: CheckCircle2, text: 'Execution systems & frameworks' },
];

export default function PaywallModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 font-medium">Premium Content</Badge>
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold leading-tight">
              You're seeing the preview.
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Full builds, BOMs, and execution systems are inside the vault.
          </p>
        </div>

        {/* Benefits */}
        <div className="px-6 py-4 space-y-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-foreground">{b.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 space-y-3">
          <Link to="/pricing" onClick={() => onOpenChange(false)}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-semibold h-11 text-sm gap-2">
              View Plans & Unlock
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-center text-xs text-muted-foreground">
            Plans start at $49/mo · Cancel anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}