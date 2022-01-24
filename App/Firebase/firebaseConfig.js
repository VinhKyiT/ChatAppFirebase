import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBn7u6IIYWDAD5xmakgQElnzNdx_D5pzqc',
  databaseURL:
    'https://reactnativechatapp-2d827-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'reactnativechatapp-2d827',
  appId: '1:1077793667098:android:f1587d3ad37394f6d039a3',
};

export default firebase.initializeApp(firebaseConfig);
