import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Input, Text, useTheme, Image, Button} from 'react-native-elements';
import 'firebase/compat/auth';
import {emailValidation} from '../../Utils/validation';

import {LoginUser} from '../../Firebase/LoginUser';

const Login = ({navigation}) => {
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

  const onEmailChange = text => {
    setEmail(text);
    if (error.email === 'Email is not valid') {
      emailValidate();
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

  const onPasswordChange = text => {
    setPassword(text);
    if (error.password === 'Password must be at least 6 characters') {
      passwordValidate();
    }
  };

  const onLogin = () => {
    if (email && password) {
      LoginUser(password, email)
        .then(res => {
          if (res.user) {
            navigation.navigate('Home');
          } else {
            alert(res.toString().split(':')[2].trim());
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
          Email
        </Text>
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'user',
            color: '#333',
            size: 18,
          }}
          placeholder="Enter email"
          value={email}
          onChangeText={v => onEmailChange(v)}
          onBlur={() => emailValidate()}
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
          secureTextEntry={true}
          onBlur={() => passwordValidate()}
          errorMessage={error.password}
        />
        <Button
          title="Login"
          onPress={() => onLogin()}
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
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[{color: theme?.colors?.primary}, styles.toSignUp]}>
            Don't have account? Create now!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
