import React from 'react';
import { Text, View } from 'react-native';
import ItemComponent from './ItemComponent';
import { db } from '../../config/firebaseConfig';
let itemsRef = db.ref('/items');
import styles from './styles';

export default class MapScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map Screen'
    };
  
    state = {
      items: []
    };
  
    componentDidMount() {
      itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      });
    }
  
    render() {
      return (
        <View style= {styles.container}>
          <Text>
            {this.state.items.length > 0 ? (
              <ItemComponent items={this.state.items} />
            ) : (
              <Text>No items</Text>
            )}
          </Text>
          <Text>This is a Map!</Text>
        </View>
      );
    }
  };