import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Transaction } from '../utils/dummyTransactions';

const TRANSACTION_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const ReceiptScreen = () => {
  const themeColors = useThemeColors();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const item: Transaction = route.params?.item;

  if (!item) return null;

  const d = new Date(Number(item.date) || item.date);
  let formattedDate = 'Unknown Date';
  if (!isNaN(d.getTime())) {
    const hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hr12 = hours % 12 || 12;
    const mins = d.getMinutes().toString().padStart(2, '0');
    formattedDate = `${TRANSACTION_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${hr12}:${mins} ${ampm}`;
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Receipt</Text>
        <View style={{ width: 28 }} />
      </View>

      <Animated.ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.duration(500)} style={[styles.receiptCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.logoCircle}>
            <Icon name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={24} color="#fff" />
          </View>
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>{item.name}</Text>
          <Text style={[styles.amount, { color: item.type === 'credit' ? '#10B981' : themeColors.textPrimary }]}>
            {item.type === 'credit' ? '+' : ''}₹{Math.abs(item.amount)}
          </Text>
          
          <View style={[styles.divider, { borderBottomColor: themeColors.glass }]} />

          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>Status</Text>
            <Text style={[styles.value, { color: '#10B981', fontWeight: '700' }]}>Completed</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>Time</Text>
            <Text style={[styles.value, { color: themeColors.textPrimary }]}>{formattedDate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>Transaction ID</Text>
            <Text style={[styles.value, { color: themeColors.textPrimary }]}>TXN{item.id}992{Math.floor(Math.random() * 999)}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300).duration(600)} style={[styles.mapPlaceholder, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]}>
          <Icon name="map-outline" size={40} color={themeColors.textSecondary} />
          <Text style={[styles.mapText, { color: themeColors.textSecondary }]}>Payment Location Available</Text>
        </Animated.View>
      </Animated.ScrollView>
    </ScreenWrapper>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '700' },
  scrollContent: { paddingBottom: 50 },
  receiptCard: { borderRadius: 24, padding: 24, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
  logoCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#5B2EFF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  amount: { fontSize: 36, fontWeight: '700', marginBottom: 24 },
  divider: { width: '100%', borderBottomWidth: 1, borderStyle: 'dashed', marginBottom: 24 },
  row: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 15 },
  value: { fontSize: 16, fontWeight: '500' },
  mapPlaceholder: { marginTop: 24, height: 150, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  mapText: { marginTop: 10, fontSize: 14 }
});
