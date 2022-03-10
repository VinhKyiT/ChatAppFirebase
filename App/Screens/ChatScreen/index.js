import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Header as HeaderRNE, Icon, Input, Image} from 'react-native-elements';
import styles from './styles';
import {SendMessage, ReceiveMessage} from '../../Firebase/Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firebaseConfig from '../../Firebase/firebaseConfig';
import ImgToBase64 from 'react-native-image-base64';
import {GetDate, GetTime} from '../../Utils/TimeConverter';

const LeftComponent = ({navigation, username}) => {
  return (
    <View style={styles.leftComponent}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon type="font-awesome-5" name="arrow-left" color="white" size={20} />
      </TouchableOpacity>
      <Text style={styles.chatName}>
        {username.length > 18 ? `${username.substr(0, 18)}...` : username}
      </Text>
    </View>
  );
};

const ChatScreen = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUid, setCurrentUid] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {username, theirUid} = route.params;

  const openGallery = () => {
    launchImageLibrary('photo', res => {
      if (res.assets) {
        ImgToBase64.getBase64String(res.assets[0].uri)
          .then(async base64String => {
            let source = 'data:image/jpeg;base64,' + base64String;
            SendMessage(currentUid, theirUid, '', source)
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
            ReceiveMessage(currentUid, theirUid, '', source)
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => console.log(err));
      }
    });
  };

  const sendMessage = async message => {
    if (message) {
      SendMessage(currentUid, theirUid, message, '')
        .then(() => {
          setMessage('');
        })
        .catch(err => {
          console.log(err);
        });
      ReceiveMessage(currentUid, theirUid, message, '')
        .then(() => {
          setMessage('');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const ChatItem = ({item}) => {
    const [timeToggle, setTimeToggle] = useState(false);
    return (
      <View>
        {/* <Animated.View>
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: 5,
              opacity: timeToggle ? 1 : 0,
            }}>
            {item.timestamp}
          </Text>
        </Animated.View> */}
        <View
          style={{
            maxWidth: Dimensions.get('window').width / 2 + 10,
            alignSelf: currentUid === item.sender ? 'flex-end' : 'flex-start',
            marginVertical: 3,
          }}>
          <TouchableOpacity onPress={() => setTimeToggle(!timeToggle)}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
              }}>
              {item.image ? (
                <Image
                  style={{
                    width: Dimensions.get('window').width / 2 + 10,
                    height: 150,
                    borderRadius: 20,
                    resizeMode: 'cover',
                  }}
                  source={{uri: item.image}}
                />
              ) : (
                <Text
                  style={{
                    color: '#000',
                    padding: 10,
                    fontSize: 16,
                  }}>
                  {item.message}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getCurrentUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      setCurrentUid(uid);
      firebaseConfig
        .database()
        .ref('messages')
        .child(uid)
        .child(theirUid)
        .on('value', snapshot => {
          let listMessages = [];
          snapshot.forEach(data => {
            listMessages.push({
              message: data.val().message,
              sender: data.val().currentUid,
              receiver: data.val().theirUid,
              timestamp: data.val().timestamp,
              image: data.val().image,
            });
          });
          setMessages(listMessages.reverse());
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUid();
  }, []);

  return (
    !isLoading && (
      <View style={{flex: 1}}>
        <HeaderRNE
          containerStyle={{
            flexDirection: 'row',
            paddingBottom: 30,
            paddingHorizontal: 15,
          }}
          leftComponent={
            <LeftComponent navigation={navigation} username={username} />
          }
          leftContainerStyle={{
            justifyContent: 'space-between',
            flex: 1,
            position: 'absolute',
            top: 20,
          }}
          rightComponent={
            <>
              <View style={{marginRight: 15}}>
                <TouchableOpacity>
                  <Icon
                    type="font-awesome-5"
                    name="phone-alt"
                    color="white"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginRight: 10}}>
                <TouchableOpacity>
                  <Icon
                    type="font-awesome-5"
                    name="video"
                    color="white"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </>
          }
          rightContainerStyle={{
            position: 'absolute',
            right: 0,
            top: 20,
            flexDirection: 'row',
          }}
        />
        <View style={styles.container}>
          <FlatList
            inverted
            data={messages}
            style={{marginBottom: 80, marginHorizontal: 10}}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <ChatItem item={item} />}
          />
          <View style={styles.inputArea}>
            <Input
              placeholder="Enter message"
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={styles.input}
              value={message}
              rightIcon={
                <TouchableOpacity
                  onPress={() => {
                    sendMessage(message);
                  }}>
                  <Icon
                    type="font-awesome-5"
                    name="paper-plane"
                    color="black"
                    size={22}
                    solid
                  />
                </TouchableOpacity>
              }
              leftIcon={
                <TouchableOpacity onPress={() => openGallery()}>
                  <Icon
                    type="font-awesome-5"
                    name="camera"
                    color="black"
                    size={22}
                    solid
                  />
                </TouchableOpacity>
              }
              onChangeText={text => setMessage(text)}
            />
          </View>
        </View>
      </View>
    )
  );
};

export default ChatScreen;
