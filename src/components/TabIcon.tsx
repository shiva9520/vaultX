import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const TabIcon = ({ focused, icon, color, size }: { focused: boolean; icon: string; color: string; size: number }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, { damping: 10, stiffness: 200 });
  }, [focused]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <Icon name={icon} size={size} color={color} />
    </Animated.View>
  );
};

export default TabIcon;