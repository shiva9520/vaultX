import React, { useState } from 'react';
import {View,Text,KeyboardAvoidingView,Platform,Pressable,ScrollView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeInDown,FadeInUp,FadeIn,} from 'react-native-reanimated';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { styles } from '../../styles/LoginScreen';
import { LoginData } from '../../types/LoginData';
import { loginUser } from '../../services/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../theme/color';
const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [LoginData, setLoginData] = useState<LoginData>({
    email: '',
    mpin: '',
  });
  const [errors, setErrors] = useState<{ email?: string; mpin?: string }>(
    {},
  );
  const [ismpinVisible, setIsmpinVisible] = useState(false);
  const handleChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  const onLogin = async () => {
    const newErrors: { email?: string; mpin?: string } = {};
    if (!LoginData.email.trim()) newErrors.email = 'Email is required.';
    if (!LoginData.mpin.trim())newErrors.mpin = 'mpin is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
       loginUser(LoginData.email, LoginData.mpin);
    } catch (error: any) { 
      if (error.code === 'auth/invalid-credential') {
        newErrors.mpin = 'Invalid Email or mpin.';
      } else if (error.code === 'auth/too-many-requests') {
        newErrors.mpin = 'Too many attempts. Try again later.';
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Enter your details to securely authenticate.
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.duration(800).delay(200)}
            style={styles.formContainer}
          >
            <View style={styles.inputWrapper}>
              <Input
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#888"
                value={LoginData.email}
                onChangeText={(val: string) => handleChange('email', val)}
              />
              {errors.email && (
                <Text style={{ color: '#FF4D4D', fontSize: 12, marginTop: 4 }}>
                  {errors.email}
                </Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <Input
              keyboardType="number-pad"
              maxLength={6}
                placeholder="Enter MPIN"
                secureTextEntry={!ismpinVisible}
                placeholderTextColor="#888"
                value={LoginData.mpin}
                onChangeText={(val: string) => handleChange('mpin', val)}
              />
              <Pressable
                onPress={() => setIsmpinVisible(!ismpinVisible)}
                style={{ position: 'absolute', right: 15, top: 15 }}
              >
                <Text
                  style={{ color: '#5b2eff', fontSize: 12, fontWeight: '600' }}
                >
                  <Icon
                    name={ismpinVisible ? 'eye' : 'eye-slash'}
                    size={20}
                    color={
                      ismpinVisible ? colors.primary : colors.textSecondary
                    } // Matching your theme's purple
                  />
                </Text>
              </Pressable>
              {errors.mpin && (
                <Text style={{ color: '#FF4D4D', fontSize: 12, marginTop: 4 }}>
                  {errors.mpin}
                </Text>
              )}
            </View>

            <Pressable
              onPress={() => {
                /* Handle Forgot MPIN */
              }}
            >
              <Text style={styles.forgotText}>Forgot MPIN?</Text>
            </Pressable>
          </Animated.View>
        </View>

        <Animated.View
          entering={FadeInUp.duration(800).delay(400).springify()}
          style={styles.buttonContainer}
        >
          <Button title="Login" onPress={onLogin} />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerHighlight}>Register</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
