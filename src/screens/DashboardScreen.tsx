import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import BalanceCard from '../components/BalanceCard';
import QuickActions from '../components/QuickActions';
import TransactionItem from '../components/TransactionItem';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useThemeColors } from '../hooks/useThemeColors';
import { colors } from '../theme/color';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const DashboardScreen = () => {
  const themeColors = useThemeColors();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const recentTransactions = transactions.slice(0, 5);
  
  return (
    <ScreenWrapper>
      <Animated.View entering={FadeIn.delay(100).duration(600)} style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: themeColors.textSecondary }]}>Good Morning,</Text>
          <Text style={[styles.userName, { color: themeColors.textPrimary }]}>Alex Doe</Text>
        </View>
        <View style={styles.profileImagePlaceholder}>
          <Icon name="person" size={24} color="#fff" />
        </View>
      </Animated.View>

      <BalanceCard />
      
      <Animated.View entering={FadeIn.delay(200).duration(600)}>
        <QuickActions />
      </Animated.View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>Recent Transactions</Text>
        <Text style={[styles.seeAll, { color: themeColors.primary }]}>See All</Text>
      </View>

      <Animated.FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
        itemLayoutAnimation={Layout.springify().damping(15)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for floating bottom tab
      />
    </ScreenWrapper>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greeting: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  profileImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(91, 46, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(91, 46, 255, 0.4)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: { 
    color: '#fff', 
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
});