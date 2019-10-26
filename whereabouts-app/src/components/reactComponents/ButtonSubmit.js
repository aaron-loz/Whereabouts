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

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
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
