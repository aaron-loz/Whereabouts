import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import { Actions } from 'react-native-router-flux';
import config from '../../config';
    //! Separate axios configs from twitter requests.

export function init(cuskey, seckey){
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
    //TODO: Have to create token_nonce out of 32 bytes of random data into a btoa().
}
function create_signature(){
    //TODO: create signature out of parameter values. 

}
export function getToken(){
    return axios.post('/oauth/request_token', 'oauth_callback=https://twitter.com/signin', {
        oauth_nonce : '', //replace generate_nonce()
        oauth_callback : 'https://twitter.com/signin',
        oauth_signature_method : "HMAC-SHA1",
        oauth_timestamp : Math.floor(Date.now()/1000),
        oauth_consumer_key : config.TW_CUSTOMER_KEY,
        oauth_signature : create_signature(),//!Must pass values of parameters to this.
        oauth_version :"1.0",        
    })
    .then((response) =>{
        console.log('response:\n' + response);
        return response;
    })
    .catch((error)=>{
        console.log('error:\n'+ error);
        return error;
    })
}

export function twitsignin(oauthtoken){
    url = '/oauth/authenticate?oauthtoken='+ oauthtoken;
    return axios.get(url)
    .then((response) => {
        console.log("response:\n"+response);
        return response;
    })
    .catch((error) =>{
        console.log("error:\n" + error)
        return error
    })
}
export function test_search(oauthtoken){
    axios.get('/1.1/search/tweets.json?q=food%20@nasa', {
        headers : {
            authorization : 'OAuth',
            oauth_consumer_key: config.TW_CUSTOMER_KEY,
            oauth_nonce : ""
        }
    })
    .then((response)=>{
        console.log("response:\n" + response);
        return response;
    })
    .catch((error) =>{
        console.log("error:\n" + error);
        return error;
    })
    
}
/*searchNearby(geocode, token){
    axios.get('/1.1/search/tweets.json', {
        q : 'food',
        oauth_token: token,
        geocode: geocode.lat + ',' + geocode.lon + '10mi',
    })
    .then(function(response) {
        return response;
    })
    .catch(function(error){
        return error.data;
    })
}
signIn(){
    return;
}

getRequest(){
    axios.get('https://api.twitter.com/oauth/access_token')
        .then(function (response){
            console.log(response);
        })
        .catch(function (error){
            console.log(error);
        });
}*/