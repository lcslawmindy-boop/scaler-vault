import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Lock, ArrowRight, Layers } from 'lucide-react';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/courseData';

export default function CourseCard({ course, index = 0 }) {
  const slug = course.slug || course.id;
  const totalMins = course.modules?.reduce((a, m) => a + (m.duration_mins || 0), 0) || 0;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  const levelColors = {
    intermediate: 'bg-chart-3/15 text-chart-3 border-chart-3/25',
    advanced: 'bg-primary/15 text-primary border-primary/25',
    expert: 'bg-accent/15 text-accent border-accent/25',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col p-5 border-border/50 bg-card hover:border-primary/30 transition-all duration-200 group">
        {/* Category + Level badges */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <Badge className={`text-[10px] font-semibold border ${CATEGORY_COLORS[course.category] || 'bg-secondary text-muted-foreground border-border/40'}`}>
            {CATEGORY_LABELS[course.category] || course.category}
          </Badge>
          <Badge className={`text-[10px] font-semibold border capitalize ${levelColors[course.level] || 'bg-secondary text-muted-foreground border-border/40'}`}>
            {course.level}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
          {course.short_description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Layers className="w-3 h-3" />
            {course.module_count || course.modules?.length || 5} modules
          </div>
          {totalMins > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {hours > 0 ? `${hours}h ` : ''}{mins > 0 ? `${mins}m` : ''}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Lock className="w-3 h-3" />
            Members
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/30">
          <div>
            <span className="text-lg font-black text-primary">${course.price}</span>
            <span className="text-xs text-muted-foreground ml-1">one-time</span>
          </div>
          <Link to={`/courses/${slug}`}>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1 h-8 text-xs group/btn">
              View Course
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}