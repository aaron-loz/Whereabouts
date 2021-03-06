import {init, get_friends, search_tweets} from '../../config/axiosConfigs';
import React from 'react';
import { Text, TextInput, View, Button, TouchableHighlight } from 'react-native';
import styles from './styles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {getAccountIdsTable, checkHasAccountId, addAccountIds, 
    getFriendsTable, checkHasUserIdAndFriendId, addFriends,
    getTwitsTable, checkHasTwits, addTwit} from '../firebase/firebaseApi'


export default class TwitterLogin extends React.Component {

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
            <Button title="hi there" onPress={()=> this.buildQuery("hi")}></Button>
            <Text>====================================</Text>
            <Text>Enter your twitter name to continue!</Text>
            <TextInput style={{height:100, width:300}} onChange={this.handleChangeUsername} placeholder='UserName' />
            <TextInput style={{height:100, width:300}} onChange={this.handleChangeUserId} placeholder='UserId' />
            <TouchableHighlight style={{height:100, width:200}} underlayColor="white" onPress={this.handleSubmit} >
                <Text style={{height:100, width:100}}>Click here: Add</Text>
            </TouchableHighlight>
            <Text>{this.state.tweets}</Text>
        </View>
        )
    }
}
