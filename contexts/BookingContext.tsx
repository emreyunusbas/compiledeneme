'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingData, Subscription } from '@/types';
import { mockMemberList } from '@/constants/mockData';

interface BookingState {
  bookings: Booking[];
  subscriptions: Subscription[];
  isLoading: boolean;
}

interface BookingActions {
  createBooking: (bookingData: BookingData) => Promise<void>;
  cancelBooking: (id: string, reason: string) => Promise<void>;
  checkIn: (bookingId: string) => Promise<void>;
  markNoShow: (bookingId: string) => Promise<void>;
  loadBookings: (memberId?: string, classId?: string) => Promise<void>;
  loadSubscriptions: (memberId?: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

interface BookingContextType extends BookingState, BookingActions {}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BookingState>({
    bookings: [],
    subscriptions: [],
    isLoading: false,
  });

  // Initialize with mock data
  useEffect(() => {
    initializeMockData();
  }, []);

  const initializeMockData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Create mock subscriptions for members
      const mockSubscriptions: Subscription[] = mockMemberList.map((member, index) => ({
        id: `sub-${member.id}`,
        memberId: member.id,
        packageId: `package-${(index % 4) + 1}`,
        status: 'ACTIVE' as const,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: member.endDate,
        creditsRemaining: member.remainingCredits,
        autoRenew: false,
        purchasePrice: member.lastPaymentAmount || 2000,
        currency: 'TRY',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      }));

      setState(prev => ({
        ...prev,
        subscriptions: mockSubscriptions,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error initializing mock data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const createBooking = async (bookingData: BookingData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newBooking: Booking = {
        id: Date.now().toString(),
        classId: bookingData.classId,
        memberId: bookingData.memberId,
        subscriptionId: bookingData.subscriptionId,
        status: 'CONFIRMED',
        bookedAt: new Date().toISOString(),
        penaltyAmount: 0,
        notes: bookingData.notes,
        createdAt: new Date().toISOString(),
      };

      setState(prev => ({
        ...prev,
        bookings: [...prev.bookings, newBooking],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error creating booking:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const cancelBooking = async (id: string, reason: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setState(prev => ({
        ...prev,
        bookings: prev.bookings.map(booking =>
          booking.id === id
            ? {
                ...booking,
                status: 'CANCELLED',
                cancelledAt: new Date().toISOString(),
                cancelledBy: 'user',
                cancelReason: reason,
                updatedAt: new Date().toISOString(),
              }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error canceling booking:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const checkIn = async (bookingId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setState(prev => ({
        ...prev,
        bookings: prev.bookings.map(booking =>
          booking.id === bookingId
            ? {
                ...booking,
                status: 'ATTENDED',
                updatedAt: new Date().toISOString(),
              }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error checking in booking:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const markNoShow = async (bookingId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setState(prev => ({
        ...prev,
        bookings: prev.bookings.map(booking =>
          booking.id === bookingId
            ? {
                ...booking,
                status: 'NO_SHOW',
                updatedAt: new Date().toISOString(),
              }
            : booking
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error marking no-show:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const loadBookings = async (memberId?: string, classId?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter bookings based on parameters
      let filteredBookings = state.bookings;

      if (memberId) {
        filteredBookings = filteredBookings.filter(b => b.memberId === memberId);
      }

      if (classId) {
        filteredBookings = filteredBookings.filter(b => b.classId === classId);
      }

      setState(prev => ({
        ...prev,
        bookings: filteredBookings,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading bookings:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const loadSubscriptions = async (memberId?: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredSubscriptions = state.subscriptions;

      if (memberId) {
        filteredSubscriptions = filteredSubscriptions.filter(s => s.memberId === memberId);
      }

      setState(prev => ({
        ...prev,
        subscriptions: filteredSubscriptions,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const refreshData = async () => {
    await Promise.all([
      loadBookings(),
      loadSubscriptions(),
    ]);
  };

  const value: BookingContextType = {
    ...state,
    createBooking,
    cancelBooking,
    checkIn,
    markNoShow,
    loadBookings,
    loadSubscriptions,
    refreshData,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}