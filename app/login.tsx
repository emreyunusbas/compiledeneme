import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { Colors } from '@/constants/colors';
import { mockCountryCodes } from '@/constants/mockData';
import { X, ChevronLeft, ArrowRight } from 'lucide-react-native';

export default function LoginScreen() {
  const { login, isLoading } = useApp();
  const [showOTP, setShowOTP] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedCountry, setSelectedCountry] = useState(mockCountryCodes[0]);

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      Alert.alert('Hata', 'Lütfen telefon numaranızı girin.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOTP(true);
    } catch (error) {
      Alert.alert('Hata', 'OTP gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Hata', 'Lütfen 6 haneli kodu girin.');
      return;
    }

    try {
      // Simulate verification with mock user
      const fullPhone = selectedCountry.code + phone;
      await (login as any)(fullPhone); // Using mock login
      router.replace('/onboarding');
    } catch (error) {
      Alert.alert('Hata', 'Doğrulama başarısız. Lütfen tekrar deneyin.');
    }
  };

  const handleOTPChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      // This would require ref management in a real implementation
    }
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const handleBack = () => {
    if (showOTP) {
      setShowOTP(false);
      setOtp(['', '', '', '', '', '']);
    } else {
      router.back();
    }
  };

  const handleDemoLogin = async () => {
    try {
      // Demo login with mock admin user
      await (login as any)({
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
        lastLoginAt: new Date().toISOString(),
      });
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Hata', 'Demo giriş başarısız.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giriş Yap</Text>
        <View style={{ width: 24 }} />
      </View>

      {!showOTP ? (
        // Phone Number Input Screen
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Hoş Geldiniz!</Text>
            <Text style={styles.formSubtitle}>
              Telefon numaranız ile giriş yapın
            </Text>

            {/* Country Code and Phone Input */}
            <View style={styles.phoneContainer}>
              <TouchableOpacity
                style={styles.countrySelector}
                onPress={() => setShowCountryPicker(true)}
              >
                <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                <Text style={styles.countryCode}>{selectedCountry.code}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                placeholder="Telefon numarası"
                placeholderTextColor={Colors.textTertiary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={15}
                autoFocus
              />
            </View>

            <Text style={styles.infoText}>
              6 haneli doğrulama kodu göndereceğiz
            </Text>
          </View>

          {/* Send OTP Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              !phone.trim() && styles.buttonDisabled,
            ]}
            onPress={handleSendOTP}
            disabled={!phone.trim() || isLoading}
          >
            <Text style={styles.primaryButtonText}>Kod Gönder</Text>
            <ArrowRight size={20} color={Colors.background} />
          </TouchableOpacity>

          {/* Demo Login Button */}
          <TouchableOpacity
            style={[styles.button, styles.demoButton]}
            onPress={handleDemoLogin}
          >
            <Text style={styles.demoButtonText}>Demo Giriş (Admin)</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // OTP Verification Screen
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Doğrulama Kodu</Text>
            <Text style={styles.formSubtitle}>
              {selectedCountry.code} {phone} numarasına gönderilen 6 haneli kodu girin
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(value, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  secureTextEntry={false}
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity onPress={() => setShowOTP(false)}>
              <Text style={styles.changePhoneText}>Numarayı değiştir</Text>
            </TouchableOpacity>
          </View>

          {/* Verify OTP Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              otp.join('').length !== 6 && styles.buttonDisabled,
            ]}
            onPress={handleVerifyOTP}
            disabled={otp.join('').length !== 6 || isLoading}
          >
            <Text style={styles.primaryButtonText}>Doğrula</Text>
            <ArrowRight size={20} color={Colors.background} />
          </TouchableOpacity>

          {/* Resend Code */}
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Kodu tekrar gönder</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Ülke Kodu Seç</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerContent}>
              {mockCountryCodes.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.pickerItem,
                    selectedCountry.code === country.code && styles.pickerItemSelected,
                  ]}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text style={styles.pickerItemFlag}>{country.flag}</Text>
                  <Text style={styles.pickerItemCountry}>{country.country}</Text>
                  <Text style={styles.pickerItemCode}>{country.code}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 16,
    color: Colors.text,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.background,
    marginRight: 8,
  },
  demoButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  changePhoneText: {
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'center',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  pickerContent: {
    flex: 1,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  pickerItemSelected: {
    backgroundColor: Colors.primaryTransparent,
  },
  pickerItemFlag: {
    fontSize: 20,
    marginRight: 16,
  },
  pickerItemCountry: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  pickerItemCode: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
});