import React, { useState, useMemo } from 'react';
import { VIDEO_SCRIPTS, CATEGORIES } from '../lib/videoScripts';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Copy, CheckCheck, ChevronDown, ChevronUp,
  Zap, Eye, DollarSign, TrendingUp, Users, Clock, Search
} from 'lucide-react';
import { toast } from 'sonner';

const CAT_COLORS = {
  curiosity:       'border-primary/30 text-primary bg-primary/10',
  hidden_systems:  'border-accent/30 text-accent bg-accent/10',
  cost_vs_value:   'border-chart-3/30 text-chart-3 bg-chart-3/10',
  monetization:    'border-chart-4/30 text-chart-4 bg-chart-4/10',
  social_proof:    'border-chart-5/30 text-chart-5 bg-chart-5/10',
  urgency:         'border-destructive/30 text-destructive bg-destructive/10',
};

const CAT_LABELS = {
  curiosity:      'Curiosity',
  hidden_systems: 'Hidden Systems',
  cost_vs_value:  'Cost vs Value',
  monetization:   'Monetization',
  social_proof:   'Social Proof',
  urgency:        'Urgency',
};

const CAT_ICONS = {
  curiosity:      Eye,
  hidden_systems: Search,
  cost_vs_value:  DollarSign,
  monetization:   TrendingUp,
  social_proof:   Users,
  urgency:        Clock,
};

function ScriptCard({ script, index }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(null);
  const Icon = CAT_ICONS[script.category] || Zap;

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    const full = `SCRIPT #${script.id}: ${script.title}\nCATEGORY: ${CAT_LABELS[script.category]}\nPLATFORM: ${script.platform.join(', ')}\n\nHOOK: ${script.hook}\n\nDEMO IDEA:\n${script.demo}\n\nFULL SCRIPT:\n${script.script}\n\nCTA: ${script.cta}`;
    copy(full, 'Full Script');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className="border-border/50 bg-card overflow-hidden hover:border-border transition-colors">
        {/* Header */}
        <div
          className="flex items-start gap-3 p-4 cursor-pointer hover:bg-secondary/20 transition-colors"
          onClick={() => setExpanded(e => !e)}
        >
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-8">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/50">#{script.id}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge className={`text-[10px] font-semibold border ${CAT_COLORS[script.category]}`}>
                {CAT_LABELS[script.category]}
              </Badge>
              <div className="flex gap-1">
                {script.platform.map(p => (
                  <Badge key={p} variant="outline" className="text-[9px] border-border/40 text-muted-foreground">{p}</Badge>
                ))}
              </div>
            </div>
            <h3 className="font-bold text-sm leading-snug mb-1">{script.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 italic">"{script.hook}"</p>
          </div>

          <div className="flex-shrink-0">
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>

        {/* Expanded */}
        {expanded && (
          <div className="border-t border-border/40 p-4 space-y-4">
            {/* Copy actions */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Hook', text: script.hook },
                { label: 'Demo', text: script.demo },
                { label: 'CTA', text: script.cta },
              ].map(item => (
                <Button key={item.label} variant="outline" size="sm"
                  className="text-xs h-7 gap-1.5 border-border/50"
                  onClick={() => copy(item.text, item.label)}
                >
                  {copied === item.label ? <CheckCheck className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                  {item.label}
                </Button>
              ))}
              <Button variant="outline" size="sm"
                className="text-xs h-7 gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                onClick={copyAll}
              >
                {copied === 'Full Script' ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Full Script
              </Button>
            </div>

            {/* Hook */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 mb-1">Hook (0–2s)</p>
              <p className="text-sm font-semibold leading-snug">"{script.hook}"</p>
            </div>

            {/* Demo */}
            <div className="rounded-xl bg-secondary/50 border border-border/30 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Demo Idea</p>
              <p className="text-xs text-foreground/80 leading-relaxed">{script.demo}</p>
            </div>

            {/* Full script */}
            <div className="rounded-xl bg-background/50 border border-border/30 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Full Script</p>
              <pre className="text-xs text-foreground/80 whitespace-pre-wrap leading-relaxed font-sans">{script.script}</pre>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-chart-3/5 border border-chart-3/20">
              <Zap className="w-4 h-4 text-chart-3 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">CTA</p>
                <p className="text-sm font-semibold text-chart-3">{script.cta}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {script.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-secondary border border-border/30 text-muted-foreground">#{t}</span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default function VideoScripts() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? VIDEO_SCRIPTS
      : VIDEO_SCRIPTS.filter(s => s.category === activeCategory),
    [activeCategory]
  );

  const copyAll = () => {
    const all = VIDEO_SCRIPTS.map(s =>
      `=== SCRIPT #${s.id}: ${s.title} ===\nCategory: ${CAT_LABELS[s.category]}\nPlatform: ${s.platform.join(', ')}\n\nHOOK: ${s.hook}\n\nDEMO:\n${s.demo}\n\nSCRIPT:\n${s.script}\n\nCTA: ${s.cta}`
    ).join('\n\n' + '─'.repeat(60) + '\n\n');
    navigator.clipboard.writeText(all);
    toast.success('All 30 scripts copied!');
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
                    <Video className="w-4 h-4 text-primary" />
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">30 Scripts</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Video Script Vault</h1>
                <p className="text-muted-foreground text-sm max-w-xl">
                  30 short-form video scripts for TikTok, Reels, and Shorts. Each includes hook, demo idea, full script, and CTA.
                </p>
              </div>
              <Button onClick={copyAll} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold">
                <Copy className="w-4 h-4" />
                Copy All 30
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-6 flex-wrap">
              {[
                { label: 'Scripts', value: '30' },
                { label: 'Platforms', value: '3' },
                { label: 'Categories', value: '6' },
                { label: 'Format', value: '≤ 30s' },
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {cat.label}
              {cat.id === 'all' && (
                <span className="ml-1.5 opacity-60">{VIDEO_SCRIPTS.length}</span>
              )}
              {cat.id !== 'all' && (
                <span className="ml-1.5 opacity-60">{VIDEO_SCRIPTS.filter(s => s.category === cat.id).length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Script cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((script, i) => (
              <ScriptCard key={script.id} script={script} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}