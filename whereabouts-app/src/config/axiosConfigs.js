import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
//Todo: remove Oauth-1.0a and oauth-signature
import oauthSignature from 'oauth-signature';
import OAuth from 'oauth-1.0a';
import {getAccountIdsTable, checkHasAccountId, addAccountIds, 
    getFriendsTable, checkHasUserIdAndFriendId, addFriends} from '../components/firebase/firebaseApi'

    //! Separate axios configs from twitter requests.


export function init(){
    axios.defaults.baseURL = 'https://api.twitter.com';
    axios.defaults.headers.post['Accept-Encoding'] = 'gzip';
}

export function getTokeno2(){
    return axios.post('/oauth2/token', 'grant_type=client_credentials', {
        headers: {
        'Authorization': 'Basic ' + btoa(config.TW_CUSTOMER_KEY + ':' + config.TW_CUSTOMER_SECRET_KEY),
        'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        'User-Agent' : 'whereabouts dev',
        Accept : "*/*",
    })
    .then((response) => {
        console.log(response.data)
        return (response.data);
    })
    .catch((error) =>{
        console.log(error);
        return error;
    }
    )
}


function parse_json(json_stack){
    //creates twitter objects that hold id, username, and geolocation
}

export function get_friends_using_fetch(twitname){
    url = config.IP_ADDR + ':5000/get_friends/'+twitname // would need to be changed if flask has a different specified port
    return fetch(url)
}

//! Currently, THIS DOES NOT WORK.
//TODO: Follow these tickets : https://stackoverflow.com/questions/58468888/react-native-not-fetching-content-from-externally-visible-flask-server-networ/58472658#58472658
//https://stackoverflow.com/questions/51363339/react-native-app-transport-security-has-blocked


export function get_friends(twitname, twitid){
    url = 'http://' + config.IP_ADDR + ':5000/get_friends/'+twitname // would need to be changed if flask has a different specified port
    return axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "consumer-key": config.TW_CUSTOMER_KEY, 
          "consumer-secret-key": config.TW_CUSTOMER_SECRET_KEY,
          "access-token": config.TW_ACCESS_TOKEN,
          "access-secret-token": config.TW_ACCESS_SECRET_TOKEN
        }})
    .then((response)=>{
        return response
    })
    .catch((error) =>{
        console.log(error)
        return error
    })
}

export function search_tweets(query){
    console.log("searching tweets using : " + query)
    url = "http://"+ config.IP_ADDR +"/get_tweets/"+query
    return fetch(url,{
        headers:{
            "Access-Control-Allow-Origin":"*",
            "consumer-key": config.TW_CONSUMER_KEY,
            "consumer-secret-key": config.TW_CONSUMER_SECRET_KEY,
            "access-token": config.TW_ACCESS_TOKEN,
            "access-secret-token": config.TW_ACCESS_SECRET_TOKEN,
        }})
        .then((response) =>{
            console.log(response)
            return response
        })
        .catch((error)=> {
            console.log(error)
            return error        
    })
}

