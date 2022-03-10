import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, Icon, Avatar} from 'react-native-elements';
import styles from './styles';

const Header = ({user, navigation}) => {
  return (
    <HeaderRNE
      leftComponent={
        <View styles={styles.leftAvatar}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', {user})}>
            <Avatar
              size={24}
              rounded
              source={{
                uri: user.image || 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </TouchableOpacity>
        </View>
      }
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity style={{marginLeft: 10}}>
            <Icon type="font-awesome" name="edit" color="white" />
          </TouchableOpacity>
        </View>
      }
      centerComponent={{text: 'Chat App', style: styles.heading}}
    />
  );
};

export default Header;
