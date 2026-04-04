import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle,withTiming} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/color';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });

    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.logo}>VaultX</Text>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
});