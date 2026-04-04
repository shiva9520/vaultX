import { StyleSheet } from "react-native";
import { colors } from "../theme/color";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A1F45', // Deep rich purple to represent premium card
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
    elevation: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  cardGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(91, 46, 255, 0.4)',
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#D4D4D8',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  balance: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eyeIcon: {
    marginLeft: 12,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  cardNumber: {
    color: '#A1A1AA',
    fontSize: 16,
    letterSpacing: 2,
  },
});