import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockFinancialData } from '@/constants/mockData';
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Bell,
  BarChart3,
  Gift,
  ChevronRight,
  Plus,
} from 'lucide-react-native';

export default function PaymentsScreen() {
  const menuItems = [
    {
      id: 'payments-received',
      title: 'Üyelerden Aldığım Ödemeler',
      subtitle: 'Ödeme geçmişi ve detaylar',
      icon: TrendingUp,
      color: Colors.success,
      route: '/payments-received',
    },
    {
      id: 'remaining-payments',
      title: 'Üyelerin Kalan Ödemeleri',
      subtitle: 'Bakiye ve borç takibi',
      icon: TrendingDown,
      color: Colors.primary,
      route: '/remaining-payments',
    },
    {
      id: 'take-payment',
      title: 'Üyeden Ödeme Al',
      subtitle: 'Yeni ödeme işlemi',
      icon: CreditCard,
      color: Colors.secondary,
      route: '/take-payment',
    },
    {
      id: 'payment-reminder',
      title: 'Üyeye Ödemeyi Hatırlat',
      subtitle: 'Otomatik hatırlatmalar',
      icon: Bell,
      color: Colors.warning,
      route: '/payment-reminder',
    },
    {
      id: 'trainer-report',
      title: 'Eğitmen - Seans Raporu',
      subtitle: 'Eğitmen performans metrikleri',
      icon: BarChart3,
      color: Colors.accent,
      route: '/trainer-session-report',
    },
    {
      id: 'bonus-system',
      title: 'Prim Sistemi',
      subtitle: 'Eğitmen prim hesaplama',
      icon: Gift,
      color: Colors.success,
      route: '/bonus-system',
    },
    {
      id: 'studio-packages',
      title: 'Stüdyo Paketleri',
      subtitle: 'Paket fiyatlandırması',
      icon: DollarSign,
      color: Colors.textTertiary,
      route: '/studio-packages',
    },
  ];

  const handleMenuPress = (item: any) => {
    router.push(item.route);
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={() => handleMenuPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon size={24} color={Colors.background} />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
        <ChevronRight size={20} color={Colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finans Yönetimi</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/take-payment')}
        >
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      {/* Financial Overview Cards */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>Finansal Özet</Text>
          <Text style={styles.overviewPeriod}>Bu Ay</Text>
        </View>

        <View style={styles.overviewCards}>
          <View style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <TrendingUp size={20} color={Colors.success} />
              <Text style={styles.cardTitle}>Aylık Ciro</Text>
            </View>
            <Text style={styles.cardValue}>
              ₺{mockFinancialData.monthlyRevenue.toLocaleString()}
            </Text>
            <Text style={styles.cardChange}>+12% geçen aya göre</Text>
          </View>

          <View style={styles.overviewCard}>
            <View style={styles.cardHeader}>
              <TrendingDown size={20} color={Colors.primary} />
              <Text style={styles.cardTitle}>Bekleyen Ödemeler</Text>
            </View>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              ₺{mockFinancialData.outstandingPayments.toLocaleString()}
            </Text>
            <Text style={styles.cardChange}>5 üyeden</Text>
          </View>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Son İşlemler</Text>
          <TouchableOpacity onPress={() => router.push('/payments-received')}>
            <Text style={styles.recentLink}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentList}>
          {mockFinancialData.recentPayments.slice(0, 3).map((payment) => (
            <View key={payment.id} style={styles.recentItem}>
              <View style={styles.recentIconContainer}>
                <CreditCard size={16} color={Colors.text} />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>
                  {payment.method === 'CASH' ? 'Nakit' :
                   payment.method === 'CARD' ? 'Kart' :
                   payment.method === 'BANK_TRANSFER' ? 'Havale' : 'Diğer'} Ödeme
                </Text>
                <Text style={styles.recentDate}>{payment.date}</Text>
              </View>
              <Text style={styles.recentAmount}>
                ₺{payment.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Finans İşlemleri</Text>
        {menuItems.map(renderMenuItem)}

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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    padding: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  overviewPeriod: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  overviewCards: {
    gap: 12,
  },
  overviewCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cardChange: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  recentContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  recentLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  recentList: {
    gap: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});