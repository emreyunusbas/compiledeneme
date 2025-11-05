'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Class, ClassFilters, Session } from '@/types';
import { mockSessions } from '@/constants/mockData';

interface ClassState {
  classes: Class[];
  sessions: Session[];
  selectedDate: Date;
  selectedBranchId: string | null;
  filters: ClassFilters;
  isLoading: boolean;
}

interface ClassActions {
  loadClasses: (date: Date, branchId?: string) => Promise<void>;
  loadSessions: (date: Date, branchId?: string) => Promise<void>;
  createClass: (classData: Partial<Class>) => Promise<void>;
  updateClass: (id: string, updates: Partial<Class>) => Promise<void>;
  cancelClass: (id: string, reason: string) => Promise<void>;
  setSelectedDate: (date: Date) => void;
  setSelectedBranchId: (branchId: string | null) => void;
  setFilters: (filters: ClassFilters) => void;
  refreshData: () => Promise<void>;
}

interface ClassContextType extends ClassState, ClassActions {}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export function ClassProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ClassState>({
    classes: [],
    sessions: [],
    selectedDate: new Date(),
    selectedBranchId: null,
    filters: {},
    isLoading: false,
  });

  useEffect(() => {
    loadSessions(state.selectedDate, state.selectedBranchId);
  }, [state.selectedDate, state.selectedBranchId]);

  const loadClasses = async (date: Date, branchId?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      // For now, simulate API delay and return empty array
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        classes: [],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading classes:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loadSessions = async (date: Date, branchId?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      // For now, use mock data filtered by date
      await new Promise(resolve => setTimeout(resolve, 300));

      const dateStr = date.toISOString().split('T')[0];
      const filteredSessions = mockSessions.filter(
        session => session.date === dateStr
      );

      setState(prev => ({
        ...prev,
        sessions: filteredSessions,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading sessions:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const createClass = async (classData: Partial<Class>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newClass: Class = {
        id: Date.now().toString(),
        branchId: classData.branchId || state.selectedBranchId || '',
        title: classData.title || '',
        description: classData.description,
        startTime: classData.startTime || '',
        endTime: classData.endTime || '',
        capacity: classData.capacity || 1,
        level: classData.level || 'ALL_LEVELS',
        trainerId: classData.trainerId,
        roomId: classData.roomId,
        price: classData.price,
        status: 'SCHEDULED',
        bookingCount: 0,
        waitlistCount: 0,
        tags: classData.tags,
        createdAt: new Date().toISOString(),
      };

      setState(prev => ({
        ...prev,
        classes: [...prev.classes, newClass],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error creating class:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const updateClass = async (id: string, updates: Partial<Class>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        classes: prev.classes.map(cls =>
          cls.id === id ? { ...cls, ...updates, updatedAt: new Date().toISOString() } : cls
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error updating class:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const cancelClass = async (id: string, reason: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        classes: prev.classes.map(cls =>
          cls.id === id
            ? {
                ...cls,
                status: 'CANCELLED',
                cancelReason: reason,
                cancelledAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : cls
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error canceling class:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const setSelectedDate = (date: Date) => {
    setState(prev => ({ ...prev, selectedDate: date }));
  };

  const setSelectedBranchId = (branchId: string | null) => {
    setState(prev => ({ ...prev, selectedBranchId: branchId }));
  };

  const setFilters = (filters: ClassFilters) => {
    setState(prev => ({ ...prev, filters }));
  };

  const refreshData = async () => {
    await Promise.all([
      loadClasses(state.selectedDate, state.selectedBranchId),
      loadSessions(state.selectedDate, state.selectedBranchId),
    ]);
  };

  const value: ClassContextType = {
    ...state,
    loadClasses,
    loadSessions,
    createClass,
    updateClass,
    cancelClass,
    setSelectedDate,
    setSelectedBranchId,
    setFilters,
    refreshData,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

export function useClass(): ClassContextType {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error('useClass must be used within a ClassProvider');
  }
  return context;
}