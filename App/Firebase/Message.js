import Firebase from './firebaseConfig';
import moment from 'moment';

export const SendMessage = async (currentUid, theirUid, message, image) => {
  return await Firebase.database()
    .ref('messages/' + currentUid)
    .child(theirUid)
    .push({
      currentUid,
      theirUid,
      message,
      image,
      timestamp: moment().format('DD/MM/YYYY [at] hh:mm'),
      properDate: Date.parse(moment().format()),
    });
};

export const ReceiveMessage = async (currentUid, theirUid, message, image) => {
  return await Firebase.database()
    .ref('messages/' + theirUid)
    .child(currentUid)
    .push({
      currentUid,
      theirUid,
      message,
      image,
      timestamp: moment().format('DD/MM/YYYY [at] hh:mm'),
      properDate: Date.parse(moment().format()),
    });
};
