import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/color';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Icon name="user" size={40} color={colors.primary} />
            </View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="settings" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Icon name="shield" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.menuText}>Security</Text>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
               <Icon name="help-circle" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <Icon name="log-out" size={20} color={colors.danger} />
            </View>
            <Text style={[styles.menuText, { color: colors.danger }]}>Log Out</Text>
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
  profileCard: { backgroundColor: colors.card, padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: colors.glass },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(91, 46, 255, 0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 5 },
  email: { fontSize: 14, color: colors.textSecondary },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, marginBottom: 10, backgroundColor: colors.card, borderRadius: 16, paddingHorizontal: 15 },
  menuIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1, fontSize: 16, color: colors.textPrimary, marginLeft: 15, fontWeight: '500' },
  logoutItem: { marginTop: 20, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' },
});

export default ProfileScreen;
