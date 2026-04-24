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
  Unlock, Bookmark, ShoppingCart, ArrowRight, Zap, Clock
} from 'lucide-react';

const categoryLabels = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

function BuildListItem({ build }) {
  return (
    <Card className="p-4 border-border/50 bg-card hover:border-primary/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-mono font-bold text-primary">{build.title?.[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{build.title}</h4>
          <p className="text-xs text-muted-foreground truncate">{build.short_description}</p>
        </div>
        <Badge variant="outline" className="text-xs hidden sm:inline-flex">
          {categoryLabels[build.category]}
        </Badge>
        <Link to={`/build/${build.id}`}>
          <Button size="sm" variant="ghost" className="gap-1 text-primary">
            View <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </div>
    </Card>
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

  const savedBuildIds = savedBuilds.map(s => s.build_id);
  const purchasedBuildIds = purchases.filter(p => p.build_id).map(p => p.build_id);

  const unlockedBuilds = builds.filter(b => purchasedBuildIds.includes(b.id));
  const savedBuildsList = builds.filter(b => savedBuildIds.includes(b.id));
  const recommendedBuilds = builds.filter(b => !purchasedBuildIds.includes(b.id)).slice(0, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-cyan">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center">Sign in to access your dashboard</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Track your unlocked builds, saved items, and purchase history.
        </p>
        <Button
          onClick={() => base44.auth.redirectToLogin()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-semibold"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold mb-1">Welcome back{user.full_name ? `, ${user.full_name}` : ''}</h1>
            <p className="text-muted-foreground text-sm">Manage your builds and track your progress.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Unlock, label: 'Unlocked Builds', value: unlockedBuilds.length, color: 'text-primary' },
            { icon: Bookmark, label: 'Saved Builds', value: savedBuildsList.length, color: 'text-accent' },
            { icon: ShoppingCart, label: 'Purchases', value: purchases.length, color: 'text-chart-3' },
          ].map((stat, i) => (
            <Card key={i} className="p-5 border-border/50 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="unlocked">
          <TabsList className="bg-secondary border border-border/50">
            <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
          </TabsList>

          <TabsContent value="unlocked" className="mt-6 space-y-3">
            {unlockedBuilds.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No unlocked builds yet.</p>
                <Link to="/pricing"><Button className="bg-primary text-primary-foreground">Get Access</Button></Link>
              </div>
            ) : (
              unlockedBuilds.map(b => <BuildListItem key={b.id} build={b} />)
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6 space-y-3">
            {savedBuildsList.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No saved builds yet.</p>
                <Link to="/vault"><Button variant="outline">Browse Vault</Button></Link>
              </div>
            ) : (
              savedBuildsList.map(b => <BuildListItem key={b.id} build={b} />)
            )}
          </TabsContent>

          <TabsContent value="recommended" className="mt-6 space-y-3">
            {recommendedBuilds.map(b => <BuildListItem key={b.id} build={b} />)}
          </TabsContent>

          <TabsContent value="purchases" className="mt-6 space-y-3">
            {purchases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No purchases yet.</p>
              </div>
            ) : (
              purchases.map((p, i) => (
                <Card key={i} className="p-4 border-border/50 bg-card">
                  <div className="flex items-center justify-between">
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
                    <div className="text-right">
                      <span className="font-bold">${p.amount}</span>
                      <Badge variant="outline" className="ml-2 text-xs capitalize">{p.status}</Badge>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}