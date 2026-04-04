import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/SendMoneyScreen';
import { dummyContacts } from '../utils/dummyContacts';

const SendMoneyScreen = () => {
  const themeColors = useThemeColors();
  const navigation = useNavigation<any>();

  const renderContact = ({ item, index }: any) => {
    return (
      <Animated.View entering={FadeInUp.delay(100 * index).duration(400)}>
        <TouchableOpacity 
          style={[styles.contactItem, { backgroundColor: themeColors.card, borderColor: themeColors.glass }]}
          onPress={() => navigation.navigate('Payment', { contact: item })}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name[0]}</Text>
          </View>
          <View style={styles.contactDetails}>
            <Text style={[styles.contactName, { color: themeColors.textPrimary }]}>{item.name}</Text>
            <Text style={[styles.contactPhone, { color: themeColors.textSecondary }]}>{item.phone}</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Send Money</Text>
        <View style={{ width: 26 }} />
      </View>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Select a contact to send money to.</Text>
      <FlatList
        data={dummyContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </ScreenWrapper>
  );
};

export default SendMoneyScreen;

