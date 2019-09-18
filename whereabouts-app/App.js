import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


class SplashScreen extends React.Component  {

  static navigationOptions = {
    title: 'Splash Screen',
  };
  render() {
    return (
      <View style= {styles.container} >
        <Text>Splish Splash!</Text>
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
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
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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
        <Button
          title="Go to Map"
          onPress={() => this.props.navigation.navigate('Map')}
        />
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
    title: 'Map List Screen',
  };
  render() {
    return (
      <View style= {styles.container}>
        <Text>List of Map Pin Data</Text>

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
