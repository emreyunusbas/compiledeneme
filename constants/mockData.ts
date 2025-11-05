import { User, UserRole, MemberListItem, Session, WeeklyChartData } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@pilatesstudio.com',
    phone: '+905551112233',
    role: 'ADMIN',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    name: 'Studio',
    surname: 'Owner',
    studioName: 'Pilates Excellence',
    gender: 'FEMALE',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-11-05T08:00:00Z',
  },
  {
    id: '2',
    email: 'trainer@pilatesstudio.com',
    phone: '+905551122233',
    role: 'TRAINER',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    name: 'Jane',
    surname: 'Smith',
    gender: 'FEMALE',
    createdAt: '2024-01-15T00:00:00Z',
    lastLoginAt: '2024-11-05T07:30:00Z',
  },
  {
    id: '3',
    email: 'member@pilatesstudio.com',
    phone: '+905551133233',
    role: 'MEMBER',
    status: 'ACTIVE',
    emailVerified: true,
    phoneVerified: true,
    name: 'John',
    surname: 'Doe',
    gender: 'MALE',
    createdAt: '2024-02-01T00:00:00Z',
    lastLoginAt: '2024-11-04T18:00:00Z',
  },
];

// Mock Member List
export const mockMemberList: MemberListItem[] = [
  {
    id: '1',
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    membershipType: 'GRUP',
    remainingCredits: 8,
    openableCredits: 12,
    endDate: '2024-12-15',
    lastPaymentAmount: 2500,
    remainingPayment: 0,
  },
  {
    id: '2',
    firstName: 'Mehmet',
    lastName: 'Demir',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    membershipType: 'BİREBİR',
    remainingCredits: 5,
    openableCredits: 10,
    endDate: '2024-11-30',
    lastPaymentAmount: 1800,
    remainingPayment: 500,
  },
  {
    id: '3',
    firstName: 'Zeynep',
    lastName: 'Kaya',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    membershipType: 'GRUP',
    remainingCredits: 15,
    openableCredits: 5,
    endDate: '2025-01-20',
    lastPaymentAmount: 3000,
    remainingPayment: 0,
  },
  {
    id: '4',
    firstName: 'Mustafa',
    lastName: 'Çelik',
    membershipType: 'BİREBİR',
    remainingCredits: 2,
    openableCredits: 8,
    endDate: '2024-11-25',
    lastPaymentAmount: 1500,
    remainingPayment: 750,
  },
  {
    id: '5',
    firstName: 'Elif',
    lastName: 'Özkan',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    membershipType: 'GRUP',
    remainingCredits: 20,
    openableCredits: 0,
    endDate: '2025-02-10',
    lastPaymentAmount: 2800,
    remainingPayment: 0,
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: '1',
    date: '2024-11-05',
    startTime: '09:00',
    endTime: '10:00',
    groupName: 'Morning Pilates',
    remainingCredits: 3,
    status: 'SCHEDULED',
    description: 'Beginner friendly morning session',
    members: [
      {
        id: '1',
        name: 'Ayşe Yılmaz',
        photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        difficultyLevel: 2,
        isCheckedIn: false,
      },
      {
        id: '2',
        name: 'Mehmet Demir',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        difficultyLevel: 3,
        isCheckedIn: false,
      },
    ],
  },
  {
    id: '2',
    date: '2024-11-05',
    startTime: '10:30',
    endTime: '11:30',
    groupName: 'Advanced Core',
    remainingCredits: 1,
    status: 'SCHEDULED',
    description: 'Advanced core strengthening exercises',
    members: [
      {
        id: '3',
        name: 'Zeynep Kaya',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        difficultyLevel: 4,
        isCheckedIn: false,
      },
    ],
  },
  {
    id: '3',
    date: '2024-11-05',
    startTime: '14:00',
    endTime: '15:00',
    groupName: 'Rehabilitation',
    remainingCredits: 4,
    status: 'SCHEDULED',
    description: 'Therapeutic Pilates for injury recovery',
    members: [
      {
        id: '4',
        name: 'Mustafa Çelik',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        difficultyLevel: 1,
        isCheckedIn: false,
      },
      {
        id: '5',
        name: 'Elif Özkan',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
        difficultyLevel: 2,
        isCheckedIn: false,
      },
    ],
  },
];

// Mock Weekly Chart Data
export const mockWeeklyChartData: WeeklyChartData[] = [
  { day: 'Pzt', count: 12 },
  { day: 'Sal', count: 15 },
  { day: 'Çar', count: 8 },
  { day: 'Per', count: 18 },
  { day: 'Cum', count: 22 },
  { day: 'Cmt', count: 25 },
  { day: 'Paz', count: 20 },
];

// Mock Financial Data
export const mockFinancialData = {
  monthlyRevenue: 3600,
  outstandingPayments: 9900,
  dailyRemainingSessions: {
    mine: { completed: 0, total: 0 },
    studio: { completed: 0, total: 0 },
  },
  recentPayments: [
    { id: '1', memberId: '1', amount: 2500, date: '2024-11-01', method: 'CASH' },
    { id: '2', memberId: '2', amount: 1800, date: '2024-11-03', method: 'CARD' },
    { id: '3', memberId: '3', amount: 3000, date: '2024-11-04', method: 'BANK_TRANSFER' },
  ],
  packages: [
    { id: '1', name: '10 Seans Grup', credits: 10, price: 2000, type: 'GRUP' },
    { id: '2', name: '5 Seans Birebir', credits: 5, price: 1500, type: 'BİREBİR' },
    { id: '3', name: '20 Seans Grup', credits: 20, price: 3500, type: 'GRUP' },
    { id: '4', name: '1 Aylık Sınırsız', credits: null, price: 5000, type: 'UNLIMITED' },
  ],
};

// Mock Onboarding Data
export const mockOnboardingSteps = [
  {
    id: 1,
    emoji: '👥',
    title: 'Hızlı Üye Kaydı',
    description: 'Yeni üyeleri saniyeler içinde kaydedin ve bilgilerini güvenle saklayın.',
  },
  {
    id: 2,
    emoji: '👨‍🏫',
    title: 'Eğitmen Takibi',
    description: 'Eğitmen performansını izleyin ve verimliliği artırın.',
  },
  {
    id: 3,
    emoji: '📊',
    title: 'Detaylı Raporlar',
    description: 'Finansal ve operasyonel verilerle anlık raporlar alın.',
  },
  {
    id: 4,
    emoji: '📅',
    title: 'Seans Programı',
    description: 'Kolayca seans oluşturun ve programı yönetin.',
  },
  {
    id: 5,
    emoji: '📏',
    title: 'Üye Ölçüm Takibi',
    description: 'Üyelerinizin gelişimini detaylı olarak takip edin.',
  },
  {
    id: 6,
    emoji: '🥗',
    title: 'Beslenme Programları',
    description: 'Kişiselleştirilmiş beslenme planları oluşturun.',
  },
  {
    id: 7,
    emoji: '💬',
    title: 'Anlık İletişim',
    description: 'Üyelerinizle hızlı ve etkili iletişim kurun.',
  },
  {
    id: 8,
    emoji: '🔔',
    title: 'Anlık Bildirimler',
    description: 'Otomatik hatırlatmalar ve bildirimler gönderin.',
  },
  {
    id: 9,
    emoji: '✅',
    title: 'Gün Sonu Bekleyen İşler',
    description: 'Günün sonunda tamamlanması gereken işleri görün.',
  },
];

// Mock Country Codes
export const mockCountryCodes = [
  { code: '+90', country: 'Türkiye', flag: '🇹🇷' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
];

// Mock Mottos for Welcome Screen
export const mockMottos = [
  'Sağlıklı Yaşam Başlar',
  'Vücudunu Kucakla',
  'Denge ve Güç',
  'Her Hareket Anlam Taşır',
  'Kendini Keşfet',
  'Pilates ile Yaşa',
  'Esneklik, Güç, Duruş',
  'Zihinden Vücuda',
  'Mükemmellik Yolculuğu',
  'Sınırları Zorla',
];

// Mock Notifications
export const mockNotifications = [
  {
    id: '1',
    type: 'REMINDER' as const,
    title: 'Yarınki Seansınız',
    message: 'Yarın saat 10:00\'daki Pilates seansınızı unutmayın.',
    time: '2 saat önce',
    read: false,
  },
  {
    id: '2',
    type: 'PAYMENT_SUCCEEDED' as const,
    title: 'Ödeme Alındı',
    message: 'Ayşe Yılmaz 2,500 TL ödeme yaptı.',
    time: '5 saat önce',
    read: true,
  },
  {
    id: '3',
    type: 'BOOKING_CONFIRMED' as const,
    title: 'Yeni Rezervasyon',
    message: 'Mehmet Demir yarınki seansa rezervasyon yaptı.',
    time: '1 gün önce',
    read: true,
  },
];

// Export all mocks
export default {
  users: mockUsers,
  members: mockMemberList,
  sessions: mockSessions,
  weeklyChart: mockWeeklyChartData,
  financial: mockFinancialData,
  onboarding: mockOnboardingSteps,
  countryCodes: mockCountryCodes,
  mottos: mockMottos,
  notifications: mockNotifications,
};