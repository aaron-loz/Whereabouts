import React from 'react';
import {  Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';

//item - string containing user_id
//Returns true if element is in firebase
export async function checkHasAccountId(item) {
    await db.ref('/accountIds').once('value', snapshot => {
        let data = snapshot.val();
        let allAccounts = Object.values(data);
        allAccounts.forEach(elem => {
          if (elem.id === item) {
            return true;
          }
        })
        return false;
    });
}
//item - string containing user_id
//Pushes item to firebase
export function addAccountIds(item){
    db.ref('/accountIds').push({
      id: item
    });
}

//item - Object {
//     "id_str": "111",
//     "screen_name": "Name1",
//   },
//Returns true if pair of userIdp and item.id_str is in firebase
export async function checkHasUserIdAndFriendId(userIdp, item) {
    await db.ref('/friends/').on('value', snapshot => {
        let data = snapshot.val();
        let allFriends = Object.values(data);
        allFriends.forEach(elem => {
          if (elem.userId == userIdp && elem.friendId == item.id_str) {
            return true;
          }
        })
        return false;
    });
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