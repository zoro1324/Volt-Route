import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Card from '@/components/ui/card';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Spacing, Typography, BorderRadius, Shadow } from '@/constants/theme';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const batteryLevel = 75;
  const estimatedRange = 180;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="flash" size={32} color={BrandColors.primary} />
          <Text style={styles.headerTitle}>Volt Route</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/profile')}
          style={styles.avatarButton}
        >
          <Ionicons name="person-circle" size={40} color={BrandColors.primary} />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
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
        </MapView>
      )}

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/charging-stations')}
        >
          <Ionicons name="location" size={24} color={BrandColors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <Card style={styles.batteryCard}>
          <View style={styles.batteryInfo}>
            <Ionicons name="battery-charging" size={32} color={BrandColors.primary} />
            <View style={styles.batteryText}>
              <Text style={styles.batteryLevel}>{batteryLevel}%</Text>
              <Text style={styles.batteryLabel}>Current Charge</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.rangeInfo}>
            <Ionicons name="speedometer" size={24} color={BrandColors.info} />
            <View style={styles.rangeText}>
              <Text style={styles.rangeValue}>{estimatedRange} km</Text>
              <Text style={styles.rangeLabel}>Estimated Range</Text>
            </View>
          </View>
        </Card>

        <CustomButton
          title="Plan Route"
          onPress={() => router.push('/route-planner')}
          icon={<Ionicons name="map" size={20} color={BrandColors.secondary} />}
          style={styles.planButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.secondary,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: BrandColors.deepBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    ...Shadow.medium,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  avatarButton: {
    backgroundColor: BrandColors.deepBlue,
    borderRadius: BorderRadius.full,
    ...Shadow.medium,
  },
  map: {
    width: '100%',
    height: height - 300,
  },
  userMarker: {
    backgroundColor: BrandColors.primary,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    ...Shadow.neon,
  },
  fabContainer: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: 340,
    gap: Spacing.md,
  },
  fab: {
    backgroundColor: BrandColors.primary,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.neon,
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
  batteryCard: {
    marginBottom: Spacing.md,
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  batteryText: {
    flex: 1,
  },
  batteryLevel: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  batteryLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  divider: {
    height: 1,
    backgroundColor: BrandColors.midBlue,
    marginVertical: Spacing.md,
  },
  rangeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  rangeText: {
    flex: 1,
  },
  rangeValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  rangeLabel: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  planButton: {
    marginTop: Spacing.sm,
  },
});
