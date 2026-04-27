import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * Hook to check if user has access to content based on membership tier
 * Returns: { canAccess, isPaid, userTier, showPaywall }
 */
export function useContentAccess(requiredAccessLevel = 'pro') {
  const [state, setState] = useState({
    canAccess: false,
    isPaid: false,
    userTier: 'free',
    showPaywall: false,
    loading: true,
  });

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();

        if (!authed) {
          // Not logged in = free preview only
          setState({
            canAccess: requiredAccessLevel === 'free_preview',
            isPaid: false,
            userTier: 'free',
            showPaywall: requiredAccessLevel !== 'free_preview',
            loading: false,
          });
          return;
        }

        const user = await base44.auth.me();

        // Check for active subscription
        const purchases = await base44.entities.Purchase.filter({
          user_email: user.email,
          status: 'completed',
        });

        const hasPaidSubscription = purchases.some(p => 
          ['starter', 'pro', 'elite'].includes(p.purchase_type)
        );

        const userTier = hasPaidSubscription ? 'paid' : 'free';
        const tiers = { free_preview: 0, starter: 1, pro: 2, elite: 3 };
        const canAccess = tiers[userTier] >= tiers[requiredAccessLevel];

        setState({
          canAccess,
          isPaid: hasPaidSubscription,
          userTier,
          showPaywall: !canAccess,
          loading: false,
        });
      } catch (error) {
        console.error('Access check error:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    checkAccess();
  }, [requiredAccessLevel]);

  return state;
}