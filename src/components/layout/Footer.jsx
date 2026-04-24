import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-lg">
                Scalar<span className="text-primary">Vault</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Access complete build frameworks, BOMs, and execution systems. Build advanced engineering systems most people never see.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Platform</h4>
            <div className="space-y-2">
              <Link to="/vault" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Vault</Link>
              <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Categories</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">Energy Systems</span>
              <span className="block text-sm text-muted-foreground">Bio/Signal Systems</span>
              <span className="block text-sm text-muted-foreground">Communication Systems</span>
              <span className="block text-sm text-muted-foreground">Demonstration Builds</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scalar Venture Vault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}