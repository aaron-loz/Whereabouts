import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, UIManager } from 'react-native';
import { StackNavigator, createSwitchNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
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

export const TabNavigator = createMaterialBottomTabNavigator(
    {
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
      //   TwitterLogin: {
      //     screen: TwitterLogin,
      //     navigationOptions:{
      //         tabBarLabel:'login',
      //         tabBarIcon: ({ tintColor }) => (
      //             <View>
      //                 <Icon style={[{color: tintColor}]} size={25} name={'ios-list'}/>
      //             </View>),
      //     }
      // },
    },{
      initialRouteName: "MapScreen",
      activeColor: '#3BA3F8',
      inactiveColor: '#D2EAFF',
      barStyle: { backgroundColor: '#191E80' },
    },
);

const AuthenticationNavigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
  },{
    defaultNavigationOptions: {
      header: null,
    }
  },
);

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationNavigator,
  Home: TabNavigator,
});

export default AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
