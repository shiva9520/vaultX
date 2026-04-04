import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle,withTiming,withSpring,withRepeat,withDelay,Easing} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/SplashScreen';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  
  const logoScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    
    
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    textTranslateY.value = withDelay(400, withSpring(0, { damping: 12, stiffness: 90 }));

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

