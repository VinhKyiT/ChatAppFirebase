import Firebase from './firebaseConfig';

export const LoginUser = async (password, email) => {
  try {
    return await Firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};
