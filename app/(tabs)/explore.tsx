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
import { BrandColors, Gradients, Spacing, Typography, BorderRadius } from '@/constants/theme';

const features = [
  {
    icon: 'map' as const,
    title: 'Route Planner',
    description: 'Find optimal routes based on battery and charging stations',
    route: '/route-planner',
    color: BrandColors.primary,
  },
  {
    icon: 'flash' as const,
    title: 'Charging Stations',
    description: 'Discover nearby EV charging points',
    route: '/charging-stations',
    color: BrandColors.success,
  },
  {
    icon: 'add-circle' as const,
    title: 'Register Charger',
    description: 'Share your charging station with community',
    route: '/register-charger',
    color: BrandColors.info,
  },
  {
    icon: 'navigate' as const,
    title: 'Navigation',
    description: 'Live navigation with battery monitoring',
    route: '/navigation',
    color: BrandColors.warning,
  },
];

const stats = [
  { label: 'Active Users', value: '10K+', icon: 'people' as const },
  { label: 'Charging Stations', value: '500+', icon: 'flash' as const },
  { label: 'Routes Planned', value: '25K+', icon: 'map' as const },
  { label: 'CO₂ Saved', value: '2.5T', icon: 'leaf' as const },
];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <GradientBackground colors={Gradients.dark}>
      <View style={styles.container}>
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Explore</Text>
              <Text style={styles.headerSubtitle}>Discover all features</Text>
            </View>
            <Ionicons name="compass" size={40} color={BrandColors.primary} />
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Community Impact</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <Card key={index} style={styles.statCard}>
                  <Ionicons name={stat.icon} size={28} color={BrandColors.primary} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </Card>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(feature.route as any)}
              >
                <Card style={styles.featureCard}>
                  <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                    <Ionicons name={feature.icon} size={32} color={feature.color} />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={BrandColors.gray} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          {/* About Section */}
          <Card style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>About Volt Route</Text>
            <Text style={styles.aboutText}>
              Volt Route is your smart companion for electric vehicle journeys. We help you find 
              optimal routes, locate charging stations, and contribute to a sustainable future.
            </Text>
            <View style={styles.aboutStats}>
              <View style={styles.aboutStat}>
                <Ionicons name="checkmark-circle" size={20} color={BrandColors.success} />
                <Text style={styles.aboutStatText}>Smart Route Planning</Text>
              </View>
              <View style={styles.aboutStat}>
                <Ionicons name="checkmark-circle" size={20} color={BrandColors.success} />
                <Text style={styles.aboutStatText}>Real-time Updates</Text>
              </View>
              <View style={styles.aboutStat}>
                <Ionicons name="checkmark-circle" size={20} color={BrandColors.success} />
                <Text style={styles.aboutStatText}>Community Driven</Text>
              </View>
            </View>
          </Card>
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    marginTop: Spacing.xs,
  },
  statsSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: Spacing.md,
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  featuresSection: {
    marginBottom: Spacing.xl,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
    lineHeight: 20,
  },
  aboutCard: {
    marginBottom: Spacing.xl,
  },
  aboutTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.md,
  },
  aboutText: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.gray,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  aboutStats: {
    gap: Spacing.sm,
  },
  aboutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aboutStatText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.white,
  },
});
