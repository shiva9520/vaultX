import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const actions = [
  { name: 'Send', icon: 'paper-plane-outline' },
  { name: 'Pay', icon: 'wallet-outline' },
  { name: 'Scan', icon: 'scan-outline' },
  { name: 'History', icon: 'receipt-outline', route: 'Transactions' },
];

const ActionButton = ({ item, onPress }: any) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.9))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={28} color={colors.primary} />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </Animated.View>
    </Pressable>
  );
};

const QuickActions = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {actions.map((item, index) => (
        <ActionButton
          key={index}
          item={item}
          onPress={
            item.route
              ? () => navigation.navigate(item.route)
              : undefined
          }
        />
      ))}
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '22%',
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#1E1E24',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  text: {
    color: '#D4D4D8',
    fontSize: 13,
    fontWeight: '500',
  },
});