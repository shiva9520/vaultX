import React from 'react';
import { View, Text,KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
 
import Input from '../../components/Input';
import Button from '../../components/Button';
import { styles } from '../../styles/LoginScreen';


const LoginScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
    
      <Animated.View entering={FadeIn.duration(1000)} style={styles.backgroundGlow} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
            
            <Pressable onPress={() => {/* Handle Forgot MPIN */}}>
              <Text style={styles.forgotText}>Forgot MPIN?</Text>
            </Pressable>
          </Animated.View>
        </View>

         
        <Animated.View 
          entering={FadeInUp.duration(800).delay(400).springify()} 
          style={styles.buttonContainer}
        >
          <Button title="Login" onPress={() => navigation.replace('Main')} />
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

