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
  Plus,
  ChevronRight,
  Users,
  UserPlus,
  RefreshCw,
  CreditCard,
  Ruler,
  FileText,
  Calendar,
  MessageSquare,
  TrendingUp,
  Send,
  Bell,
  Users2,
  UserX,
  Settings,
} from 'lucide-react-native';

export default function MembersScreen() {
  const menuItems = [
    {
      id: 'members-list',
      title: 'Üye Listesi',
      subtitle: 'Tüm üyeleri görüntüle ve yönet',
      icon: Users,
      color: Colors.primary,
      route: '/members-list',
    },
    {
      id: 'add-member',
      title: 'Üye Ekle',
      subtitle: 'Yeni üye kaydı oluştur',
      icon: UserPlus,
      color: Colors.success,
      route: '/add-member',
    },
    {
      id: 'renew-package',
      title: 'Üyenin Paketini Yenile',
      subtitle: 'Mevcut üye paketini yenile',
      icon: RefreshCw,
      color: Colors.warning,
      route: '/member-renew-package',
    },
    {
      id: 'take-payment',
      title: 'Üyeden Ödeme Al',
      subtitle: 'Ödeme işlemi gerçekleştir',
      icon: CreditCard,
      color: Colors.secondary,
      route: '/member-payment',
    },
    {
      id: 'measurements',
      title: 'Üyenin Ölçümleri',
      subtitle: 'Vücut ölçümlerini takip et',
      icon: Ruler,
      color: Colors.accent,
      route: '/member-measurements',
    },
    {
      id: 'reports',
      title: 'Üyenin Raporları',
      subtitle: 'PDF ve görüntü raporları',
      icon: FileText,
      color: Colors.textTertiary,
      route: '/member-reports',
    },
    {
      id: 'session-report',
      title: 'Üye - Seans Raporu',
      subtitle: 'Seans geçmişini görüntüle',
      icon: Calendar,
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
      id: 'difficulty',
      title: 'Üyenin Zorlanma Derecesi',
      subtitle: 'Egzersiz zorluğu analizi',
      icon: TrendingUp,
      color: Colors.warning,
      route: '/member-difficulty',
    },
    {
      id: 'send-notification',
      title: 'Üyeye Bildirim Gönder',
      subtitle: 'Kişiselleştirilmiş bildirimler',
      icon: Send,
      color: Colors.secondary,
      route: '/send-notification',
    },
    {
      id: 'payment-reminder',
      title: 'Üyeye Ödemeyi Hatırlat',
      subtitle: 'Ödeme hatırlatmaları gönder',
      icon: Bell,
      color: Colors.error,
      route: '/member-payment-reminder',
    },
    {
      id: 'groups',
      title: 'Grup Yönetimi',
      subtitle: 'Grup derslerini organize et',
      icon: Users2,
      color: Colors.accent,
      route: '/groups',
    },
    {
      id: 'passive-members',
      title: 'Pasif Üyeler',
      subtitle: 'Aktif olmayan üyeleri gör',
      icon: UserX,
      color: Colors.textTertiary,
      route: '/passive-members',
    },
  ];

  const handleMenuPress = (item: any) => {
    if (item.route.includes('member-') && !item.route.includes('member-list')) {
      // For screens that require a member ID, we'll need to show a member selection
      Alert.alert(
        'Üye Seçimi',
        'Bu özellik için önce bir üye seçmeniz gerekmektedir.',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Üye Listesine Git', onPress: () => router.push('/members-list') },
        ]
      );
    } else {
      router.push(item.route);
    }
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
        <Text style={styles.headerTitle}>Üye Yönetimi</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-member')}
        >
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>25</Text>
          <Text style={styles.statLabel}>Toplam Üye</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>18</Text>
          <Text style={styles.statLabel}>Aktif Üye</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Yeni Üye</Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {menuItems.map(renderMenuItem)}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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