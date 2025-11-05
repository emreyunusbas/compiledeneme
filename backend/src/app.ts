import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { cors } from 'hono/cors';
import { appRouter } from './trpc/app-router';

const app = new Hono();

// CORS configuration
app.use('*', cors({
  origin: ['http://localhost:8081', 'http://localhost:19006', 'exp://*'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// tRPC server setup
app.use('/api/trpc/*', trpcServer({
  router: appRouter,
  createContext: (opts) => {
    // Create context for tRPC procedures
    return {
      // You can add context values here like database connections, auth info, etc.
      req: opts.req,
    };
  },
}));

export default app;