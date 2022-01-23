import React, {useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {
  Input,
  Icon,
  Text,
  useTheme,
  Image,
  Button,
} from 'react-native-elements';

import {SignUp} from '../../Firebase/SignUp';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();

  const onLogin = () => {
    if (username && email && password) {
      SignUp(password, email)
        .then(res => {
          navigation.navigate('Home');
          console.warn(res);
        })
        .catch(err => {
          console.warn(err);
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
          onChangeText={v => setEmail(v)}
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
          onChangeText={v => setPassword(v)}
          secureTextEntry={true}
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
      </View>
    </View>
  );
};

export default Login;
