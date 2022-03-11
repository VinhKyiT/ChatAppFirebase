import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Text, SearchBar, Icon} from 'react-native-elements';
import Header from '../../Components/Header';
import styles from './styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Firebase from '../../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/auth';

const UserItem = ({data, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          username: data.name,
          theirUid: data.uuid,
        })
      }>
      <View style={styles.listItem} key={data?.uuid}>
        <Avatar
          size={50}
          rounded
          source={{
            uri: data.image
              ? data.image
              : 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <View style={styles.textWrapper}>
          <Text style={{fontWeight: '700', fontSize: 16}}>{data.name}</Text>
        </View>
        <View style={styles.lastMessageTime}>
          <Icon name="hand-point-right" type="font-awesome-5" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const UserList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = async () => {
    try {
      await Firebase.database()
        .ref('users')
        .on('value', async snapshot => {
          const uuid = await AsyncStorage.getItem('uid');
          console.log(uuid);
          let userList = [];
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.val().uuid !== uuid) {
              userList.push({
                name: childSnapshot.val().name,
                uuid: childSnapshot.val().uuid,
                image: childSnapshot.val().image,
              });
            } else {
              setUser({
                name: childSnapshot.val().name,
                uuid: childSnapshot.val().uuid,
                image: childSnapshot.val().image,
              });
            }
          });
          setUsers(userList);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Header user={user} navigation={navigation} />
      <SearchBar
        placeholder="Enter user..."
        value={search}
        onChangeText={e => setSearch(e)}
        containerStyle={{
          padding: 0,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: '#ccc',
          margin: 5,
          borderRadius: 50,
        }}
      />
      {users.length > 0 ? (
        <FlatList
          style={styles.list}
          data={users}
          renderItem={({item}) => (
            <UserItem data={item} navigation={navigation} />
          )}
          keyExtractor={item => item.uuid}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaProvider>
  );
};

export default UserList;
