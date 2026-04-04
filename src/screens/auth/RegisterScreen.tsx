import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import { styles } from '../../styles/RegisterScreen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import auth, { getAuth } from '@react-native-firebase/auth';
import { RegisterData } from '../../types/RegisterData';
const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [registerData, setRegisterData] = useState<RegisterData>({
    fullName: '',
    email: '',
    mpin: '',
    confirmMpin: '',
  });
  const handleChange = (field: keyof RegisterData, value: string) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

 const onRegister = () => { 
  if (registerData.mpin !== registerData.confirmMpin) {
    Alert.alert('Error', 'MPINs do not match!');
    return;
  }
 
  auth()
    .createUserWithEmailAndPassword(registerData.email, registerData.mpin)
    .then(() => {
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('Main');
    })
    .catch(error => {
      // Fix: Specifically check error codes and use error.message for the string
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'The MPIN must be at least 6 characters long.');
      } else {
        // Fix: Use error.message to avoid the "ReadableNativeMap" crash
        Alert.alert('Registration Failed', error.message);
      }
    });
};
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Animated.View
        entering={FadeIn.duration(1000)}
        style={styles.backgroundGlow}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Animated.View entering={FadeInDown.duration(800).springify()}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started.</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(800).delay(200)}
            style={styles.formContainer}
          >
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Enter Full Name"
                value={registerData.fullName}
                onChangeText={(val: string) => handleChange('fullName', val)}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Enter Email Address"
                value={registerData.email}
                onChangeText={(val: string) => handleChange('email', val)}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Create MPIN"
                secureTextEntry
                placeholderTextColor="#888"
                value={registerData.mpin}
                onChangeText={(val: string) => handleChange('mpin', val)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Confirm MPIN"
                secureTextEntry
                placeholderTextColor="#888"
                value={registerData.confirmMpin}
                onChangeText={(val: string) => handleChange('confirmMpin', val)}
              />
            </View>
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInUp.duration(800).delay(400).springify()}
          style={styles.buttonContainer}
        >
          <Button title="Sign Up" onPress={onRegister} />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginHighlight}>Login</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
