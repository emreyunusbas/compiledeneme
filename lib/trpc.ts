import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppRouter } from '@/backend/trpc/app-router';

// Create tRPC React client
export const trpc = createTRPCReact<AppRouter>();

// Mock data for Expo Go testing
const mockData = {
  hello: { message: 'Hello from Pilates Studio Management!' },
  users: [
    {
      id: '1',
      email: 'admin@pilatesstudio.com',
      phone: '+905551112233',
      role: 'ADMIN',
      name: 'Studio',
      surname: 'Owner',
      studioName: 'Pilates Excellence',
    }
  ],
  members: [
    {
      id: '1',
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      membershipType: 'GRUP',
      remainingCredits: 8,
      endDate: '2024-12-15',
    }
  ],
  classes: [
    {
      id: '1',
      title: 'Morning Pilates',
      startTime: '2024-11-05T09:00:00Z',
      endTime: '2024-11-05T10:00:00Z',
      trainerId: 'trainer-1',
      capacity: 10,
      bookingCount: 8,
      status: 'SCHEDULED',
    }
  ]
};

// Get API URL from environment or use default
const getApiUrl = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/trpc';

  // For Expo Go testing, check if we should use mock data
  if (process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA === 'true') {
    return 'http://mock-api.local/api/trpc';
  }

  return apiUrl;
};

// Create mock links for testing
const createMockLinks = () => {
  if (process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA === 'true') {
    return [
      {
        request: ({ url, ...opts }) => {
          console.log('🔗 Mock API Request:', url, opts);
          return { url, ...opts };
        },
        response: ({ operation }) => {
          const path = operation.path.join('.');
          console.log('📱 Mock API Response for:', path);

          // Return mock data based on the operation
          if (path === 'hello.hello') {
            return mockData.hello;
          }
          if (path.includes('users.list')) {
            return mockData.users;
          }
          if (path.includes('members.list')) {
            return mockData.members;
          }
          if (path.includes('classes.list')) {
            return mockData.classes;
          }

          // Default response
          return { message: `Mock response for ${path}` };
        }
      }
    ];
  }

  return [];
};

// Retry configuration for mobile networks
const createRetryLinks = () => {
  return [
    httpBatchLink({
      url: getApiUrl(),
      timeout: 10000, // 10 second timeout for mobile
      fetch: async (url, options) => {
        // Custom fetch for better error handling on mobile
        try {
          const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(15000), // 15 second timeout
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response;
        } catch (error) {
          console.warn('📡 Network request failed:', error.message);
          throw error;
        }
      },
      headers: async () => {
        // Add authentication headers if needed
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'User-Agent': 'PilatesStudioMobile/1.0.0',
        };

        // Add auth token if available
        try {
          const token = await AsyncStorage.getItem('@pilates4us:token');
          if (token) {
            headers.authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.warn('Failed to get auth token from AsyncStorage:', error);
        }

        return headers;
      },
    })
  ];
};

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    // Add mock links first if enabled
    ...createMockLinks(),
    // Add actual API links
    ...createRetryLinks(),
  ],
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
          // Don't retry on authentication errors
          if (error.data?.code === 'UNAUTHORIZED') return false;
          // Retry up to 3 times
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: (failureCount, error) => {
          if (error.data?.code === 'UNAUTHORIZED') return false;
          return failureCount < 2;
        }
      }
    }
  }
});

// Export a helper function to use tRPC in non-React contexts
export const createTRPCClient = () => trpcClient;

// Utility functions for debugging
export const debugLog = (message: string, data?: any) => {
  if (process.env.EXPO_PUBLIC_ENABLE_DEBUG_MODE === 'true') {
    console.log(`🔍 [DEBUG] ${message}`, data || '');
  }
};

// Check if we're running in Expo Go
export const isExpoGo = () => {
  return process.env.EXPO_GO_DEBUG === 'true' ||
         process.env.NODE_ENV === 'development';
};

// Get network status
export const getNetworkStatus = () => {
  return {
    isOnline: navigator?.onLine ?? true,
    apiUrl: getApiUrl(),
    useMockData: process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA === 'true'
  };
};