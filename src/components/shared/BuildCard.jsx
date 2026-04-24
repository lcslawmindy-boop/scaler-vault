import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryLabels = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

const categoryColors = {
  energy_systems: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  bio_signal_systems: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  communication_systems: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
  demonstration_builds: 'bg-chart-4/20 text-chart-4 border-chart-4/30',
};

export default function BuildCard({ build, index = 0, isLocked = true, isPreview = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className={`group relative overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300 ${isLocked ? 'hover:glow-cyan' : 'glow-cyan'}`}>
        {/* Image area */}
        <div className="relative h-44 bg-gradient-to-br from-secondary to-muted overflow-hidden">
          {build.image_url ? (
            <img src={build.image_url} alt={build.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid-pattern flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-mono font-bold text-primary">{build.title?.[0]}</span>
              </div>
            </div>
          )}
          {isLocked && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={`text-xs font-medium ${categoryColors[build.category] || 'bg-secondary text-secondary-foreground'}`}>
              {categoryLabels[build.category] || build.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {build.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {build.short_description}
          </p>
          <div className="flex items-center justify-between">
            {build.estimated_build_cost && (
              <div className="flex items-center gap-1 text-sm">
                <DollarSign className="w-3.5 h-3.5 text-primary" />
                <span className="text-muted-foreground">Build cost:</span>
                <span className="font-semibold text-foreground">${build.estimated_build_cost?.toLocaleString()}</span>
              </div>
            )}
            <Link to={`/build/${build.id}`}>
              <Button size="sm" variant={isLocked ? "outline" : "default"} className={`gap-1.5 text-xs ${!isLocked ? 'bg-primary text-primary-foreground' : 'border-primary/30 text-primary hover:bg-primary/10'}`}>
                {isLocked ? 'View Build' : 'Open Build'}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}