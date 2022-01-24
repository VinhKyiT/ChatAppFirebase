import Firebase from './firebaseConfig';

export const SignUpUser = async (password, email) => {
  try {
    return await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password,
    );
  } catch (error) {
    return error;
  }
};
