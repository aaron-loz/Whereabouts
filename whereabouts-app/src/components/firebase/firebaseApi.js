import React from 'react';
import {  Alert } from 'react-native';
import { db } from '../../config/firebaseConfig';
var _ = require('lodash');

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


export function getTwitsTable() {
  return db.ref('/twits').once('value', snapshot => {});
}

// "coordinates": null,
// "created_at": "Mon Oct 21 19:29:34 +0000 2019",
// "geo": null,
// "place": Object {
//   "attributes": Object {},
//   "bounding_box": Object {
//     "coordinates": Array [
//       Array [
//         Array [
//           -73.96483915350565,
//           40.768632486617726,
//         ],
//         Array [
//           -73.96483915350565,
//           40.768632486617726,
//         ],
//         Array [
//           -73.96483915350565,
//           40.768632486617726,
//         ],
//         Array [
//           -73.96483915350565,
//           40.768632486617726,
//         ],
//       ],
//     ],
//     "type": "Polygon",
//   },
//   "contained_within": Array [],
//   "country": "United States",
//   "country_code": "US",
//   "full_name": "Hunter College North Building",
//   "id": "07d9e44f94485000",
//   "name": "Hunter College North Building",
//   "place_type": "poi",
//   "url": "https://api.twitter.com/1.1/geo/id/07d9e44f94485000.json",
// },
// "text": "First tweet with location",
// "twit_id_str": "1",
// "user_id_str": "12",
// "user_profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
// "user_screen_name": "name",
// },
//Returns true if like is in firebase
export function checkHasTwits(snapshot, item) {
    let data = snapshot.val();
    let allTwits = Object.values(data);
    for (let i=0; i<allTwits.length; i++) {
      if (allTwits[i].twit_id_str == item.twit_id_str) {
        return true;
      }
    }
    return false;
}
//item - see above
//Pushes item to firebase
export function addTwit(item){
    db.ref("/twits/").push(item);
    Alert.alert(`Twit saved successfully`);
}

