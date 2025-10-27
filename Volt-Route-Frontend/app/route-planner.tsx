import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import GradientBackground from '@/components/ui/gradient-background';
import CustomInput from '@/components/ui/custom-input';
import CustomButton from '@/components/ui/custom-button';
import Card from '@/components/ui/card';
import { BrandColors, Gradients, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function RoutePlannerScreen() {
  const router = useRouter();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFindRoutes = () => {
    setLoading(true);
    setTimeout(() => {
      setRoutes([
        {
          id: 1,
          name: 'Route A',
          distance: '145 km',
          time: '2h 15min',
          chargingStations: 2,
          recommended: true,
        },
        {
          id: 2,
          name: 'Route B',
          distance: '168 km',
          time: '2h 45min',
          chargingStations: 1,
          recommended: false,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={BrandColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Route Planner</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Input Section */}
          <Card style={styles.inputCard}>
            <CustomInput
              label="Source"
              placeholder="Enter starting point"
              value={source}
              onChangeText={setSource}
              icon="location-outline"
            />

            <CustomInput
              label="Destination"
              placeholder="Enter destination"
              value={destination}
              onChangeText={setDestination}
              icon="flag-outline"
            />

            <View style={styles.batterySlider}>
              <Text style={styles.sliderLabel}>Current Battery Level</Text>
              <View style={styles.sliderRow}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  value={batteryLevel}
                  onValueChange={setBatteryLevel}
                  minimumTrackTintColor={BrandColors.primary}
                  maximumTrackTintColor={BrandColors.midBlue}
                  thumbTintColor={BrandColors.primary}
                />
                <Text style={styles.sliderValue}>{Math.round(batteryLevel)}%</Text>
              </View>
            </View>

            <CustomButton
              title="Find Routes"
              onPress={handleFindRoutes}
              loading={loading}
              style={styles.findButton}
            />
          </Card>

          {/* Routes Section */}
          {routes.length > 0 && (
            <View style={styles.routesSection}>
              <Text style={styles.sectionTitle}>Recommended Routes</Text>

              {routes.map((route) => (
                <Card
                  key={route.id}
                  style={styles.routeCard}
                >
                  {route.recommended && (
                    <View style={styles.recommendedBadge}>
                      <Ionicons name="star" size={16} color={BrandColors.secondary} />
                      <Text style={styles.recommendedText}>Recommended</Text>
                    </View>
                  )}

                  <Text style={styles.routeName}>{route.name}</Text>

                  <View style={styles.routeDetails}>
                    <View style={styles.routeDetail}>
                      <Ionicons name="navigate" size={20} color={BrandColors.info} />
                      <Text style={styles.routeDetailText}>{route.distance}</Text>
                    </View>

                    <View style={styles.routeDetail}>
                      <Ionicons name="time" size={20} color={BrandColors.warning} />
                      <Text style={styles.routeDetailText}>{route.time}</Text>
                    </View>

                    <View style={styles.routeDetail}>
                      <Ionicons name="battery-charging" size={20} color={BrandColors.success} />
                      <Text style={styles.routeDetailText}>
                        {route.chargingStations} stations
                      </Text>
                    </View>
                  </View>

                  <CustomButton
                    title="Start Navigation"
                    onPress={() => router.push('/navigation')}
                    variant={route.recommended ? 'primary' : 'outline'}
                    style={styles.navButton}
                  />
                </Card>
              ))}
            </View>
          )}
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
  inputCard: {
    marginBottom: Spacing.lg,
  },
  batterySlider: {
    marginTop: Spacing.md,
  },
  sliderLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: BrandColors.white,
    marginBottom: Spacing.sm,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
    minWidth: 50,
  },
  findButton: {
    marginTop: Spacing.lg,
  },
  routesSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.md,
  },
  routeCard: {
    marginBottom: Spacing.md,
  },
  recommendedRoute: {
    borderWidth: 2,
    borderColor: BrandColors.primary,
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: BrandColors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  recommendedText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.secondary,
  },
  routeName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.md,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  routeDetailText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  navButton: {
    marginTop: Spacing.sm,
  },
});
