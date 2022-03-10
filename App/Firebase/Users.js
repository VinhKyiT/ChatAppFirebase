import Firebase from './firebaseConfig';

export const AddUser = async (name, email, image, uuid) => {
  return await Firebase.database()
    .ref('users/' + uuid)
    .set({
      uuid,
      name,
      email,
      image,
    });
};

export const UpdateUserImage = async (image, uuid) => {
  return await Firebase.database()
    .ref('users/' + uuid)
    .update({
      image,
    });
};
