import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

export default class LoginScreen extends React.Component  {
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