import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, BorderRadius, Shadow, Typography, Spacing } from '@/constants/theme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export default function CustomInput({
  label,
  error,
  icon,
  isPassword = false,
  style,
  ...props
}: CustomInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <Ionicons name={icon} size={20} color={BrandColors.gray} style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={BrandColors.gray}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={BrandColors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.white,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.deepBlue,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: BrandColors.midBlue,
    ...Shadow.medium,
  },
  inputError: {
    borderColor: BrandColors.error,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: Typography.fontSize.base,
    color: BrandColors.white,
  },
  icon: {
    marginLeft: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
