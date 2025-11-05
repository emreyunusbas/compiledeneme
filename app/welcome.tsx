import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';
import { Colors } from '@/constants/colors';
import { mockMottos } from '@/constants/mockData';
import { ChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { user, isLoading, updateLanguage } = useApp();
  const [mottoIndex, setMottoIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Auto-rotate mottos every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setMottoIndex((prev) => (prev + 1) % mockMottos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Auto-redirect to login after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (lang: 'tr' | 'en') => {
    updateLanguage(lang);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register-select-role');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.background, Colors.backgroundLight]}
        style={styles.gradient}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>P</Text>
          </View>
          <Text style={styles.appName}>neselipilates</Text>
        </View>

        {/* Motto Section */}
        <View style={styles.mottoContainer}>
          <Animated.View style={[styles.mottoWrapper, { opacity: fadeAnim }]}>
            <Text style={styles.mottoText}>{mockMottos[mottoIndex]}</Text>
          </Animated.View>
        </View>

        {/* Language Selection */}
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              styles.turkishButton,
            ]}
            onPress={() => handleLanguageChange('tr')}
          >
            <Text style={styles.languageFlag}>🇹🇷</Text>
            <Text style={styles.languageText}>Türkçe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.languageButton,
              styles.englishButton,
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Text style={styles.languageFlag}>🇬🇧</Text>
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
            <ChevronRight size={20} color={Colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            <ChevronRight size={20} color={Colors.background} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pilates Stüdyo Yönetim Sistemi
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.background,
  },
  appName: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.text,
    letterSpacing: 2,
  },
  mottoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
  mottoWrapper: {
    paddingHorizontal: 40,
  },
  mottoText: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 36,
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  turkishButton: {
    borderColor: Colors.primary,
  },
  englishButton: {
    borderColor: Colors.secondary,
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  loginButton: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: Colors.primary,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.background,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 10,
    color: Colors.textTertiary,
  },
});