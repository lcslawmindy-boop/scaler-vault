import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Copy, CheckCheck, Target, XCircle, CheckCircle2, MessageSquare, Type, AlignLeft } from 'lucide-react';
import { toast } from 'sonner';

const POSITIONING_STATEMENT = {
  short: "Scalar Vault is a technical reference library for hardware engineers. We publish documented build guides, verified BOMs, and tested assembly sequences for advanced electronic systems.",
  long: "Scalar Vault gives hardware engineers, embedded systems researchers, and prototype builders access to structured, engineer-reviewed build documentation — covering schematics, component selection, sourcing, assembly, and debugging for complex electronic systems. Every guide is derived from a real prototype build and maintained as components and techniques evolve.",
  tagline: "Technical build references for engineers who prototype.",
  elevator: "It's a reference library for hardware prototyping — think O'Reilly for building real electronic systems. Schematics, verified BOMs, step-by-step assembly guides — for advanced systems like EEG interfaces, SDR stations, and wireless power systems.",
};

const HEADLINES = [
  { context: 'Hero — Primary', text: 'Structured Build References For Hardware Prototyping', notes: 'Clear noun + purpose. No hyperbole.' },
  { context: 'Hero — Secondary', text: 'Technical documentation for engineers who build from components, not kits.', notes: 'Differentiates from tutorial sites.' },
  { context: 'Value Prop', text: 'Documented schematics, verified BOMs, and tested execution guides — researched and maintained by working engineers.', notes: 'Specificity builds trust. Lists tangible deliverables.' },
  { context: 'Category Section', text: 'What Each Reference Includes', notes: 'Functional, neutral. Avoids "you\'ll discover" type language.' },
  { context: 'Social Proof', text: 'Used by Working Engineers', notes: '"Used" is more credible than "trusted by." Implies active, ongoing use.' },
  { context: 'CTA — Primary', text: 'Browse the Library', notes: 'Action-oriented but framed as research, not purchase pressure.' },
  { context: 'CTA — Secondary', text: 'Start Your Prototype Reference', notes: 'Positions subscription as a professional tool, not a product.' },
  { context: 'Paywall', text: 'Full documentation is available to members.', notes: 'Neutral access framing. No urgency manipulation.' },
  { context: 'Pricing Page', text: 'Reference Access Plans', notes: 'Plans, not tiers. Less salesy.' },
  { context: 'Email Subject', text: 'New build reference: EMG Gesture Controller (full docs inside)', notes: 'Descriptive. Implies value without clickbait.' },
];

const LANGUAGE_RULES = [
  {
    category: 'Headlines & Headlines',
    rules: [
      { avoid: 'Most people never see this', use: 'Advanced systems, documented for replication', reason: 'Removes "secret society" framing. Sounds credible, not conspiratorial.' },
      { avoid: 'Unlock the Vault', use: 'Access the Library / Browse the Library', reason: '"Library" signals a professional reference tool. "Vault" implies exclusivity theater.' },
      { avoid: 'Extraordinary / Revolutionary', use: 'Advanced / Complex / Technical', reason: 'Adjectives you can justify. Engineers are skeptical of superlatives.' },
      { avoid: 'You\'re one step away', use: 'Full documentation is available to members', reason: 'Neutral access gate vs. manipulative push.' },
    ],
  },
  {
    category: 'Value Claims',
    rules: [
      { avoid: 'Saves you 40 hours', use: 'Reduces component research and sourcing overhead', reason: 'Time savings can\'t be guaranteed. Mechanism can.' },
      { avoid: 'Engineers who build this make more', use: 'Builds skills with direct applications in embedded systems and hardware roles', reason: 'Skill development is defensible. Income claims are speculative.' },
      { avoid: 'One build recoup the cost', use: 'Single consulting engagement typically exceeds annual subscription cost', reason: 'Contextual comparison is acceptable. Direct ROI promise is not.' },
      { avoid: 'The knowledge is priceless', use: 'The documentation covers what most tutorials omit: failure modes, component tolerances, and integration tradeoffs', reason: 'Specific claims are more persuasive and more honest.' },
    ],
  },
  {
    category: 'Social Proof',
    rules: [
      { avoid: '2,400 engineers enrolled', use: '1,200+ engineers using the library', reason: 'Use real, conservative numbers. Never inflate.' },
      { avoid: 'Engineers who joined describe it the same way', use: 'Members across hardware, embedded systems, and research use the vault as a prototyping reference', reason: 'Occupation-specific proof is more credible than vague sentiment.' },
      { avoid: 'Most popular build right now', use: 'Frequently referenced: EEG BCI Guide', reason: '"Frequently referenced" implies utility. "Most popular" implies hype.' },
    ],
  },
  {
    category: 'Urgency & Scarcity',
    rules: [
      { avoid: 'New build drops Friday — act now', use: 'New build reference published weekly — members access immediately', reason: 'Feature, not pressure tactic.' },
      { avoid: 'Limited seats — don\'t miss out', use: 'Cohort size limited to 12 for quality of support', reason: 'Reason-based scarcity is honest. Vague scarcity is manipulation.' },
      { avoid: 'Engineers who don\'t join stay behind', use: 'The library covers systems that take weeks to research independently', reason: 'Document the cost of not having the resource. Don\'t shame the decision.' },
    ],
  },
  {
    category: 'Product Framing',
    rules: [
      { avoid: 'Classified / Vault / Clearance', use: 'Reference library / Documentation / Build guide', reason: 'Military/secrecy metaphors add zero credibility. Professional language does.' },
      { avoid: 'Hidden systems / What they don\'t teach you', use: 'Practical implementation detail not covered in standard courses', reason: 'The claim is valid — the framing should reflect that, not exploit it.' },
      { avoid: 'Stop reading abstracts. Start building.', use: 'Implementation-focused, not theory-only', reason: 'Positioning vs. alternatives should describe the product, not shame users.' },
    ],
  },
];

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5 border-border/50 flex-shrink-0"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); toast.success('Copied'); setTimeout(() => setCopied(false), 2000); }}>
      {copied ? <CheckCheck className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
      Copy
    </Button>
  );
}

export default function Positioning() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Brand Positioning Guidelines</h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Messaging strategy for trust-first, conversion-optimized copy.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {['Speculative claims removed', 'Engineering framing', 'Research-grade credibility', 'Honest urgency only'].map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs border-border/50 text-muted-foreground">{tag}</Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Positioning Statements */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <AlignLeft className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-bold">Core Positioning Statements</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'One-liner', text: POSITIONING_STATEMENT.tagline },
              { label: 'Short (1–2 sentences)', text: POSITIONING_STATEMENT.short },
              { label: 'Full positioning', text: POSITIONING_STATEMENT.long },
              { label: 'Elevator pitch', text: POSITIONING_STATEMENT.elevator },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className="p-4 border-border/50 bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{item.label}</p>
                      <p className="text-sm text-foreground/90 leading-relaxed">{item.text}</p>
                    </div>
                    <CopyBtn text={item.text} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Headlines */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Type className="w-4 h-4 text-chart-3" />
            <h2 className="text-lg font-bold">Approved Headlines by Context</h2>
          </div>
          <div className="space-y-2">
            {HEADLINES.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="p-4 border-border/40 bg-card">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="text-[10px] border-border/50 text-muted-foreground flex-shrink-0 mt-0.5">{h.context}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1">{h.text}</p>
                      <p className="text-xs text-muted-foreground">{h.notes}</p>
                    </div>
                    <CopyBtn text={h.text} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Language Rules */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-bold">Language Rules — Avoid vs. Use</h2>
          </div>
          <div className="space-y-8">
            {LANGUAGE_RULES.map((cat, ci) => (
              <div key={ci}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{cat.category}</p>
                <div className="space-y-2">
                  {cat.rules.map((rule, ri) => (
                    <motion.div key={ri} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ri * 0.04 }}>
                      <Card className="p-4 border-border/40 bg-card">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/15">
                            <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-wider text-destructive/70 mb-0.5">Avoid</p>
                              <p className="text-xs font-medium text-foreground/80">"{rule.avoid}"</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/15">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-wider text-primary/70 mb-0.5">Use Instead</p>
                              <p className="text-xs font-medium text-foreground/80">"{rule.use}"</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground border-t border-border/30 pt-2">{rule.reason}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand voice summary */}
        <section>
          <Card className="p-6 border-primary/20 bg-primary/5">
            <h3 className="font-bold mb-4 text-primary">Brand Voice Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Tone', points: ['Technical but readable', 'Direct, not pushy', 'Confident without superlatives', 'Specific over general'] },
                { label: 'Credibility signals', points: ['Exact component names and numbers', 'Documented failure points', 'Real prototype origins', 'Engineer-reviewed attribution'] },
                { label: 'What we never say', points: ['Income/salary promises', 'Unquantified time savings', 'Vague urgency ("limited time")', 'Conspiracy-adjacent framing'] },
              ].map((col, i) => (
                <div key={i}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{col.label}</p>
                  <ul className="space-y-1.5">
                    {col.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-foreground/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}