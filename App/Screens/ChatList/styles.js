import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    width: '100%',
  },
  textWrapper: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  lastMessageTime: {
    alignSelf: 'center',
    position: 'absolute',
    right: 20,
  },
});

export default styles;
