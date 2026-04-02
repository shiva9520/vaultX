import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  
  const logoScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    // Spring the logo wrapper upwards
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    
    // Sluggishly slide and fade text upwards
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    textTranslateY.value = withDelay(400, withSpring(0, { damping: 12, stiffness: 90 }));

    // Perpetual pulsing background indicator mapped continuously
    pulseScale.value = withDelay(800, withRepeat(
      withTiming(1.8, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    ));
    pulseOpacity.value = withDelay(800, withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    ));

    const goNext = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);

    return () => clearTimeout(goNext);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: '#1A1133' }]}>
      <View style={styles.center}>
        <Animated.View style={[styles.pulseRing, pulseStyle]} />
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Icon name="shield-checkmark" size={48} color="#fff" />
        </Animated.View>
        <Animated.View style={textStyle}>
          <Text style={styles.logoText}>Vault<Text style={styles.x}>X</Text></Text>
          <Text style={styles.slogan}>Secure. Fast. Yours.</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#5B2EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#5B2EFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    zIndex: 2,
  },
  pulseRing: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#5B2EFF',
    zIndex: 1,
  },
  logoText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },
  x: {
    color: '#5B2EFF',
  },
  slogan: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  }
});