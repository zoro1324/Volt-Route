import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import GradientBackground from '@/components/ui/gradient-background';
import Card from '@/components/ui/card';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Gradients, Spacing, Typography, BorderRadius, Shadow } from '@/constants/theme';

const { height } = Dimensions.get('window');

export default function NavigationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const remainingDistance = 42;
  const eta = '25 min';

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Simulate battery drain
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(prev - 0.5, 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#1B263B' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#8B9499' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#0B132B' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#3A506B' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#0B132B' }],
    },
  ];

  const routeCoordinates = location
    ? [
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: location.coords.latitude + 0.05, longitude: location.coords.longitude + 0.05 },
      ]
    : [];

  return (
    <GradientBackground colors={Gradients.dark}>
      <View style={styles.container}>
        {/* Map View */}
        {location && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            >
              <View style={styles.userMarker}>
                <Ionicons name="car" size={24} color={BrandColors.white} />
              </View>
            </Marker>

            <Marker
              coordinate={{
                latitude: location.coords.latitude + 0.05,
                longitude: location.coords.longitude + 0.05,
              }}
              title="Destination"
            >
              <View style={styles.destinationMarker}>
                <Ionicons name="flag" size={20} color={BrandColors.white} />
              </View>
            </Marker>

            <Polyline
              coordinates={routeCoordinates}
              strokeColor={BrandColors.primary}
              strokeWidth={4}
            />
          </MapView>
        )}

        {/* Top Info Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color={BrandColors.white} />
          </TouchableOpacity>

          <Card style={styles.etaCard}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{eta}</Text>
          </Card>
        </View>

        {/* Battery Warning */}
        {batteryLevel < 30 && (
          <View style={styles.warningBanner}>
            <Ionicons name="warning" size={24} color={BrandColors.warning} />
            <Text style={styles.warningText}>
              Low battery! Nearest charging station ahead.
            </Text>
          </View>
        )}

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          {/* Navigation Info */}
          <View style={styles.navInfo}>
            <View style={styles.navItem}>
              <Ionicons name="navigate" size={32} color={BrandColors.primary} />
              <View style={styles.navText}>
                <Text style={styles.navValue}>{remainingDistance} km</Text>
                <Text style={styles.navLabel}>Remaining</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.navItem}>
              <Ionicons
                name="battery-charging"
                size={32}
                color={batteryLevel < 30 ? BrandColors.warning : BrandColors.success}
              />
              <View style={styles.navText}>
                <Text
                  style={[
                    styles.navValue,
                    batteryLevel < 30 && { color: BrandColors.warning },
                  ]}
                >
                  {Math.round(batteryLevel)}%
                </Text>
                <Text style={styles.navLabel}>Battery</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <CustomButton
              title="Nearest Charging Point"
              onPress={() => console.log('Find charger')}
              variant="outline"
              icon={<Ionicons name="flash" size={20} color={BrandColors.primary} />}
              style={styles.actionButton}
            />

            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="volume-high" size={24} color={BrandColors.white} />
            </TouchableOpacity>
          </View>

          {/* Next Turn */}
          <Card style={styles.turnCard}>
            <View style={styles.turnIcon}>
              <Ionicons name="arrow-forward" size={32} color={BrandColors.primary} />
            </View>
            <View style={styles.turnInfo}>
              <Text style={styles.turnDistance}>In 800 m</Text>
              <Text style={styles.turnInstruction}>Turn right on MG Road</Text>
            </View>
          </Card>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: height,
  },
  userMarker: {
    backgroundColor: BrandColors.primary,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    ...Shadow.neon,
  },
  destinationMarker: {
    backgroundColor: BrandColors.error,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    ...Shadow.medium,
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    backgroundColor: BrandColors.deepBlue,
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.medium,
  },
  etaCard: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  etaLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
    textAlign: 'center',
  },
  etaValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.primary,
    textAlign: 'center',
  },
  warningBanner: {
    position: 'absolute',
    top: 120,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: BrandColors.warning + '20',
    borderWidth: 1,
    borderColor: BrandColors.warning,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  warningText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.white,
    fontWeight: Typography.fontWeight.medium,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BrandColors.secondary,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    ...Shadow.large,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: BrandColors.midBlue,
    borderRadius: BorderRadius.sm,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  navInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  navItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  navText: {
    flex: 1,
  },
  navValue: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  navLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: BrandColors.midBlue,
    marginHorizontal: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  voiceButton: {
    width: 56,
    height: 56,
    backgroundColor: BrandColors.primary,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.neon,
  },
  turnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  turnIcon: {
    width: 56,
    height: 56,
    backgroundColor: BrandColors.secondary,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnInfo: {
    flex: 1,
  },
  turnDistance: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.primary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  turnInstruction: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.white,
  },
});
