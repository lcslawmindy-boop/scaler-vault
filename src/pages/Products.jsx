import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from 'framer-motion';
import { ShoppingCart, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const categoryLabels = {
  energy_systems: 'Energy Systems',
  bio_signal_systems: 'Bio/Signal',
  communication_systems: 'Communication',
  demonstration_builds: 'Demo Builds',
};

export default function Products() {
  const { data: builds = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Build.list('-created_date', 50),
  });

  const products = builds.filter(b => b.digital_product_price);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Digital Products</h1>
            <p className="text-muted-foreground max-w-xl">
              Purchase individual build guides with complete documentation, BOMs, and step-by-step instructions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No digital products available yet.</p>
            <Link to="/vault"><Button variant="outline">Browse the Vault</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 border-border/50 bg-card hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="text-xs mb-3">
                        {categoryLabels[product.category]}
                      </Badge>
                      <h3 className="text-lg font-bold">{product.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${product.digital_product_price?.toLocaleString()}</div>
                      <span className="text-xs text-muted-foreground">one-time</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{product.short_description}</p>

                  <div className="space-y-2 mb-5">
                    {['Complete build guide', 'Full BOM with pricing', 'Step-by-step instructions', 'Supplier recommendations'].map((item, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-xs text-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                    </Button>
                    <Link to={`/build/${product.id}`}>
                      <Button variant="outline" className="border-border gap-1.5">
                        Details <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}