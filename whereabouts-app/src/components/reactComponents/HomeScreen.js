import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class HomeScreen extends React.Component {
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
