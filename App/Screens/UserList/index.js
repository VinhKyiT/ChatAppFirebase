import {View, FlatList, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Text, SearchBar} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import styles from './styles';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const data = [
  {
    id: 1,
    name: 'Username',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    time: '12:00',
  },
  {
    id: 2,
    name: 'Username 2',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    time: '12:00',
  },
];

const UserItem = ({data}) => {
  return (
    <View style={styles.listItem}>
      <Avatar size={50} rounded source={{uri: data.image}} />
      <View style={styles.textWrapper}>
        <Text style={{fontWeight: '700', fontSize: 16}}>{data.name}</Text>
      </View>
      <View style={styles.lastMessageTime}>
        <Text>{data.time}</Text>
      </View>
    </View>
  );
};

const UserList = () => {
  const [search, setSearch] = useState('');

  const renderItems = ({item}) => {
    return <UserItem data={item} />;
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <Header user={data} />
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
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItems}
        keyExtractor={item => item.id}
      />
    </SafeAreaProvider>
  );
};

export default UserList;
