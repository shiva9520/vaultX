import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { colors } from '../theme/color';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext, ThemePreference } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ProfileScreen = () => {
  const themeColors = useThemeColors();
  const { themePreference, setThemePreference } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowSettings(!showSettings);
  };

  const handleThemeChange = (pref: ThemePreference) => {
    setThemePreference(pref);
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

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[styles.headerTitle, { color: themeColors.textPrimary }]}
          >
            Profile
          </Text>
        </View>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  content: { padding: 20 },
  profileCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.glass,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(91, 46, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  email: { fontSize: 14, color: colors.textSecondary },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 15,
    fontWeight: '500',
  },
  settingsDropdown: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: -5,
    borderWidth: 1,
    borderColor: colors.glass,
  },
  settingsTitle: {
    color: colors.textSecondary,
    marginBottom: 15,
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  outerCircleSelected: { borderColor: colors.primary },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  radioLabel: { color: colors.textPrimary, fontSize: 16, fontWeight: '500' },
  logoutItem: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
});

export default ProfileScreen;
