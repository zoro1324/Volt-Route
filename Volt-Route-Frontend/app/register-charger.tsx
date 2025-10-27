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
import Card from '@/components/ui/card';
import { BrandColors, Gradients, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function RegisterChargerScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={BrandColors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Register Charger</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Card style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={24} color={BrandColors.info} />
              <Text style={styles.infoText}>
                Share your EV charging point with the community and earn money!
              </Text>
            </View>
          </Card>

          <Card style={styles.formCard}>
            <Text style={styles.sectionTitle}>Basic Information</Text>

            <CustomInput
              label="Station Name"
              placeholder="e.g., Home Charging Point"
              value={name}
              onChangeText={setName}
              icon="flash-outline"
            />

            <CustomInput
              label="Address"
              placeholder="Enter complete address"
              value={address}
              onChangeText={setAddress}
              icon="location-outline"
              multiline
            />

            <CustomInput
              label="Contact Number"
              placeholder="Your contact number"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <CustomInput
              label="Price per kWh (₹)"
              placeholder="e.g., 15"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              icon="cash-outline"
            />
          </Card>

          <Card style={styles.formCard}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity style={styles.mapPicker}>
              <Ionicons name="map" size={40} color={BrandColors.primary} />
              <Text style={styles.mapPickerText}>Pick Location on Map</Text>
              <Text style={styles.mapPickerSubtext}>
                Tap to select exact location
              </Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.formCard}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <TouchableOpacity style={styles.imageUpload}>
              <Ionicons name="camera" size={40} color={BrandColors.primary} />
              <Text style={styles.uploadText}>Upload Photos</Text>
              <Text style={styles.uploadSubtext}>
                Add photos of your charging station
              </Text>
            </TouchableOpacity>
          </Card>

          <Card style={styles.availabilityCard}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <View style={styles.timeSlots}>
              <View style={styles.timeSlot}>
                <Ionicons name="time-outline" size={20} color={BrandColors.gray} />
                <Text style={styles.timeText}>9:00 AM - 9:00 PM</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <CustomButton
            title="Register Charging Station"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <View style={styles.statusInfo}>
            <Ionicons name="shield-checkmark" size={20} color={BrandColors.success} />
            <Text style={styles.statusText}>
              Your station will be verified within 24 hours
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  infoCard: {
    backgroundColor: BrandColors.info + '20',
    borderWidth: 1,
    borderColor: BrandColors.info,
    marginBottom: Spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: BrandColors.white,
    lineHeight: 20,
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.white,
    marginBottom: Spacing.md,
  },
  mapPicker: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: BrandColors.secondary,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: BrandColors.primary,
    borderStyle: 'dashed',
  },
  mapPickerText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.white,
    marginTop: Spacing.sm,
  },
  mapPickerSubtext: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
    marginTop: Spacing.xs,
  },
  imageUpload: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: BrandColors.secondary,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: BrandColors.midBlue,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: BrandColors.white,
    marginTop: Spacing.sm,
  },
  uploadSubtext: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
    marginTop: Spacing.xs,
  },
  availabilityCard: {
    marginBottom: Spacing.lg,
  },
  timeSlots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BrandColors.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timeText: {
    fontSize: Typography.fontSize.base,
    color: BrandColors.white,
  },
  changeText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  registerButton: {
    marginBottom: Spacing.md,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.gray,
  },
});
