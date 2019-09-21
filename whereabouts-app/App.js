import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SplashScreen from './src/components/reactComponents/SplashScreen';
import LoginScreen from './src/components/reactComponents/LoginScreen';
import HomeScreen from './src/components/reactComponents/HomeScreen';
import MapScreen from './src/components/reactComponents/MapScreen';
import MapListScreen from './src/components/reactComponents/MapListScreen';
import LikesListScreen from './src/components/reactComponents/LikesListScreen';

const AppNavigator = createStackNavigator({
  Splash: SplashScreen,
  Login: LoginScreen,
  Home: HomeScreen,
  Map: MapScreen,
  MapList: MapListScreen,
  Likes: LikesListScreen,
},
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#49C9FF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});


const TabNavigation =  createBottomTabNavigator(
  {
    Map: MapScreen,
    MapList: MapListScreen,
    Likes: LikesListScreen,
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
        //You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'grey',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 14,
        fontWeight: '500',
        textAlignVertical: 'top'
      },
      style: {
        backgroundColor: 'blue',
      },
      tabStyle: {
        height: 49
      },
    },
  }
)
const AppContainer = createAppContainer(TabNavigation);

export default class App extends React.Component {
  render() {
    //return <StartContainer />;
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
