'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Branch } from '@/types';
import { mockUsers } from '@/constants/mockData';

interface AppState {
  user: User | null;
  selectedBranch: Branch | null;
  language: 'tr' | 'en';
  isLoading: boolean;
}

interface AppActions {
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateSelectedBranch: (branch: Branch | null) => Promise<void>;
  updateLanguage: (lang: 'tr' | 'en') => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

interface AppContextType extends AppState, AppActions {}

const STORAGE_KEYS = {
  USER: '@pilates4us:user',
  SELECTED_BRANCH: '@pilates4us:selected_branch',
  LANGUAGE: '@pilates4us:language',
} as const;

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    selectedBranch: null,
    language: 'tr',
    isLoading: true,
  });

  // Load persisted data on mount
  useEffect(() => {
    loadPersistedData();
  }, []);

  const loadPersistedData = async () => {
    try {
      const [userString, branchString, languageString] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.SELECTED_BRANCH),
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
      ]);

      const user = userString ? JSON.parse(userString) : null;
      const selectedBranch = branchString ? JSON.parse(branchString) : null;
      const language = (languageString as 'tr' | 'en') || 'tr';

      setState(prev => ({
        ...prev,
        user,
        selectedBranch,
        language,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading persisted data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (userData: User) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update last login time
      const userWithLogin = {
        ...userData,
        lastLoginAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithLogin));

      setState(prev => ({
        ...prev,
        user: userWithLogin,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.SELECTED_BRANCH),
      ]);

      setState(prev => ({
        ...prev,
        user: null,
        selectedBranch: null,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Logout error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateSelectedBranch = async (branch: Branch | null) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SELECTED_BRANCH,
        JSON.stringify(branch)
      );

      setState(prev => ({ ...prev, selectedBranch: branch }));
    } catch (error) {
      console.error('Error updating selected branch:', error);
    }
  };

  const updateLanguage = async (lang: 'tr' | 'en') => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
      setState(prev => ({ ...prev, language: lang }));
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!state.user) return;

      const updatedUser = { ...state.user, ...userData };
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));

      setState(prev => ({ ...prev, user: updatedUser }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Mock authentication method for development
  const mockLogin = async (phone: string) => {
    // Find user by phone number in mock data
    const user = mockUsers.find(u => u.phone === phone);
    if (user) {
      await login(user);
      return user;
    }
    throw new Error('User not found');
  };

  const value: AppContextType = {
    ...state,
    login,
    logout,
    updateSelectedBranch,
    updateLanguage,
    updateUser,
    // Additional helper methods
    mockLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}