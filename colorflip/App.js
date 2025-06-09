import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Clipboard,
  ToastAndroid,
} from 'react-native';

// Theme Colors
const COLORS = {
  primary: '#FFFFFF',   // Background
  secondary: '#000000', // Text
  accent: '#FF9800',    // Button and icon
};

// PUBLIC_INTERFACE
function generateRandomHexColor() {
  /** Returns a random hex color string (e.g. '#A1B2C3'). */
  const hex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`.toUpperCase();
  return hex;
}

// PUBLIC_INTERFACE
const copyToClipboard = (text) => {
  /** Copies the given text to clipboard and shows a Toast. */
  Clipboard.setString(text);
  ToastAndroid.show('Color code copied!', ToastAndroid.SHORT);
};

/**
 * PUBLIC_INTERFACE
 * Main container for the ColorFlip application.
 */
export default function App() {
  const [bgColor, setBgColor] = useState(generateRandomHexColor());

  const handleFlipColor = () => {
    let newColor = generateRandomHexColor();
    // Exclude pure white and pure black for better UX
    while (newColor === COLORS.primary || newColor === COLORS.secondary) {
      newColor = generateRandomHexColor();
    }
    setBgColor(newColor);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bgColor }]}>
      <StatusBar
        barStyle={bgColor === COLORS.secondary ? 'light-content' : 'dark-content'}
        backgroundColor={bgColor}
      />
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={[styles.hexCode, { color: COLORS.secondary }]}>
            {bgColor}
          </Text>
          <TouchableOpacity
            style={styles.copyIcon}
            onPress={() => copyToClipboard(bgColor)}
            accessibilityLabel="Copy hex code"
          >
            {/* Simple copy icon SVG */}
            <Text style={{ color: COLORS.accent, fontSize: 24, marginLeft: 10 }}>📋</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFlipColor}
            accessibilityLabel="Flip Color"
          >
            <Text style={styles.buttonText}>Flip Color</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hexCode: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    letterSpacing: 2,
  },
  copyIcon: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 32,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '60%',
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
