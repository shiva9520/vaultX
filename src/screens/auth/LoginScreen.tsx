import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, Pressable } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View entering={FadeIn.duration(1000)} style={styles.backgroundGlow} />

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(800).springify()}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your details to securely authenticate.</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(800).delay(200)} style={styles.formContainer}>
          <View style={styles.inputWrapper}>
             <Input placeholder="Enter Mobile Number" placeholderTextColor="#888" />
          </View>
          <View style={styles.inputWrapper}>
             <Input placeholder="Enter MPIN" secureTextEntry placeholderTextColor="#888" />
          </View>
          
          <Text style={styles.forgotText}>Forgot MPIN?</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.duration(800).delay(400).springify()} style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.replace('Main')} />
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerHighlight}>Register</Text>
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050507',
  },
  backgroundGlow: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
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
  forgotText: {
    color: '#5b2eff',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -4,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  registerText: {
    color: '#8e8e93',
    fontSize: 15,
  },
  registerHighlight: {
    color: '#5b2eff',
    fontSize: 15,
    fontWeight: '700',
  },
});