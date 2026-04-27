import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Lock, Download, Github, FileText, Clock, Zap, ArrowLeft } from 'lucide-react';

const CATEGORY_LABELS = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

const DIFFICULTY_COLORS = {
  beginner: 'bg-chart-3/10 text-chart-3',
  intermediate: 'bg-accent/10 text-accent',
  advanced: 'bg-destructive/10 text-destructive',
};

export default function BuildDetail() {
  const { id } = useParams();
  const [showPaywall, setShowPaywall] = useState(false);

  const { data: build, isLoading } = useQuery({
    queryKey: ['build', id],
    queryFn: () => base44.entities.Build.filter({ slug: id }).then(results => results[0]),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!build) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <p className="text-muted-foreground">Build not found.</p>
        <Link to="/vault">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Vault
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/vault" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Vault
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            {build.image_url && (
              <img
                src={build.image_url}
                alt={build.title}
                className="w-full h-96 object-cover rounded-2xl mb-8 border border-border/50"
              />
            )}

            <div className="flex items-start gap-4 mb-6 flex-wrap">
              <Badge className="bg-primary text-primary-foreground">{CATEGORY_LABELS[build.category]}</Badge>
              <Badge className={DIFFICULTY_COLORS[build.difficulty]}>
                {build.difficulty.charAt(0).toUpperCase() + build.difficulty.slice(1)}
              </Badge>
              {build.estimated_hours && (
                <Badge variant="outline" className="gap-1.5">
                  <Clock className="w-3 h-3" />
                  {build.estimated_hours}h
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">{build.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{build.description}</p>

            {/* CTA Section */}
            <Card className="p-6 border-primary/20 bg-gradient-to-r from-primary/8 to-transparent mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">Complete Build System Unlocked</p>
                  <p className="text-sm text-muted-foreground">Full schematics, BOMs, code, and execution framework included</p>
                </div>
                <Link to="/pricing">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 flex-shrink-0">
                    <Zap className="w-4 h-4" />
                    Unlock Access
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Components / BOM */}
            {build.components?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Bill of Materials</h2>
                <Card className="p-6 border-border/50">
                  <div className="space-y-4">
                    {build.components.map((comp, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b border-border/30 last:pb-0 last:border-0">
                        <div>
                          <p className="font-medium">{comp.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {comp.quantity}</p>
                        </div>
                        {comp.cost_estimate && (
                          <p className="font-semibold">${comp.cost_estimate.toFixed(2)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Resources */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {build.schematics_url && (
                <Button
                  variant="outline"
                  className="gap-2 border-border/50 h-12"
                  asChild
                >
                  <a href={build.schematics_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4" />
                    Download Schematics
                  </a>
                </Button>
              )}
              {build.code_url && (
                <Button
                  variant="outline"
                  className="gap-2 border-border/50 h-12"
                  asChild
                >
                  <a href={build.code_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}