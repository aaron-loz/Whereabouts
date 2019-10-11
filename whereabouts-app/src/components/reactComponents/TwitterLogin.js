import {init, getTokeno2,test_search} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';

export default class TwitterLogin extends React.Component {
    async componentDidMount(){
        await init();
        this.twitter =  await getTokeno2();
        this.state.twittoken = await this.twitter.access_token;
    }
    async testSearch(oauthtoken){
        t = await(test_search(oauthtoken));
        this.state.twittwits = t;
        this.setState(previousState =>({
            twittwits : previousState.twittwits
        }))
    }
    async searchTweets(lat, long){
    }
    
    async SSOlogin(oauthtoken){
    //! TODO: Finish setting up axios nonces.
        /*console.log(oauthtoken);
        t = await twitsignin(oauthtoken)
        console.log(t)*/
    }
    state = {twitdetails: ''}

    render() {
        return(
        <View style= {styles.container}>
            <Text>{this.state.twittwits}</Text>
            <Button
            title="Twitter Login Button" onPress={() => this.testSearch(this.state.twittoken)}
            />
        </View>
        )
    }
}
