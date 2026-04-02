import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Pressable } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={styles.backgroundGlow} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(800).springify()}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started.</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(800).delay(200)} style={styles.formContainer}>
          <View style={styles.inputWrapper}>
             <Input placeholder="Enter Full Name" placeholderTextColor="#888" />
          </View>
          <View style={styles.inputWrapper}>
             <Input placeholder="Enter Mobile Number" placeholderTextColor="#888" />
          </View>
          <View style={styles.inputWrapper}>
             <Input placeholder="Create MPIN" secureTextEntry placeholderTextColor="#888" />
          </View>
          <View style={styles.inputWrapper}>
             <Input placeholder="Confirm MPIN" secureTextEntry placeholderTextColor="#888" />
          </View>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.duration(800).delay(400).springify()} style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => navigation.replace('Main')} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginHighlight}>Login</Text>
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050507',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2, // Put glow on the right for variety
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(91, 46, 255, 0.05)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 16,
    marginBottom: 40,
    lineHeight: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#8e8e93',
    fontSize: 15,
  },
  loginHighlight: {
    color: '#5b2eff',
    fontSize: 15,
    fontWeight: '700',
  },
});
