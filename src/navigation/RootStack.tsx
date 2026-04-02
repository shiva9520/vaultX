import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
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
=======
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/Onboarding';
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import BottomTabs from './BottomTabs';
>>>>>>> 31c1ef512a3a26754c201f44fe62cdb10dbb2b1b

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
<<<<<<< HEAD
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
=======
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
>>>>>>> 31c1ef512a3a26754c201f44fe62cdb10dbb2b1b
    </Stack.Navigator>
  );
};

export default RootStack;