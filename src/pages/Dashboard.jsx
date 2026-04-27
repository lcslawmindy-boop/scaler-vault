import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import {
  ShoppingCart, ArrowRight, Zap, Clock,
  TrendingUp, Lock, ChevronRight, BarChart3, BookOpen, Layers
} from 'lucide-react';
import { COURSES } from '@/lib/courseData';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <Card className="p-5 border-border/50 bg-card">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </div>
    </Card>
  );
}

function EmptyState({ icon: Icon, message, cta, link }) {
  return (
    <div className="text-center py-14 flex flex-col items-center">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground mb-5">{message}</p>
      <Link to={link}>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
          {cta} <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
      }
      setLoading(false);
    });
  }, []);

  const { data: purchases = [] } = useQuery({
    queryKey: ['purchases', user?.email],
    queryFn: () => base44.entities.Purchase.filter({ user_email: user.email }),
    enabled: !!user?.email,
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['enrollments', user?.email],
    queryFn: () => base44.entities.CourseEnrollment.filter({ user_email: user.email }),
    enabled: !!user?.email,
  });

  const enrolledCourseIds = enrollments.map(e => e.course_id);
  const enrolledCourses = COURSES.filter(c => enrolledCourseIds.includes(c.slug));
  const totalSpend = purchases.reduce((acc, p) => acc + (p.amount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-cyan">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Sign in to access your dashboard</h2>
          <p className="text-muted-foreground max-w-md">Track your enrolled courses and purchase history.</p>
        </div>
        <Button
          onClick={() => base44.auth.redirectToLogin()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-bold h-12 px-8 gap-2"
        >
          <Zap className="w-4 h-4" />
          Sign In to Dashboard
        </Button>
        <Link to="/pricing">
          <Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground">
            View Membership Plans
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative border-b border-border/50 bg-card/30">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                Welcome back{user.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
              </h1>
              <p className="text-muted-foreground text-sm">Your course library and membership.</p>
            </div>
            <Link to="/courses">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                Browse Courses
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={BookOpen} label="Courses Enrolled" value={enrolledCourses.length} color="text-accent" />
          <StatCard icon={ShoppingCart} label="Total Purchases" value={purchases.length} color="text-chart-3" />
          <StatCard icon={BarChart3} label="Total Invested" value={`$${totalSpend.toLocaleString()}`} color="text-chart-4" />
        </div>

        <Tabs defaultValue="courses">
          <TabsList className="bg-secondary border border-border/40 mb-6 p-1">
            <TabsTrigger value="courses">
              My Courses {enrolledCourses.length > 0 && <Badge className="ml-1.5 bg-accent/20 text-accent text-[10px] h-4 px-1.5">{enrolledCourses.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-3">
            {enrolledCourses.length === 0 ? (
              <EmptyState icon={BookOpen} message="No enrolled courses yet. Browse the library to get started." cta="Browse Courses" link="/courses" />
            ) : enrolledCourses.map(c => (
              <Card key={c.slug} className="p-4 border-border/50 bg-card hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{c.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Layers className="w-3 h-3" />{c.modules?.length} modules
                      </span>
                      {enrollments.find(e => e.course_id === c.slug)?.completed && (
                        <Badge className="bg-chart-3/15 text-chart-3 border-chart-3/25 text-[10px]">Completed</Badge>
                      )}
                    </div>
                  </div>
                  <Link to={`/courses/${c.slug}`}>
                    <Button size="sm" variant="ghost" className="gap-1 text-primary group-hover:bg-primary/10">
                      Continue <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="purchases" className="space-y-3">
            {purchases.length === 0 ? (
              <EmptyState icon={ShoppingCart} message="No purchases yet. Your order history will appear here." cta="View Plans" link="/pricing" />
            ) : purchases.map((p, i) => (
              <Card key={i} className="p-4 border-border/50 bg-card">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-chart-3/10 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-chart-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{p.purchase_type?.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(p.created_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">${p.amount?.toLocaleString()}</span>
                    <Badge variant="outline" className="text-xs capitalize border-border/50">{p.status}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}