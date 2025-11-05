import { serve } from '@hono/node-server';
import { config } from 'dotenv';
import app from './app';

// Load environment variables
config();

const port = Number(process.env.PORT) || 3000;

console.log(`🚀 Pilates Studio Backend starting on port ${port}`);
console.log(`📊 Health check: http://localhost:${port}/health`);
console.log(`🔗 tRPC API: http://localhost:${port}/api/trpc`);

serve({
  fetch: app.fetch,
  port,
});