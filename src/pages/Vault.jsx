import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import BuildCard from '../components/shared/BuildCard';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Search, Lock, ArrowRight, Zap } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const categories = [
  { key: 'all', label: 'All Builds' },
  { key: 'energy_systems', label: 'Energy Systems' },
  { key: 'bio_signal_systems', label: 'Bio/Signal' },
  { key: 'communication_systems', label: 'Communication' },
  { key: 'demonstration_builds', label: 'Demo Builds' },
];

// Demo builds shown when DB is empty
const DEMO_BUILDS = [
  { id: 'demo-1', title: 'EEG Brain-Computer Interface', category: 'bio_signal_systems', short_description: 'Complete analog front-end design for non-invasive EEG signal acquisition with 8-channel ADS1299 chipset.', estimated_build_cost: 340, tier_required: 'pro' },
  { id: 'demo-2', title: 'Tesla Coil Power Transmitter', category: 'energy_systems', short_description: 'SSTC design with full LC circuit calculations, gate drive transformer, and safety enclosure documentation.', estimated_build_cost: 210, tier_required: 'pro' },
  { id: 'demo-3', title: 'SDR Intelligence Station', category: 'communication_systems', short_description: 'RTL-SDR wideband receiver with antenna design, frequency reference guide covering 100+ signal types.', estimated_build_cost: 120, tier_required: 'starter' },
  { id: 'demo-4', title: 'EMG Gesture Controller', category: 'bio_signal_systems', short_description: 'MyoWare 2.0 muscle sensor integration with ML gesture classification pipeline for HCI applications.', estimated_build_cost: 280, tier_required: 'pro' },
  { id: 'demo-5', title: 'Wireless Power Receiver', category: 'energy_systems', short_description: 'Resonant inductive coupling system with efficiency optimization across variable load conditions.', estimated_build_cost: 175, tier_required: 'elite' },
  { id: 'demo-6', title: 'Low-Power IoT Sensor Node', category: 'demonstration_builds', short_description: 'LoRaWAN-connected environmental monitoring node targeting sub-10μA sleep current.', estimated_build_cost: 95, tier_required: 'starter' },
];

export default function Vault() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const { data: builds = [], isLoading } = useQuery({
    queryKey: ['builds'],
    queryFn: () => base44.entities.Build.list('-created_date', 50),
  });

  const displayBuilds = builds.length > 0 ? builds : DEMO_BUILDS;

  const filtered = displayBuilds.filter(b => {
    const catMatch = activeCategory === 'all' || b.category === activeCategory;
    const searchMatch = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.short_description?.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/25 text-xs font-medium">
                <Zap className="w-3 h-3 mr-1" />
                Free Previews Available
              </Badge>
              <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Full Docs — Members Only
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">The Build Library</h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Browse the full catalog. Preview any build free. Unlock complete documentation, schematics, and BOMs with a membership.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat.key)}
                  className={activeCategory === cat.key
                    ? 'bg-primary text-primary-foreground h-8 text-xs'
                    : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 h-8 text-xs bg-transparent'
                  }
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search builds..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 bg-secondary border-border h-8 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-44 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No builds found. Try a different filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((build, i) => (
              <BuildCard key={build.id} build={build} index={i} isLocked={true} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 to-transparent text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-cyan">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Full documentation is available to members</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Every build includes complete schematics, verified BOMs, and tested assembly sequences.
          </p>
          <Link to="/pricing">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 px-8 gap-2 group">
              View Membership Plans
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}