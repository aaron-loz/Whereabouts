import React from 'react';
import { Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';
let likesIdsRef = db.ref('/likes');

export default class LikesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Likes List Screen',
  };

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
      console.log(likes);
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

  render() {
    return (
      <View style= {styles.main}>
        <Text>Here are all of your Likes!</Text>


        <Text>--------------------</Text>

        {/* Renders current likes */}
        <Text style={styles.title}>Likes:</Text>
        <Text>
          {this.state.likes.length > 0 ? (
            <Text>
              {this.state.likes.map((obj, index) => {
                return (
                  <Text key={index}>User {obj.userId} liked location with id {obj.location.id} . </Text>
                );
              })}
            </Text>
          ) : (
              <Text>No likes</Text>
            )}
        </Text>

        <Text>--------------------</Text>

        {/* Add likes */}
        <Text style={styles.title}>Add Likes</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesUserId} placeholder='UserId' />
        <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLocationId} placeholder='Liked LocationId' />
        <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLat} placeholder='Liked latitude' />
        <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLong} placeholder='Liked longitude' />
        <TouchableHighlight style={styles.L_button} underlayColor="white" onPress={this.handleSubmitAddLikes} >
          <Text style={styles.L_text}>Add</Text>
        </TouchableHighlight>


      </View>
    );
  }
};
