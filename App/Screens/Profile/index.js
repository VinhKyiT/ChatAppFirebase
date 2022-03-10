import React, {useState} from 'react';
import {Button, Header, Icon, Image, Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import Firebase from '../../Firebase/firebaseConfig';
import 'firebase/compat/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UpdateUserImage} from '../../Firebase/Users';
import ImgToBase64 from 'react-native-image-base64';

const ListHeader = ({user}) => {
  const [imageUrl, setImageUrl] = useState('');
  const openGallery = () => {
    launchImageLibrary('photo', res => {
      if (res.assets) {
        ImgToBase64.getBase64String(res.assets[0].uri)
          .then(async base64String => {
            const uid = await AsyncStorage.getItem('uid');
            let source = 'data:image/jpeg;base64,' + base64String;
            UpdateUserImage(source, uid).then(() => {
              setImageUrl(res.assets[0].uri);
            });
          })
          .catch(err => console.log(err));
      }
    });
  };
  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Image
        source={{
          uri: user.image
            ? user.image
            : 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={{width: 100, height: 100, borderRadius: 50}}
        onPress={() => openGallery()}
      />
      <Text h4 style={{marginTop: 10}}>
        {user.name}
      </Text>
    </View>
  );
};

const ListFooter = ({navigation}) => {
  const logOut = async () => {
    await Firebase.auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('uid');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Button
        title="Logout"
        buttonStyle={{backgroundColor: 'rgba(214, 61, 57, 1)'}}
        containerStyle={{
          height: 40,
          width: 200,
          marginHorizontal: 50,
          marginVertical: 30,
        }}
        titleStyle={{color: 'white', marginHorizontal: 20}}
        onPress={() => logOut()}
      />
    </View>
  );
};

const MainMenu = ({data}) => {
  return (
    <View style={styles.menuList}>
      <Text>{data}</Text>
    </View>
  );
};

const Profile = ({navigation, route}) => {
  const data = ['Menu 1', 'Menu 2', 'Menu 3'];
  const {user} = route.params;
  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <FlatList
        data={data}
        renderItem={({item}) => <MainMenu data={item} />}
        ListHeaderComponent={() => <ListHeader user={user} />}
        ListFooterComponent={() => <ListFooter navigation={navigation} />}
      />
    </SafeAreaProvider>
  );
};

export default Profile;
