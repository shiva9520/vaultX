import auth from '@react-native-firebase/auth'; 

 
export const firebaseAuth = auth(); 
export const getCurrentUser = () => firebaseAuth.currentUser;
export const loginUser = (email: string, password: string) => {
  return firebaseAuth.signInWithEmailAndPassword(email, password);
}
export const registerUser = (email: string, password: string) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
}

export const logoutUser = () => firebaseAuth.signOut();
// export default {
//   auth: firebaseAuth, 
// };