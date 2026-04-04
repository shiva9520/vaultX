import React, { useState, useMemo } from 'react';
import { RefreshControl, Text, StyleSheet, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import TransactionItem from '../components/TransactionItem';
import TransactionSkeleton from '../components/TransactionSkeleton';
import { useEffect } from 'react';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { styles } from '../styles/TransactionsScreen';
type DateFilter = 'All' | 'Last 10 days' | 'Last 1 month';

const TransactionsScreen = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const themeColors = useThemeColors();
  
  const filteredData = useMemo(() => {
    let result = transactions;
 
    if (searchQuery.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
 
    if (dateFilter !== 'All') {
      const now = new Date();
      const cutoffDate = new Date();
      
      if (dateFilter === 'Last 10 days') {
        cutoffDate.setDate(now.getDate() - 10);
      } else if (dateFilter === 'Last 1 month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      }

      result = result.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoffDate;
      });
    }

    return result;
  }, [transactions, searchQuery, dateFilter]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * PAGE_SIZE);
  }, [filteredData, page]);

  const loadMore = () => {
    if (loadingMore || paginatedData.length >= filteredData.length || initialLoading) return;
    setLoadingMore(true);
    setTimeout(() => {
      setPage(p => p + 1);
      setLoadingMore(false);
    }, 1500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingTop: 10 }}>
        <TransactionSkeleton />
        <TransactionSkeleton />
        <TransactionSkeleton />
      </View>
    );
  };

  const renderInitialSkeletons = () => (
    <View style={{ paddingTop: 10 }}>
       {[1,2,3,4,5,6,7].map(i => <TransactionSkeleton key={i} />)}
    </View>
  );

  const renderRadioButton = (label: DateFilter) => {
      const isSelected = dateFilter === label;
      return (
        <TouchableOpacity 
          style={[styles.radioContainer, { borderBottomColor: themeColors.glass }]} 
          onPress={() => {
            setDateFilter(label);
            setShowFilterModal(false);
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.outerCircle, isSelected && { borderColor: themeColors.primary }]}>
            {isSelected && <View style={[styles.innerCircle, { backgroundColor: themeColors.primary }]} />}
          </View>
          <Text style={[styles.radioLabel, { color: themeColors.textPrimary }]}>{label}</Text>
        </TouchableOpacity>
      );
    };

  return (
    <ScreenWrapper>
      <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <Icon name="receipt" size={24} color={themeColors.primary} />
          </View>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>Transactions</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.searchRow}>
        <View style={[styles.searchBar, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]}>
          <Icon name="search" size={20} color={themeColors.textSecondary} style={styles.searchIcon} />
          <TextInput 
            style={[styles.searchInput, { color: themeColors.textPrimary }]}
            placeholder="Search transactions..."
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={themeColors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]} onPress={() => setShowFilterModal(true)} activeOpacity={0.8}>
          <Icon name="options-outline" size={24} color={themeColors.primary} />
          {dateFilter !== 'All' && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </Animated.View>

      {initialLoading ? (
        renderInitialSkeletons()
      ) : (
        <Animated.FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
          itemLayoutAnimation={Layout.springify().damping(16).stiffness(140)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor={themeColors.primary}
              colors={[themeColors.primary]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
               <Icon name="search-outline" size={48} color={themeColors.textSecondary} />
               <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>No transactions found</Text>
            </View>
          }
        />
      )}

      <Modal visible={showFilterModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={{ flex: 1 }} onPress={() => setShowFilterModal(false)} />
           <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
             <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: themeColors.textPrimary }]}>Filter by Date</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Icon name="close" size={24} color={themeColors.textPrimary} />
                </TouchableOpacity>
             </View>
             {renderRadioButton('All')}
             {renderRadioButton('Last 10 days')}
             {renderRadioButton('Last 1 month')}
           </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default TransactionsScreen;

