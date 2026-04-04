import { useEffect, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebaseAuth } from '../services/firebase';
import SplashScreen from '../screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import OnboardingScreen from '../screens/Onboarding';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
 
  useEffect(() => {  
    const subscriber = firebaseAuth.onAuthStateChanged((userState) => {
      setUser(userState);
      if (initializing) setInitializing(false);
    });
    return subscriber;  
  }, []);
 
  if (initializing) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? ( 
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Receipt" component={ReceiptScreen} /> 
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : ( 
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;