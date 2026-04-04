import { StyleSheet } from "react-native";
import { colors } from "../theme/color";

export const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.background
 },
  container: {
     flex: 1 

  },
  scrollContent: {
    paddingBottom: 40
 },
  header: {
     padding: 20, 
    paddingTop: 40 
},
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: colors.textPrimary 
},
  content: { 
    padding: 20 
},
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
  email: {
     fontSize: 14, 
     color: colors.textSecondary
     },
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
  radioLabel: { 
    color: colors.textPrimary,
     fontSize: 16, 
     fontWeight: '500' 
    },
  logoutItem: {
    //marginTop: 20,
    marginBottom:40,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
});


