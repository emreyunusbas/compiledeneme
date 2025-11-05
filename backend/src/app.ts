import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { compress } from 'hono/compress';
import { logger } from 'hono/logger';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './trpc/app-router';
import { createContext } from './trpc/context';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

// Create main app
const app = new Hono();

// Add middleware
app.use('*', logger());
app.use('*', compress());
app.use('*', cors({
  origin: ['http://localhost:8081', 'http://localhost:19006', 'exp://*', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Pilates Studio Management API',
    version: '1.0.0',
    docs: '/swagger',
    health: '/health',
    trpc: '/api/trpc',
  });
});

// Swagger documentation
const openApi = new OpenAPIHono();
openApi.getSwagger('/swagger', (c) => {
  return c.json({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Pilates Studio Management API',
      description: 'Complete API for Pilates Studio Management System',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
    ],
    paths: {
      '/health': {
        get: {
          summary: 'Health Check',
          description: 'Check if the API is running',
          responses: {
            200: {
              description: 'API is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      timestamp: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
});

app.route('/swagger', openApi);
app.get('/docs', swaggerUI({ url: '/swagger/swagger' }));

// tRPC server setup
app.use('/api/trpc/*', trpcServer({
  router: appRouter,
  createContext,
  onError: ({ error, type, path, input, ctx, req }) => {
    console.error(`tRPC Error on ${path}:`, error);
    return {
      error: {
        message: error.message,
        code: 'INTERNAL_SERVER_ERROR',
      },
    };
  },
}));

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Endpoint not found',
    message: `The requested endpoint '${c.req.path}' does not exist`,
    availableEndpoints: [
      '/',
      '/health',
      '/swagger',
      '/docs',
      '/api/trpc/*',
    ],
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
  }, 500);
});

export default app;