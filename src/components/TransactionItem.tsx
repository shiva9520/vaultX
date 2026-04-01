import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/color';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const TransactionItem = ({ item, index }: any) => {
  // Add a nice staggered delay based on the index
  return (
    <Animated.View 
      entering={FadeInDown.delay(index ? index * 100 : 0).duration(500)}
      layout={Layout.springify().damping(15).stiffness(120)}
      style={styles.item}
    >
      <View style={styles.leftContainer}>
        <View style={[styles.iconContainer, { backgroundColor: item.type === 'credit' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
          <Icon 
            name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
            size={20} 
            color={item.type === 'credit' ? colors.success : colors.danger} 
          />
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={[styles.amount, { color: item.type === 'credit' ? colors.success : '#fff' }]}>
        {item.type === 'credit' ? '+' : ''}₹{Math.abs(item.amount)}
      </Text>
    </Animated.View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#1E1E24',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  name: { 
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  amount: { 
    fontSize: 16,
    fontWeight: 'bold',
  },
});