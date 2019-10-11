import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
import oauthSignature from 'oauth-signature';
import OAuth from 'oauth-1.0a';

    //! Separate axios configs from twitter requests.


export function init(){
    axios.defaults.baseURL = 'https://api.twitter.com';
    axios.defaults.headers.post['Accept-Encoding'] = 'gzip';
    a = getToken();
    testwithExpo();
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
function percent_encode(s){
    //TODO: implement percent_encode
}
function create_signature(url, params){
    paramString = ""
    sortedKeys = Object.keys(params);
    sortedKeys.sort();
    for (const k of sortedKeys){
        if (paramString != ""){
            paramString += "&";
        }
        kv = k +  "=" + params[k];
        paramString += kv;
    }
    console.log(paramString);
    signaturebasestring = "POST&" + percent_encode(url) + "&" + percent_encode(paramString);
    sign_key = config.TW_CUSTOMER_SECRET_KEY + "&" + config.TW_ACCESS_SECRET_TOKEN;
    return CryptoJS.HmacSHA1(signaturebasestring, sign_key);
}

function testwithExpo(){
    header = {
        oauth_consumer_key : config.TW_CUSTOMER_KEY,
        oauth_signature_method :"HMAC-SHA1",
        oauth_signature : undefined,
        oauth_timestamp : Math.floor(Date.now()/1000),
        oauth_nonce : generate_nonce(),
        oauth_callback : "https://twitter.com/dazdndcunfusd"
    };
    url = "https://api.twitter.com/oauth/request_token";
    header['oauth_signature'] = create_signature(url,params);

    return fetch('https://api.twitter.com/oauth/request_token',{
        method : 'POST',
        headers : header,
    })
    .then( (response) =>{
        console.log("response!!!:\n");
        console.log(response);
        console.log("end response");
    }).catch((error) =>{
        console.log("error :(\n");
        console.log(error);
        console.log("end error");
    })
}


export function getToken(){
    parameters = {
        headers : {
            //oauth_nonce :generate_nonce(),
            //oauth_signature_method : "HMAC-SHA1",
            //oauth_timestamp : Math.floor(Date.now()/1000),
            oauth_consumer_key : config.TW_CUSTOMER_KEY,
        },
        oauth_callback : 'https://twitter.com/signin',
    };
    parameters.headers["oauth_signature"] = create_signature("https://api.twitter.com/oauth/request_token", parameters);//!Must pass values of parameters to this.
    parameters.headers["oauth_version"] = "1.0";
    return axios.post('/oauth/request_token',)
    .then((response) =>{
        console.log('getToken response:\n' + response);
        return response;
    })
    .catch((error)=>{
        console.log('getToken error:\n');
        console.log(error);
        console.log("end of getToken error");
        return error;
    })
}


export function twitsignin(oauthtoken){
    url = '/oauth/authenticate?oauthtoken='+ oauthtoken;
    return axios.get(url)
    .then((response) => {
        console.log("twitsignin response:\n"+response);
        return response;
    })
    .catch((error) =>{
        console.log("twitsignin error:\n");
        console.log(error);
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