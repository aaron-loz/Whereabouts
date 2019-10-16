import {init, getTokeno2,test_search} from '../../config/axiosConfigs';
import React from 'react';
import { Text, View, Button } from 'react-native';
import APIClient from '../../client/apiClient';

export default class TwitterLogin extends React.Component {
    state = {
        values: []
      };
    // async componentDidMount(){
    //     await init();
    //     this.twitter =  await getTokeno2();
    //     this.state.twittoken = await this.twitter.access_token;
    // }
    async componentDidMount() {
        const accessToken = await this.props.auth.getAccessToken();    //Not sure what kind of token we will need
        this.apiClient = new APIClient(accessToken);
        this.apiClient.get().then((data) =>
          this.setState({...this.state, values: data})
        );
    }

    // async testSearch(oauthtoken){
    //     t = await(test_search(oauthtoken));
    //     this.state.twittwits = t;
    //     this.setState(previousState =>({
    //         twittwits : previousState.twittwits
    //     }))
    // }

    // async searchTweets(lat, long){
    // }

    // async SSOlogin(oauthtoken){
    // //! TODO: Finish setting up axios nonces.
    //     console.log(oauthtoken);
    //     t = await twitsignin(oauthtoken)
    //     console.log(t)
    // }
    // state = {twitdetails: ''}

    render() {
        return(
        <View style= {styles.container}>
            {/* <Text>{this.state.twittwits}</Text> */}
            {/* <Button
            title="Twitter Login Button" onPress={() => this.testSearch(this.state.twittoken)}
            /> */}
        </View>
        )
    }
}
