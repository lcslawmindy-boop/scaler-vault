import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft, Lock, CheckCircle2, BookOpen, Clock, Layers,
  ChevronDown, ChevronUp, Play, Download, ShoppingCart, Zap, ArrowRight
} from 'lucide-react';
import { COURSES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/courseData';
import PaywallModal from '@/components/shared/PaywallModal';
import { base44 } from '@/api/base44Client';

const levelColors = {
  intermediate: 'bg-chart-3/15 text-chart-3 border-chart-3/25',
  advanced: 'bg-primary/15 text-primary border-primary/25',
  expert: 'bg-accent/15 text-accent border-accent/25',
};

function ModuleRow({ module, index, isFree }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isFree ? 'border-primary/20 bg-primary/5' : 'border-border/40 bg-card'}`}>
      <button
        onClick={() => isFree && setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${isFree ? 'cursor-pointer hover:bg-primary/8' : 'cursor-default'} transition-colors`}
      >
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold
          ${isFree ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
          {module.number}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${isFree ? '' : 'text-muted-foreground'}`}>{module.title}</p>
          {isFree && <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {module.duration_mins && (
            <span className="text-xs text-muted-foreground hidden sm:block">{module.duration_mins}m</span>
          )}
          {isFree
            ? (open ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />)
            : <Lock className="w-3.5 h-3.5 text-muted-foreground/50" />}
        </div>
      </button>
      {isFree && open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-1 border-t border-primary/15">
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">{module.description}</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Free Preview</Badge>
              <span className="text-xs text-muted-foreground">Full video + notes available to members</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const course = COURSES.find(c => c.slug === slug || c.id === slug);

  const handleLockedClick = () => {
    setPaywallOpen(true);
    base44.analytics.track({ eventName: 'course_paywall_view', properties: { course_slug: slug } });
  };

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">Course not found</p>
        <Link to="/courses"><Button variant="outline">Back to Courses</Button></Link>
      </div>
    );
  }

  const totalMins = course.modules?.reduce((a, m) => a + (m.duration_mins || 0), 0) || 0;
  const freeModule = course.modules?.find(m => m.is_free_preview);
  const lockedModules = course.modules?.filter(m => !m.is_free_preview) || [];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Course Library
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`text-xs border ${CATEGORY_COLORS[course.category] || 'bg-secondary'}`}>
                  {CATEGORY_LABELS[course.category]}
                </Badge>
                <Badge className={`text-xs border capitalize ${levelColors[course.level]}`}>
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black mb-4">{course.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{course.description || course.short_description}</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-5 mt-5">
                {[
                  { icon: Layers, value: `${course.modules?.length || course.module_count} modules` },
                  { icon: Clock, value: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m total` },
                  { icon: BookOpen, value: course.instructor },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <s.icon className="w-4 h-4" />
                    {s.value}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Outcomes */}
            {course.learning_outcomes && (
              <section>
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  What You'll Learn
                </h2>
                <Card className="p-5 bg-card/50 border-border/50">
                  <ul className="space-y-2">
                    {course.learning_outcomes.split('. ').filter(Boolean).map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{outcome.replace(/\.$/, '')}.</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            )}

            {/* Module Breakdown */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Module Breakdown
              </h2>
              <div className="space-y-2.5">
                {/* Free preview module */}
                {freeModule && <ModuleRow module={freeModule} index={0} isFree={true} />}

                {/* Locked modules */}
                {lockedModules.length > 0 && (
                  <div className="relative">
                    <div className="space-y-2.5">
                      {lockedModules.slice(0, 3).map((module, i) => (
                        <ModuleRow key={module.number} module={module} index={i + 1} isFree={false} />
                      ))}
                    </div>

                    {lockedModules.length > 3 && (
                      <div
                        onClick={handleLockedClick}
                        className="relative cursor-pointer group mt-2.5"
                      >
                        <div className="space-y-2.5 blur-sm opacity-40 pointer-events-none">
                          {lockedModules.slice(3).map((module, i) => (
                            <ModuleRow key={module.number} module={module} index={i + 4} isFree={false} />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-3 px-8 py-5 rounded-2xl bg-card/90 border border-primary/30 glow-cyan text-center">
                            <Lock className="w-6 h-6 text-primary" />
                            <div>
                              <p className="font-bold text-sm">Full modules available to members</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{lockedModules.length - 3} more modules inside</p>
                            </div>
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Unlock Course</Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card className="p-6 border-border/50 bg-card sticky top-24">
              <div className="text-center mb-5">
                <div className="text-4xl font-black text-primary mb-1">${course.price}</div>
                <div className="text-xs text-muted-foreground">one-time purchase · lifetime access</div>
              </div>

              <div className="space-y-2.5 mb-5">
                <Button
                  onClick={handleLockedClick}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 gap-2 group"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Unlock Full Course
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Link to="/pricing">
                  <Button variant="outline" className="w-full border-border/50 hover:border-primary/30 h-10 text-sm gap-2">
                    <Zap className="w-4 h-4" />
                    Or get all 26 — $1,497
                  </Button>
                </Link>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-border/30">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">This course includes</p>
                {[
                  { icon: Layers, text: `${course.modules?.length || course.module_count} in-depth modules` },
                  { icon: Clock, text: `${Math.floor(totalMins / 60)}h ${totalMins % 60}m of content` },
                  { icon: Download, text: 'Downloadable reference sheets' },
                  { icon: CheckCircle2, text: 'Lifetime access + updates' },
                  { icon: Play, text: 'Video walkthroughs (members)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-foreground/75">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related courses teaser */}
            <Card className="p-5 border-border/50 bg-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">More in Library</p>
              <div className="space-y-3">
                {COURSES.filter(c => c.category === course.category && c.slug !== course.slug).slice(0, 3).map(c => (
                  <Link key={c.slug} to={`/courses/${c.slug}`} className="flex items-start gap-2 group">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium group-hover:text-primary transition-colors leading-snug">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">${c.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/courses" className="mt-4 block">
                <Button variant="ghost" size="sm" className="w-full text-xs text-primary hover:bg-primary/10 gap-1">
                  View all 26 courses <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <PaywallModal open={paywallOpen} onOpenChange={setPaywallOpen} />
    </div>
  );
}