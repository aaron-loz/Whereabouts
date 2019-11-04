import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import * as Location from 'expo-location';
import {
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {init, getTokeno2, get_friends, temp_search} from '../../config/axiosConfigs';
import styles from './styles';
import {getAccountIdsTable, checkHasAccountId, addAccountIds, 
  getFriendsTable, checkHasUserIdAndFriendId, addFriends,
  getLikesTable, checkHasLikes, addLike} from '../firebase/firebaseApi'
  
import * as Permissions from 'expo-permissions';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends React.Component {
  // Animation :

  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      Actions.secondScreen();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  async componentDidMount(){
    // initalize the server (now accessible via localhost:1234)
  await init();
  }

  async getgeocodes(){
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status == "granted"){
        if(Location.hasServicesEnabledAsync()){
            return Location.getCurrentPositionAsync(options= {
                accuracy: 3,
                maximumAge : 60000
            })
        } else {
            return Location.geocodeAsync("695 Park Ave New York NY 10065")
        }
    }
    else{
        throw new Error("Location Permission Not Granted")
    }
  }

  async buildQuery(friends){
    s = 'q=' 
    for (let i = 0; i<friends.length-1; i++){
        s +=friends[i].screen_name+'%20OR%20'
    }
    s += friends[friends.length-1].screen_name
    currloc = await this.getgeocodes()
    this.state.currloc = currloc
    //s += "&geocode=" + currloc.coords.latitude +","+currloc.coords.longitude,+",10mi" 
    return {
        "raw_query": s,
        "geo" : currloc.coords.latitude +","+currloc.coords.longitude+",100mi"
    }
  }

  async searchTweets(twitname, twitid){
    // console.log("Search tweets")
    // this.state.twitname = twitname
    // let response = await get_friends(twitname, twitid)
    // let tableAccountId = await getAccountIdsTable();
    // let hasAccountId = checkHasAccountId(tableAccountId, twitid)
    // if (!hasAccountId){
    //     addAccountIds(twitid);
    //     console.log("Account was added");
    // } else {
    //     console.log("Account already exists");
    // }
    // let tableFriends = await getFriendsTable();
    // response.data.map((obj) => {
    //     let hasUserIdAndFriendId = checkHasUserIdAndFriendId(tableFriends, twitid, obj);
    //     if (!hasUserIdAndFriendId){
    //         addFriends(twitid, obj);   
    //         console.log("Pair of UserIdAndFriendId was added");
    //     } else {
    //         console.log("Pair of UserIdAndFriendId already exists");
    //     }
    // })

    // let friends = response.data

    // this.state.following = JSON.stringify(friends)
    // this.setState(previousState => ({
    //     following : previousState.following
    // }))
    
    // q = await this.buildQuery(friends)
    // results = await search_tweets(q.raw_query, q.geo)
    // tableLikes = await getLikesTable();
    // results.data.entities.map((obj) => {
    //     let hasLike = checkHasLikes(tableLikes, obj);
    //     if (!hasLike){
    //         addLike(obj);   
    //         console.log("Like was added");
    //     } else {
    //         console.log("Like already exists");
    //     }
    // })
  }

  state = {twitdetails: '',
          twitname : '',
          following : ''}



  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.L_button_container}>
          <TouchableOpacity
            style={styles.L_button}
            onPress={() => this.props.navigation.navigate('Map'), text => this.searchTweets(text) }
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.L_image} />
            ) : (
              <Text style={styles.L_text}>LOGIN</Text>
            )}
          </TouchableOpacity>
      </View>
    );
  }
}
