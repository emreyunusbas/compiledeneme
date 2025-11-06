import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockClasses, Class } from '@/constants/mockData';

/**
 * Class filter options
 */
export interface ClassFilters {
  date?: string;
  trainerId?: string;
  type?: 'GRUP' | 'ÖZEL' | 'REFORMER';
  status?: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
}

/**
 * Class Context State
 */
interface ClassContextState {
  classes: Class[];
  selectedClass: Class | null;
  filters: ClassFilters;
  isLoading: boolean;
  fetchClasses: (filters?: ClassFilters) => Promise<void>;
  getClassById: (id: string) => Class | undefined;
  selectClass: (classItem: Class | null) => void;
  setFilters: (filters: ClassFilters) => void;
  createClass: (classData: Omit<Class, 'id'>) => Promise<Class>;
  updateClass: (id: string, updates: Partial<Class>) => Promise<void>;
  cancelClass: (id: string, reason?: string) => Promise<void>;
  getClassesByDate: (date: string) => Class[];
  getClassesByTrainer: (trainerId: string) => Class[];
  getTodayClasses: () => Class[];
  getUpcomingClasses: () => Class[];
}

/**
 * Create Class Context
 */
const ClassContext = createContext<ClassContextState | undefined>(undefined);

/**
 * Class Context Provider Props
 */
interface ClassProviderProps {
  children: ReactNode;
}

/**
 * Class Context Provider
 */
export function ClassProvider({ children }: ClassProviderProps) {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [filters, setFiltersState] = useState<ClassFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch classes with optional filters
   */
  const fetchClasses = async (newFilters?: ClassFilters) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      // For now, we'll filter the mock data
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredClasses = [...mockClasses];

      const filtersToApply = newFilters || filters;

      if (filtersToApply.date) {
        filteredClasses = filteredClasses.filter(cls =>
          cls.startTime.startsWith(filtersToApply.date!)
        );
      }

      if (filtersToApply.trainerId) {
        filteredClasses = filteredClasses.filter(
          cls => cls.trainerId === filtersToApply.trainerId
        );
      }

      if (filtersToApply.type) {
        filteredClasses = filteredClasses.filter(
          cls => cls.type === filtersToApply.type
        );
      }

      if (filtersToApply.status) {
        filteredClasses = filteredClasses.filter(
          cls => cls.status === filtersToApply.status
        );
      }

      if (filtersToApply.level) {
        filteredClasses = filteredClasses.filter(
          cls => cls.level === filtersToApply.level
        );
      }

      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get class by ID
   */
  const getClassById = (id: string): Class | undefined => {
    return classes.find(cls => cls.id === id);
  };

  /**
   * Select a class
   */
  const selectClass = (classItem: Class | null) => {
    setSelectedClass(classItem);
  };

  /**
   * Set filters
   */
  const setFilters = (newFilters: ClassFilters) => {
    setFiltersState(newFilters);
    fetchClasses(newFilters);
  };

  /**
   * Create a new class
   */
  const createClass = async (classData: Omit<Class, 'id'>): Promise<Class> => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newClass: Class = {
        ...classData,
        id: `class-${Date.now()}`,
      };

      setClasses(prev => [...prev, newClass]);
      return newClass;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update a class
   */
  const updateClass = async (id: string, updates: Partial<Class>) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setClasses(prev =>
        prev.map(cls => (cls.id === id ? { ...cls, ...updates } : cls))
      );

      if (selectedClass?.id === id) {
        setSelectedClass(prev => (prev ? { ...prev, ...updates } : null));
      }
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancel a class
   */
  const cancelClass = async (id: string, reason?: string) => {
    try {
      await updateClass(id, {
        status: 'CANCELLED',
        description: reason || 'Class cancelled',
      });
    } catch (error) {
      console.error('Error cancelling class:', error);
      throw error;
    }
  };

  /**
   * Get classes by date
   */
  const getClassesByDate = (date: string): Class[] => {
    return classes.filter(cls => cls.startTime.startsWith(date));
  };

  /**
   * Get classes by trainer
   */
  const getClassesByTrainer = (trainerId: string): Class[] => {
    return classes.filter(cls => cls.trainerId === trainerId);
  };

  /**
   * Get today's classes
   */
  const getTodayClasses = (): Class[] => {
    const today = new Date().toISOString().split('T')[0];
    return getClassesByDate(today);
  };

  /**
   * Get upcoming classes
   */
  const getUpcomingClasses = (): Class[] => {
    const now = new Date();
    return classes
      .filter(cls => new Date(cls.startTime) > now && cls.status === 'SCHEDULED')
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const value: ClassContextState = {
    classes,
    selectedClass,
    filters,
    isLoading,
    fetchClasses,
    getClassById,
    selectClass,
    setFilters,
    createClass,
    updateClass,
    cancelClass,
    getClassesByDate,
    getClassesByTrainer,
    getTodayClasses,
    getUpcomingClasses,
  };

  return <ClassContext.Provider value={value}>{children}</ClassContext.Provider>;
}

/**
 * useClass Hook
 * Custom hook to use the Class Context
 */
export function useClass() {
  const context = useContext(ClassContext);

  if (context === undefined) {
    throw new Error('useClass must be used within a ClassProvider');
  }

  return context;
}

/**
 * Utility function to check if a class is full
 */
export function useIsClassFull(classItem: Class) {
  return classItem.bookingCount >= classItem.capacity;
}

/**
 * Utility function to get available spots
 */
export function useAvailableSpots(classItem: Class) {
  return Math.max(0, classItem.capacity - classItem.bookingCount);
}

/**
 * Utility function to format class time
 */
export function formatClassTime(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const startHour = start.getHours().toString().padStart(2, '0');
  const startMin = start.getMinutes().toString().padStart(2, '0');
  const endHour = end.getHours().toString().padStart(2, '0');
  const endMin = end.getMinutes().toString().padStart(2, '0');

  return `${startHour}:${startMin} - ${endHour}:${endMin}`;
}

export default ClassContext;
