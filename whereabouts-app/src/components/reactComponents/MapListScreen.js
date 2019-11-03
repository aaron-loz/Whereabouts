import React from 'react';
import { Alert, FlatList, Image, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
//import CustomRow from './CustomRow';
import styles from './styles';
import likeimg from '../images/like.png';
import boilerdata from './boilerdata.js'
let accountIdsRef = db.ref('/accountIds');
let friedsIdsRef = db.ref('/friends');
let likesIdsRef = db.ref('/likes');
import {getAccountIdsTable, checkHasAccountId, addAccountIds, 
  getFriendsTable, checkHasUserIdAndFriendId, addFriends,
  getLikesTable, checkHasLikes, addLike} from '../firebase/firebaseApi'


//To Do:
//  complete page style - spacing at top
//  get data directly from map
//  write function addlikedata to add likes
//  move addLikeData to separate file and import

export default class MapListScreen extends React.Component  {
    // static navigationOptions = {
    //   title: 'Map List',
    // };

    state = {
      currentUserId: "1186364677254795270",
      friends: [],
      likes: []
    };

    async componentDidMount() {
      let tableFriends = await getFriendsTable();
      let data = tableFriends.val();
      let allFriends = Object.values(data);
      let friends = [];
      allFriends.forEach(pair => {
        if (pair.userId == this.state.currentUserId){
          friends.push(pair.friendId);
        }
      })
      this.setState({ friends });
      likesIdsRef.once('value', snapshot => {
        let data = snapshot.val();
        let allLikes = Object.values(data);
        //Filters likes that belong to the user's friends
        let likes = allLikes.filter(like => this.state.friends.includes(like.user_id_str));
        this.setState({ likes });
      });
    }

    //boilerplate data
    // getData() {
    //   return [
    //     {
    //       key: 1, title: '@joetheguy',
    //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    //       image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
    //       location: 'tagged location'
    //     },
    //     {
    //       key: 2,
    //       title: '@janethejane',
    //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    //       image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
    //       location: 'tagged location'
    //     },
    //     {
    //       key: 3, title: '@benjiiiii',
    //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    //       image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
    //       location: 'tagged location'
    //     },
    //   ]
    // }

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
      // Must add item to Like List Array
      //
      // this.array.push({title : this.state.textInput_Holder});
      //
      // this.setState({ arrayHolder: [...this.array] })

    }

    render() {
      if (this.state.likes.length > 0){
        return (
          <View style={styles.list_container}>
            <FlatList
              data={this.state.likes}
              renderItem={({ item }) => (
                <View style={styles.r_container} key={item.twit_id_str}>
                    <Image source={{ uri:  item.user_profile_image_url_https }} style={styles.r_photo} />
                    <View style={styles.r_container_text}>
                        <Text style={styles.r_title}>@{item.user_screen_name}</Text>
                        <Text style={styles.r_description}>{item.text}</Text>
                        <Text style={styles.r_location}>{item.place.name}</Text>
                    </View>
                    <TouchableOpacity onPress={this.addLikeData} activeOpacity={0.7} >
                      <Image source={likeimg} style={styles.r_photo} />
                    </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      } else {
        return(
          <View style={styles.list_container}>
            <Text style={styles.r_location}>Empty List</Text>
          </View>
        )
      }

    }
  };
