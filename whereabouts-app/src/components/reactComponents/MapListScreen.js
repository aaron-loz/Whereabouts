import React from 'react';
import { Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';

let addAccountIds = item => {
  db.ref('/accountIds').push({
    id: item
  });
};

export default class MapListScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map List Screen',
    };
    

    state = {
      addAccountId: 'id1',
      addFriendsUserId: '',
      addFriendsFriendId: '',
      addLikesUserId: '',
      addLikesLocationId: ''
    };

    //AddAccounts
    handleChangeAddAccounts = e => {
      this.setState({
        addAccountId: e.nativeEvent.text
      });
    };

    handleSubmitAddAccounts = () => {
      addAccountIds(this.state.addAccountId);
      Alert.alert(`Account ${this.state.addAccountId} saved successfully`);
    };

    //AddFriends
    handleChangeAddFriendsUserId = e => {
      this.setState({
        addFriendsUserId: e.nativeEvent.text
      });
    };

    handleChangeAddFriendsFriendId = e => {
      this.setState({
        addFriendsFriendId: e.nativeEvent.text
      });
    };

    handleSubmitAddFriends = () => {
      db.ref(`/friends/${this.state.addFriendsUserId}`).push({
        friendId: this.state.addFriendsFriendId
      });
      Alert.alert(`Friend ${this.state.addFriendsFriendId} saved successfully`);
    };

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

    handleSubmitAddLikes = () => {
      db.ref(`/likes/${this.state.addLikesUserId}`).push({
        locationId: this.state.addLikesLocationId
      });
      Alert.alert(`Like ${this.state.addLikesLocationId} saved successfully`);
    };

    render() {
      return (
        <View style= {styles.main}>
          <Text style={styles.title}>List of Map Pin Data</Text>
          
          <Text>--------------------</Text>

          <Text style={styles.title}>Add Account</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddAccounts} placeholder='UserId' />
          <TouchableHighlight style={styles.button} underlayColor="white" onPress={this.handleSubmitAddAccounts} >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>

          <Text>--------------------</Text>

          <Text style={styles.title}>Add Friends</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddFriendsUserId} placeholder='UserId' />
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddFriendsFriendId} placeholder='His FriendId' />
          <TouchableHighlight style={styles.button} underlayColor="white" onPress={this.handleSubmitAddFriends} >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>

          <Text>--------------------</Text>

          <Text style={styles.title}>Add Likes</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesUserId} placeholder='UserId' />
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddLikesLocationId} placeholder='Liked LocationId' />
          <TouchableHighlight style={styles.button} underlayColor="white" onPress={this.handleSubmitAddLikes} >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>

          <Text>--------------------</Text>
  
        </View>
      );
    }
  };