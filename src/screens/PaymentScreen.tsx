import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/slices/transactionsSlice'; 
import { styles } from '../styles/PaymentScreen';
const PaymentScreen = () => {
  const themeColors = useThemeColors();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const contact = route.params?.contact || { name: 'Unknown' };

  const [amount, setAmount] = useState('0');

  const handlePress = (val: string) => {
    if (val === 'backspace') {
      setAmount(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else {
      if (amount.length > 9) return;
      setAmount(prev => (prev === '0' ? val : prev + val));
    }
  };

  const handleSend = () => {
    const val = parseInt(amount, 10);
    if (val > 0) {
      dispatch(
        addTransaction({
          id: Math.floor(Math.random() * 100000),
          name: contact.name,
          amount: -val,
          type: 'debit',
          date: new Date().getTime(),
        }),
      );
      // Navigate all the way back to dashboard bounds natively.
      navigation.navigate('Main', { screen: 'Home' });
    }
  };

  const renderKey = (val: string) => (
    <TouchableOpacity
      style={[styles.key, { backgroundColor: themeColors.card }]}
      onPress={() => handlePress(val)}
      activeOpacity={0.7}
    >
      {val === 'backspace' ? (
        <Icon
          name="backspace-outline"
          size={24}
          color={themeColors.textPrimary}
        />
      ) : (
        <Text style={[styles.keyText, { color: themeColors.textPrimary }]}>
          {val}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper withTabBar={false}>
      <View style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>
      <Animated.View entering={FadeIn} style={styles.infoContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.name[0]}</Text>
        </View>
        <Text style={[styles.sendingTo, { color: themeColors.textSecondary }]}>
          Sending to
        </Text>
        <Text style={[styles.contactName, { color: themeColors.textPrimary }]}>
          {contact.name}
        </Text>
      </Animated.View>

      <Animated.View
        entering={ZoomIn.duration(400)}
        style={styles.amountContainer}
      >
        <View style={styles.amountRow}>
          <Text style={[styles.currency, { color: themeColors.textPrimary }]}>
            ₹
          </Text>
          <Text
            style={[styles.amount, { color: themeColors.textPrimary }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {amount}
          </Text>
        </View>
        {amount.length > 9 && (
          <Text style={styles.warningText}>
            Maximum limit of 9 digits exceeded
          </Text>
        )}
      </Animated.View>

      <View style={styles.keypad}>
        <View style={styles.row}>{['1', '2', '3'].map(renderKey)}</View>
        <View style={styles.row}>{['4', '5', '6'].map(renderKey)}</View>
        <View style={styles.row}>{['7', '8', '9'].map(renderKey)}</View>
        <View style={styles.row}>
          <View style={styles.emptyKey} />
          {renderKey('0')}
          {renderKey('backspace')}
        </View>
      </View>

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        activeOpacity={0.8}
      >
        <Text style={styles.sendButtonText}>Send Money</Text>
        <Icon
          name="paper-plane"
          size={20}
          color="#fff"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default PaymentScreen;

