import React from 'react';
import { View, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import Button from '../components/Button';
import { styles } from '../styles/Onboarding';

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

