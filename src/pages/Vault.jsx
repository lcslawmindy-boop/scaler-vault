import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import BuildCard from '../components/shared/BuildCard';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const categories = [
  { key: 'all', label: 'All Builds' },
  { key: 'energy_systems', label: 'Energy Systems' },
  { key: 'bio_signal_systems', label: 'Bio/Signal' },
  { key: 'communication_systems', label: 'Communication' },
  { key: 'demonstration_builds', label: 'Demo Builds' },
];

export default function Vault() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const { data: builds = [], isLoading } = useQuery({
    queryKey: ['builds'],
    queryFn: () => base44.entities.Build.list('-created_date', 50),
  });

  const filtered = builds.filter(b => {
    const catMatch = activeCategory === 'all' || b.category === activeCategory;
    const searchMatch = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.short_description?.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">The Vault</h1>
            <p className="text-muted-foreground max-w-xl">
              Browse categorized engineering builds. Each includes full documentation, BOMs, and execution systems.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat.key)}
                className={activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search builds..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border h-9"
            />
          </div>
        </div>

        {/* Grid */}
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
      </div>
    </div>
  );
}