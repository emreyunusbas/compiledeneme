import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/contexts/AppContext';
import { ClassProvider } from '@/contexts/ClassContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { Colors } from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

function RootLayoutNav() {
  const { user, isLoading } = useApp();

  useEffect(() => {
    if (isLoading) return;

    const segments = router.getState().routes.map(route => route.name);
    const inAuthGroup = segments[0] === '(tabs)' ||
                        segments.includes('finance') ||
                        segments.includes('trainers-menu') ||
                        segments.includes('sessions-menu');

    if (!user && inAuthGroup) {
      // User not signed in and trying to access authenticated routes
      router.replace('/welcome');
    } else if (user && !inAuthGroup && segments[0] !== 'onboarding') {
      // User is signed in and trying to access auth routes
      router.replace('/(tabs)');
    }
  }, [user, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          presentation: "modal",
          headerShown: false,
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="register-select-role" options={{ headerShown: false }} />
      <Stack.Screen name="register-studio" options={{ headerShown: false }} />
      <Stack.Screen name="register-trainer" options={{ headerShown: false }} />
      <Stack.Screen name="register-member" options={{ headerShown: false }} />

      {/* Member Management Screens */}
      <Stack.Screen
        name="members-list"
        options={{
          headerShown: true,
          headerTitle: "Üyeler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="add-member"
        options={{
          headerShown: true,
          headerTitle: "Üye Ekle",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen name="member-detail" options={{ headerShown: false }} />
      <Stack.Screen
        name="member-renew-package"
        options={{
          headerShown: true,
          headerTitle: "Paket Yenileme",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-payment"
        options={{
          headerShown: true,
          headerTitle: "Ödeme Al",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-measurements"
        options={{
          headerShown: true,
          headerTitle: "Ölçümler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-reports"
        options={{
          headerShown: true,
          headerTitle: "Raporlar",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-session-report"
        options={{
          headerShown: true,
          headerTitle: "Seans Raporu",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-session-messages"
        options={{
          headerShown: true,
          headerTitle: "Mesajlar",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-difficulty"
        options={{
          headerShown: true,
          headerTitle: "Zorlanma Derecesi",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="member-payment-reminder"
        options={{
          headerShown: true,
          headerTitle: "Ödeme Hatırlatma",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      {/* Finance Screens */}
      <Stack.Screen
        name="finance"
        options={{
          headerShown: true,
          headerTitle: "Finans",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="payments-received"
        options={{
          headerShown: true,
          headerTitle: "Alınan Ödemeler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="remaining-payments"
        options={{
          headerShown: true,
          headerTitle: "Kalan Ödemeler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="take-payment"
        options={{
          headerShown: true,
          headerTitle: "Ödeme Al",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="payment-reminder"
        options={{
          headerShown: true,
          headerTitle: "Ödeme Hatırlatma",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="trainer-session-report"
        options={{
          headerShown: true,
          headerTitle: "Eğitmen Raporu",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="bonus-system"
        options={{
          headerShown: true,
          headerTitle: "Prim Sistemi",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="studio-packages"
        options={{
          headerShown: true,
          headerTitle: "Stüdyo Paketleri",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      {/* Trainer Screens */}
      <Stack.Screen
        name="trainers-menu"
        options={{
          headerShown: true,
          headerTitle: "Eğitmenler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="trainers-list"
        options={{
          headerShown: true,
          headerTitle: "Eğitmen Listesi",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="add-trainer"
        options={{
          headerShown: true,
          headerTitle: "Eğitmen Ekle",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="survey-results"
        options={{
          headerShown: true,
          headerTitle: "Anket Sonuçları",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      {/* Session Screens */}
      <Stack.Screen
        name="sessions-menu"
        options={{
          headerShown: true,
          headerTitle: "Seanslar",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="all-sessions"
        options={{
          headerShown: true,
          headerTitle: "Tüm Seanslar",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="create-session"
        options={{
          headerShown: true,
          headerTitle: "Seans Oluştur",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="session-calendar"
        options={{
          headerShown: true,
          headerTitle: "Seans Takvimi",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="calendar-view"
        options={{
          headerShown: true,
          headerTitle: "Takvim",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      {/* Other Screens */}
      <Stack.Screen
        name="groups"
        options={{
          headerShown: true,
          headerTitle: "Gruplar",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="passive-members"
        options={{
          headerShown: true,
          headerTitle: "Pasif Üyeler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="send-notification"
        options={{
          headerShown: true,
          headerTitle: "Bildirim Gönder",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="cancel-session"
        options={{
          headerShown: true,
          headerTitle: "Seans İptal",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      {/* Settings Screens */}
      <Stack.Screen
        name="language-select"
        options={{
          headerShown: true,
          headerTitle: "Dil Seçimi",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="switch-to-member"
        options={{
          headerShown: true,
          headerTitle: "Üye Hesabı",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="update-profile"
        options={{
          headerShown: true,
          headerTitle: "Profil Güncelle",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="studio-permissions"
        options={{
          headerShown: true,
          headerTitle: "Yetki Ayarları",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="update-studio-info"
        options={{
          headerShown: true,
          headerTitle: "Stüdyo Bilgileri",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="studio-rules"
        options={{
          headerShown: true,
          headerTitle: "Stüdyo Kuralları",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="add-studio-rule"
        options={{
          headerShown: true,
          headerTitle: "Kural Ekle",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="water-reminder"
        options={{
          headerShown: true,
          headerTitle: "Su Hatırlatıcı",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="daily-goals"
        options={{
          headerShown: true,
          headerTitle: "Günlük Hedefler",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="contact-support"
        options={{
          headerShown: true,
          headerTitle: "Destek",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />
      <Stack.Screen
        name="class-details"
        options={{
          headerShown: true,
          headerTitle: "Seans Detayı",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
        }}
      />

      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ClassProvider>
          <BookingProvider>
            <RootLayoutNav />
            <StatusBar style="light" backgroundColor={Colors.background} />
          </BookingProvider>
        </ClassProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}