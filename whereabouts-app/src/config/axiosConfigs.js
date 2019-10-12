import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
import CryptoJS from 'crypto-js';
import {oauthSignature, SignatureBaseString, HmacSha1Signature, Rfc3986, HmacSha1} from 'oauth-signature';

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

function create_signature(url, parameters){
    return oauthSignature.generate('post', url, parameters, config.TW_CUSTOMER_SECRET_KEY);
}

//I assumed that we don't have OAuth token secret, only Consumer secret.
function create_signatureNEW(method, url, parameters, consumerSecret){
    var signatureBaseString = new SignatureBaseString(method, url, parameters).generate();
    //This is 'Getting a signing key' from : https://developer.twitter.com/en/docs/basics/authentication/guides/creating-a-signature
    var key = new Rfc3986().encode(consumerSecret) + '&';
    var result = new HmacSha1(signatureBaseString, key).getBase64EncodedHash();
    return result;
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
    let nonce = generate_nonce();
    let timestamp = Math.floor((new Date()).getTime() / 1000);
    var httpMethod = 'GET';
    var url = 'https://api.twitter.com/1.1/search/tweets.json?q=food%20@nasa';
    var parameters = {
        oauth_consumer_key:	config.TW_CUSTOMER_KEY,
        oauth_nonce: nonce,
        oauth_signature_method:	"HMAC-SHA1",
        oauth_timestamp: toString(timestamp),
        oauth_token: oauthtoken,
        oauth_version: "1.0"
    };

    let signature = create_signatureNEW(httpMethod, url, parameters, config.TW_CUSTOMER_SECRET_KEY);

    axios.get('/1.1/search/tweets.json?q=food%20@nasa', {
        headers : { 
            authorization : 'OAuth',
            oauth_consumer_key: config.TW_CUSTOMER_KEY,
            oauth_nonce : nonce,
            oauth_signature : signature, 
            oauth_signature_method : "HMAC-SHA1", 
            oauth_timestamp : toString(timestamp), 
            oauth_token : oauthtoken, 
            oauth_version : "1.0"
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