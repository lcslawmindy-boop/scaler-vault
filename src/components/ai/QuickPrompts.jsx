import React from 'react';
import { Zap, Package, DollarSign, Map, ArrowRight } from 'lucide-react';

const PROMPTS = [
  {
    icon: Zap,
    label: 'How do I start building the Tesla Coil?',
    short: 'Start building',
  },
  {
    icon: Package,
    label: 'What components do I need for an EEG system?',
    short: 'EEG components',
  },
  {
    icon: DollarSign,
    label: 'Give me a cost breakdown for the plasma reactor build',
    short: 'Cost breakdown',
  },
  {
    icon: Map,
    label: "I'm a beginner — what build should I start with?",
    short: 'Beginner path',
  },
  {
    icon: ArrowRight,
    label: "What's the next build after the SDR station?",
    short: 'Next build',
  },
];

export default function QuickPrompts({ onSelect }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
        Quick questions
      </p>
      {PROMPTS.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(p.label)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/30 hover:border-primary/30 transition-all text-left group"
        >
          <p.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{p.short}</span>
        </button>
      ))}
    </div>
  );
}