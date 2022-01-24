import React from 'react';
import {View, Text} from 'react-native';
import ChatList from '../ChatList';
import styles from './styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <ChatList />
    </View>
  );
};

export default Home;
