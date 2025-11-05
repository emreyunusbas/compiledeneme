import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { Colors } from '@/constants/colors';
import {
  ChevronRight,
  ExternalLink,
  Globe,
  Users,
  User,
  Shield,
  Building,
  FileText,
  HelpCircle,
  Target,
  Droplet,
  Settings as SettingsIcon,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { user, logout } = useApp();

  const settingsMenuItems = [
    {
      id: 'web-panel',
      title: 'Web Paneline Git',
      subtitle: 'Detaylı yönetim için web arayüzü',
      icon: ExternalLink,
      color: Colors.primary,
      route: null,
      highlight: true,
    },
    {
      id: 'language',
      title: 'Dil Değiştir',
      subtitle: 'Uygulama dilini değiştir',
      icon: Globe,
      color: Colors.secondary,
      route: '/language-select',
    },
    {
      id: 'switch-account',
      title: 'Üye Hesabıma Geç',
      subtitle: 'Farklı rolde devam et',
      icon: Users,
      color: Colors.success,
      route: '/switch-to-member',
    },
    {
      id: 'update-profile',
      title: 'Profilimi Güncelle',
      subtitle: 'Kişisel bilgilerini düzenle',
      icon: User,
      color: Colors.accent,
      route: '/update-profile',
    },
    {
      id: 'studio-permissions',
      title: 'Stüdyo Yetki Ayarları',
      subtitle: 'Eğitmen yetkilerini yönet',
      icon: Shield,
      color: Colors.warning,
      route: '/studio-permissions',
    },
    {
      id: 'update-studio',
      title: 'Stüdyo Bilgilerimi Güncelle',
      subtitle: 'İletişim ve adres bilgileri',
      icon: Building,
      color: Colors.textTertiary,
      route: '/update-studio-info',
    },
    {
      id: 'studio-rules',
      title: 'Stüdyo Kuralları',
      subtitle: 'Stüdyo kurallarını yönet',
      icon: FileText,
      color: Colors.textSecondary,
      route: '/studio-rules',
    },
    {
      id: 'support',
      title: 'Sorun mu var? Bize Sor',
      subtitle: 'Destek ve yardım talepleri',
      icon: HelpCircle,
      color: Colors.primary,
      route: '/contact-support',
    },
    {
      id: 'daily-goals',
      title: 'Günlük Hedeflerim',
      subtitle: 'Kişisel hedef takibi',
      icon: Target,
      color: Colors.success,
      route: '/daily-goals',
    },
    {
      id: 'water-reminder',
      title: 'Su Hatırlatıcım',
      subtitle: 'Su içme hatırlatmaları',
      icon: Droplet,
      color: Colors.accent,
      route: '/water-reminder',
    },
  ];

  const handleMenuPress = (item: any) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.id === 'web-panel') {
      // Handle web panel navigation
      router.push('/update-profile');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name?: string, surname?: string) => {
    if (!name && !surname) return 'S';
    return `${name?.[0] || ''}${surname?.[0] || ''}`.toUpperCase();
  };

  const getRoleText = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Stüdyo Sahibi';
      case 'TRAINER':
        return 'Eğitmen';
      case 'MEMBER':
        return 'Üye';
      default:
        return 'Kullanıcı';
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return Colors.primary;
      case 'TRAINER':
        return Colors.secondary;
      case 'MEMBER':
        return Colors.success;
      default:
        return Colors.textTertiary;
    }
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          item.highlight && styles.highlightedItem,
        ]}
        onPress={() => handleMenuPress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon size={20} color={Colors.background} />
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
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: getRoleColor(user?.role) }]}>
            <Text style={styles.avatarText}>
              {getInitials(user?.name, user?.surname)}
            </Text>
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.name} {user?.surname}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user?.role) }]}>
            <Text style={styles.roleText}>{getRoleText(user?.role)}</Text>
          </View>
        </View>
      </View>

      {/* Settings Menu */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {settingsMenuItems.map(renderMenuItem)}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <SettingsIcon size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.background,
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
  highlightedItem: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryTransparent,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.errorTransparent,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 16,
  },
});