import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { colors } from '../theme/color';

const filters = ['All', 'Credit', 'Debit'];

const FilterTabs = ({ active, setActive }: any) => {
  return (
    <View style={styles.container}>
      {filters.map((item) => {
        const isActive = active === item;
        return (
          <Pressable
            key={item}
            onPress={() => setActive(item)}
            style={styles.tabContainer}
          >
            {isActive && (
              <Animated.View
                layout={LinearTransition}
                entering={FadeIn}
                style={[StyleSheet.absoluteFill, styles.activeBackground]}
              />
            )}
            <Text style={[styles.text, isActive && styles.activeText]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1D',
    borderRadius: 16,
    padding: 6,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  activeBackground: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    zIndex: -1,
  },
  text: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
});