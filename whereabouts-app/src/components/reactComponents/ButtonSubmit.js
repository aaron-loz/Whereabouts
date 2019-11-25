import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import * as Location from 'expo-location';
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  View,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {init, getTokeno2, get_friends, temp_search} from '../../config/axiosConfigs';
import styles from './styles';
import MapScreen from './MapScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {

  constructor() {
    super();

    global.UserID = "1186364677254795270",
    this.state = {
      isLoading: false,
    };

  }

  async componentDidMount(){
        // initalize the server (now accessible via localhost:1234)
      await init();
      this.twitter =  await getTokeno2();
      this.state.twittoken = await this.twitter.access_token;
  }

  async getgeocodes(){
      if(Location.hasServicesEnabledAsync()){
          return getCurrentPositionAsync(options= {
              accuracy: 3,
              maximumAge : 60000
          })
      }else{
          //ask permission
          return Location.geocodeAsync("695 Park Ave New York NY 10065")
      }

  }
  //implement geocodes requests to testSearch
  async buildQuery(){
      currloc = getgeocodes()
      this.state.currloc = currloc
      s = "&geocode=" + currloc.coords.latitude +","+currloc.coords.longitude,+",10mi"
  }

  async searchTweets(twitname){
      this.state.twitname = twitname
      friends = await get_friends(twitname)
      this.state.following = JSON.stringify(friends)
      this.setState(previousState => ({
          following : previousState.following
      }))
  }


  state = { twitdetails: '', twitname : '', following : '' }

  render() {
    return (
      <View style={styles.L_button_container}>
          <TouchableOpacity
            style={styles.L_button}
            onPress={() =>  this.props.navigation.navigate("Home") }
            activeOpacity={1}>
              <Text style={styles.L_text}>LOGIN</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
