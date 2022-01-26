import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, Icon, Avatar} from 'react-native-elements';
import styles from './styles';

const Header = ({user}) => {
  return (
    <HeaderRNE
      leftComponent={
        <View styles={styles.leftAvatar}>
          <TouchableOpacity>
            <Avatar size={24} rounded source={{uri: user[0].image}} />
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
