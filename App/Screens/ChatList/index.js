import {View, FlatList} from 'react-native';
import React from 'react';
import {Avatar, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

const data = [
  {
    id: 1,
    name: 'Username',
    message: 'Message',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    time: '12:00',
  },
  {
    id: 2,
    name: 'Username 2',
    message: 'Message 2',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    time: '12:00',
  },
];

const ChatItem = ({data}) => {
  return (
    <View style={styles.listItem}>
      <Avatar size={50} rounded source={{uri: data.image}} />
      <View style={styles.textWrapper}>
        <Text style={{fontWeight: '700', fontSize: 16}}>{data.name}</Text>
        <Text>{data.message}</Text>
      </View>
      <View style={styles.lastMessageTime}>
        <Text>{data.time}</Text>
      </View>
    </View>
  );
};

const ChatList = () => {
  const renderItems = ({item}) => {
    return <ChatItem data={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItems}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default ChatList;
