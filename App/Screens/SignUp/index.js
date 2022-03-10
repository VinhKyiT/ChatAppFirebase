import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  Input,
  Icon,
  Text,
  useTheme,
  Image,
  Button,
} from 'react-native-elements';
import Firebase from '../../Firebase/firebaseConfig';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SignUpUser} from '../../Firebase/SignUp';
import {AddUser} from '../../Firebase/Users';
import {emailValidation} from '../../Utils/validation';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const {theme} = useTheme();

  const emailValidate = () => {
    if (!emailValidation(email)) {
      setError({
        ...error,
        email: 'Email is not valid',
      });
    } else {
      setError({
        ...error,
        email: '',
      });
    }
  };

  const passwordValidate = () => {
    if (password.length < 6) {
      setError({
        ...error,
        password: 'Password must be at least 6 characters',
      });
    } else {
      setError({
        ...error,
        password: '',
      });
    }
  };

  const onEmailChange = text => {
    setEmail(text);
    if (error.email === 'Email is not valid') {
      emailValidate();
    }
  };

  const onPasswordChange = text => {
    setPassword(text);
    if (error.password === 'Password must be at least 6 characters') {
      passwordValidate();
    }
  };

  const onSignup = () => {
    if (username && email && password) {
      SignUpUser(password, email)
        .then(res => {
          const currentUser = Firebase.auth().currentUser;
          if (currentUser) {
            AddUser(username, email, '', currentUser.uid)
              .then(async () => {
                await AsyncStorage.setItem('uid', currentUser.uid);
              })
              .catch(err => {
                console.log(err);
              });
            navigation.navigate('Home');
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={{marginTop: 64}} />
        <Image
          source={require('../../Assets/Images/chat.png')}
          style={{width: 100, height: 100}}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text
          style={[
            {color: theme?.colors?.primary},
            {fontWeight: '700', fontSize: 18},
          ]}>
          Username
        </Text>
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'user',
            color: '#333',
            size: 18,
          }}
          placeholder="Enter username"
          value={username}
          onChangeText={v => setUsername(v)}
        />
        <Text
          style={[
            {color: theme?.colors?.primary},
            {fontWeight: '700', fontSize: 18},
          ]}>
          Email
        </Text>
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: '#333',
            size: 15,
          }}
          placeholder="Enter Email"
          value={email}
          onChangeText={v => onEmailChange(v)}
          onBlur={() => emailValidate(email)}
          errorMessage={error.email}
        />
        <Text
          style={[
            {color: theme?.colors?.primary},
            {fontWeight: '700', fontSize: 18},
          ]}>
          Password
        </Text>
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'lock',
            color: '#333',
            size: 18,
          }}
          placeholder="Enter Password"
          value={password}
          onChangeText={v => onPasswordChange(v)}
          onBlur={() => passwordValidate(password)}
          errorMessage={error.password}
          secureTextEntry={true}
        />
        <Button
          title="Sign Up"
          onPress={() => onSignup()}
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 50,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 50,
            marginVertical: 10,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[{color: theme?.colors?.primary}, styles.toLogin]}>
            Already have an account? Login now!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
