import React from 'react';
import {  Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';

//item - string containing user_id
//Returns snapshot of accountIds
export function getAccountIdsTable() {
    return db.ref('/accountIds').once('value', snapshot => {});
}

//item - string containing user_id
//Returns true if element is in firebase
export function checkHasAccountId(snapshot, item) {
    let data = snapshot.val();
    let allAccounts = Object.values(data);
    for (let i=0; i<allAccounts.length; i++) {
      if (allAccounts[i].id === item) {
        return true;
      }
    }
    return false;
}
//item - string containing user_id
//Pushes item to firebase
export function addAccountIds(item){
    db.ref('/accountIds').push({
      id: item
    });
}


export function getFriendsTable() {
  return db.ref('/friends').once('value', snapshot => {});
}

//item - Object {
//     "id_str": "111",
//     "screen_name": "Name1",
//   },
//Returns true if pair of userIdp and item.id_str is in firebase
export function checkHasUserIdAndFriendId(snapshot, userIdp, item) {
    let data = snapshot.val();
    let allFriends = Object.values(data);
    for (let i=0; i<allFriends.length; i++) {
      if (allFriends[i].userId == userIdp && allFriends[i].friendId == item.id_str) {
        return true;
      }
    }
    return false;
}
//item - Object {
//     "id_str": "111",
//     "screen_name": "Name1",
//   },
//Pushes item to firebase
export function addFriends(userIdp, item){
    db.ref("/friends/").push({
        userId: userIdp,
        friendId: item.id_str
    });
    Alert.alert(`Friend ${item.screen_name} saved successfully`);
}