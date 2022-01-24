import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import SignUp from '../SignUp';

const AuthStack = createNativeStackNavigator(
  {
    Login,
    SignUp,
  },
  {
    headerMode: 'none',
    initalRouteName: 'Login',
  },
);

export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};
