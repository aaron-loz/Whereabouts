import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';
let likesIdsRef = db.ref('/likes');
import likeimg from '../images/like.png';



export default class LikesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Likes',
  };

  getData() {
    return [
      {
        key: 1, title: '@joetheguy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
        location: 'tagged location'
      },
      {
        key: 2,
        title: '@janethejane',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
        location: 'tagged location'
      },
      {
        key: 3, title: '@benjiiiii',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
        location: 'tagged location'
      },
      {
        key: 4,
        title: '@ali123456',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
        location: 'tagged location'
      },
      {
        key: 5, title: '@markuslarkus',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
        location: 'tagged location'
      },
      {
        key: 6,
        title: '@fridafrido',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
        location: 'tagged location'
      },
      {
        key: 7, title: '@joetheguy',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
        location: 'tagged location'
      },
      {
        key: 8,
        title: '@janethejane',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
        location: 'tagged location'
      },
      {
        key: 9, title: '@benjiiiii',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
        location: 'tagged location'
      },
    ]
  }
  state = {
    likes: [],
    addLikesUserId: '',
    addLikesLocationId: '',
    addLikesLat: '',
    addLikesLong: ''
  };

  componentDidMount() {
    likesIdsRef.on('value', snapshot => {
      let data = snapshot.val();
      let likes = Object.values(data);
      this.setState({ likes });
    });
  }

  //AddLikes
  handleChangeAddLikesUserId = e => {
    this.setState({
      addLikesUserId: e.nativeEvent.text
    });
  };

  handleChangeAddLikesLocationId = e => {
    this.setState({
      addLikesLocationId: e.nativeEvent.text
    });
  };

  handleChangeAddLikesLat = e => {
    this.setState({
      addLikesLat: e.nativeEvent.text
    });
  };

  handleChangeAddLikesLong = e => {
    this.setState({
      addLikesLong: e.nativeEvent.text
    });

  };

  handleSubmitAddLikes = () => {
    var lat = parseFloat(this.state.addLikesLat);
    var long = parseFloat(this.state.addLikesLong);
    db.ref("/likes").push({
      userId: this.state.addLikesUserId,
      location: {
        id: this.state.addLikesLocationId,
        coordinates: {
          latitude: lat,
          longitude: long
        }
      }
    });
    Alert.alert(`Like ${this.state.addLikesLocationId} saved successfully`);
  };

  removeLikeData = () => {

    Alert.alert(
      'Unliked!',
      'this item will be removed from your like list',
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
    return (
      <View style={styles.list_container}>
        <FlatList
          data={this.getData()}
          renderItem={({ item }) =>
            <View style={styles.r_container}>
                <Image source={{ uri: item.image_url }} style={styles.r_photo} />
                <View style={styles.r_container_text}>
                    <Text style={styles.r_title}>
                        {item.title}
                    </Text>
                    <Text style={styles.r_description}>
                        {item.description}
                    </Text>
                    <Text style={styles.r_location}>
                        {item.location}
                    </Text>
                    <TouchableOpacity onPress={this.removeLikeData} activeOpacity={0.7} >

                      <Image source={likeimg} style={styles.r_photo} />

                    </TouchableOpacity>
                </View>

            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
      // <View style= {styles.main}>
      //   <Text>Here are all of your Likes!</Text>
      //
      //
      //   <Text>--------------------</Text>
      //
      //   {/* Renders current likes */}
      //   <Text style={styles.title}>Likes:</Text>
      //   <Text>
      //     {this.state.likes.length > 0 ? (
      //       <Text>
      //         {this.state.likes.map((obj, index) => {
      //           return (
      //             <Text key={index}>User {obj.userId} liked location with id {obj.location.id} . </Text>
      //           );
      //         })}
      //       </Text>
      //     ) : (
      //         <Text>No likes</Text>
      //       )}
      //   </Text>

        /* Add likes */
        // <Text style={styles.title}>Add Likes</Text>
        // <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesUserId} placeholder='UserId' />
        // <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLocationId} placeholder='Liked LocationId' />
        // <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLat} placeholder='Liked latitude' />
        // <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLong} placeholder='Liked longitude' />
        // <TouchableHighlight style={styles.L_button} underlayColor="white" onPress={this.handleSubmitAddLikes} >
        //   <Text style={styles.L_text}>Add</Text>
        // </TouchableHighlight>


      //</View>
    );
  }
};

const sstyles = StyleSheet.create({
  statusBar_BG: {
    height: 18, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: '#8EC9FB',
  }

})
