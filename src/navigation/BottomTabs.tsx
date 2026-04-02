import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import CardsScreen from '../screens/CardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabIcon from '../components/TabIcon';
import CustomBottomTab from '../components/CustomBottomTab';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator 
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} icon="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} icon="file-text" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} icon="credit-card" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} icon="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;