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
import { RegisterData } from '../../types/RegisterData';
import { registerUser } from '../../services/firebase';
import  Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../theme/color';
const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [registerData, setRegisterData] = useState<RegisterData>({
    fullName: '',
    email: '',
    mpin: '',
    confirmMpin: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});
const [isMpinVisible, setIsMpinVisible] = useState(false);
const [isConfirmMpinVisible, setIsConfirmMpinVisible] = useState(false);
  const handleChange = (field: keyof RegisterData, value: string) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

const onRegister = async () => {
    const newErrors: Partial<Record<keyof RegisterData, string>> = {};
 
    if (!registerData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!registerData.email.trim()) newErrors.email = 'Email is required.';
    if (registerData.mpin.length < 6) newErrors.mpin = 'MPIN must be at least 6 digits.';
    if (registerData.confirmMpin.length < 6) newErrors.confirmMpin = 'MPIN must be at least 6 digits.';
    if (registerData.mpin !== registerData.confirmMpin) {
      newErrors.confirmMpin = 'MPINs do not match!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await registerUser(registerData.email, registerData.mpin);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        newErrors.email = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        newErrors.email = 'Please enter a valid email.';
      } else {
        newErrors.email = 'Registration failed. Try again.';
      }
      setErrors(newErrors);
    }
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
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Enter Email Address"
                value={registerData.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(val: string) => handleChange('email', val)}
                placeholderTextColor="#888"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Create MPIN"
                keyboardType="number-pad"
              maxLength={6}
                secureTextEntry={!isMpinVisible}
                placeholderTextColor="#888"
                value={registerData.mpin}
                onChangeText={(val: string) => handleChange('mpin', val)}
              />
              <Pressable
      onPress={() => setIsMpinVisible(!isMpinVisible)}
      style={{ position: 'absolute', right: 15, top:15 }}
    >
      <Icon
        name={isMpinVisible ? 'eye' : 'eye-slash'}
        size={18}
        color={isMpinVisible ? colors.primary : colors.textSecondary}
      />
    </Pressable>
              {errors.mpin && <Text style={styles.errorText}>{errors.mpin}</Text>}
            </View>
            <View style={styles.inputWrapper}>
              <Input
              keyboardType="number-pad"
              maxLength={6}
                placeholder="Confirm MPIN"
                secureTextEntry={!isConfirmMpinVisible}
                placeholderTextColor="#888"
                value={registerData.confirmMpin}
                onChangeText={(val: string) => handleChange('confirmMpin', val)}
              />
              <Pressable
      onPress={() => setIsConfirmMpinVisible(!isConfirmMpinVisible)}
      style={{ position: 'absolute', right: 15, top: 15 }}
    >
      <Icon
        name={isConfirmMpinVisible ? 'eye' : 'eye-slash'}
        size={18}
        color={isConfirmMpinVisible ? colors.primary : colors.textSecondary}
      />
    </Pressable>
              {errors.confirmMpin && <Text style={styles.errorText}>{errors.confirmMpin}</Text>}
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
