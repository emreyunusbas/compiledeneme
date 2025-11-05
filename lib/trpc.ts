import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/backend/trpc/app-router';

// Create tRPC React client
export const trpc = createTRPCReact<AppRouter>();

// Get API URL from environment or use default
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    // For development, use local server
    return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/trpc';
  }
  // For production, use your deployed API URL
  return process.env.EXPO_PUBLIC_API_URL || 'https://your-api-domain.com/api/trpc';
};

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: getApiUrl(),
      headers: () => {
        // Add authentication headers if needed
        const headers: Record<string, string> = {};

        // You can add auth token here if you have one
        // const token = getAuthToken();
        // if (token) {
        //   headers.authorization = `Bearer ${token}`;
        // }

        return headers;
      },
    }),
  ],
});

// Export a helper function to use tRPC in non-React contexts
export const createTRPCClient = () => trpcClient;