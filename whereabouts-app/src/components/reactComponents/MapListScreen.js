import React from 'react';
import { Text, View, TouchableHighlight  } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';

let addItem = item => {
    db.ref('/items').push({
      name: item
    });
  };

export default class MapListScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map List Screen',
    };
    
    state = {
      name: 'Hello'
    };

    handleSubmit = () => {
      addItem(this.state.name);
    };

    render() {
      return (
        <View style= {styles.container}>
          <Text>List of Map Pin Data</Text>
          <TouchableHighlight
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text>Click on this sentense to add Hello to db</Text>
          </TouchableHighlight>
  
        </View>
      );
    }
  };