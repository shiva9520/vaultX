import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Transaction } from '../utils/dummyTransactions';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Transactions: undefined;
  Main: undefined;
  SendMoney: undefined;
  Payment: undefined;
  Receipt: { item: Transaction };
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type ReceiptScreenRouteProp = RouteProp<RootStackParamList, 'Receipt'>;
