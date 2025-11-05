import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/contexts/AppContext';
import { Colors } from '@/constants/colors';
import { mockCountryCodes } from '@/constants/mockData';
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Check,
} from 'lucide-react-native';

interface FormData {
  studioName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export default function RegisterStudioScreen() {
  const { login, updateLanguage } = useApp();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    studioName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+90',
    gender: 'FEMALE',
  });

  const [selectedCountry, setSelectedCountry] = useState(mockCountryCodes[0]);

  const genderOptions = [
    { value: 'MALE', label: 'Erkek' },
    { value: 'FEMALE', label: 'Kadın' },
    { value: 'OTHER', label: 'Belirtmek İstemiyorum' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, countryCode: country.code }));
    setShowCountryPicker(false);
  };

  const validateForm = () => {
    if (!formData.studioName.trim()) {
      Alert.alert('Hata', 'Stüdyo adı gereklidir.');
      return false;
    }
    if (!formData.firstName.trim()) {
      Alert.alert('Hata', 'Ad gereklidir.');
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert('Hata', 'Soyad gereklidir.');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Hata', 'E-posta gereklidir.');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Hata', 'Telefon numarası gereklidir.');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setShowWarningModal(true);
  };

  const handleConfirmRegister = async () => {
    setShowWarningModal(false);
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create user object and login
      const user = {
        id: Date.now().toString(),
        email: formData.email,
        phone: formData.countryCode + formData.phone,
        role: 'ADMIN' as const,
        status: 'ACTIVE' as const,
        emailVerified: false,
        phoneVerified: false,
        name: formData.firstName,
        surname: formData.lastName,
        studioName: formData.studioName,
        gender: formData.gender.toLowerCase() as any,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      await login(user);
      router.replace('/onboarding');
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Stüdyo Kaydı</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Stüdyo Bilgileri</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stüdyo Adı *</Text>
            <TextInput
              style={styles.input}
              value={formData.studioName}
              onChangeText={(value) => handleInputChange('studioName', value)}
              placeholder="Stüdyonuzun adını girin"
              placeholderTextColor={Colors.textTertiary}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Ad *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Adınız"
                placeholderTextColor={Colors.textTertiary}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Soyad *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Soyadınız"
                placeholderTextColor={Colors.textTertiary}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="ornek@email.com"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefon Numarası *</Text>
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
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Telefon numarası"
                placeholderTextColor={Colors.textTertiary}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cinsiyet *</Text>
            <View style={styles.genderContainer}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderOption,
                    formData.gender === option.value && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleInputChange('gender', option.value as any)}
                >
                  <View style={[
                    styles.radioButton,
                    formData.gender === option.value && styles.radioButtonSelected,
                  ]}>
                    {formData.gender === option.value && (
                      <Check size={16} color={Colors.background} />
                    )}
                  </View>
                  <Text style={[
                    styles.genderLabel,
                    formData.gender === option.value && styles.genderLabelSelected,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Kaydediliyor...' : 'Kaydı Tamamla'}
              </Text>
              <ChevronRight size={20} color={Colors.background} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Warning Modal */}
      <Modal
        visible={showWarningModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWarningModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AlertTriangle size={32} color={Colors.warning} />
            </View>
            <Text style={styles.modalTitle}>Stüdyo Kaydı Onayı</Text>
            <Text style={styles.modalText}>
              Bu sayfa stüdyo sahipleri içindir. Eğer bireysel eğitmen veya stüdyo üyesi olmak istiyorsanız,
              lütfen geri dönüp doğru seçeneği seçin.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowWarningModal(false)}
              >
                <Text style={styles.cancelButtonText}>Geri Dön</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmRegister}
              >
                <Text style={styles.confirmButtonText}>Kaydı Tamamla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
                <ChevronLeft size={24} color={Colors.text} />
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
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  genderOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryTransparent,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  genderLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  genderLabelSelected: {
    color: Colors.text,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.background,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
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