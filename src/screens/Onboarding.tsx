import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.backgroundCircle1} />
      <Animated.View entering={FadeIn.duration(1200).delay(200)} style={styles.backgroundCircle2} />
      
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(800).springify()}>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconText}>VX</Text>
          </View>
        </Animated.View>
        
        <Animated.Text entering={FadeInUp.duration(800).delay(200)} style={styles.title}>
          Welcome to <Text style={styles.highlight}>VaultX</Text>
        </Animated.Text>
        
        <Animated.Text entering={FadeInUp.duration(800).delay(300)} style={styles.subtitle}>
          Secure. Fast. Modern Banking. Experience the future of finance at your fingertips.
        </Animated.Text>
      </View>

      <Animated.View entering={FadeInDown.duration(800).delay(500).springify()} style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => navigation.replace('Login')}
        />
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050507',
    justifyContent: 'space-between',
  },
  backgroundCircle1: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(91, 46, 255, 0.15)',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: height * 0.1,
    left: -width * 0.3,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: height * 0.1,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#5b2eff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#5b2eff',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  iconText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    fontSize: 42,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 16,
  },
  highlight: {
    color: '#5b2eff',
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
});