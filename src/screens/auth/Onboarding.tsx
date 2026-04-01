import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VaultX</Text>
      <Text style={styles.subtitle}>Secure. Fast. Modern Banking.</Text>

      <Button
        title="Get Started"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
  },
  subtitle: {
    color: '#aaa',
    marginVertical: 10,
  },
});