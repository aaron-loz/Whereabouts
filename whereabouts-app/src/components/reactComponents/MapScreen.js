import React from 'react';
import { Text, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles';
let accountIdsRef = db.ref('/accountIds');
let friedsIdsRef = db.ref('/friends');
let likesIdsRef = db.ref('/likes');

export default class MapScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map'
    };

    state = {
      accounts: [],
      friends: [],
      likes: []
    };

    componentDidMount() {
      accountIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let accounts = Object.values(data);
        this.setState({ accounts });
      });
      likesIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let likes = Object.values(data);
        this.setState({ likes });
      });

    }

    render() {
      return (
        <View style= {{flex:1}}>
          <Text style={styles.title}>This is a Map!</Text>
          <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={{
              latitude: 40.763392,
              longitude: -73.970483,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {this.state.likes.map((obj, index) => {
              return (
                <MapView.Marker
                  key = {index}
                  coordinate={obj.location.coordinates}
                  title={obj.userId}
                />
              )
            })}
          </MapView>
        </View>
      );
    }
  };
