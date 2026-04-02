import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import BottomTabs from './BottomTabs';
import OnboardingScreen from '../screens/Onboarding';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;