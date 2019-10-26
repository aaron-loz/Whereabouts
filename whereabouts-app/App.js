import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TwitterLogin from './src/components/reactComponents/TwitterLogin';
//import SplashScreen from './src/components/reactComponents/SplashScreen';
import LoginScreen from './src/components/reactComponents/LoginScreen';
import HomeScreen from './src/components/reactComponents/HomeScreen';
import MapScreen from './src/components/reactComponents/MapScreen';
import MapListScreen from './src/components/reactComponents/MapListScreen';
import LikesListScreen from './src/components/reactComponents/LikesListScreen';
import AddAccount from './src/components/reactComponents/AddAccount';

// const AppNavigator = createStackNavigator({
//
//   Login: LoginScreen,
//   Home: HomeScreen,
//   Map: MapScreen,
//   MapList: MapListScreen,
//   Likes: LikesListScreen,
//   Tweet: TwitterLogin,
// },
//   {
//     initialRouteName: 'Login',
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: '#191E80',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
// });


const TabNavigation =  createBottomTabNavigator(
  {
    Login: LoginScreen,
    Map: MapScreen,
    MapList: MapListScreen,

    Likes: LikesListScreen,
    //AddAccount: AddAccount,
    //Tweet: TwitterLogin,

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'MapScreen') {
          iconName = 'ios-information-circle$';
        } else if (routeName === 'MapListScreen') {
          iconName = 'ios-options';
        } else if (routeName === 'LikesListScreen') {
          iconName = 'ion-md-heart';
        }
        else if(routeName === 'LoginScreen'){
          iconName = 'ion-md-heart';
        }
        //You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#8EC9FB',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 14,
        fontWeight: '500',
        textAlignVertical: 'top'
      },
      style: {
        backgroundColor: '#191E80',
      },
      tabStyle: {
        height: 39
      },
    },
  }
)
const AppContainer = createAppContainer(TabNavigation);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
