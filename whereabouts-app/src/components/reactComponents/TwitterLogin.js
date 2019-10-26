import {init, getTokeno2, get_friends, temp_search} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

var httpBridge = require('react-native-http-bridge');

export default class TwitterLogin extends React.Component {

    async componentDidMount(){
          // initalize the server (now accessible via localhost:1234)
        await init();
        this.twitter =  await getTokeno2();
        this.state.twittoken = await this.twitter.access_token;
    }

    async getgeocodes(){
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status == "granted"){

            
            if(Location.hasServicesEnabledAsync()){
                return Location.getCurrentPositionAsync(options= {
                    accuracy: 3,
                    maximumAge : 60000
                })
            }else{
                //TODO: ask permission for location
                return Location.geocodeAsync("695 Park Ave New York NY 10065")
            }
        }
        else{
            throw new Error("Location Permission Not Granted")
        }
    }
    //implement geocodes requests to testSearch
    async buildQuery(friends){
        console.log(friends)
        s = '' 
        if (typeof friends == 'object'){
            for (var key in friends){
                s += key
            }
        }
        else{
            s += friends.toString();
        }
        currloc = await this.getgeocodes()
        console.log("currloc")
        console.log(currloc)
        this.state.currloc = currloc
        s += "&geocode=" + currloc.coords.latitude +","+currloc.coords.longitude,+",10mi" 
        return s
    }

    async searchTweets(twitname){
        this.state.twitname = twitname
        friends = await get_friends(twitname)
        this.state.following = JSON.stringify(friends)
        this.setState(previousState => ({
            following : previousState.following
        }))
        console.log(this.state.following)

        this.buildQuery(friends)
    }
    state = {twitdetails: '',
            twitname : '',
            following : ''}

    render() {
        return(
        <View style= {styles.container}>
            <Button title="hi there" onPress={()=> this.buildQuery("hi")}></Button>
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
