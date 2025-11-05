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
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import {
  Building2,
  User,
  Users,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react-native';

export default function RegisterSelectRoleScreen() {
  const handleRoleSelect = (role: 'studio' | 'trainer' | 'member') => {
    switch (role) {
      case 'studio':
        router.push('/register-studio');
        break;
      case 'trainer':
        router.push('/register-trainer');
        break;
      case 'member':
        router.push('/register-member');
        break;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const roleOptions = [
    {
      id: 'studio',
      title: 'Stüdyo Kaydı',
      subtitle: 'Üye, eğitmen ve seans yönetimi, finans takibi, raporlar',
      icon: Building2,
      color: Colors.primary,
      gradient: [Colors.primary, Colors.primaryDark],
      route: '/register-studio',
    },
    {
      id: 'trainer',
      title: 'Eğitmen Kaydı',
      subtitle: 'Öğrenci takibi, seans planlama, ölçüm kayıtları',
      icon: User,
      color: Colors.secondary,
      gradient: [Colors.secondary, '#FF6B35'],
      route: '/register-trainer',
    },
    {
      id: 'member',
      title: 'Üye Kaydı',
      subtitle: 'Sağlıklı yaşam için ilk adım! Rezervasyon ve ödeme takibi',
      icon: Users,
      color: '#6366F1',
      gradient: ['#6366F1', '#4F46E5'],
      route: '/register-member',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronRight size={24} color={Colors.text} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kayıt Ol</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Nasıl Kayıt Olmak İstiyorsunuz?</Text>
          <Text style={styles.subtitle}>
            Size en uygun kayıt tipini seçin
          </Text>
        </View>

        {/* Role Options */}
        <View style={styles.optionsContainer}>
          {roleOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.roleCard}
                onPress={() => handleRoleSelect(option.id as any)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={option.gradient}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Icon size={32} color={Colors.background} />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>{option.title}</Text>
                      <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                    </View>
                    <ChevronRight size={24} color={Colors.background} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <AlertTriangle size={24} color={Colors.warning} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Bilgilendirme</Text>
              <Text style={styles.infoText}>
                Stüdyo kaydı için işletme bilgilerinizi, eğitmen kaydı için uzmanlık alanlarınızı,
                üye kaydı için kişisel bilgilerinizi hazırlamanız önerilir.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Zaten hesabınız var mı?
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Giriş Yapın</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 24,
    gap: 20,
    paddingBottom: 24,
  },
  roleCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardGradient: {
    padding: 2,
  },
  cardContent: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.warningTransparent,
    borderWidth: 1,
    borderColor: Colors.warning,
    borderRadius: 12,
    padding: 16,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.warning,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});