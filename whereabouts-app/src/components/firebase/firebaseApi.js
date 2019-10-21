import React from 'react';
import {  Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';

//item - string containing user_id
export function addAccountIds(item){
    console.log("item");
    console.log(item);
    db.ref('/accountIds').push({
      id: item
    });
}

//item - Object {
//     "id_str": "111",
//     "screen_name": "Name1",
//   },
export function addFriends(userIdp, item){
    db.ref("/friends/").push({
        userId: userIdp,
        friendId: item.id_str
    });
    Alert.alert(`Friend ${item.screen_name} saved successfully`);
}