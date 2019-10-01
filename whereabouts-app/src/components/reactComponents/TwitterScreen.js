import {init, getToken} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';

export default class TwitterLogin extends React.Component {
    async componentDidMount(){
        await init("9YI7BfOoNqussSahkRjbdbWyu", "umOJG3JYaNX1EnMSWAbUTc8bh4fXwjU3vB2D41tCgWsfoByL5o");
        this.twitter =  await getToken();
    }
    
    doboth(latg, long){
        geo = {
            lat: latg,
            lon: long,
        }
        //this.twitter.searchNearby(geo, this.twitter.token);
    }
    state = {twitdetails: ''}
    render() {
        return(
        <View style= {styles.container}>
            <Button
            title="Twitter Login Button" onPress={this.doboth('40.730610', '-73.935242', this.twitter)}
            />
        </View>
        )
    }
}
