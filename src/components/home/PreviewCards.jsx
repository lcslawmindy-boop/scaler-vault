import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import BuildCard from '../shared/BuildCard';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'framer-motion';

export default function PreviewCards() {
  const { data: builds = [], isLoading } = useQuery({
    queryKey: ['builds-preview'],
    queryFn: () => base44.entities.Build.list('-created_date', 6),
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Inside the Vault</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Preview what's waiting inside. Full access requires a membership.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {builds.map((build, i) => (
            <BuildCard key={build.id} build={build} index={i} isLocked={true} />
          ))}
        </div>
      )}
    </section>
  );
}