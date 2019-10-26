import {init, getTokeno2, get_friends, temp_search} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import * as Location from 'expo-location';


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

    async searchTweets(twitname, twitid){
        this.state.twitname = twitname
        friends = await get_friends(twitname, twitid)
        this.state.following = JSON.stringify(friends)
        this.setState(previousState => ({
            following : previousState.following
        }))
    }
    state = {
            twitdetails: '',
            twitname : '',
            following : '',
            typedUsername: '',
            typedUserId: ''
        }

    handleChangeUsername = e => {
        this.setState({
            typedUsername: e.nativeEvent.text
        });
    };
    handleChangeUserId = e => {
        this.setState({
            typedUserId: e.nativeEvent.text
        });
    };
    handleSubmit = () => {
        this.searchTweets(this.state.typedUsername, this.state.typedUserId);
    };
    render() {
        return(
        <View style= {styles.container}>
            <Button title="Click here to try temp_search" onPress={()=> temp_search()}></Button>
            <Text>====================================</Text>
            <Text>Enter your twitter name to continue!</Text>
            <TextInput style={{height:100, width:100}} onChange={this.handleChangeUsername} placeholder='UserName' />
            <TextInput style={{height:100, width:100}} onChange={this.handleChangeUserId} placeholder='UserId' />
            <TouchableHighlight style={{height:100, width:200}} underlayColor="white" onPress={this.handleSubmit} >
                <Text style={{height:100, width:100}}>Click here: Add</Text>
            </TouchableHighlight>
            <Text>{this.state.following}</Text>
        </View>
        )
    }
}
