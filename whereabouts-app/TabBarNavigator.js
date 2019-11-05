// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { StyleSheet, View, UIManager } from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MapScreen from './src/components/reactComponents/MapScreen';
// import MapListScreen from './src/components/reactComponents/MapListScreen';
// import LikesListScreen from './src/components/reactComponents/LikesListScreen';
// import AddAccount from './src/components/reactComponents/AddAccount';
//
// export const TabNavigator = createMaterialBottomTabNavigator(
//     {
//         MapScreen: { screen: MapScreen,
//             navigationOptions:{
//                 tabBarLabel:'Map',
//                 tabBarIcon: ({ tintColor }) => (
//                     <View>
//                         <Icon style={[{color: tintColor}]} size={25} name={'ios-map'}/>
//                     </View>),
//             }
//         },
//         MapListScreen: { screen: MapListScreen,
//             navigationOptions:{
//                 tabBarLabel:'List',
//                 tabBarIcon: ({ tintColor }) => (
//                     <View>
//                         <Icon style={[{color: tintColor}]} size={25} name={'ios-list'}/>
//                     </View>),
//             }
//         },
//         LikesListScreen: {
//             screen: LikesListScreen,
//             navigationOptions:{
//                 tabBarLabel:'Likes',
//                 tabBarIcon: ({ tintColor }) => (
//                     <View>
//                         <Icon style={[{color: tintColor}]} size={25} name={'ios-heart'}/>
//                     </View>),
//             }
//         },
//     },
//     {
//       initialRouteName: "MapScreen",
//       activeColor: '#3BA3F8',
//       inactiveColor: '#D2EAFF',
//       barStyle: { backgroundColor: '#191E80' },
//     },
// );
//
//
// export default class TabBarNavigator extends React.Component {
//     render() {
//       return (
//         <AppContainer />
//       );
//     }
//   };
