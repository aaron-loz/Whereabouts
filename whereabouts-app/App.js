import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TwitterLogin from './src/components/reactComponents/TwitterLogin';
//import SplashScreen from './src/components/reactComponents/SplashScreen';
import LoginScreen from './src/components/reactComponents/LoginScreen';
import HomeScreen from './src/components/reactComponents/HomeScreen';
import MapScreen from './src/components/reactComponents/MapScreen';
import MapListScreen from './src/components/reactComponents/MapListScreen';
import LikesListScreen from './src/components/reactComponents/LikesListScreen';
import AddAccount from './src/components/reactComponents/AddAccount';
import TabBarNavigation from './src/components/reactComponents/TabBarNavigator'

const TabNavigator = createMaterialBottomTabNavigator(
    {
        LoginScreen: { screen: LoginScreen,
            navigationOptions:{
                tabBarLabel:'Login',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>
                    </View>),
            }
        },
        MapScreen: { screen: MapScreen,
            navigationOptions:{
                tabBarLabel:'Map',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-map'}/>
                    </View>),
            }
        },
        MapListScreen: { screen: MapListScreen,
            navigationOptions:{
                tabBarLabel:'List',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-list'}/>
                    </View>),
            }
        },
        LikesListScreen: {
            screen: LikesListScreen,
            navigationOptions:{
                tabBarLabel:'Likes',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'}/>
                    </View>),
            }
        },
    },
    {
      initialRouteName: "LoginScreen",
      activeColor: '#3BA3F8',
      inactiveColor: '#D2EAFF',
      barStyle: { backgroundColor: '#191E80' },
    },
);

const AppContainer = createAppContainer(TabNavigator);

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
