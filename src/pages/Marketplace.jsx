import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, Search, Filter, Lock, DollarSign, 
  Zap, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

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

// Sample marketplace builds with prices
const MARKETPLACE_BUILDS = [
  {
    id: 'build_1',
    title: 'Advanced Energy Harvester',
    category: 'energy_systems',
    price: 49,
    description: 'Complete guide + BOM for high-efficiency energy harvesting system',
    image_url: 'https://images.unsplash.com/photo-1581092162562-40038d10dd6d?w=400&h=300&fit=crop',
  },
  {
    id: 'build_2',
    title: 'Bio-Signal Monitoring Kit',
    category: 'bio_signal_systems',
    price: 39,
    description: 'Real-time biometric data acquisition framework',
    image_url: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop',
  },
  {
    id: 'build_3',
    title: 'Wireless Mesh Network',
    category: 'communication_systems',
    price: 59,
    description: 'Complete mesh networking system with source code',
    image_url: 'https://images.unsplash.com/photo-1518611505868-d7b87081b8ca?w=400&h=300&fit=crop',
  },
  {
    id: 'build_4',
    title: 'Tesla Coil Demonstration',
    category: 'demonstration_builds',
    price: 34,
    description: 'Safe, educational high-voltage system build',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  },
  {
    id: 'build_5',
    title: 'Solar Inverter System',
    category: 'energy_systems',
    price: 79,
    description: 'DC to AC conversion with MPPT optimization',
    image_url: 'https://images.unsplash.com/photo-1533531173927-aeb928ce54fe?w=400&h=300&fit=crop',
  },
  {
    id: 'build_6',
    title: 'ECG Signal Processor',
    category: 'bio_signal_systems',
    price: 44,
    description: 'Clinical-grade heart monitoring with real-time analysis',
    image_url: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop',
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      if (authed) {
        setUser(await base44.auth.me());
      }
    });
    base44.analytics.track({ eventName: 'marketplace_view' });
  }, []);

  const filteredBuilds = useMemo(() => {
    return MARKETPLACE_BUILDS.filter(build => {
      const matchSearch = build.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        build.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'all' || build.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handlePurchase = async (build) => {
    if (!user) {
      base44.auth.redirectToLogin(`/marketplace`);
      return;
    }

    setLoading(true);
    try {
      const response = await base44.functions.invoke('createCheckoutSession', {
        plan_id: `build_${build.id}`,
        user_email: user.email,
        build_data: {
          build_id: build.id,
          title: build.title,
          price: build.price,
        },
      });

      const stripe = await loadStripe(STRIPE_KEY);
      const { sessionId } = response.data;

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) console.error(result.error);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-black">Build Marketplace</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Purchase individual build guides, BOMs, and complete documentation. Perfect for standalone projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex flex-col gap-4 mb-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search builds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-secondary/40 border-border/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/40 text-foreground hover:bg-secondary/60'
                }`}
              >
                All Categories
              </button>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/40 text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Builds Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredBuilds.map((build, i) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:glow-cyan flex flex-col h-full">
                {/* Image */}
                <div className="relative h-44 bg-gradient-to-br from-secondary to-muted overflow-hidden">
                  <img 
                    src={build.image_url} 
                    alt={build.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`text-xs font-medium ${categoryColors[build.category]}`}>
                      {categoryLabels[build.category]}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground">
                    {build.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-2">
                    {build.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-2xl font-bold text-foreground">${build.price}</span>
                    </div>
                    <Button
                      onClick={() => handlePurchase(build)}
                      disabled={loading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredBuilds.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">No builds found matching your criteria.</p>
          </motion.div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary/30 rounded-xl p-8 border border-border/40"
        >
          <div className="flex gap-4">
            <Zap className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h3 className="font-bold mb-2">What's Included in Each Build?</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  Complete bill of materials (BOM) with sourcing links
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  Step-by-step assembly documentation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  Full source code & firmware files
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  Lifetime access & future updates
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}