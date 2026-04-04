import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050507', // Dark background at root to prevent white space
  },
  backgroundGlow: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(91, 46, 255, 0.05)',
  },
  scrollContent: {
    flexGrow: 1, 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,  
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 16,
    marginBottom: 40,
    lineHeight: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  forgotText: {
    color: '#5b2eff',
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -4,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
    marginTop: 20,  
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  registerText: {
    color: '#8e8e93',
    fontSize: 15,
  },
  registerHighlight: {
    color: '#5b2eff',
    fontSize: 15,
    fontWeight: '700',
  },
   errorText: {
    color: '#FF4D4D',
    marginTop: 4,
    marginLeft: 4,
  },
});