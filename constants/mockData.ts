/**
 * Mock data for Pilates Studio Management App
 * This data is used for development and testing purposes
 */

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;
  membershipType: 'GRUP' | 'ÖZEL' | 'REFORMER';
  packageName: string;
  remainingCredits: number;
  totalCredits: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'frozen';
  nextPaymentDate?: string;
  totalSpent: number;
  tags?: string[];
}

export interface Class {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  trainerId: string;
  trainerName: string;
  capacity: number;
  bookingCount: number;
  status: 'SCHEDULED' | 'CANCELLED' | 'COMPLETED';
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  type: 'GRUP' | 'ÖZEL' | 'REFORMER';
  color?: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  currency: string;
  method: 'CASH' | 'CARD' | 'BANK_TRANSFER';
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  date: string;
  description?: string;
}

export interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;
  specialties: string[];
  certifications: string[];
  bio?: string;
  hourlyRate: number;
  totalSessions: number;
  rating: number;
  isActive: boolean;
}

// Mock Members Data
export const mockMembers: Member[] = [
  {
    id: 'member-1',
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    email: 'ayse.yilmaz@example.com',
    phone: '+905551234567',
    membershipType: 'GRUP',
    packageName: '8 Seans Paketi',
    remainingCredits: 5,
    totalCredits: 8,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    status: 'active',
    nextPaymentDate: '2024-12-01',
    totalSpent: 2500,
    tags: ['Düzenli', 'Sabah Seansı'],
  },
  {
    id: 'member-2',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    email: 'mehmet.kaya@example.com',
    phone: '+905552345678',
    membershipType: 'ÖZEL',
    packageName: '12 Özel Seans',
    remainingCredits: 8,
    totalCredits: 12,
    startDate: '2024-10-15',
    endDate: '2025-01-15',
    status: 'active',
    nextPaymentDate: '2025-01-01',
    totalSpent: 5400,
    tags: ['VIP', 'Öğleden Sonra'],
  },
  {
    id: 'member-3',
    firstName: 'Zeynep',
    lastName: 'Demir',
    email: 'zeynep.demir@example.com',
    phone: '+905553456789',
    membershipType: 'REFORMER',
    packageName: 'Reformer Aylık',
    remainingCredits: 12,
    totalCredits: 16,
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    status: 'active',
    totalSpent: 1800,
    tags: ['Yeni Üye'],
  },
  {
    id: 'member-4',
    firstName: 'Can',
    lastName: 'Öztürk',
    email: 'can.ozturk@example.com',
    phone: '+905554567890',
    membershipType: 'GRUP',
    packageName: '16 Seans Paketi',
    remainingCredits: 0,
    totalCredits: 16,
    startDate: '2024-09-01',
    endDate: '2024-10-31',
    status: 'expired',
    totalSpent: 3200,
    tags: ['Paket Bitmiş'],
  },
  {
    id: 'member-5',
    firstName: 'Elif',
    lastName: 'Şahin',
    email: 'elif.sahin@example.com',
    phone: '+905555678901',
    membershipType: 'GRUP',
    packageName: '8 Seans Paketi',
    remainingCredits: 6,
    totalCredits: 8,
    startDate: '2024-11-01',
    endDate: '2024-12-15',
    status: 'frozen',
    totalSpent: 2400,
    tags: ['Dondurulmuş'],
  },
];

// Mock Classes Data
export const mockClasses: Class[] = [
  {
    id: 'class-1',
    title: 'Morning Pilates',
    description: 'Beginner friendly morning session',
    startTime: '2024-11-05T09:00:00Z',
    endTime: '2024-11-05T10:00:00Z',
    trainerId: 'trainer-1',
    trainerName: 'Jane Smith',
    capacity: 10,
    bookingCount: 8,
    status: 'SCHEDULED',
    level: 'BEGINNER',
    type: 'GRUP',
    color: '#00FF85',
  },
  {
    id: 'class-2',
    title: 'Advanced Core',
    description: 'Advanced core strengthening',
    startTime: '2024-11-05T10:30:00Z',
    endTime: '2024-11-05T11:30:00Z',
    trainerId: 'trainer-2',
    trainerName: 'Ahmet Yılmaz',
    capacity: 6,
    bookingCount: 5,
    status: 'SCHEDULED',
    level: 'ADVANCED',
    type: 'GRUP',
    color: '#8B5CF6',
  },
  {
    id: 'class-3',
    title: 'Rehabilitation',
    description: 'Physical therapy and rehabilitation',
    startTime: '2024-11-05T14:00:00Z',
    endTime: '2024-11-05T15:00:00Z',
    trainerId: 'trainer-1',
    trainerName: 'Jane Smith',
    capacity: 8,
    bookingCount: 4,
    status: 'SCHEDULED',
    level: 'ALL_LEVELS',
    type: 'REFORMER',
    color: '#00B8D4',
  },
  {
    id: 'class-4',
    title: 'Private Session - Ayşe Yılmaz',
    description: 'One-on-one personal training',
    startTime: '2024-11-05T16:00:00Z',
    endTime: '2024-11-05T17:00:00Z',
    trainerId: 'trainer-2',
    trainerName: 'Ahmet Yılmaz',
    capacity: 1,
    bookingCount: 1,
    status: 'SCHEDULED',
    level: 'INTERMEDIATE',
    type: 'ÖZEL',
    color: '#FF6B9D',
  },
  {
    id: 'class-5',
    title: 'Evening Stretch',
    description: 'Relaxing evening stretching session',
    startTime: '2024-11-05T18:00:00Z',
    endTime: '2024-11-05T19:00:00Z',
    trainerId: 'trainer-3',
    trainerName: 'Zeynep Kaya',
    capacity: 12,
    bookingCount: 10,
    status: 'SCHEDULED',
    level: 'ALL_LEVELS',
    type: 'GRUP',
    color: '#FFA500',
  },
];

// Mock Payments Data
export const mockPayments: Payment[] = [
  {
    id: 'payment-1',
    memberId: 'member-1',
    memberName: 'Ayşe Yılmaz',
    amount: 2500,
    currency: 'TRY',
    method: 'CASH',
    status: 'SUCCEEDED',
    date: '2024-11-01',
    description: '8 Seans Paketi',
  },
  {
    id: 'payment-2',
    memberId: 'member-2',
    memberName: 'Mehmet Kaya',
    amount: 5400,
    currency: 'TRY',
    method: 'CARD',
    status: 'SUCCEEDED',
    date: '2024-11-03',
    description: '12 Özel Seans',
  },
  {
    id: 'payment-3',
    memberId: 'member-3',
    memberName: 'Zeynep Demir',
    amount: 1800,
    currency: 'TRY',
    method: 'BANK_TRANSFER',
    status: 'SUCCEEDED',
    date: '2024-11-04',
    description: 'Reformer Aylık',
  },
  {
    id: 'payment-4',
    memberId: 'member-5',
    memberName: 'Elif Şahin',
    amount: 2400,
    currency: 'TRY',
    method: 'CASH',
    status: 'PENDING',
    date: '2024-11-05',
    description: '8 Seans Paketi - Taksit 1',
  },
];

// Mock Trainers Data
export const mockTrainers: Trainer[] = [
  {
    id: 'trainer-1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+905559876543',
    specialties: ['Mat Pilates', 'Rehabilitation', 'Prenatal'],
    certifications: ['STOTT Pilates', 'Physical Therapy'],
    bio: 'Certified Pilates instructor with 10+ years of experience',
    hourlyRate: 450,
    totalSessions: 1250,
    rating: 4.9,
    isActive: true,
  },
  {
    id: 'trainer-2',
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+905558765432',
    specialties: ['Reformer', 'Advanced Core', 'Sports Performance'],
    certifications: ['Polestar Pilates', 'Sports Science'],
    bio: 'Former athlete specializing in high-performance training',
    hourlyRate: 500,
    totalSessions: 980,
    rating: 4.8,
    isActive: true,
  },
  {
    id: 'trainer-3',
    firstName: 'Zeynep',
    lastName: 'Kaya',
    email: 'zeynep.kaya@example.com',
    phone: '+905557654321',
    specialties: ['Mat Pilates', 'Flexibility', 'Mindfulness'],
    certifications: ['Balanced Body', 'Yoga Alliance'],
    bio: 'Holistic approach to wellness and movement',
    hourlyRate: 400,
    totalSessions: 750,
    rating: 4.9,
    isActive: true,
  },
];

// Financial Mock Data
export const mockFinancialData = {
  monthlyRevenue: 45000,
  outstandingPayments: 8500,
  totalMembers: 45,
  activeMembers: 38,
  expiredPackages: 5,
  frozenPackages: 2,
  recentPayments: mockPayments,
  monthlyStats: [
    { month: 'Oca', revenue: 38000, members: 35 },
    { month: 'Şub', revenue: 42000, members: 38 },
    { month: 'Mar', revenue: 40000, members: 36 },
    { month: 'Nis', revenue: 45000, members: 40 },
    { month: 'May', revenue: 43000, members: 39 },
    { month: 'Haz', revenue: 46000, members: 42 },
  ],
};

// Dashboard Stats
export const mockDashboardStats = {
  todaySessions: 12,
  weekSessions: 45,
  activeTrainers: 8,
  totalMembers: 45,
  activeMembers: 38,
  monthlyRevenue: 45000,
  outstandingPayments: 8500,
  packageExpiringSoon: 7,
};

// Package Types
export const mockPackages = [
  {
    id: 'package-1',
    name: '8 Seans Paketi',
    type: 'GRUP',
    credits: 8,
    price: 2500,
    validityDays: 60,
    description: 'Grup dersleri için 8 seans',
  },
  {
    id: 'package-2',
    name: '16 Seans Paketi',
    type: 'GRUP',
    credits: 16,
    price: 4500,
    validityDays: 90,
    description: 'Grup dersleri için 16 seans',
  },
  {
    id: 'package-3',
    name: '12 Özel Seans',
    type: 'ÖZEL',
    credits: 12,
    price: 5400,
    validityDays: 90,
    description: 'Özel ders paketi',
  },
  {
    id: 'package-4',
    name: 'Reformer Aylık',
    type: 'REFORMER',
    credits: 16,
    price: 1800,
    validityDays: 30,
    description: 'Reformer dersleri aylık sınırsız',
  },
];

// Notification Templates
export const mockNotificationTemplates = [
  {
    id: 'template-1',
    title: 'Paket Bitme Uyarısı',
    message: 'Merhaba {firstName}, paketiniz {daysLeft} gün içinde sona erecek. Yenileme için lütfen bizimle iletişime geçin.',
    type: 'PACKAGE_EXPIRING',
  },
  {
    id: 'template-2',
    title: 'Ödeme Hatırlatma',
    message: 'Sayın {firstName} {lastName}, {amount} TL tutarındaki ödemeniz bekleniyor.',
    type: 'PAYMENT_REMINDER',
  },
  {
    id: 'template-3',
    title: 'Seans Onayı',
    message: '{className} için rezervasyonunuz onaylandı. Tarih: {date} Saat: {time}',
    type: 'BOOKING_CONFIRMED',
  },
  {
    id: 'template-4',
    title: 'Seans Hatırlatma',
    message: 'Yarın saat {time} için {className} seansınız bulunmaktadır.',
    type: 'SESSION_REMINDER',
  },
];

// User Roles
export const userRoles = {
  ADMIN: 'Stüdyo Sahibi',
  TRAINER: 'Eğitmen',
  MEMBER: 'Üye',
} as const;

// Session Status
export const sessionStatus = {
  SCHEDULED: 'Planlandı',
  CANCELLED: 'İptal Edildi',
  COMPLETED: 'Tamamlandı',
} as const;

// Payment Methods
export const paymentMethods = {
  CASH: 'Nakit',
  CARD: 'Kredi Kartı',
  BANK_TRANSFER: 'Havale/EFT',
} as const;

// Payment Status
export const paymentStatus = {
  PENDING: 'Bekliyor',
  SUCCEEDED: 'Başarılı',
  FAILED: 'Başarısız',
} as const;

// Member Status
export const memberStatus = {
  active: 'Aktif',
  expired: 'Süresi Dolmuş',
  frozen: 'Dondurulmuş',
} as const;

export default {
  mockMembers,
  mockClasses,
  mockPayments,
  mockTrainers,
  mockFinancialData,
  mockDashboardStats,
  mockPackages,
  mockNotificationTemplates,
  userRoles,
  sessionStatus,
  paymentMethods,
  paymentStatus,
  memberStatus,
};
