import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class LikesListScreen extends React.Component  {
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