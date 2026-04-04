import React, { useEffect, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle,withSpring,withTiming,interpolate,} from 'react-native-reanimated'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/BalanceCard';

const BalanceCard = () => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const [show, setShow] = useState(true);
  const showState = useSharedValue(1);  

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 90 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  useEffect(() => {
    showState.value = withTiming(show ? 1 : 0, { duration: 300 });
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const balanceStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showState.value, [0, 1], [0.3, 1]),
      transform: [{ scale: interpolate(showState.value, [0, 1], [0.95, 1]) }],
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardGlow} />
      <View style={styles.header}>
        <Text style={styles.label}>Total Balance</Text>
        <Icon name="scan-outline" size={24} color="#aaa" />
      </View>

      <Pressable onPress={() => setShow(!show)} style={styles.balanceContainer}>
        <Animated.Text style={[styles.balance, balanceStyle]}>
          {show ? '₹1,20,000' : '••••••'}
        </Animated.Text>
        <Icon 
          name={show ? 'eye-off-outline' : 'eye-outline'} 
          size={20} 
          color="#aaa" 
          style={styles.eyeIcon} 
        />
      </Pressable>
      
      <View style={styles.footer}>
        <Text style={styles.cardNumber}>**** 4812</Text>
        <Icon name="logo-apple" size={24} color="#fff" />
      </View>
    </Animated.View>
  );
};

export default BalanceCard;
