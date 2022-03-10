import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  chatName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftComponent: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  inputArea: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: -20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 7,
  },
});

export default styles;
