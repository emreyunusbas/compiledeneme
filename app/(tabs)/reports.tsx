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
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Download,
  FileText,
  PieChart,
  Activity,
  Target,
  ChevronRight,
} from 'lucide-react-native';

export default function ReportsScreen() {
  const menuItems = [
    {
      id: 'member-reports',
      title: 'Üye Raporları',
      subtitle: 'Üye performans ve gelişim',
      icon: Users,
      color: Colors.primary,
      route: '/member-reports',
    },
    {
      id: 'financial-reports',
      title: 'Finansal Raporlar',
      subtitle: 'Gelir ve gider analizleri',
      icon: DollarSign,
      color: Colors.success,
      route: '/finance',
    },
    {
      id: 'attendance-reports',
      title: 'Katılım Raporları',
      subtitle: 'Seans katılım oranları',
      icon: Calendar,
      color: Colors.secondary,
      route: '/trainer-session-report',
    },
    {
      id: 'performance-reports',
      title: 'Performans Raporları',
      subtitle: 'Eğitmen ve stüdyo metrikleri',
      icon: TrendingUp,
      color: Colors.accent,
      route: '/trainer-session-report',
    },
    {
      id: 'package-usage',
      title: 'Paket Kullanım Raporları',
      subtitle: 'Paket tüketim analizi',
      icon: PieChart,
      color: Colors.warning,
      route: '/studio-packages',
    },
    {
      id: 'activity-logs',
      title: 'Aktivite Kayıtları',
      subtitle: 'Sistem aktivite takibi',
      icon: Activity,
      color: Colors.textTertiary,
      route: '/finance',
    },
    {
      id: 'goal-reports',
      title: 'Hedef Raporları',
      subtitle: 'Hedef takibi ve analiz',
      icon: Target,
      color: Colors.success,
      route: '/daily-goals',
    },
    {
      id: 'export-data',
      title: 'Veri Dışa Aktar',
      subtitle: 'Excel ve PDF dışa aktarım',
      icon: Download,
      color: Colors.primary,
      route: '/finance',
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
        <Text style={styles.headerTitle}>Raporlar ve Analizler</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>247</Text>
          <Text style={styles.statLabel}>Toplam Seans</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>Katılım Oranı</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>+15%</Text>
          <Text style={styles.statLabel}>Aylık Büyüme</Text>
        </View>
      </View>

      {/* Report Categories */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Rapor Kategorileri</Text>
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
  exportButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
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