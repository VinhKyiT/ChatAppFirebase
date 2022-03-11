import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, Text, SearchBar} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styles from './styles';
import Header from './../../Components/Header/index';
import {useIsFocused} from '@react-navigation/native';
import Firebase from '../../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const ChatItem = ({data, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ChatScreen', {
          username: data.name,
          theirUid: data.uuid,
        })
      }>
      <View style={styles.listItem}>
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
          <Text>{data.lastMessage}</Text>
        </View>
        <View style={styles.lastMessageTime}>
          <Text>{data.lastMessageTime.split('at')[1]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ChatList = ({navigation}) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();

  const getChats = async () => {
    let chatList = [];
    let lastMessage = '';
    let lastMessageTime = '';
    let properDate = '';
    const uuid = await AsyncStorage.getItem('uid');
    try {
      await Firebase.database()
        .ref('users')
        .on('value', async snapshot => {
          let newUser = {
            uuid: '',
            name: '',
            image: '',
            lastMessage: '',
            lastMessageTime: '',
            properDate: '',
          };
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.val().uuid !== uuid) {
              Firebase.database()
                .ref('messages')
                .child(uuid)
                .child(childSnapshot.val().uuid)
                .orderByKey()
                .limitToLast(1)
                .on('value', snapshot => {
                  if (snapshot.val()) {
                    snapshot.forEach(child => {
                      lastMessage =
                        child.val().image !== ''
                          ? child.val().currentUid === uuid
                            ? 'You: Photo'
                            : 'Photo'
                          : child.val().currentUid === uuid
                          ? `You: ${child.val().message}`
                          : child.val().message;
                      lastMessageTime = child.val().timestamp;
                      properDate = child.val().properDate;
                    });
                  } else {
                    lastMessage = '';
                    lastMessageTime = '';
                  }
                  newUser.uuid = childSnapshot.val().uuid;
                  newUser.name = childSnapshot.val().name;
                  newUser.image = childSnapshot.val().image;
                  newUser.lastMessage = lastMessage;
                  newUser.properDate = properDate;
                  newUser.lastMessageTime = lastMessageTime;
                  if (newUser.lastMessage !== '') {
                    chatList.forEach(item => {
                      if (item.uuid === newUser.uuid) {
                        chatList.splice(chatList.indexOf(item), 1);
                      }
                    });
                    chatList.push({...newUser});
                    const finalChats = chatList.sort(
                      (a, b) => b.properDate - a.properDate,
                    );
                    setChats(finalChats);
                    setIsLoading(false);
                  }
                });
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getChats();
    }
  }, [navigation, isFocused]);

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
        inputStyle={{color: '#000'}}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={chats}
          renderItem={({item}) => (
            <ChatItem data={item} navigation={navigation} />
          )}
          keyExtractor={item => item.uuid}
        />
      )}
    </SafeAreaProvider>
  );
};

export default ChatList;
