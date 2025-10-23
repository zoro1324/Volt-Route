import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { BrandColors, BorderRadius, Shadow, Typography } from '@/constants/theme';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled,
  icon,
  style,
  ...props
}: CustomButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? BrandColors.secondary : BrandColors.primary} />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.lg,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: BrandColors.primary,
    ...Shadow.neon,
  },
  secondaryButton: {
    backgroundColor: BrandColors.deepBlue,
    ...Shadow.medium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: BrandColors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  primaryText: {
    color: BrandColors.secondary,
  },
  secondaryText: {
    color: BrandColors.white,
  },
  outlineText: {
    color: BrandColors.primary,
  },
});
