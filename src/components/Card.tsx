import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/color';

const Card = ({ children }: any) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
  },
});