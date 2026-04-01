import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input placeholder="Enter Mobile Number" placeholderTextColor="#888" />
      <Input placeholder="Enter MPIN" secureTextEntry placeholderTextColor="#888" />

      <Button title="Login" onPress={() => navigation.replace('Main')} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0D0D0F',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
});