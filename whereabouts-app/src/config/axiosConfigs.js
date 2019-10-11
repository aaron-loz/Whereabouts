import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
import oauthSignature from 'oauth-signature';

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
    nonce = CryptoJS.lib.WordArray.random(16);
    return nonce;
}

function create_signature(url, parameters){
    return oauthSignature.generate('post', url, parameters, config.TW_CUSTOMER_SECRET_KEY);
}
export function getToken(){
    parameters = {
        oauth_consumer_key : config.TW_CUSTOMER_KEY,
        oauth_signature_method : "HMAC-SHA1",
        oauth_timestamp : Math.floor(Date.now()/1000),
        oauth_nonce :generate_nonce(),
        oauth_callback : 'https://twitter.com/signin',
    };
    signature = create_signature("https://api.twitter.com/oauth/request_token", parameters);//!Must pass values of parameters to this.
    return axios.post('/oauth/request_token', 'oauth_callback=https://twitter.com/signin', parameters, signature)
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
            oauth_nonce : generate_nonce(),
        },
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