import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText, Download, Lock, Shield, DollarSign,
  BookOpen, Wrench, Users, TrendingUp, ExternalLink,
  ChevronRight, Package, AlertTriangle
} from 'lucide-react';

const MASTER_DOCS = [
  {
    id: 'sourcing_report',
    title: 'Material Sourcing Report',
    description: '304 line items · $34,054 total est. cost · 10% commission structure ($3,405)',
    category: 'Operations',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/53342dade_ZenithApex_MaterialSourcing_2026-04-26-Copy.pdf',
    badge: 'Commission Ready',
    badgeColor: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    icon: Package,
  },
  {
    id: 'acquisition_letter',
    title: 'Master Acquisition Letter',
    description: 'Platform FMV: $3.9M–$11.5M · Exclusive acquisition terms $6.5M–$18M · Personalize before sending',
    category: 'Business Dev',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/bb91a6cd3_zenith-apex-acquisition-letter1.pdf',
    badge: 'High Value',
    badgeColor: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
    icon: TrendingUp,
  },
  {
    id: 'build_library',
    title: 'Build Video Library — 17 Guides',
    description: '44 pages · 17 invention build guides · 10 steps each with materials, safety & checkpoints',
    category: 'Content',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/f834efc84_zenith-apex-build-video-library3-Copy.pdf',
    badge: 'Core Asset',
    badgeColor: 'bg-primary/20 text-primary border-primary/30',
    icon: Wrench,
  },
  {
    id: 'course_catalog',
    title: 'Course Catalog — 26 Courses',
    description: 'Scalar EM · IP Strategy · Bioelectromagnetics · Advanced Physics · $147–$397 per course',
    category: 'Education',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/3207910ec_zenith-apex-course-catalog1.pdf',
    badge: '26 Courses',
    badgeColor: 'bg-accent/20 text-accent border-accent/30',
    icon: BookOpen,
  },
  {
    id: 'invention_plans',
    title: 'Invention Build Plans',
    description: 'MEG Replica · Complete BOM · Step-by-step assembly · Theory primers',
    category: 'Engineering',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/dc6972f16_zenith-apex-invention-plans.pdf',
    badge: 'IP Asset',
    badgeColor: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    icon: FileText,
  },
  {
    id: 'master_letter',
    title: 'Platform Master Letter',
    description: 'Consolidated acquisition + licensing overview · NDA required · Confidential disclosures',
    category: 'Legal',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/f68324896_zenith-apex-master-letter.pdf',
    badge: 'Confidential',
    badgeColor: 'bg-destructive/20 text-destructive border-destructive/30',
    icon: Shield,
  },
  {
    id: 'nda',
    title: 'NDA — Mutual Confidentiality Agreement',
    description: 'Governing proprietary research, IP & trade secrets · $2.5M liquidated damages per incident',
    category: 'Legal',
    url: 'https://media.base44.com/files/public/69eb0be738ac197e4e602e57/d99603caa_zenith-apex-nda1.pdf',
    badge: 'Attorney Reviewed',
    badgeColor: 'bg-muted text-muted-foreground border-border',
    icon: Lock,
  },
];

const PLATFORM_STATS = [
  { label: 'Platform FMV (conservative)', value: '$3.9M – $11.5M' },
  { label: 'Exclusive Acquisition', value: '$6.5M – $18M' },
  { label: 'Annual Licensing', value: '$650K – $1.5M/yr' },
  { label: 'Build Guides', value: '17 Complete' },
  { label: 'Courses', value: '26 Total' },
  { label: 'Sourcing Commission', value: '$3,405 (10%)' },
];

export default function AdminVault() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">Admin Access Required</h1>
        <p className="text-muted-foreground max-w-md">
          This vault is restricted to admin users only. Contact your administrator for access.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <Badge className="bg-destructive/15 text-destructive border-destructive/25 text-xs font-semibold">
                ADMIN ONLY
              </Badge>
            </div>
            <h1 className="text-3xl font-black mb-2">ZARP Master Vault</h1>
            <p className="text-muted-foreground max-w-2xl">
              Zenith Apex Research Portfolio — confidential platform documents, IP assets, funnel materials, and monetization infrastructure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Platform Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Platform Valuation Snapshot
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {PLATFORM_STATS.map((stat, i) => (
              <div key={i} className="bg-secondary/40 rounded-xl p-4 border border-border/40">
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="font-bold text-sm text-primary leading-tight">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Master Documents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Master Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_DOCS.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Card className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:glow-cyan h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm leading-tight">{doc.title}</h3>
                            <Badge className={`text-xs flex-shrink-0 ${doc.badgeColor}`}>
                              {doc.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{doc.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10">
                                <Download className="w-3 h-3" />
                                Download PDF
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Acquisition Funnel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Acquisition Funnel (4-Step Process)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Confirm Interest', desc: 'Prospect replies → send NDA template', color: 'text-chart-1' },
              { step: '02', title: 'Execute NDA', desc: 'Receive signed NDA + proof of funds or institutional mandate', color: 'text-chart-2' },
              { step: '03', title: 'Due Diligence', desc: 'Send 100+ page technical package to qualified buyer', color: 'text-chart-3' },
              { step: '04', title: 'Live Demo + Close', desc: 'Schedule platform demonstration and negotiate terms', color: 'text-chart-4' },
            ].map((step) => (
              <div key={step.step} className="bg-secondary/30 rounded-xl p-5 border border-border/40">
                <div className={`text-2xl font-black mb-2 font-mono ${step.color}`}>{step.step}</div>
                <div className="font-semibold text-sm mb-1">{step.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monetization Tiers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Monetization Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                tier: 'Courses',
                range: '$147 – $397',
                note: 'Per course · 26 available',
                items: ['Scalar EM theory', 'Bioelectromagnetics', 'MEG deep dive', 'IP strategy'],
                color: 'border-chart-1/30 bg-chart-1/5',
                badge: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
              },
              {
                tier: 'Memberships',
                range: '$49 – $149/mo',
                note: 'Starter / Pro / Elite',
                items: ['Build access', 'Course library', 'BOMs + code', 'Priority updates'],
                color: 'border-primary/30 bg-primary/5',
                badge: 'bg-primary/20 text-primary border-primary/30',
              },
              {
                tier: 'Licensing',
                range: '$650K – $1.5M/yr',
                note: 'Annual license fee',
                items: ['Full platform access', 'AI engine rights', 'IP portfolio', 'Technical package'],
                color: 'border-chart-3/30 bg-chart-3/5',
                badge: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
              },
              {
                tier: 'Acquisition',
                range: '$6.5M – $18M',
                note: 'Full platform purchase',
                items: ['Exclusive ownership', 'All IP + AI systems', 'Source code', 'White-label rights'],
                color: 'border-chart-4/30 bg-chart-4/5',
                badge: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
              },
            ].map((tier, i) => (
              <Card key={i} className={`border ${tier.color} transition-all duration-300`}>
                <CardHeader className="pb-3">
                  <Badge className={`text-xs w-fit ${tier.badge}`}>{tier.tier}</Badge>
                  <CardTitle className="text-lg font-black mt-2">{tier.range}</CardTitle>
                  <p className="text-xs text-muted-foreground">{tier.note}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {tier.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="bg-secondary/20 rounded-xl p-6 border border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold mb-1">Commission Note</h3>
              <p className="text-sm text-muted-foreground">
                Material sourcing carries a <span className="text-primary font-semibold">10% commission</span> ($3,405.42 on $34,054 total). 
                Commissions via ACH direct deposit to Zenith Apex Research Portfolio.
              </p>
            </div>
            <a
              href="https://media.base44.com/files/public/69eb0be738ac197e4e602e57/53342dade_ZenithApex_MaterialSourcing_2026-04-26-Copy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 whitespace-nowrap">
                <ExternalLink className="w-4 h-4" />
                View Full Sourcing Report
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}