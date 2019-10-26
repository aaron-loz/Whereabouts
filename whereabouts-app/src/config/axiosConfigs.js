import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
//Todo: remove oauth-1.0a and oauth-signature
import { Twitter } from '../components/twitter/twitterClass';

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
    return Twitter(
}


export function getToken(){
}

//! Currently, THIS DOES NOT WORK. 
//TODO: Follow these tickets : https://stackoverflow.com/questions/58468888/react-native-not-fetching-content-from-externally-visible-flask-server-networ/58472658#58472658
//https://stackoverflow.com/questions/51363339/react-native-app-transport-security-has-blocked
export function get_friends(twitname){
    url = config.LOCAL_IP + ':5000/get_friends/'+twitname // would need to be changed if flask has a different specified port
    return fetch(url)
    .then((response)=>{
        console.log(response)
        return response
    })
    .catch((error) =>{
        console.log(error)
        return error
    })
}

export function temp_search(){
    console.log("Hi there")
    axios.get('http://146.95.186.59:5000/', {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }})
    // Succes :
        .then((response) => {
            console.log(response);
        })
        // Echec :
        .catch((error) => {
            console.log(error);
        });
}

//implement query construction and request to server

