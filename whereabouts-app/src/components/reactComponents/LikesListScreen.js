import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';
let likesRef = db.ref('/likes');
let twitsIdsRef = db.ref('/twits');
import likeimg from '../images/like.png';
import {getLikesTable} from '../firebase/firebaseApi'


export default class LikesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Likes',
  };

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

  state = {
    currentUserId: "1186364677254795270",
    likes: [],
    twits: []
  };

  async updateData() {
    let tableLikes = await getLikesTable();
    let data = tableLikes.val();
    let allLikes = Object.values(data);
    let likes = [];
    allLikes.forEach(pair => {
      if (pair.userId == this.state.currentUserId){
        likes.push(pair.twitId);
      }
    })
    this.setState({ likes });
    twitsIdsRef.once('value', snapshot => {
      let data = snapshot.val();
      let allTwits = Object.values(data);
      //Filters twits that belong to the user's friends
      let twits = allTwits.filter(twit => this.state.likes.includes(twit.twit_id_str));
      this.setState({ twits });
    });
  }

  componentDidMount() {
    this.updateData();
  }


  removeLikeData(twit_id_str){
    Alert.alert(
      'Want to unlike?',
      'this item will be removed from your like list',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
          let tableLikes = await getLikesTable();
          let data = tableLikes.val();
          let allKeys = Object.keys(data);
          let allLikedTwits = Object.values(data);
          var res;
          for (let i=0; i<allLikedTwits.length; i++) {
            if ((allLikedTwits[i].twitId == twit_id_str)  && (allLikedTwits[i].userId == this.state.currentUserId)){
              res = i;
              break;
            }
          } 
          console.log(res);
          console.log(allKeys[res]);
          likesRef.child(allKeys[res]).remove();
          this.updateData();
        }},
      ],
      {cancelable: true},
    );
  }

  handleRefresh = () => {
    this.updateData();
  };
  render() {
    return (
      <View style={styles.list_container}>
            <TouchableHighlight style={{height:100, width:200}} underlayColor="black" onPress={this.handleRefresh} >
                <Text style={{height:100, width:100}}>Click here: Refresh</Text>
            </TouchableHighlight>
        <FlatList
          data={this.state.twits}
          renderItem={({ item }) =>
            <View style={styles.r_container}>
                <Image source={{ uri: item.user_profile_image_url_https }} style={styles.r_photo} />
                <View style={styles.r_container_text}>
                        <Text style={styles.r_title}>@{item.user_screen_name}</Text>
                        <Text style={styles.r_description}>{item.text}</Text>
                        <Text style={styles.r_location}>{item.place.name}</Text>
                </View>
                <TouchableOpacity onPress={() => this.removeLikeData(item.twit_id_str)} activeOpacity={0.7} >
                  <Image source={likeimg} style={styles.r_photo} />
                </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
    );
  }
};

const sstyles = StyleSheet.create({
  statusBar_BG: {
    height: 18, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: '#8EC9FB',
  }

})
