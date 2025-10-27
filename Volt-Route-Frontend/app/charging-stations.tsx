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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GradientBackground from '@/components/ui/gradient-background';
import Card from '@/components/ui/card';
import CustomButton from '@/components/ui/custom-button';
import { BrandColors, Gradients, Spacing, Typography, BorderRadius } from '@/constants/theme';

const chargingStations = [
  {
    id: 1,
    name: 'FastCharge Hub',
    address: 'Sector 62, Noida',
    distance: '2.3 km',
    rating: 4.5,
    price: '₹15/kWh',
    available: true,
    lat: 28.6139,
    lng: 77.2090,
  },
  {
    id: 2,
    name: 'EV Power Station',
    address: 'Connaught Place, Delhi',
    distance: '5.1 km',
    rating: 4.8,
    price: '₹12/kWh',
    available: true,
    lat: 28.6280,
    lng: 77.2170,
  },
  {
    id: 3,
    name: 'Green Charging Point',
    address: 'Cyber City, Gurgaon',
    distance: '8.7 km',
    rating: 4.2,
    price: '₹18/kWh',
    available: false,
    lat: 28.4950,
    lng: 77.0890,
  },
];

export default function ChargingStationsScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');

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
    <GradientBackground colors={Gradients.dark}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={BrandColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Charging Stations</Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              onPress={() => setViewMode('map')}
              style={[styles.toggleButton, viewMode === 'map' && styles.toggleActive]}
            >
              <Ionicons
                name="map"
                size={20}
                color={viewMode === 'map' ? BrandColors.secondary : BrandColors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('list')}
              style={[styles.toggleButton, viewMode === 'list' && styles.toggleActive]}
            >
              <Ionicons
                name="list"
                size={20}
                color={viewMode === 'list' ? BrandColors.secondary : BrandColors.gray}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="filter" size={16} color={BrandColors.primary} />
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="navigate" size={16} color={BrandColors.gray} />
              <Text style={styles.filterText}>Nearby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="checkmark-circle" size={16} color={BrandColors.gray} />
              <Text style={styles.filterText}>Available</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="cash" size={16} color={BrandColors.gray} />
              <Text style={styles.filterText}>Low Price</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Content */}
        {viewMode === 'list' ? (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {chargingStations.map((station) => (
              <Card key={station.id} style={styles.stationCard}>
                <View style={styles.stationHeader}>
                  <View style={styles.stationInfo}>
                    <Text style={styles.stationName}>{station.name}</Text>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={16} color={BrandColors.warning} />
                      <Text style={styles.rating}>{station.rating}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: station.available ? BrandColors.success : BrandColors.error },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {station.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>

                <View style={styles.stationDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={18} color={BrandColors.gray} />
                    <Text style={styles.detailText}>{station.address}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="navigate-outline" size={18} color={BrandColors.gray} />
                    <Text style={styles.detailText}>{station.distance} away</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="cash-outline" size={18} color={BrandColors.gray} />
                    <Text style={styles.detailText}>{station.price}</Text>
                  </View>
                </View>

                <CustomButton
                  title="Book Slot"
                  onPress={() => console.log('Book slot')}
                  variant={station.available ? 'primary' : 'outline'}
                  disabled={!station.available}
                  style={styles.bookButton}
                />
              </Card>
            ))}
          </ScrollView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: 28.6139,
              longitude: 77.2090,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {chargingStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{ latitude: station.lat, longitude: station.lng }}
                title={station.name}
                description={station.address}
              >
                <View
                  style={[
                    styles.markerContainer,
                    { backgroundColor: station.available ? BrandColors.success : BrandColors.info },
                  ]}
                >
                  <Ionicons name="flash" size={20} color={BrandColors.white} />
                </View>
              </Marker>
            ))}
          </MapView>
        )}

        {/* Add Charger FAB */}
        <TouchableOpacity
          style={styles.addFab}
          onPress={() => router.push('/register-charger')}
        >
          <Ionicons name="add" size={28} color={BrandColors.secondary} />
        </TouchableOpacity>
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
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    flex: 1,
    marginLeft: Spacing.md,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: BrandColors.deepBlue,
    borderRadius: BorderRadius.md,
    padding: 4,
  },
  toggleButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  toggleActive: {
    backgroundColor: BrandColors.primary,
  },
  filterSection: {
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: BrandColors.deepBlue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.white,
    fontWeight: Typography.fontWeight.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  stationCard: {
    marginBottom: Spacing.md,
  },
  stationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.white,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
  },
  stationDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
  bookButton: {
    marginTop: Spacing.sm,
  },
  map: {
    flex: 1,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  markerContainer: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  addFab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl,
    backgroundColor: BrandColors.primary,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BrandColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
