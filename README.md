# ⚡ Volt Route - Smart EV Route Optimizer

**Volt Route** (ChargeWay) is a futuristic mobile application designed for Electric Vehicle (EV) users in India. It helps drivers find optimal routes based on current battery charge, charging station availability, and distance optimization.

---

## 🌟 Features

### 📱 Complete Screen Suite

1. **SplashScreen** 
   - Animated logo with electric bolt icon
   - Tagline: "Drive Smart. Charge Smarter."
   - Auto-navigation to Login (3 seconds)
   - Gradient background with neon accents

2. **Authentication Screens**
   - **Login Screen**: Email/password with Google Sign-In option
   - **Register Screen**: Full account creation flow
   - Forgot password functionality
   - Sleek gradient backgrounds

3. **Home Screen**
   - Dark-themed Google MapView with custom styling
   - Real-time location tracking
   - Bottom sheet with battery status (75%)
   - Estimated range display (180 km)
   - Floating action buttons for quick access

4. **Route Planner Screen**
   - Source and destination input with autocomplete
   - Battery level slider
   - Route comparison (Route A vs Route B)
   - Recommended route highlighting
   - Charging station count per route
   - "Start Navigation" action

5. **Charging Stations Screen**
   - Toggle between Map View and List View
   - Interactive markers (Green: Public, Blue: Private)
   - Filters: Distance, Availability, Price
   - Station cards with ratings and booking
   - "Add Charger" floating action button

6. **Register Charger Screen**
   - Complete form: Name, Address, Contact, Price
   - Map picker for location selection
   - Image upload for station photos
   - Availability time slots
   - Status indicator (Pending/Active)

7. **Navigation Screen**
   - Live turn-by-turn navigation
   - Glowing route path overlay
   - Real-time battery monitoring
   - Low battery alerts
   - Voice guidance button
   - "Nearest Charging Point" quick action

8. **Profile Screen**
   - User information display
   - Vehicle details (Tata Nexon EV example)
   - Trip statistics
   - Menu: My Chargers, Settings, Help
   - Logout functionality

---

## 🎨 Design System

### Color Palette
```typescript
Primary: #00FFB3 (Neon Green)
Secondary: #0B132B (Navy)
Deep Blue: #1B263B
Dark Blue: #1C2541
Mid Blue: #3A506B
White: #FFFFFF
```

### Gradients
- **Splash**: Navy → Deep Blue
- **Auth**: Dark Blue → Mid Blue
- **Primary**: Neon Green → Teal
- **Dark**: Navy → Dark Blue

### Typography
- Font: System (Roboto on Android, SF Pro on iOS)
- Sizes: 12px to 36px
- Weights: Regular, Medium, Semibold, Bold

### Components
- Border Radius: 16-20px (rounded corners)
- Shadow: Medium soft shadows with neon glow on primary elements
- Icons: Ionicons from @expo/vector-icons
- Animations: Smooth fadeIn, slideUp, pulse effects

---

## 📦 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (File-based routing)
- **Maps**: react-native-maps with Google Maps
- **Location**: expo-location
- **UI Components**: 
  - expo-linear-gradient (Gradients)
  - @react-native-community/slider
  - Custom components (Button, Input, Card)
- **Icons**: @expo/vector-icons (Ionicons)
- **TypeScript**: Full type safety

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Volt-Route
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app for physical device

---

## 📂 Project Structure

```
Volt-Route/
├── app/
│   ├── (auth)/              # Authentication screens
│   │   ├── splash.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/              # Main app tabs
│   │   ├── index.tsx        # Home screen with map
│   │   ├── explore.tsx      # Features overview
│   │   └── _layout.tsx
│   ├── route-planner.tsx    # Route planning
│   ├── charging-stations.tsx
│   ├── register-charger.tsx
│   ├── navigation.tsx       # Live navigation
│   ├── profile.tsx
│   └── _layout.tsx          # Root layout
├── components/
│   └── ui/
│       ├── custom-button.tsx
│       ├── custom-input.tsx
│       ├── gradient-background.tsx
│       └── card.tsx
├── constants/
│   └── theme.ts             # Design system constants
└── package.json
```

---

## 🔑 Key Features Implementation

### 1. **Splash Screen Animation**
```typescript
// Animated logo with pulse effect
// Auto-navigation after 3 seconds
```

### 2. **Map Integration**
```typescript
// Dark theme custom map styling
// Real-time user location marker
// Charging station markers
```

### 3. **Battery Monitoring**
```typescript
// Battery level slider (0-100%)
// Range estimation based on battery
// Low battery warnings
```

### 4. **Route Optimization**
```typescript
// Multiple route comparison
// Charging station waypoints
// Distance and time calculation
```

---

## 🎯 Future Enhancements

- [ ] Google Places Autocomplete integration
- [ ] Real charging station API integration
- [ ] Payment gateway for slot booking
- [ ] Push notifications for low battery
- [ ] Social features (share trips, reviews)
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Offline map caching
- [ ] Carbon footprint tracker

---

## 🌍 For Indian EV Users

This app is specifically designed for the Indian EV market with:
- Pricing in Indian Rupees (₹)
- Popular Indian EV models (Tata Nexon EV, etc.)
- India-specific charging networks
- Optimized for Indian road conditions

---

## 📱 Screenshots

> Add screenshots here once you run the app!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Built with ❤️ for the EV revolution in India

**Contact**: [Your Email/GitHub]

---

## 🙏 Acknowledgments

- Expo Team for the amazing framework
- React Native community
- Indian EV community for inspiration

---

**Drive Smart. Charge Smarter.** ⚡
