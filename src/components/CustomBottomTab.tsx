import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../theme/color';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TabButton = ({ options, isFocused, onPress, onLongPress, route }: any) => {
  // Label and Background animation setup
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
      transform: [{ scale: withSpring(isFocused ? 1 : 0.8) }]
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocused ? 1 : 0, { duration: 250 }),
      height: withTiming(isFocused ? 16 : 0, { duration: 250 }),
      transform: [{ translateY: withSpring(isFocused ? 0 : 10) }]
    };
  });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      activeOpacity={0.8}
    >
      <Animated.View style={[StyleSheet.absoluteFill, styles.activeBackground, animatedBackgroundStyle]} />
      <View style={styles.iconContainer}>
        {options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: isFocused ? colors.primary : colors.textSecondary, size: 22 }) : null}
      </View>
      <Animated.Text style={[styles.label, animatedTextStyle]} numberOfLines={1}>
        {typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const CustomBottomTab = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButton
            key={route.key}
            route={route}
            options={options}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 29, 0.95)', // matches colors.card with slight transparency
    height: 72,
    borderRadius: 36,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 28,
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  activeBackground: {
    backgroundColor: 'rgba(91, 46, 255, 0.15)', // Light primary color for active tab
    borderRadius: 28,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
});
