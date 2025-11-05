import { Context } from 'hono';
import { createTRPCContext } from './create-context';

// Hono context for tRPC
export type HonoContext = {
  req: Request;
  env: Record<string, string>;
};

// Create tRPC context from Hono context
export const createContext = (c: Context): HonoContext => {
  return {
    req: c.req.raw,
    env: c.env,
  };
};

export type AppContext = ReturnType<typeof createContext>;