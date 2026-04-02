import React, { memo } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const TRANSACTION_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const parseDateString = (dateVal: string | number) => {
  if (!dateVal) return new Date(NaN);
  let d = new Date(dateVal);
  if (!isNaN(d.getTime())) return d;
  
  // Custom fallback for ISO strings which Hermes engine natively rejects sometimes
  if (typeof dateVal === 'string' && dateVal.includes('T')) {
    const [datePart, timePart] = dateVal.split('T');
    const [y, m, day] = datePart.split('-');
    const [h, min] = timePart.split(':');
    return new Date(Number(y), Number(m)-1, Number(day), Number(h), Number(min));
  }
  return new Date(Number(dateVal));
};

const TransactionItem = memo(({ item, index }: any) => {
  const colors = useThemeColors();
  const navigation = useNavigation<any>();
  
  const d = parseDateString(item.date);
  let formattedDate = 'Unknown Date';
  if (!isNaN(d.getTime())) {
    const hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hr12 = hours % 12 || 12;
    const mins = d.getMinutes().toString().padStart(2, '0');
    formattedDate = `${TRANSACTION_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} - ${hr12}:${mins} ${ampm}`;
  } 
  return (
    <Animated.View 
      entering={FadeInDown.delay(index ? index * 100 : 0).duration(500)}
      layout={Layout.springify().damping(15).stiffness(120)}
    >
      <TouchableOpacity
        style={[styles.item, { backgroundColor: colors.card, borderColor: colors.glass, borderWidth: 1 }]}
        onPress={() => navigation.navigate('Receipt', { item })}
        activeOpacity={0.8}
      >
        <View style={styles.leftContainer}>
          <View style={[styles.iconContainer, { backgroundColor: item.type === 'credit' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
            <Icon 
              name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
              size={20} 
              color={item.type === 'credit' ? colors.success : colors.danger} 
            />
          </View>
          <View>
            <Text style={[styles.name, { color: colors.textPrimary }]}>{item.name}</Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>{formattedDate}</Text>
          </View>
        </View>
        <Text style={[styles.amount, { color: item.type === 'credit' ? colors.success : colors.textPrimary }]}>
          {item.type === 'credit' ? '+' : ''}₹{Math.abs(item.amount)}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

export default TransactionItem;

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  amount: { 
    fontSize: 16,
    fontWeight: 'bold',
  },
});