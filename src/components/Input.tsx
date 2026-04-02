import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/color';

const Input = (props: any) => {
  return <TextInput style={styles.input} {...props} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    color: '#fff',
  },
});