import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';

const screens = {
    Login : {
        screen: Home
    }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);