import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './styles';

export default class SplashScreen extends React.Component  {
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
