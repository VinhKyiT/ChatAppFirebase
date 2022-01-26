import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ChatList from '../ChatList';
import styles from './styles';
import UserList from './../UserList/index';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Home = () => {
  const Tab = createBottomTabNavigator();
  const [index, setIndex] = useState(0);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Chat"
        component={ChatList}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({color, size}) => (
            <Icon
              color={color}
              name="comments"
              size={size}
              type="font-awesome"
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserList}
        options={{
          tabBarLabel: 'People',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} name="users" size={size} type="font-awesome" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
