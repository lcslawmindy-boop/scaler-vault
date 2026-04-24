import React, { useState } from 'react';
import { EMAIL_FUNNEL } from '../lib/emailFunnel';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import {
  Mail, Copy, CheckCheck, ChevronDown, ChevronUp,
  Zap, Clock, TrendingUp, AlertTriangle, Star, ArrowRight, Flag
} from 'lucide-react';
import { toast } from 'sonner';

const TAG_ICONS = {
  Welcome: Zap,
  Curiosity: Star,
  Value: TrendingUp,
  'Social Proof': CheckCheck,
  'Objection Handle': AlertTriangle,
  Urgency: Clock,
  'Final Push': Flag,
};

const TAG_COLORS = {
  Welcome: 'border-primary/30 text-primary bg-primary/10',
  Curiosity: 'border-accent/30 text-accent bg-accent/10',
  Value: 'border-chart-3/30 text-chart-3 bg-chart-3/10',
  'Social Proof': 'border-chart-4/30 text-chart-4 bg-chart-4/10',
  'Objection Handle': 'border-chart-5/30 text-chart-5 bg-chart-5/10',
  Urgency: 'border-destructive/30 text-destructive bg-destructive/10',
  'Final Push': 'border-primary/30 text-primary bg-primary/10',
};

function EmailCard({ email, index }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(null);
  const Icon = TAG_ICONS[email.tag] || Mail;

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="border-border/50 bg-card overflow-hidden">
        {/* Header row */}
        <div
          className="flex items-start gap-4 p-5 cursor-pointer hover:bg-secondary/20 transition-colors"
          onClick={() => setExpanded(e => !e)}
        >
          {/* Day badge */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/60">
              Day {email.day}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge className={`text-[10px] font-semibold border ${TAG_COLORS[email.tag]}`}>
                {email.tag}
              </Badge>
            </div>
            <h3 className="font-bold text-sm leading-snug mb-1 pr-8">{email.subject}</h3>
            <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
          </div>

          <div className="flex-shrink-0 text-muted-foreground">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {/* Expanded body */}
        {expanded && (
          <div className="border-t border-border/40 p-5 space-y-4">
            {/* Copy buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Subject', text: email.subject },
                { label: 'Preview', text: email.preview },
                { label: 'Full Email', text: email.body },
              ].map(item => (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 gap-1.5 border-border/50"
                  onClick={() => copyText(item.text, item.label)}
                >
                  {copied === item.label ? (
                    <CheckCheck className="w-3 h-3 text-primary" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  Copy {item.label}
                </Button>
              ))}
            </div>

            {/* Subject & Preview */}
            <div className="space-y-2">
              <div className="rounded-xl bg-secondary/50 border border-border/30 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Subject Line</p>
                <p className="text-sm font-semibold">{email.subject}</p>
              </div>
              <div className="rounded-xl bg-secondary/50 border border-border/30 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Preview Text</p>
                <p className="text-xs text-muted-foreground">{email.preview}</p>
              </div>
            </div>

            {/* Body */}
            <div className="rounded-xl bg-background/50 border border-border/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Email Body</p>
              <pre className="text-xs text-foreground/80 whitespace-pre-wrap leading-relaxed font-sans">
                {email.body}
              </pre>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">CTA Button</p>
                <p className="text-sm font-semibold text-primary">{email.cta_text}</p>
                <p className="text-xs text-muted-foreground font-mono">{email.cta_url}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 gap-1.5 border-border/50"
                onClick={() => copyText(email.cta_text, 'CTA')}
              >
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default function EmailFunnel() {
  const copyAll = () => {
    const allEmails = EMAIL_FUNNEL.map(e =>
      `=== DAY ${e.day}: ${e.tag.toUpperCase()} ===\n\nSUBJECT: ${e.subject}\nPREVIEW: ${e.preview}\n\n${e.body}\n\nCTA: ${e.cta_text} → ${e.cta_url}\n`
    ).join('\n\n' + '─'.repeat(60) + '\n\n');
    navigator.clipboard.writeText(allEmails);
    toast.success('All 7 emails copied to clipboard!');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">7-Day Funnel</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Email Conversion Funnel</h1>
                <p className="text-muted-foreground text-sm max-w-xl">
                  Direct-response email sequence that converts free users to Pro. Click any email to expand the full copy.
                </p>
              </div>
              <Button
                onClick={copyAll}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
              >
                <Copy className="w-4 h-4" />
                Copy All Emails
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-6 flex-wrap">
              {[
                { label: 'Emails', value: '7' },
                { label: 'Sequence', value: '7 days' },
                { label: 'Strategy', value: 'Direct Response' },
                { label: 'Goal', value: 'Free → Pro' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-lg font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Funnel timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Strategy legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(TAG_COLORS).map(([tag, color]) => {
            const Icon = TAG_ICONS[tag] || Mail;
            return (
              <div key={tag} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-semibold ${color}`}>
                <Icon className="w-3 h-3" />
                {tag}
              </div>
            );
          })}
        </div>

        {/* Email cards */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[30px] top-10 bottom-10 w-px bg-border/40 hidden sm:block" />
          <div className="space-y-4">
            {EMAIL_FUNNEL.map((email, i) => (
              <EmailCard key={email.day} email={email} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}