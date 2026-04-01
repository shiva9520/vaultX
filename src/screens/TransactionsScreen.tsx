import React, { useState } from 'react';
import { RefreshControl, Text, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import TransactionItem from '../components/TransactionItem';
import FilterTabs from '../components/FilterTabs';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { colors } from '../theme/color';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  { id: 1, name: 'Amazon Web Services', amount: -2000, type: 'debit' },
  { id: 2, name: 'Salary (Tech Corp)', amount: 50000, type: 'credit' },
  { id: 3, name: 'Uber Rides', amount: -500, type: 'debit' },
  { id: 4, name: 'Freelance Design', amount: 12000, type: 'credit' },
  { id: 5, name: 'Netflix Subscription', amount: -650, type: 'debit' },
  { id: 6, name: 'Stock Dividend', amount: 3400, type: 'credit' },
];

const TransactionsScreen = () => {
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const filteredData =
    filter === 'All'
      ? data
      : data.filter((item) => item.type === filter.toLowerCase());

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <ScreenWrapper>
      <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <Icon name="receipt" size={24} color={colors.primary} />
          </View>
          <Text style={styles.title}>Transactions</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(200).duration(500)}>
        <FilterTabs active={filter} setActive={setFilter} />
      </Animated.View>

      <Animated.FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
        itemLayoutAnimation={Layout.springify().damping(16).stiffness(140)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for CustomBottomTab
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      />
    </ScreenWrapper>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'rgba(91, 46, 255, 0.15)',
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});