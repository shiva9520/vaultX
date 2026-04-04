import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Alert,
} from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext, ThemePreference } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/ProfileScreen';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ProfileScreen = () => {
  const themeColors = useThemeColors();
  const { themePreference, setThemePreference } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState(false);
  const navigation = useNavigation<any>();
  const toggleSettings = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSettings(!showSettings);
  };

  const handleThemeChange = (pref: ThemePreference) => {
    setThemePreference(pref);
  };

  const clearAppData = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'AsyncStorage has been fully cleared');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error clearing storage:', error.message);
      }
    }
  };

  const renderRadioButton = (label: string, value: ThemePreference) => {
    const isSelected = themePreference === value;
    return (
      <TouchableOpacity
        style={[
          styles.radioContainer,
          { borderBottomColor: themeColors.glass },
        ]}
        onPress={() => handleThemeChange(value)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.outerCircle,
            isSelected && { borderColor: themeColors.primary },
          ]}
        >
          {isSelected && (
            <View
              style={[
                styles.innerCircle,
                { backgroundColor: themeColors.primary },
              ]}
            />
          )}
        </View>
        <Text style={[styles.radioLabel, { color: themeColors.textPrimary }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const onLogout = () =>{
    auth().signOut()
    .then(() => {
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      navigation.replace('Login');
    })
    .catch(error => {
      Alert.alert('Logout Failed', error.message);
    });
  }
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>
          Profile
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <View
            style={[
              styles.profileCard,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.glass,
              },
            ]}
          >
            <View style={styles.avatar}>
              <Icon name="user" size={40} color={themeColors.primary} />
            </View>
            <Text style={[styles.name, { color: themeColors.textPrimary }]}>
              John Doe
            </Text>
            <Text style={[styles.email, { color: themeColors.textSecondary }]}>
              john.doe@example.com
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: themeColors.card }]}
            onPress={toggleSettings}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: themeColors.glass },
              ]}
            >
              <Icon name="settings" size={20} color={themeColors.textPrimary} />
            </View>
            <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>
              Settings
            </Text>
            <Icon
              name={showSettings ? 'chevron-down' : 'chevron-right'}
              size={20}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>

          {showSettings && (
            <View
              style={[
                styles.settingsDropdown,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.glass,
                },
              ]}
            >
              <Text
                style={[
                  styles.settingsTitle,
                  { color: themeColors.textSecondary },
                ]}
              >
                Theme Preference
              </Text>
              {renderRadioButton('System Default', 'system')}
              {renderRadioButton('Light Mode', 'light')}
              {renderRadioButton('Dark Mode', 'dark')}
            </View>
          )}

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: themeColors.card }]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: themeColors.glass },
              ]}
            >
              <Icon name="shield" size={20} color={themeColors.textPrimary} />
            </View>
            <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>
              Security
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: themeColors.card }]}
            onPress={clearAppData}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: themeColors.glass },
              ]}
            >
              <Icon
                name="refresh-cw"
                size={20}
                color={themeColors.textPrimary}
              />
            </View>
            <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>
              What's new?
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: themeColors.card }]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: themeColors.glass },
              ]}
            >
              <Icon name="compass" size={20} color={themeColors.textPrimary} />
            </View>
            <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>
              Explore Products
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: themeColors.card }]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: themeColors.glass },
              ]}
            >
              <Icon
                name="help-circle"
                size={20}
                color={themeColors.textPrimary}
              />
            </View>
            <Text style={[styles.menuText, { color: themeColors.textPrimary }]}>
              Help & Support
            </Text>
            <Icon
              name="chevron-right"
              size={20}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.menuItem,
              styles.logoutItem,
              { backgroundColor: themeColors.card },
            ]}
            onPress={onLogout}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
              ]}
            >
              <Icon name="log-out" size={20} color={themeColors.danger} />
            </View>
            <Text style={[styles.menuText, { color: themeColors.danger }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
