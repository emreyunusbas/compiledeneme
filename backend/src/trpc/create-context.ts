import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z } from 'zod';

// Create tRPC instance
export const t = initTRPC.create({
  transformer: superjson,
});

// Create context type
export interface Context {
  req: Request;
}

// Create context function
export const createTRPCContext = (opts: { req: Request }): Context => {
  return {
    req: opts.req,
  };
};

// Export procedures
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;