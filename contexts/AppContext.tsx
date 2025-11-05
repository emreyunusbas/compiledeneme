import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * User type definition
 */
export interface User {
  id: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'TRAINER' | 'MEMBER';
  name: string;
  surname: string;
  studioName?: string;
  photo?: string;
  status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
}

/**
 * App Context State
 */
interface AppContextState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isOnboarding: boolean;
  language: 'tr' | 'en';
  theme: 'light' | 'dark';
  signIn: (user: User, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  setLanguage: (language: 'tr' | 'en') => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  USER: '@pilates4us:user',
  TOKEN: '@pilates4us:token',
  ONBOARDING: '@pilates4us:onboarding',
  LANGUAGE: '@pilates4us:language',
  THEME: '@pilates4us:theme',
} as const;

/**
 * Create App Context
 */
const AppContext = createContext<AppContextState | undefined>(undefined);

/**
 * App Context Provider Props
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * App Context Provider
 */
export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [language, setLanguageState] = useState<'tr' | 'en'>('tr');
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');

  /**
   * Load user data from storage on mount
   */
  useEffect(() => {
    loadUserData();
  }, []);

  /**
   * Load user data from AsyncStorage
   */
  const loadUserData = async () => {
    try {
      setIsLoading(true);

      const [
        storedUser,
        storedToken,
        storedOnboarding,
        storedLanguage,
        storedTheme,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.THEME),
      ]);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      if (storedOnboarding === null) {
        setIsOnboarding(true);
      }

      if (storedLanguage) {
        setLanguageState(storedLanguage as 'tr' | 'en');
      }

      if (storedTheme) {
        setThemeState(storedTheme as 'light' | 'dark');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in user
   */
  const signIn = async (newUser: User, newToken: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, newToken),
      ]);

      setUser(newUser);
      setToken(newToken);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  /**
   * Sign out user
   */
  const signOut = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      ]);

      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  /**
   * Update user data
   */
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  /**
   * Set language
   */
  const setLanguage = async (newLanguage: 'tr' | 'en') => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
      throw error;
    }
  };

  /**
   * Set theme
   */
  const setTheme = async (newTheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
      throw error;
    }
  };

  /**
   * Complete onboarding
   */
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, 'completed');
      setIsOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  const value: AppContextState = {
    user,
    token,
    isLoading,
    isOnboarding,
    language,
    theme,
    signIn,
    signOut,
    updateUser,
    setLanguage,
    setTheme,
    completeOnboarding,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * useApp Hook
 * Custom hook to use the App Context
 */
export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}

/**
 * Utility function to check if user has specific role
 */
export function useHasRole(role: User['role']) {
  const { user } = useApp();
  return user?.role === role;
}

/**
 * Utility function to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { user, token } = useApp();
  return user !== null && token !== null;
}

export default AppContext;
