import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import {
  AlertTriangle, XCircle, CheckCircle2, TrendingUp, DollarSign,
  Users, Lock, ShoppingCart, ArrowRight, Target, Lightbulb,
  BarChart3, Zap, Eye, Clock, Copy, CheckCheck
} from 'lucide-react';
import { toast } from 'sonner';

// ─── THE 5 FATAL PROBLEMS ───────────────────────────────────────────────────
const PROBLEMS = [
  {
    rank: 1,
    severity: 'fatal',
    title: 'Zero Payment Infrastructure',
    summary: 'Every "Buy Now" button goes nowhere. There is no Stripe, no checkout, no purchase flow. This is not a revenue problem — it is a pre-revenue problem.',
    evidence: [
      'Products page has "Buy Now" buttons with zero onClick handler',
      'Pricing page has no payment integration whatsoever',
      'PaywallModal links to /pricing but /pricing has no purchase mechanism',
      'Starter kits have prices, margins, and ship times — but no way to order',
    ],
    kill_probability: 100,
    fix: 'Integrate Stripe Checkout immediately. One endpoint, one webhook, done. Ship in a day.',
    fix_effort: 'Low — 1 day',
    revenue_impact: 'Blocks 100% of revenue',
  },
  {
    rank: 2,
    severity: 'fatal',
    title: 'No Content in the Database',
    summary: 'The entire value proposition — "47 builds, verified BOMs, schematics" — has zero records in the Build entity. You are selling access to an empty library.',
    evidence: [
      'Build entity exists but has no populated records',
      'Vault page renders an empty grid to every visitor',
      'The paywall modal fires on empty pages — "unlock" what exactly?',
      'Products page shows "No digital products available yet"',
    ],
    kill_probability: 100,
    fix: 'Publish a minimum of 5 complete, real build guides before running any traffic. Quality over quantity — one great guide converts better than 47 stubs.',
    fix_effort: 'High — content creation is the actual work',
    revenue_impact: 'No content = no trial conversions = no revenue',
  },
  {
    rank: 3,
    severity: 'critical',
    title: 'Fake Social Proof Destroying Trust',
    summary: 'The paywall says "2,400+ engineers enrolled." The hero says "1,200+ engineers using." These numbers are fabricated. Engineers are skeptical by profession. Getting caught kills all credibility permanently.',
    evidence: [
      'PaywallModal hardcodes "2,400+ engineers enrolled"',
      'Hero stat hardcodes "1,200+ Engineers Using"',
      'Testimonials are clearly placeholder names with no verification',
      'Fake live viewer counter ("14 engineers viewing this build right now")',
      'No real user data in the database to back any of these claims',
    ],
    kill_probability: 85,
    fix: 'Remove all fabricated numbers immediately. Use "Be among the first" framing at launch. Real numbers the moment you have them — even "12 engineers" is more powerful than fake "2,400."',
    fix_effort: 'Low — 2 hours of copy changes',
    revenue_impact: 'Trust destruction = 0% conversion even with payment live',
  },
  {
    rank: 4,
    severity: 'critical',
    title: 'Product Complexity Without Validation',
    summary: 'You have designed a 6-tier product ladder with subscriptions, digital products, starter kits, bootcamps, white-label licenses, and consulting — before selling a single thing. This is a business school project, not a business.',
    evidence: [
      'Four subscription tiers ($0/$49/$99/$299) require proven churn data to optimize',
      'Starter kits require inventory, fulfillment, and logistics you do not have',
      'White-label licensing at $4,997 requires legal, IP protection, and enterprise sales',
      '$2,997 bootcamp requires you to have run a successful cohort first',
      'Elite tier at $299 promises "1-on-1 mentorship" — is this scalable?',
    ],
    kill_probability: 70,
    fix: 'Start with ONE product: a $97–$197 one-time digital guide for your best build. No subscriptions yet. Validate that someone will pay for your content before building infrastructure for 2,000 subscribers.',
    fix_effort: 'Strategic — requires product focus decision',
    revenue_impact: 'Complexity delays first dollar by months',
  },
  {
    rank: 5,
    severity: 'moderate',
    title: 'Positioning Confusion — Who Is This Actually For?',
    summary: 'The audience swings between "electronics hobbyist," "hardware engineer," "robotics researcher," "course creator," and "entrepreneur." You cannot market to all of them. You will reach none of them.',
    evidence: [
      'Hero says "engineers who prototype" — implies professional',
      'SDR guide targets "radio enthusiasts, security researchers, hobbyists" — very different buyers',
      'Bootcamp targets "engineers ready to monetize" — implies business owners',
      'White-label license targets "universities, corporate training" — enterprise B2B',
      'Email funnel talks about "making more money" — income claim audience',
    ],
    kill_probability: 60,
    fix: 'Pick one persona. Recommendation: professional or semi-professional hardware engineers building prototypes for commercial or research applications. They have money, they have need, they are underserved by YouTube and Stack Overflow.',
    fix_effort: 'Strategic — messaging and content decisions',
    revenue_impact: 'Unfocused positioning increases CAC, reduces conversion rate',
  },
];

// ─── REVENUE REDESIGN PLAN ──────────────────────────────────────────────────
const REVENUE_PLAN = [
  {
    phase: 'Phase 1',
    timeline: 'Week 1–2',
    goal: 'First Dollar',
    color: 'text-chart-3',
    border: 'border-chart-3/30',
    bg: 'bg-chart-3/5',
    actions: [
      'Remove all fake social proof numbers — replace with "Early access" framing',
      'Add Stripe — connect payment to at least one product (SDR guide at $97)',
      'Publish 1 complete, real build guide with actual BOM and schematics',
      'Set pricing page to show ONE offer only: the $97 guide',
      'Add your real name and face — you are the credibility signal at launch',
    ],
  },
  {
    phase: 'Phase 2',
    timeline: 'Week 3–6',
    goal: 'Prove the Model',
    color: 'text-primary',
    border: 'border-primary/30',
    bg: 'bg-primary/5',
    actions: [
      'Publish 3 more complete guides — hit 4 total',
      'Launch a $49/mo subscription only after you have 3+ paying one-time customers',
      'Replace testimonials with real quotes from real early users',
      'Track real stats: page views, paywall hit rate, checkout starts, completions',
      'Start email list — real signups from real visitors, not demo data',
    ],
  },
  {
    phase: 'Phase 3',
    timeline: 'Month 2–3',
    goal: 'Build the Ladder',
    color: 'text-accent',
    border: 'border-accent/30',
    bg: 'bg-accent/5',
    actions: [
      'Introduce Pro tier only after Starter shows retention data',
      'Ship first starter kit only after 10+ buyers request it',
      'First consulting call — $297, sold manually, no page needed yet',
      'Use real conversion data to decide which tier to promote',
      'Bootcamp only when 20+ Pro members exist and 3 have a commercial project',
    ],
  },
];

// ─── HONEST VERDICT ─────────────────────────────────────────────────────────
const VERDICT = {
  potential: 7,
  current_state: 1,
  summary: "The architecture is smart and the build topics are genuinely compelling. The market is real — hardware engineers are underserved by content that goes deep enough to actually build something. But right now this is a business plan with a UI on top of it. No payments. No content. No real users. The product ladder you've built assumes 2,000 paying subscribers. You have zero. Fix the foundation first. Ship one real guide. Take one real payment. Then build.",
  what_is_good: [
    'The build topics are specific and technically interesting — EEG, SDR, EMG are not overcrowded markets',
    'The product documentation structure (BOM + schematic + execution) is genuinely differentiated',
    'The conversion funnel logic is sound — one-time buyers to subscription is a proven model',
    'The UI is professional and trustworthy at first glance',
    'The AI assistant concept is a real retention feature if it has content to work with',
  ],
};

function SeverityBadge({ severity }) {
  const config = {
    fatal: 'bg-destructive/15 text-destructive border-destructive/30',
    critical: 'bg-chart-5/15 text-chart-5 border-chart-5/30',
    moderate: 'bg-chart-4/15 text-chart-4 border-chart-4/30',
  };
  return (
    <Badge className={`text-[10px] font-bold border ${config[severity]} uppercase tracking-wider`}>
      {severity}
    </Badge>
  );
}

function KillBar({ probability }) {
  const color = probability >= 90 ? 'bg-destructive' : probability >= 70 ? 'bg-chart-5' : 'bg-chart-4';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Kill probability</span>
        <span className={`text-xs font-bold ${probability >= 90 ? 'text-destructive' : probability >= 70 ? 'text-chart-5' : 'text-chart-4'}`}>{probability}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${probability}%` }} />
      </div>
    </div>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button variant="ghost" size="sm" className="text-xs h-6 gap-1 text-muted-foreground hover:text-foreground"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); toast.success('Copied'); setTimeout(() => setCopied(false), 2000); }}>
      {copied ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </Button>
  );
}

export default function InvestorAudit() {
  const [expandedProblem, setExpandedProblem] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-destructive/20 bg-destructive/5">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Investor Audit — Why This Fails</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Brutally honest analysis. No flattery. Fix these or don't launch.
                </p>
              </div>
            </div>

            {/* Verdict scores */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
              {[
                { label: 'Concept', value: '7/10', color: 'text-chart-3' },
                { label: 'Execution', value: '2/10', color: 'text-destructive' },
                { label: 'Revenue Ready', value: '0/10', color: 'text-destructive' },
                { label: 'Trust Level', value: '3/10', color: 'text-chart-5' },
                { label: 'Fundable?', value: 'No', color: 'text-destructive' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-background/50 border border-border/40 text-center">
                  <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Honest Verdict */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-lg font-bold">The Bottom Line</h2>
          </div>
          <Card className="p-6 border-border/50 bg-card">
            <p className="text-sm text-foreground/85 leading-relaxed mb-5">{VERDICT.summary}</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-chart-3 mb-3">What is actually good</p>
              <div className="space-y-2">
                {VERDICT.what_is_good.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-chart-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* 5 Problems */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="w-4 h-4 text-destructive" />
            <h2 className="text-lg font-bold">The 5 Problems That Will Kill This</h2>
          </div>
          <div className="space-y-3">
            {PROBLEMS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Card
                  className={`border overflow-hidden cursor-pointer transition-all ${expandedProblem === i ? 'border-destructive/30' : 'border-border/40'}`}
                  onClick={() => setExpandedProblem(expandedProblem === i ? null : i)}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-destructive/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black text-destructive">#{p.rank}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-sm">{p.title}</h3>
                        <SeverityBadge severity={p.severity} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{p.summary}</p>
                    </div>
                    <div className="text-[10px] text-destructive font-bold flex-shrink-0 hidden sm:block">{p.kill_probability}% kill</div>
                  </div>

                  {/* Expanded */}
                  {expandedProblem === i && (
                    <div className="border-t border-border/40 p-5 space-y-5 bg-secondary/10">
                      <p className="text-sm text-foreground/85 leading-relaxed">{p.summary}</p>

                      <KillBar probability={p.kill_probability} />

                      {/* Evidence */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-2">Evidence in the codebase</p>
                        <div className="space-y-1.5">
                          {p.evidence.map((e, j) => (
                            <div key={j} className="flex items-start gap-2 p-2 rounded-lg bg-destructive/5 border border-destructive/10">
                              <XCircle className="w-3 h-3 text-destructive/60 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-foreground/75">{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fix */}
                      <div className="p-4 rounded-xl bg-chart-3/5 border border-chart-3/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-chart-3" />
                            <p className="text-[10px] font-bold uppercase tracking-wider text-chart-3">The Fix</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-foreground">Effort: {p.fix_effort}</span>
                            <CopyBtn text={p.fix} />
                          </div>
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{p.fix}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <DollarSign className="w-3 h-3 text-destructive" />
                          <span className="text-[11px] text-destructive font-medium">{p.revenue_impact}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Revenue Redesign Roadmap */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-chart-3" />
            <h2 className="text-lg font-bold">Revenue Redesign — The Actual Plan</h2>
          </div>
          <div className="space-y-4">
            {REVENUE_PLAN.map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className={`p-5 border ${phase.border} ${phase.bg}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className={`text-xs font-black ${phase.color}`}>{phase.phase}</div>
                      <div className="text-[10px] text-muted-foreground">{phase.timeline}</div>
                    </div>
                    <div>
                      <h3 className={`font-bold text-sm ${phase.color}`}>{phase.goal}</h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {phase.actions.map((action, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <ArrowRight className={`w-3 h-3 ${phase.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-xs text-foreground/80">{action}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Priority Action List */}
        <section>
          <Card className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-primary">Do These 5 Things This Week. Everything Else Waits.</h3>
            </div>
            <div className="space-y-3">
              {[
                { priority: '1', text: 'Connect Stripe to the SDR guide — $97 one-time. Ship one purchase flow.', tag: 'Revenue blocker' },
                { priority: '2', text: 'Delete the fake viewer counter and "2,400 enrolled" numbers from the paywall.', tag: 'Trust blocker' },
                { priority: '3', text: 'Create ONE complete build guide in the database with a real BOM, real schematic, real instructions.', tag: 'Content blocker' },
                { priority: '4', text: 'Pick your hero customer — one sentence: "This is for [specific person] who wants to [specific outcome]."', tag: 'Positioning' },
                { priority: '5', text: 'Tell 10 real engineers about this. Watch them use it. Fix what breaks before paying for traffic.', tag: 'Validation' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/40">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-primary">{item.priority}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-foreground/85">{item.text}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-border/50 text-muted-foreground flex-shrink-0 hidden sm:block">{item.tag}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Closing statement */}
        <section>
          <Card className="p-6 border-border/30 bg-secondary/20">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Final assessment:</span> The market is real, the topic is good, the structure makes sense. But you have built an elaborately detailed map to a destination you haven't validated anyone wants to pay to reach. Stop planning. Ship one thing. Charge for it. Use that signal to decide what to build next.
            </p>
          </Card>
        </section>

      </div>
    </div>
  );
}