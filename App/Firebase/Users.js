import Firebase from './firebaseConfig';

export const AddUser = (name, email, password) => {
  Firebase.database().ref('users').push(user);
};
