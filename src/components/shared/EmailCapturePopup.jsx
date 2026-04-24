import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function EmailCapturePopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('email_popup_dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await base44.entities.EmailCapture.create({ name, email, source: 'popup' });
    setLoading(false);
    sessionStorage.setItem('email_popup_dismissed', 'true');
    setOpen(false);
    toast.success('Check your inbox for the free build guide!');
  };

  const handleDismiss = () => {
    sessionStorage.setItem('email_popup_dismissed', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDismiss}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-accent/10 p-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan mb-4">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Get a Free Build Guide</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email and get instant access to a complete engineering build guide — free.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-secondary border-border h-11"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-secondary border-border h-11"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-semibold h-11"
          >
            {loading ? 'Sending...' : 'Get Free Guide'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}