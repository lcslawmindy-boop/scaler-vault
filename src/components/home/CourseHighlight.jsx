import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BookOpen, Lock, ArrowRight, Layers, Zap } from 'lucide-react';
import { COURSES, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/courseData';

const FEATURED = COURSES.slice(0, 6);

export default function CourseHighlight() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/25 font-medium">
              <BookOpen className="w-3 h-3 mr-1.5" />
              Advanced Research Library
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">26 Deep-Dive Courses</h2>
            <p className="text-muted-foreground max-w-lg">
              From electromagnetic theory to plasma physics — research-grade courses written for engineers who prototype.
            </p>
          </div>
          <Link to="/courses" className="flex-shrink-0">
            <Button variant="outline" className="border-border/50 hover:border-primary/30 gap-1.5 font-medium">
              View Full Library <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link to={`/courses/${course.slug}`}>
                <Card className="p-4 border-border/50 bg-card hover:border-primary/30 transition-all group cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`text-[10px] border ${CATEGORY_COLORS[course.category]}`}>
                      {CATEGORY_LABELS[course.category]}
                    </Badge>
                    <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{course.short_description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Layers className="w-3 h-3" />
                      {course.modules?.length} modules
                    </div>
                    <span className="text-sm font-bold text-primary">${course.price}</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/courses">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 px-8 gap-2 group">
              <BookOpen className="w-4 h-4" />
              Browse All 26 Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">or get them all for <strong className="text-accent">$1,497 bundle</strong></p>
        </motion.div>
      </div>
    </section>
  );
}