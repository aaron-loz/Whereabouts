import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity,Text, View, TextInput, Button } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import bgSrc from '../images/wallpaper.png';
import styles from './styles';

import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {getAccountIdsTable, checkHasAccountId, addAccountIds, 
    getFriendsTable, checkHasUserIdAndFriendId, addFriends,
    getTwitsTable, checkHasTwits, addTwit} from '../firebase/firebaseApi'
import {init, get_friends, search_tweets} from '../../config/axiosConfigs';

export default class LoginScreen extends React.Component  {

  constructor(props) {
    super(props);
    global.UserID = "1186364677254795270";
    this.state = {
      showPass: true,
      press: false,
      typedUsername: "",
      typedPassword: "",
    };
    this.showPass = this.showPass.bind(this);
  }

  async componentDidMount(){
    // initalize the server (now accessible via localhost:1234)
  await init();
}

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
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
    s = []
    s.push('q=') 
    i = 0;
    j = 0;
    for (i; i<friends.length-1; i++){
            t = 'from%3A' + friends[i].screen_name + '%20OR%20'
            if ((s[j].length + t.length ) > 256){
                s.push('q=')
                j++
            }
            s[j] +=t
    }
    currloc = await this.getgeocodes()
    this.state.currloc = currloc
    return {
        "raw_query": s,
        "geo" : currloc.coords.latitude +","+currloc.coords.longitude+",100mi"
    }
}

async searchTweets(twitname, twitid){
    this.state.twitname = twitname
    let response = await get_friends(twitname, twitid)
    let tableAccountId = await getAccountIdsTable();
    let hasAccountId = checkHasAccountId(tableAccountId, twitid)
    if (!hasAccountId){
        addAccountIds(twitid);
        console.log("Account was added");
    } else {
        console.log("Account already exists");
    }
    let tableFriends = await getFriendsTable();
    response.data.map((obj) => {
        let hasUserIdAndFriendId = checkHasUserIdAndFriendId(tableFriends, twitid, obj);
        if (!hasUserIdAndFriendId){
            addFriends(twitid, obj);   
            console.log("Pair of UserIdAndFriendId was added");
        } else {
            console.log("Pair of UserIdAndFriendId already exists");
        }
    })

    let friends = response.data

    this.state.following = JSON.stringify(friends)
    this.setState(previousState => ({
        following : previousState.following
    }))

    results = []
    q = await this.buildQuery(friends)
    for(let i = 0; i<q.raw_query.length;i++){

        results.push(await search_tweets(q.raw_query[i], q.geo))
    }
    //TODO: remove

    tableLikes = await getTwitsTable();
    for(let j = 0; j<results.length;j++){
        console.log("results["+j+"]:\t"+results[j]+"\n\n")
        results[j].data.entities.map((obj) => {
            let hasTwit = checkHasTwits(tableLikes, obj);
            if (!hasTwit){
                addTwit(obj);   
                console.log("Twit was added");
            } else {
                console.log("Twit already exists");
            }
        })
    }
}

  handleChangeUsername = e => {
    this.setState({
        typedUsername: e.nativeEvent.text
    });
  };
  handleChangePassword= e => {
    this.setState({
        typedPassword: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    this.searchTweets(this.state.typedUsername, this.state.typedPassword);
    global.UserID = this.state.typedPassword;
    this.props.navigation.navigate("Home");
  };

  render() {
    return(
      <Wallpaper>
        <Logo />

        <KeyboardAvoidingView behavior="padding" style={stylesForm.container}>
          <View style={styles.inputWrapper}>
            <Image source={usernameImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChange={this.handleChangeUsername}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              secureTextEntry={this.state.showPass}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChange={this.handleChangePassword}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={stylesForm.btnEye}
            onPress={this.showPass}>
            <Image source={eyeImg} style={stylesForm.iconEye} />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <SignupSection />

        <View style={styles.L_button_container}>
          <TouchableOpacity
            style={styles.L_button}
            onPress={this.handleSubmit}
            //onPress={() =>  this.props.navigation.navigate("Home") }
            activeOpacity={1}>
              <Text style={styles.L_text}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </Wallpaper>

    );
  }
};


const stylesForm = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 52,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});