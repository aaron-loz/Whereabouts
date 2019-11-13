import React from 'react';
import { Alert, Image, Modal, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import BottomDrawer from 'rn-bottom-drawer';
import styles from './styles';
let accountIdsRef = db.ref('/accountIds');
let friedsIdsRef = db.ref('/friends');
let twitsIdsRef = db.ref('/twits');

import likeimg from '../images/like.png';
import boilerdata from './boilerdata.js'

// TO DO:
//  link data from map to map list
//     ( move boiler plate data to separate file, import to map, import to
//      map list until data can be generated from twitter )
//  stylize BottomDrawer
//  create icon for bottom drawer when inactive
//  only activate bottom drawer when location is clicked
//


export default class MapScreen extends React.Component  {

    state = {
      currentUserId: "1186364677254795270",
      friends: [],
      twits: []
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
      twitsIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let allTwits = Object.values(data);
        //Filters twits that belong to the user's friends
        let twits = allTwits.filter(twit => this.state.friends.includes(twit.user_id_str));
        this.setState({ twits });
      });
    }

    addLikeData = () => {

      Alert.alert(
        'Liked!',
        'this item will be added to your like list',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
      // To Do: add item to Like List Array
      // ......
      // this.likeArray.push({title : this.state.textInput_Holder});
      // this.setState({ arrayHolder: [...this.array] })

    }

    render() {
      return (
        <View style= {{flex:1}}>
          <MapView
            style={{flex:1} }
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation = {true}
            initialRegion={{
              latitude: 40.763392,
              longitude: -73.970483,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >

            {this.state.likes.map((obj, index) => { //index is id of tweet

              let lat = (obj.place.bounding_box.coordinates[0][0][1] + obj.place.bounding_box.coordinates[0][1][1] +
                         obj.place.bounding_box.coordinates[0][2][1] + obj.place.bounding_box.coordinates[0][3][1])/4;
              let lon = (obj.place.bounding_box.coordinates[0][0][0] + obj.place.bounding_box.coordinates[0][1][0] +
                         obj.place.bounding_box.coordinates[0][2][0] + obj.place.bounding_box.coordinates[0][3][0])/4;
              return (
                <MapView.Marker
                  key = {index}
                  coordinate={{latitude: lat, longitude: lon}}
                  title={obj.user_screen_name}
                  description= {obj.text}
                  pinColor={"#EC1561"}
                  backgroundColor = {'#8EC9FB'}
                  tracksViewChanges = {false}
                >
                  <Callout tooltip={true} >
                    <View style={styles.r_container} key = {index}>

                      <View style={styles.r_container_text}>
                        <Text style={styles.r_title}>@{obj.user_screen_name}</Text>
                        <Text numberOfLines={1} style={styles.r_description}>{obj.text}</Text>

                      </View>

                    </View>
                  </Callout>
                </MapView.Marker>
              )
            })}
          </MapView>

          <BottomDrawer containerHeight={800}
            offset={10}
            backgroundColor={'#8EC9FB'}
            startUp = {false}>
              {this.state.twits.map((obj, index) => {
                  return (
                    <View style={styles.r_container} key = {index}>
                      <Image source={{ uri: obj.user_profile_image_url_https }} style={styles.r_photo} />
                      <View style={styles.r_container_text}>
                        <Text style={styles.r_title}>@{obj.user_screen_name}</Text>
                        <Text numberOfLines={1} style={styles.r_description}>{obj.text}</Text>
                        <Text style={styles.r_location}>{obj.place.name}</Text>
                      </View>
                      <TouchableOpacity onPress={this.addLikeData} activeOpacity={0.7} >
                        <Image source={likeimg} style={styles.r_photo} />
                      </TouchableOpacity>
                    </View>
                  )
                })}
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
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
