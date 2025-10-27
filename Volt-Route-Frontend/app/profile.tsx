import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import GradientBackground from '@/components/ui/gradient-background';
import Card from '@/components/ui/card';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Gradients, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    {
      icon: 'flash' as const,
      title: 'My Chargers',
      subtitle: 'Manage your charging stations',
      onPress: () => console.log('My Chargers'),
    },
    {
      icon: 'car-sport' as const,
      title: 'My Vehicles',
      subtitle: 'Add or edit vehicle details',
      onPress: () => console.log('My Vehicles'),
    },
    {
      icon: 'receipt' as const,
      title: 'Billing History',
      subtitle: 'View past transactions',
      onPress: () => console.log('Billing'),
    },
    {
      icon: 'settings' as const,
      title: 'Settings',
      subtitle: 'App preferences and privacy',
      onPress: () => console.log('Settings'),
    },
    {
      icon: 'help-circle' as const,
      title: 'Help & Support',
      subtitle: 'FAQs and contact us',
      onPress: () => console.log('Help'),
    },
  ];

  return (
    <GradientBackground colors={Gradients.dark}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={BrandColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Card */}
          <Card style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color={BrandColors.primary} />
              </View>
              <TouchableOpacity style={styles.editAvatar}>
                <Ionicons name="camera" size={16} color={BrandColors.white} />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>Rohit Sharma</Text>
            <Text style={styles.userEmail}>rohit.sharma@example.com</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1,250</Text>
                <Text style={styles.statLabel}>km Driven</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₹3,420</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
            </View>
          </Card>

          {/* Vehicle Info */}
          <Card style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Ionicons name="car-sport" size={24} color={BrandColors.primary} />
              <Text style={styles.vehicleTitle}>Current Vehicle</Text>
            </View>
            <Text style={styles.vehicleName}>Tata Nexon EV</Text>
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleDetail}>Battery: 40.5 kWh</Text>
              <Text style={styles.vehicleDetail}>Range: 312 km</Text>
            </View>
          </Card>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={24} color={BrandColors.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={BrandColors.gray} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <CustomButton
            title="Logout"
            onPress={() => router.replace('/(auth)/login')}
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={20} color={BrandColors.error} />}
            style={styles.logoutButton}
          />
        </ScrollView>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  userCard: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.deepBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: BrandColors.primary,
  },
  editAvatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: BrandColors.primary,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: BrandColors.midBlue,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: BrandColors.midBlue,
  },
  vehicleCard: {
    marginBottom: Spacing.lg,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  vehicleTitle: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    fontWeight: Typography.fontWeight.medium,
  },
  vehicleName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.sm,
  },
  vehicleDetails: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  vehicleDetail: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  menuSection: {
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.deepBlue,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: BrandColors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  menuSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  logoutButton: {
    marginBottom: Spacing.xl,
    borderColor: BrandColors.error,
  },
});
