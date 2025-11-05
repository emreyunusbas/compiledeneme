import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Class } from '@/constants/mockData';

/**
 * Booking type definition
 */
export interface Booking {
  id: string;
  classId: string;
  memberId: string;
  memberName: string;
  status: 'PENDING' | 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED' | 'NO_SHOW' | 'ATTENDED';
  bookedAt: string;
  cancelledAt?: string;
  cancelReason?: string;
  notes?: string;
  waitlistPosition?: number;
}

/**
 * Booking Context State
 */
interface BookingContextState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  isLoading: boolean;
  fetchBookings: (filters?: { classId?: string; memberId?: string }) => Promise<void>;
  getBookingById: (id: string) => Booking | undefined;
  selectBooking: (booking: Booking | null) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookedAt'>) => Promise<Booking>;
  cancelBooking: (id: string, reason?: string) => Promise<void>;
  confirmBooking: (id: string) => Promise<void>;
  markAsAttended: (id: string) => Promise<void>;
  markAsNoShow: (id: string) => Promise<void>;
  getBookingsByClass: (classId: string) => Booking[];
  getBookingsByMember: (memberId: string) => Booking[];
  getUpcomingBookings: (memberId: string) => Booking[];
  getPastBookings: (memberId: string) => Booking[];
  getWaitlistedBookings: (classId: string) => Booking[];
}

/**
 * Create Booking Context
 */
const BookingContext = createContext<BookingContextState | undefined>(undefined);

/**
 * Booking Context Provider Props
 */
interface BookingProviderProps {
  children: ReactNode;
}

/**
 * Mock bookings data
 */
const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    classId: 'class-1',
    memberId: 'member-1',
    memberName: 'Ayşe Yılmaz',
    status: 'CONFIRMED',
    bookedAt: '2024-11-04T10:00:00Z',
  },
  {
    id: 'booking-2',
    classId: 'class-1',
    memberId: 'member-2',
    memberName: 'Mehmet Kaya',
    status: 'CONFIRMED',
    bookedAt: '2024-11-04T11:00:00Z',
  },
  {
    id: 'booking-3',
    classId: 'class-2',
    memberId: 'member-3',
    memberName: 'Zeynep Demir',
    status: 'CONFIRMED',
    bookedAt: '2024-11-04T12:00:00Z',
  },
  {
    id: 'booking-4',
    classId: 'class-3',
    memberId: 'member-1',
    memberName: 'Ayşe Yılmaz',
    status: 'WAITLISTED',
    bookedAt: '2024-11-04T13:00:00Z',
    waitlistPosition: 1,
  },
  {
    id: 'booking-5',
    classId: 'class-4',
    memberId: 'member-1',
    memberName: 'Ayşe Yılmaz',
    status: 'CONFIRMED',
    bookedAt: '2024-11-03T09:00:00Z',
  },
];

/**
 * Booking Context Provider
 */
export function BookingProvider({ children }: BookingProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch bookings with optional filters
   */
  const fetchBookings = async (filters?: { classId?: string; memberId?: string }) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));

      let filteredBookings = [...mockBookings];

      if (filters?.classId) {
        filteredBookings = filteredBookings.filter(
          booking => booking.classId === filters.classId
        );
      }

      if (filters?.memberId) {
        filteredBookings = filteredBookings.filter(
          booking => booking.memberId === filters.memberId
        );
      }

      setBookings(filteredBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get booking by ID
   */
  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  /**
   * Select a booking
   */
  const selectBooking = (booking: Booking | null) => {
    setSelectedBooking(booking);
  };

  /**
   * Create a new booking
   */
  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'bookedAt'>
  ): Promise<Booking> => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        bookedAt: new Date().toISOString(),
      };

      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancel a booking
   */
  const cancelBooking = async (id: string, reason?: string) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id
            ? {
                ...booking,
                status: 'CANCELLED' as const,
                cancelledAt: new Date().toISOString(),
                cancelReason: reason,
              }
            : booking
        )
      );

      if (selectedBooking?.id === id) {
        setSelectedBooking(prev =>
          prev
            ? {
                ...prev,
                status: 'CANCELLED' as const,
                cancelledAt: new Date().toISOString(),
                cancelReason: reason,
              }
            : null
        );
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Confirm a booking
   */
  const confirmBooking = async (id: string) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'CONFIRMED' as const } : booking
        )
      );

      if (selectedBooking?.id === id) {
        setSelectedBooking(prev =>
          prev ? { ...prev, status: 'CONFIRMED' as const } : null
        );
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mark booking as attended
   */
  const markAsAttended = async (id: string) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'ATTENDED' as const } : booking
        )
      );

      if (selectedBooking?.id === id) {
        setSelectedBooking(prev =>
          prev ? { ...prev, status: 'ATTENDED' as const } : null
        );
      }
    } catch (error) {
      console.error('Error marking as attended:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mark booking as no-show
   */
  const markAsNoShow = async (id: string) => {
    try {
      setIsLoading(true);

      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'NO_SHOW' as const } : booking
        )
      );

      if (selectedBooking?.id === id) {
        setSelectedBooking(prev =>
          prev ? { ...prev, status: 'NO_SHOW' as const } : null
        );
      }
    } catch (error) {
      console.error('Error marking as no-show:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get bookings by class
   */
  const getBookingsByClass = (classId: string): Booking[] => {
    return bookings.filter(booking => booking.classId === classId);
  };

  /**
   * Get bookings by member
   */
  const getBookingsByMember = (memberId: string): Booking[] => {
    return bookings.filter(booking => booking.memberId === memberId);
  };

  /**
   * Get upcoming bookings for a member
   */
  const getUpcomingBookings = (memberId: string): Booking[] => {
    return bookings
      .filter(
        booking =>
          booking.memberId === memberId &&
          (booking.status === 'CONFIRMED' || booking.status === 'PENDING')
      )
      .sort((a, b) => new Date(a.bookedAt).getTime() - new Date(b.bookedAt).getTime());
  };

  /**
   * Get past bookings for a member
   */
  const getPastBookings = (memberId: string): Booking[] => {
    return bookings
      .filter(
        booking =>
          booking.memberId === memberId &&
          (booking.status === 'ATTENDED' ||
            booking.status === 'NO_SHOW' ||
            booking.status === 'CANCELLED')
      )
      .sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime());
  };

  /**
   * Get waitlisted bookings for a class
   */
  const getWaitlistedBookings = (classId: string): Booking[] => {
    return bookings
      .filter(booking => booking.classId === classId && booking.status === 'WAITLISTED')
      .sort((a, b) => (a.waitlistPosition || 0) - (b.waitlistPosition || 0));
  };

  const value: BookingContextState = {
    bookings,
    selectedBooking,
    isLoading,
    fetchBookings,
    getBookingById,
    selectBooking,
    createBooking,
    cancelBooking,
    confirmBooking,
    markAsAttended,
    markAsNoShow,
    getBookingsByClass,
    getBookingsByMember,
    getUpcomingBookings,
    getPastBookings,
    getWaitlistedBookings,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

/**
 * useBooking Hook
 * Custom hook to use the Booking Context
 */
export function useBooking() {
  const context = useContext(BookingContext);

  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
}

/**
 * Utility function to get booking status color
 */
export function getBookingStatusColor(status: Booking['status']): string {
  const colors: Record<Booking['status'], string> = {
    PENDING: '#FFA500',
    CONFIRMED: '#00FF85',
    WAITLISTED: '#00B8D4',
    CANCELLED: '#FF4D4D',
    NO_SHOW: '#FF4D4D',
    ATTENDED: '#00FF85',
  };

  return colors[status] || '#6B6B6B';
}

/**
 * Utility function to get booking status label
 */
export function getBookingStatusLabel(status: Booking['status']): string {
  const labels: Record<Booking['status'], string> = {
    PENDING: 'Beklemede',
    CONFIRMED: 'Onaylandı',
    WAITLISTED: 'Bekleme Listesinde',
    CANCELLED: 'İptal Edildi',
    NO_SHOW: 'Katılmadı',
    ATTENDED: 'Katıldı',
  };

  return labels[status] || status;
}

export default BookingContext;
