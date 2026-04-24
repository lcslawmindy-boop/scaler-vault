import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import {
  ArrowLeft, Lock, DollarSign, Package, FileText,
  ChevronRight, Play, ShoppingCart, CheckCircle2, AlertTriangle
} from 'lucide-react';
import PaywallModal from '../components/shared/PaywallModal';

const categoryLabels = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal Systems',
  communication_systems: 'Communication Systems',
  demonstration_builds: 'Demonstration Builds',
};

export default function BuildDetail() {
  const { id } = useParams();
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  const { data: build, isLoading } = useQuery({
    queryKey: ['build', id],
    queryFn: async () => {
      const builds = await base44.entities.Build.filter({ id });
      return builds[0];
    },
    enabled: !!id,
  });

  useEffect(() => {
    const count = parseInt(sessionStorage.getItem('view_count') || '0') + 1;
    sessionStorage.setItem('view_count', count.toString());
    setViewCount(count);
    if (count > 2) {
      setTimeout(() => setPaywallOpen(true), 1500);
    }
    base44.analytics.track({ eventName: 'build_view', properties: { build_id: id } });
  }, [id]);

  const handleLockedClick = () => {
    setPaywallOpen(true);
    base44.analytics.track({ eventName: 'paywall_view', properties: { build_id: id, source: 'locked_section' } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!build) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">Build not found</p>
        <Link to="/vault"><Button variant="outline">Back to Vault</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/vault" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Vault
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge variant="outline" className="mb-4 text-xs">
                {categoryLabels[build.category]}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{build.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{build.short_description}</p>
            </motion.div>

            {/* Image */}
            {build.image_url && (
              <div className="rounded-2xl overflow-hidden border border-border/50">
                <img src={build.image_url} alt={build.title} className="w-full h-64 object-cover" />
              </div>
            )}

            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Overview
              </h2>
              <p className="text-foreground/80 leading-relaxed">{build.overview || build.short_description}</p>
            </section>

            {/* Market Context */}
            {build.market_context && (
              <section>
                <h2 className="text-xl font-bold mb-4">Market Context</h2>
                <p className="text-foreground/80 leading-relaxed">{build.market_context}</p>
              </section>
            )}

            {/* BOM Summary */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                BOM Summary
              </h2>
              {build.bom_summary ? (
                <Card className="p-5 bg-card border-border/50">
                  <p className="text-foreground/80 whitespace-pre-line">{build.bom_summary}</p>
                </Card>
              ) : (
                <Card className="p-5 bg-card border-border/50 text-center text-muted-foreground">
                  BOM details available in the full build.
                </Card>
              )}
            </section>

            <Separator className="bg-border/50" />

            {/* Locked Steps */}
            <section>
              <h2 className="text-xl font-bold mb-4">Step-by-Step Breakdown</h2>
              <div className="space-y-3">
                {(build.steps?.length ? build.steps.slice(0, 2) : [
                  { step_number: 1, title: 'System Design & Planning', description: 'Define requirements and create system architecture...' },
                  { step_number: 2, title: 'Component Sourcing', description: 'Identify and procure all necessary components...' },
                ]).map((step, i) => (
                  <Card key={i} className="p-4 bg-card border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{step.step_number || i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Locked steps */}
                <div
                  onClick={handleLockedClick}
                  className="relative cursor-pointer group"
                >
                  <div className="space-y-3 blur-sm opacity-50 pointer-events-none">
                    {[3, 4, 5].map(n => (
                      <Card key={n} className="p-4 bg-card border-border/50">
                        <div className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                            <span className="text-xs font-bold text-muted-foreground">{n}</span>
                          </div>
                          <div>
                            <div className="h-4 w-48 bg-secondary rounded" />
                            <div className="h-3 w-72 bg-secondary rounded mt-2" />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/90 border border-primary/30 glow-cyan">
                      <Lock className="w-6 h-6 text-primary" />
                      <span className="text-sm font-semibold">Unlock Full Build</span>
                      <span className="text-xs text-muted-foreground">Membership required</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Video */}
            {build.video_url && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Video
                </h2>
                <Card className="p-0 overflow-hidden border-border/50">
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <iframe src={build.video_url} className="w-full h-full" allowFullScreen />
                  </div>
                </Card>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing card */}
            <Card className="p-6 border-border/50 bg-card sticky top-24">
              <h3 className="font-bold text-lg mb-4">Build Details</h3>

              {build.estimated_build_cost && (
                <div className="flex items-center justify-between py-3 border-b border-border/30">
                  <span className="text-sm text-muted-foreground">Estimated Cost</span>
                  <span className="font-bold text-primary">${build.estimated_build_cost?.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <span className="text-sm text-muted-foreground">Access Level</span>
                <Badge variant="outline" className="text-xs capitalize">{build.tier_required || 'Pro'}</Badge>
              </div>

              <div className="space-y-3 mt-6">
                <Button
                  onClick={handleLockedClick}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-semibold gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Unlock Full Build
                </Button>

                {build.digital_product_price && (
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/10 gap-2"
                    onClick={handleLockedClick}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Buy Guide — ${build.digital_product_price?.toLocaleString()}
                  </Button>
                )}
              </div>
            </Card>

            {/* Kit upsell */}
            {build.kit_available && (
              <Card className="p-6 border-border/50 bg-gradient-to-b from-accent/5 to-card">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-accent" />
                  <h3 className="font-bold">Starter Kit</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Get the starter kit for this build with pre-selected components.
                </p>
                {build.kit_components && (
                  <p className="text-xs text-foreground/60 mb-4 whitespace-pre-line">{build.kit_components}</p>
                )}
                {build.kit_price && (
                  <div className="text-2xl font-bold text-accent mb-4">${build.kit_price?.toLocaleString()}</div>
                )}
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-purple font-semibold gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Starter Kit
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}