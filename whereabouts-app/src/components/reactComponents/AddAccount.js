import React from 'react';
import { Text, TextInput, View, TouchableHighlight, Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';
import styles from './styles';

let addAccountIds = item => {
  db.ref('/accountIds').push({
    id: item
  });
};

export default class AddAccount extends React.Component  {
    static navigationOptions = {
      title: 'Add Account',
    };

    state = {
      addAccountId: 'id1',
      addFriendsUserId: '',
      addFriendsFriendId: ''
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
      db.ref("/friends/").push({
        userId: this.state.addFriendsUserId,
        friendId: this.state.addFriendsFriendId
      });
      Alert.alert(`Friend ${this.state.addFriendsFriendId} saved successfully`);
    };


    render() {
      return (
        <View style= {styles.main}>
          <Text style={styles.title}>List of Map Pin Data</Text>

          <Text>--------------------</Text>

          <Text style={styles.title}>Add Account</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddAccounts} placeholder='UserId' />
          <TouchableHighlight style={styles.L_button} underlayColor="white" onPress={this.handleSubmitAddAccounts} >
            <Text style={styles.L_text}>Add</Text>
          </TouchableHighlight>

          <Text>--------------------</Text>

          <Text style={styles.title}>Add Friends</Text>
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddFriendsUserId} placeholder='UserId' />
          <TextInput style={styles.itemInput} onChange={this.handleChangeAddFriendsFriendId} placeholder='His FriendId' />
          <TouchableHighlight style={styles.L_button} underlayColor="white" onPress={this.handleSubmitAddFriends} >
            <Text style={styles.L_text}>Add</Text>
          </TouchableHighlight>

        </View>
      );
    }
  };
