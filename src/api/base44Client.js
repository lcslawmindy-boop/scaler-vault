import { createClient } from '@base44/sdk';

//Create a client with authentication required
export const base44 = createClient({
  requiresAuth: false,
});