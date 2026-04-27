import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Search, Filter, Lock, ChevronRight } from 'lucide-react';
import BuildCard from '@/components/shared/BuildCard';

const CATEGORIES = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

export default function Vault() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: builds = [], isLoading } = useQuery({
    queryKey: ['published-builds'],
    queryFn: () => base44.entities.Build.filter({ is_published: true }, '-release_date', 100),
  });

  const filteredBuilds = useMemo(() => {
    return builds.filter(build => {
      const matchesSearch = build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          build.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || build.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [builds, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative border-b border-border/50 bg-gradient-to-br from-primary/8 via-card to-card">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Build Vault</h1>
            <p className="text-muted-foreground max-w-xl">
              {builds.length}+ complete build systems with schematics, BOMs, and execution frameworks.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search builds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border/50 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuilds.map((build, i) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <BuildCard build={build} />
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredBuilds.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No builds found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}