import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BrandColors, BorderRadius, Shadow, Spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'outlined' | 'elevated';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
  const cardStyle = [
    styles.card,
    variant === 'outlined' && styles.outlined,
    variant === 'elevated' && styles.elevated,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: BrandColors.deepBlue,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: BrandColors.midBlue,
  },
  elevated: {
    ...Shadow.medium,
  },
});
