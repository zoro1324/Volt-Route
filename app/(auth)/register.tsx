import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '@/components/ui/gradient-background';
import CustomInput from '@/components/ui/custom-input';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Gradients, Typography, Spacing } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  return (
    <GradientBackground colors={Gradients.auth}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Ionicons name="flash" size={80} color={BrandColors.primary} />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join the EV revolution today</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />

            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <CustomInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon="lock-closed-outline"
            />

            <CustomInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              icon="lock-closed-outline"
            />

            <CustomButton
              title="Register"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
          </View>

          {/* Login Link */}
          <View style={styles.loginSection}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    marginTop: Spacing.sm,
  },
  formSection: {
    width: '100%',
  },
  registerButton: {
    marginTop: Spacing.md,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
  },
  loginLink: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
});
