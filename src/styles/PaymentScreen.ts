import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5B2EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  sendingTo: {
    fontSize: 16,
    marginBottom: 5,
  },
  contactName: {
    fontSize: 22,
    fontWeight: '700',
  },
  amountContainer: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    minHeight:100
  },
  currency: {
    fontSize: 30,
    fontWeight: '700',
    marginRight: 10,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  amount: {
    fontSize: 60,
    fontWeight: '700',
    maxWidth:'85%'
  },
  keypad: {
    alignItems: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  key: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
  },
  emptyKey: {
    width: 80,
    height: 80,
    marginHorizontal: 15,
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#5B2EFF',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
