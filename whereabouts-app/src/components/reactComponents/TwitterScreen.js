import {init, getToken} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';

export default class TwitterLogin extends React.Component {
    async componentDidMount(){
        await init("9YI7BfOoNqussSahkRjbdbWyu", "umOJG3JYaNX1EnMSWAbUTc8bh4fXwjU3vB2D41tCgWsfoByL5o");
        this.twitter =  await getToken();
    }
    searchTweets(lat, long){
        console.log('hiya');
    }

    SSOlogin(){

    }
    state = {twitdetails: ''}
    render() {
        return(
        <View style= {styles.container}>
            <Button
            title="Twitter Login Button" onPress={this.searchTweets('40.730610', '-73.935242')}
            />
        </View>
        )
    }
}
