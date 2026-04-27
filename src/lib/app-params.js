/**
 * App configuration and environment variables
 */

export const APP_CONFIG = {
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  
  TIERS: {
    FREE_PREVIEW: 'free_preview',
    STARTER: 'starter',
    PRO: 'pro',
    ELITE: 'elite',
  },

  PRICING: {
    starter: 29,
    pro: 99,
    elite: 199,
  },

  PAYWALL_TRIGGERS: {
    CLICKS_BEFORE_PAYWALL: 2,
    CONTENT_UNLOCK_ATTEMPTS: 1,
  },
};