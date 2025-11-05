import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';
import { useClass } from '@/contexts/ClassContext';
import { Colors } from '@/constants/colors';
import { mockFinancialData, mockWeeklyChartData } from '@/constants/mockData';
import {
  Bell,
  Users,
  User,
  Calendar,
  CreditCard,
  Settings,
  TrendingUp,
  TrendingDown,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useApp();
  const { sessions } = useClass();
  const [refreshing] = useState(false);

  // Calculate daily remaining sessions (mock data)
  const dailySessions = {
    mine: { completed: 0, total: 0 },
    studio: { completed: 0, total: 0 },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'Tünaydın';
    return 'İyi Akşamlar';
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const mainMenuItems = [
    {
      id: 'members',
      title: 'ÜYELER',
      subtitle: 'Üye yönetimi',
      icon: Users,
      color: Colors.primary,
      route: '/members',
      size: 'large',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    },
    {
      id: 'trainers',
      title: 'EĞİTMENLER',
      subtitle: 'Eğitmen takibi',
      icon: User,
      color: Colors.secondary,
      route: '/trainers-menu',
      size: 'small',
    },
    {
      id: 'sessions',
      title: 'SEANSLAR',
      subtitle: 'Seans yönetimi',
      icon: Calendar,
      color: Colors.success,
      route: '/sessions-menu',
      size: 'small',
    },
    {
      id: 'finance',
      title: 'FİNANS',
      subtitle: 'Finans takibi',
      icon: CreditCard,
      color: Colors.warning,
      route: '/finance',
      size: 'small',
    },
    {
      id: 'settings',
      title: 'AYARLAR',
      subtitle: 'Uygulama ayarları',
      icon: Settings,
      color: Colors.textTertiary,
      route: '/settings',
      size: 'small',
    },
  ];

  const renderLargeCard = (item: any) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={styles.largeCard}
        onPress={() => router.push(item.route)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.backgroundImage }} style={styles.cardBackground} />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.cardOverlay}
        />
        <View style={styles.largeCardContent}>
          <Icon size={32} color={Colors.text} />
          <Text style={styles.largeCardTitle}>{item.title}</Text>
          <Text style={styles.largeCardSubtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSmallCard = (item: any) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        style={[styles.smallCard, { backgroundColor: item.color }]}
        onPress={() => router.push(item.route)}
        activeOpacity={0.8}
      >
        <Icon size={24} color={Colors.background} />
        <Text style={styles.smallCardTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderWeeklyChart = () => {
    const maxValue = Math.max(...mockWeeklyChartData.map(d => d.count));
    const barWidth = (width - 80) / mockWeeklyChartData.length - 10;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>haftalık seanslar</Text>
          <Text style={styles.chartWeek}>43. HAFTA</Text>
        </View>
        <View style={styles.chartContent}>
          <View style={styles.chartBars}>
            {mockWeeklyChartData.map((day, index) => {
              const height = maxValue > 0 ? (day.count / maxValue) * 120 : 0;
              return (
                <View key={day.day} style={styles.chartBarContainer}>
                  <Text style={styles.chartBarValue}>{day.count}</Text>
                  <View
                    style={[
                      styles.chartBar,
                      {
                        height,
                        backgroundColor: day.count > 0 ? Colors.primary : Colors.border,
                      },
                    ]}
                  />
                  <Text style={styles.chartBarLabel}>{day.day}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderDailySessions = () => {
    const myProgress = dailySessions.mine.total > 0
      ? dailySessions.mine.completed / dailySessions.mine.total
      : 0;
    const studioProgress = dailySessions.studio.total > 0
      ? dailySessions.studio.completed / dailySessions.studio.total
      : 0;

    return (
      <View style={styles.dailySessionsContainer}>
        <Text style={styles.sectionTitle}>günlük kalan seanslar</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Benim</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: myProgress * 100, backgroundColor: Colors.primary }]} />
            </View>
            <Text style={styles.progressText}>
              {dailySessions.mine.completed}/{dailySessions.mine.total}
            </Text>
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>Stüdyonun</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: studioProgress * 100, backgroundColor: Colors.secondary }]} />
            </View>
            <Text style={styles.progressText}>
              {dailySessions.studio.completed}/{dailySessions.studio.total}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFinanceCards = () => {
    return (
      <View style={styles.financeContainer}>
        <Text style={styles.sectionTitle}>finansal özet</Text>

        <View style={styles.financeCards}>
          <TouchableOpacity
            style={styles.financeCard}
            onPress={() => router.push('/payments-received')}
          >
            <View style={styles.financeHeader}>
              <TrendingUp size={20} color={Colors.success} />
              <Text style={styles.financePeriod}>Aylık</Text>
            </View>
            <Text style={styles.financeTitle}>Ciro</Text>
            <Text style={styles.financeValue}>₺{mockFinancialData.monthlyRevenue.toLocaleString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.financeCard}
            onPress={() => router.push('/remaining-payments')}
          >
            <View style={styles.financeHeader}>
              <TrendingDown size={20} color={Colors.primary} />
              <Text style={styles.financePeriod}>Toplam</Text>
            </View>
            <Text style={styles.financeTitle}>Kalan Ödemeler</Text>
            <Text style={[styles.financeValue, { color: Colors.primary }]}>
              ₺{mockFinancialData.outstandingPayments.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <Text style={styles.appName}>neselipilates</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={{
          refreshing,
          onRefresh: handleRefresh,
        }}
      >
        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name || 'Stüdyo Sahibi'}!
          </Text>
          <Text style={styles.welcomeText}>
            Bugün stüdyonüz için neler yapabiliriz?
          </Text>
        </View>

        {/* Main Cards Grid */}
        <View style={styles.mainGrid}>
          {/* Large Members Card */}
          {renderLargeCard(mainMenuItems[0])}

          {/* 2x2 Grid */}
          <View style={styles.smallGrid}>
            {mainMenuItems.slice(1, 3).map((item) => (
              <View key={item.id} style={styles.smallGridItem}>
                {renderSmallCard(item)}
              </View>
            ))}
          </View>

          <View style={styles.smallGrid}>
            {mainMenuItems.slice(3, 5).map((item) => (
              <View key={item.id} style={styles.smallGridItem}>
                {renderSmallCard(item)}
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Sessions Chart */}
        {renderWeeklyChart()}

        {/* Daily Sessions Progress */}
        {renderDailySessions()}

        {/* Finance Cards */}
        {renderFinanceCards()}

        {/* Bottom Padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.background,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  scrollView: {
    flex: 1,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  mainGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  largeCard: {
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  largeCardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  largeCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  largeCardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  smallGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  smallGridItem: {
    flex: 1,
  },
  smallCard: {
    height: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  smallCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.background,
  },
  chartContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  chartWeek: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  chartContent: {
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: 140,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarValue: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  chartBar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartBarLabel: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  dailySessionsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  progressContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    width: 60,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    width: 50,
    textAlign: 'right',
  },
  financeContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  financeCards: {
    flexDirection: 'row',
    gap: 12,
  },
  financeCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  financeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  financePeriod: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  financeTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  financeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
});