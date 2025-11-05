import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import {
  Calendar,
  Clock,
  Users,
  Plus,
  ChevronRight,
  BarChart3,
  MessageSquare,
  UserCheck,
  Settings,
  List,
} from 'lucide-react-native';

export default function ClassesScreen() {
  const menuItems = [
    {
      id: 'calendar',
      title: 'Seans Takvimi',
      subtitle: 'Takvim görünümünde seanslar',
      icon: Calendar,
      color: Colors.primary,
      route: '/calendar-view',
    },
    {
      id: 'session-calendar',
      title: 'Seans Takvimi Genel Görünüm',
      subtitle: 'Tüm stüdyo seansları',
      icon: Clock,
      color: Colors.secondary,
      route: '/session-calendar',
    },
    {
      id: 'weekly-calendar',
      title: 'Haftalık Seans Takvimi',
      subtitle: 'Haftalık seans planı',
      icon: Calendar,
      color: Colors.success,
      route: '/session-calendar',
    },
    {
      id: 'all-sessions',
      title: 'Tüm Seanslar',
      subtitle: 'Seans listesi ve filtreleme',
      icon: List,
      color: Colors.accent,
      route: '/all-sessions',
    },
    {
      id: 'create-session',
      title: 'Seans Oluştur',
      subtitle: 'Yeni seans ekle',
      icon: Plus,
      color: Colors.warning,
      route: '/create-session',
    },
    {
      id: 'create-trial',
      title: 'Deneme Seansı Oluştur',
      subtitle: 'Ücretsiz deneme seansı',
      icon: Users,
      color: Colors.textTertiary,
      route: '/create-session',
    },
    {
      id: 'trainer-report',
      title: 'Eğitmen - Seans Raporu',
      subtitle: 'Eğitmen performansı',
      icon: BarChart3,
      color: Colors.secondary,
      route: '/trainer-session-report',
    },
    {
      id: 'member-report',
      title: 'Üye - Seans Raporu',
      subtitle: 'Üye katılım raporları',
      icon: UserCheck,
      color: Colors.success,
      route: '/member-session-report',
    },
    {
      id: 'session-messages',
      title: 'Üye Seans Mesajları',
      subtitle: 'Seans içi iletişim',
      icon: MessageSquare,
      color: Colors.primary,
      route: '/member-session-messages',
    },
    {
      id: 'capacity-management',
      title: 'Kapasite Yönetimi',
      subtitle: 'Seans kapasitesi ayarları',
      icon: Settings,
      color: Colors.warning,
      route: '/create-session',
    },
    {
      id: 'group-management',
      title: 'Grup Yönetimi',
      subtitle: 'Grup seansları organize et',
      icon: Users,
      color: Colors.accent,
      route: '/groups',
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
        <Text style={styles.headerTitle}>Seans Yönetimi</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/create-session')}
        >
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Bugünkü Seans</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>Bu Hafta</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Eğitmen</Text>
        </View>
      </View>

      {/* Today's Sessions Preview */}
      <View style={styles.previewContainer}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewTitle}>Bugünün Seansları</Text>
          <TouchableOpacity onPress={() => router.push('/calendar-view')}>
            <Text style={styles.previewLink}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.previewContent}>
          <View style={styles.previewItem}>
            <View style={[styles.previewDot, { backgroundColor: Colors.primary }]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTime}>09:00 - 10:00</Text>
              <Text style={styles.previewName}>Morning Pilates</Text>
            </View>
            <Text style={styles.previewCount}>8/10</Text>
          </View>
          <View style={styles.previewItem}>
            <View style={[styles.previewDot, { backgroundColor: Colors.secondary }]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTime}>10:30 - 11:30</Text>
              <Text style={styles.previewName}>Advanced Core</Text>
            </View>
            <Text style={styles.previewCount}>5/6</Text>
          </View>
          <View style={styles.previewItem}>
            <View style={[styles.previewDot, { backgroundColor: Colors.success }]} />
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewTime}>14:00 - 15:00</Text>
              <Text style={styles.previewName}>Rehabilitation</Text>
            </View>
            <Text style={styles.previewCount}>4/8</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Seans İşlemleri</Text>
        {menuItems.slice(0, 5).map(renderMenuItem)}

        <Text style={styles.sectionTitle}>Raporlar ve İletişim</Text>
        {menuItems.slice(5).map(renderMenuItem)}

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
  previewContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  previewLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  previewContent: {
    gap: 12,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  previewTextContainer: {
    flex: 1,
  },
  previewTime: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  previewName: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  previewCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
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