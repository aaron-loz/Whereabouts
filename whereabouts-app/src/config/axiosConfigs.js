import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
//Todo: remove Oauth-1.0a and oauth-signature
import oauthSignature from 'oauth-signature';
import OAuth from 'oauth-1.0a';
import {checkHasAccountId, addAccountIds, checkHasUserIdAndFriendId, addFriends} from '../components/firebase/firebaseApi'

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

function generate_nonce(){
    nonce = CryptoJS.lib.WordArray.random(16);
    return nonce;
}



export function getToken(){
}

export function temp_searchWithIP(){
    console.log("Hi there")
    axios.get('http://your_ip_address:5000/get_tweets/q=twitter%20&result_type=recent&since=2014-07-19&count=100', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "consumer-key": config.TW_CUSTOMER_KEY, 
          "consumer-secret-key": config.TW_CUSTOMER_SECRET_KEY,
          "access-token": config.TW_ACCESS_TOKEN,
          "access-secret-token": config.TW_ACCESS_SECRET_TOKEN
        }})
    // Succes :
        .then((response) => {
            console.log(response.data);
        })
        // Echec :
        .catch((error) => {
            console.log(error);
        });
    
}

//! Currently, THIS DOES NOT WORK.
//TODO: Follow these tickets : https://stackoverflow.com/questions/58468888/react-native-not-fetching-content-from-externally-visible-flask-server-networ/58472658#58472658
//https://stackoverflow.com/questions/51363339/react-native-app-transport-security-has-blocked


export function get_friends(twitname, twitid){
    url = 'http://' + config.LOCAL_IP + ':5000/get_friends/'+twitname // would need to be changed if flask has a different specified port
    axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "consumer-key": config.TW_CUSTOMER_KEY, 
          "consumer-secret-key": config.TW_CUSTOMER_SECRET_KEY,
          "access-token": config.TW_ACCESS_TOKEN,
          "access-secret-token": config.TW_ACCESS_SECRET_TOKEN
        }})
    .then((response)=>{
        let hasAccountId = checkHasAccountId(twitid);
        if (!hasAccountId){
            addAccountIds(twitid);
        } else {
            console.log("Account already exists");
        }
        response.data.map((obj) => {
            let hasUserIdAndFriendId = checkHasUserIdAndFriendId(twitid, obj);
            if (!hasUserIdAndFriendId){
                addFriends(twitid, obj);                
            } else {
                console.log("Pair of UserIdAndFriendId already exists");
            }
        })
        return response.data
    })
    .catch((error) =>{
        console.log(error)
        return error
    })
}


export function temp_search(){
    console.log("Hi there")
    const url = 'http://' + config.LOCAL_IP + ':5000/get_tweets/q=twitter%20&result_type=recent&since=2014-07-19&count=100'
    axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "consumer-key": config.TW_CUSTOMER_KEY, 
          "consumer-secret-key": config.TW_CUSTOMER_SECRET_KEY,
          "access-token": config.TW_ACCESS_TOKEN,
          "access-secret-token": config.TW_ACCESS_SECRET_TOKEN
        }})
    // Succes :
        .then((response) => {
            //console.log(response.data);
        })
        // Echec :
        .catch((error) => {
            console.log(error);
        });
}

//implement query construction and request to server
