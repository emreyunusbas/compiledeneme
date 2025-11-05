import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { mockOnboardingSteps } from '@/constants/mockData';
import {
  ChevronRight,
  X,
  Circle,
  CheckCircle,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  const totalSteps = mockOnboardingSteps.length;
  const progress = (currentStep + 1) / totalSteps;

  React.useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: progress,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: nextStep * width,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    // Navigate to main app
    router.replace('/(tabs)');
  };

  const handleDotPress = (index: number) => {
    setCurrentStep(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const pageIndex = Math.round(contentOffset.x / width);
    setCurrentStep(pageIndex);
  };

  const CircularProgress = ({ size = 80, strokeWidth = 6, progress }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress * circumference);

    return (
      <View style={styles.circularProgress}>
        <View style={[styles.progressBackground, { width: size, height: size }]}>
          <View
            style={[
              styles.progressTrack,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: Colors.border,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: Colors.primary,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                transform: [
                  {
                    rotate: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.progressCenter}>
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Atla</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={styles.closeButton}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {mockOnboardingSteps.map((step, index) => (
          <View key={step.id} style={[styles.stepContainer, { width }]}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{step.emoji}</Text>
            </View>

            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>

            {index === currentStep && (
              <View style={styles.stepProgress}>
                <CircularProgress progress={progress} />
                <Text style={styles.stepProgressText}>
                  Adım {index + 1} / {totalSteps}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {mockOnboardingSteps.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={styles.dotButton}
          >
            {index === currentStep ? (
              <CheckCircle size={12} color={Colors.primary} />
            ) : (
              <Circle size={12} color={Colors.border} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation Button */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.nextButton, currentStep === totalSteps - 1 && styles.completeButton]}
          onPress={handleNext}
        >
          <LinearGradient
            colors={
              currentStep === totalSteps - 1
                ? [Colors.success, '#22C55E']
                : [Colors.primary, Colors.primaryDark]
            }
            style={styles.buttonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === totalSteps - 1 ? 'Başla' : 'Sonraki'}
            </Text>
            <ChevronRight size={20} color={Colors.background} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '500',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  emoji: {
    fontSize: 60,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  stepProgress: {
    marginTop: 60,
    alignItems: 'center',
  },
  circularProgress: {
    marginBottom: 16,
  },
  progressBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTrack: {
    position: 'absolute',
  },
  progressFill: {
    position: 'absolute',
    transformOrigin: 'center',
  },
  progressCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  stepProgressText: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  dotButton: {
    padding: 8,
  },
  navigationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  completeButton: {
    shadowColor: Colors.success,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.background,
    marginRight: 8,
  },
});