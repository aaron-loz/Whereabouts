import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



class SplashScreen extends React.Component  {

  static navigationOptions = {
    title: 'Splash Screen',
  };
  render() {
    return (
      <View style= {styles.container} >
        <Text>Splish Splash!</Text>
      </View>
    );
  }
};

class LoginScreen extends React.Component  {

  static navigationOptions = {
    title: 'Login Screen',
  };
  render() {
    return (
      <View style= {styles.container} >
        <Text>Welcome!</Text>
      </View>
    );
  }
};

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home Screen',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
};


class MapScreen extends React.Component  {
  static navigationOptions = {
    title: 'Map Screen',
  };
  render() {
    return (
      <View style= {styles.container}>
        <Text>This is a Map!</Text>
      </View>
    );
  }
};

class MapListScreen extends React.Component  {
  static navigationOptions = {
    title: 'Map Screen',
  };
  render() {
    return (
      <View style= {styles.container}>
        <Text>List of Map Pin Data</Text>
      </View>
    );
  }
};

class FriendsListScreen extends React.Component  {
  static navigationOptions = {
    title: 'Friends List Screen',
  };
  render() {
    return (
      <View style= {styles.container}>
        <Text>Here are all of your Friends!</Text>
      </View>
    );
  }
};

class LikesListScreen extends React.Component  {
  static navigationOptions = {
    title: 'Likes List Screen',
  };
  render() {
    return (
      <View style= {styles.container}>
        <Text>Here are all of your Likes!</Text>
      </View>
    );
  }
};

const AppNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  Map: {
    screen: MapScreen,
  },
  MapList: {
    screen: MapListScreen,
  },
  Friends: {
    screen: FriendsListScreen,
  },
  Likes: {
    screen: LikesListScreen,
  },
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
