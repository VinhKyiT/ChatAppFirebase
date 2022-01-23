import Firebase from './firebaseConfig';

export const SignUp = async (password, email) => {
  try {
    return await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
    return error;
  }
};
