import React from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import BottomDrawer from 'rn-bottom-drawer';
import styles from './styles';
let accountIdsRef = db.ref('/accountIds');
let friedsIdsRef = db.ref('/friends');
let likesIdsRef = db.ref('/likes');

export default class MapScreen extends React.Component  {
    // static navigationOptions = {
    //   title: 'Map'
    // };

    state = {
      currentUserId: "007",
      friends: [],
      likes: []
    };

    componentDidMount() {
      friedsIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let allFriends = Object.values(data);
        let friends = [];
        // Collect all friends of a given user
        allFriends.forEach(pair => {
          if (pair.userId == this.state.currentUserId){
            friends.push(pair.friendId);
          }
        })
        this.setState({ friends });
      });
      likesIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let allLikes = Object.values(data);
        //Filters likes that belong to the user's friends
        let likes = allLikes.filter(like => this.state.friends.includes(like.userId));
        this.setState({ likes });
      });

    }

    render() {
      return (
        <View style= {{flex:1}}>
          <MapView
            style={{flex:1} }
            customMapStyle={mapStyle}
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
                  //description=should be tagged location
                  pinColor="#EC1561"
                />
              )
            })}
          </MapView>

          <BottomDrawer containerHeight={100} offset={8}>
            <Text>Hi!  i'm a drawer!!!</Text>
          </BottomDrawer>

        </View>
      );
    }
  };


var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#b08155"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.icon",
    "stylers": [
      {
        "color": "#b0489d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#3fb0aa"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
