import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'framer-motion';
import {
  Unlock, Bookmark, ShoppingCart, ArrowRight, Zap, Clock,
  Package, TrendingUp, Lock, Star, ChevronRight, BarChart3, BookOpen, Layers
} from 'lucide-react';
import { COURSES } from '@/lib/courseData';

const categoryLabels = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

function StatCard({ icon: StatIcon, label, value, color, sub }) {
  const Icon = StatIcon;
  return (
    <Card className="p-5 border-border/50 bg-card">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
          {sub && <div className="text-xs text-primary mt-0.5">{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

function BuildListItem({ build }) {
  return (
    <Card className="p-4 border-border/50 bg-card hover:border-primary/30 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-base font-bold text-primary">{build.title?.[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{build.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{build.short_description}</p>
        </div>
        <Badge variant="outline" className="text-xs hidden sm:inline-flex border-border/50">
          {categoryLabels[build.category]}
        </Badge>
        <Link to={`/build/${build.id}`}>
          <Button size="sm" variant="ghost" className="gap-1 text-primary group-hover:bg-primary/10">
            Open <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
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

  const { data: builds = [] } = useQuery({
    queryKey: ['all-builds'],
    queryFn: () => base44.entities.Build.list('-created_date', 50),
  });

  const { data: purchases = [] } = useQuery({
    queryKey: ['purchases', user?.email],
    queryFn: () => base44.entities.Purchase.filter({ user_email: user.email }),
    enabled: !!user?.email,
  });

  const { data: savedBuilds = [] } = useQuery({
    queryKey: ['saved-builds', user?.email],
    queryFn: () => base44.entities.SavedBuild.filter({ user_email: user.email }),
    enabled: !!user?.email,
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['enrollments', user?.email],
    queryFn: () => base44.entities.CourseEnrollment.filter({ user_email: user.email }),
    enabled: !!user?.email,
  });

  const enrolledCourseIds = enrollments.map(e => e.course_id);
  const enrolledCourses = COURSES.filter(c => enrolledCourseIds.includes(c.slug));
  const savedBuildIds = savedBuilds.map(s => s.build_id);
  const purchasedBuildIds = purchases.filter(p => p.build_id).map(p => p.build_id);
  const unlockedBuilds = builds.filter(b => purchasedBuildIds.includes(b.id));
  const savedBuildsList = builds.filter(b => savedBuildIds.includes(b.id));
  const recommendedBuilds = builds.filter(b => !purchasedBuildIds.includes(b.id)).slice(0, 5);
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
          <p className="text-muted-foreground max-w-md">
            Track your unlocked builds, saved items, and purchase history.
          </p>
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
      {/* Header */}
      <div className="relative border-b border-border/50 bg-card/30">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                Welcome back{user.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}
              </h1>
              <p className="text-muted-foreground text-sm">Your engineering library and purchase history.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/kits">
                <Button variant="outline" size="sm" className="border-border/50 gap-1.5 text-xs">
                  <Package className="w-3.5 h-3.5" />
                  Order a Kit
                </Button>
              </Link>
              <Link to="/vault">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  Browse Vault
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon={BookOpen} label="Courses Learning" value={enrolledCourses.length} color="text-accent" />
          <StatCard icon={Unlock} label="Unlocked Builds" value={unlockedBuilds.length} color="text-primary" />
          <StatCard icon={ShoppingCart} label="Total Purchases" value={purchases.length} color="text-chart-3" />
          <StatCard icon={BarChart3} label="Total Invested" value={`$${totalSpend.toLocaleString()}`} color="text-chart-4" />
        </div>

        {/* Kit upsell banner — shown when no kits purchased */}
        {purchases.filter(p => p.purchase_type === 'kit').length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 border-accent/25 bg-gradient-to-r from-accent/8 to-transparent mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Ready to build for real?</p>
                  <p className="text-xs text-muted-foreground">Get a pre-tested hardware kit shipped to your door. Pro members save 20%.</p>
                </div>
              </div>
              <Link to="/kits">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-1.5 flex-shrink-0">
                  <Package className="w-3.5 h-3.5" />
                  Shop Kits
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="courses">
          <TabsList className="bg-secondary border border-border/40 mb-6 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="courses">
              Learning {enrolledCourses.length > 0 && <Badge className="ml-1.5 bg-accent/20 text-accent text-[10px] h-4 px-1.5">{enrolledCourses.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="recommended">Next Steps</TabsTrigger>
            <TabsTrigger value="unlocked">
              Builds {unlockedBuilds.length > 0 && <Badge className="ml-1.5 bg-primary/20 text-primary text-[10px] h-4 px-1.5">{unlockedBuilds.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="purchases">History</TabsTrigger>
          </TabsList>

          <TabsContent value="unlocked" className="space-y-3">
            {unlockedBuilds.length === 0 ? (
              <EmptyState icon={Lock} message="No unlocked builds yet. Get a membership to access the full library." cta="View Plans" link="/pricing" />
            ) : unlockedBuilds.map(b => <BuildListItem key={b.id} build={b} />)}
          </TabsContent>

          <TabsContent value="courses" className="space-y-3">
            {enrolledCourses.length === 0 ? (
              <EmptyState icon={BookOpen} message="No enrolled courses yet. Browse the library and unlock a course." cta="Browse Courses" link="/courses" />
            ) : enrolledCourses.map(c => (
              <Card key={c.slug} className="p-4 border-border/50 bg-card hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{c.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Layers className="w-3 h-3" />{c.modules?.length} modules</span>
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

          <TabsContent value="saved" className="space-y-3">
            {savedBuildsList.length === 0 ? (
              <EmptyState icon={Bookmark} message="No saved builds yet. Browse the vault and save builds for later." cta="Browse Vault" link="/vault" />
            ) : savedBuildsList.map(b => <BuildListItem key={b.id} build={b} />)}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-3">
            {recommendedBuilds.length === 0 ? (
              <EmptyState icon={Star} message="You've unlocked everything. Explore kits to build your projects." cta="Shop Kits" link="/kits" />
            ) : recommendedBuilds.map(b => <BuildListItem key={b.id} build={b} />)}
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