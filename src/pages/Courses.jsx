import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookOpen, Search, Lock, ArrowRight, Layers, Zap, Package, DollarSign } from 'lucide-react';
import { COURSES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/courseData';
import CourseCard from '@/components/courses/CourseCard';

const ALL_CATS = [{ key: 'all', label: 'All Topics' }, ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label }))];

const BUNDLE = {
  name: 'Full Course Library Bundle',
  count: 26,
  price: 1497,
  original: 7800,
  includes: ['All 26 courses — immediate access', 'Lifetime updates on every course', 'Priority access to new releases', 'Course completion certificates', 'Private cohort community'],
};

export default function Courses() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return COURSES.filter(c => {
      const catMatch = category === 'all' || c.category === category;
      const searchMatch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.short_description.toLowerCase().includes(search.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [category, search]);

  const totalValue = COURSES.reduce((a, c) => a + c.price, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-5 bg-accent/15 text-accent border-accent/25 font-medium">
              <BookOpen className="w-3 h-3 mr-1.5" />
              Advanced Research Library
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
              26 Deep-Dive<br />
              <span className="text-primary">Engineering Courses</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg mb-8">
              Advanced research courses covering electromagnetic theory, energy systems, signal processing, and physics frameworks. Written for engineers who prototype.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {[
                { icon: BookOpen, value: '26', label: 'Courses' },
                { icon: Layers, value: '165+', label: 'Total Modules' },
                { icon: DollarSign, value: `$${totalValue.toLocaleString()}`, label: 'Total Value' },
                { icon: Package, value: '$1,497', label: 'Bundle Price' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="font-bold text-lg">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bundle banner */}
      <div className="border-b border-accent/20 bg-gradient-to-r from-accent/8 via-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-bold text-sm">Full Library Bundle — ${BUNDLE.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">All 26 courses · Saves ${(BUNDLE.original - BUNDLE.price).toLocaleString()} · Lifetime access</p>
              </div>
            </div>
            <Link to="/pricing">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-1.5 flex-shrink-0">
                Get the Bundle <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {ALL_CATS.map(cat => (
                <Button
                  key={cat.key}
                  size="sm"
                  variant={category === cat.key ? 'default' : 'outline'}
                  onClick={() => setCategory(cat.key)}
                  className={`h-7 text-xs ${category === cat.key ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground hover:text-foreground bg-transparent'}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 bg-secondary border-border h-8 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">{filtered.length} course{filtered.length !== 1 ? 's' : ''}</p>
          <Badge variant="outline" className="border-border/50 text-muted-foreground text-xs">
            <Lock className="w-3 h-3 mr-1" />
            Full content requires membership or purchase
          </Badge>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No courses found. Try a different filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course, i) => (
              <CourseCard key={course.slug} course={course} index={i} />
            ))}
          </div>
        )}

        {/* Bundle bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/8 to-transparent"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-accent/15 text-accent border-accent/25 font-medium">Best Value</Badge>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">{BUNDLE.name}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Buy all 26 courses at once and save ${(BUNDLE.original - BUNDLE.price).toLocaleString()} compared to purchasing individually.
              </p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-accent">${BUNDLE.price.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground line-through">${BUNDLE.original.toLocaleString()}</span>
                <Badge className="bg-chart-3/15 text-chart-3 border-chart-3/25 text-xs">Save 81%</Badge>
              </div>
              <Link to="/pricing">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-purple font-bold h-12 px-8 gap-2 group">
                  <Package className="w-4 h-4" />
                  Get Full Library Bundle
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="space-y-2.5">
              {BUNDLE.includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-foreground/85">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}