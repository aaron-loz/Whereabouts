import {init, getTokeno2, get_friends, temp_search} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Location from 'expo-location';

var httpBridge = require('react-native-http-bridge');

export default class TwitterLogin extends React.Component {

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
        return(
        <View style= {styles.container}>
            <Button title="hi there" onPress={()=> temp_search()}></Button>
            <Text>Enter your twitter name to continue!</Text>
            <TextInput
              style= {{height: 60}}
              autoCompleteType = 'username'
              onSubmitEditing={text => this.searchTweets(text)}
            />
            <Text>{this.state.following}</Text>
        </View>
        )
    }
}
