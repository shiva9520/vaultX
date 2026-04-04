import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row',
     alignItems: 'center',
      justifyContent: 'space-between', 
      marginTop: 10 
    },
  title: { 
    fontSize: 20, 
    fontWeight: '700' 
},
  subtitle: { 
    marginTop: 20, 
    fontSize: 16 
},
  contactItem: { 
    flexDirection: 'row', 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 16, 
    alignItems: 'center', 
    borderWidth: 1 
},
  avatar: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#5B2EFF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 16 
},
  avatarText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600'
 },
  contactDetails: {
     flex: 1
     },
  contactName: { 
    fontSize: 16, 
    fontWeight: '600',
     marginBottom: 4 
    },
  contactPhone: { 
    fontSize: 13
 },
});
