import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/ui/gradient-background';
import CustomInput from '@/components/ui/custom-input';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Gradients, Typography, Spacing } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setLoading(true);
    // Placeholder: integrate with auth backend
    setTimeout(() => {
      setLoading(false);
      // Navigate back to login with a note or toast (placeholder)
      router.replace('/(auth)/login');
    }, 1200);
  };

  return (
    <GradientBackground colors={Gradients.auth}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email and we will send a password reset link.
          </Text>

          <CustomInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <CustomButton title="Send Reset Link" onPress={handleReset} loading={loading} />

          <Text style={styles.notice} onPress={() => router.back()}>
            Back to Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    marginBottom: Spacing.lg,
  },
  notice: {
    marginTop: Spacing.md,
    textAlign: 'center',
    color: BrandColors.primary,
    fontWeight: Typography.fontWeight.semibold as any,
  },
});
