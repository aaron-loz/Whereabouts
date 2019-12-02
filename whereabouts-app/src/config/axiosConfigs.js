import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'
import config from '../../config';
//Todo: remove Oauth-1.0a and oauth-signature
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


export function get_friends_using_fetch(twitname){
    url = config.IP_ADDR + ':5000/get_friends/'+twitname // would need to be changed if flask has a different specified port
    return fetch(url)
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

export function search_tweets(query, geo){
    console.log("searching tweets using : " + query + " and "+ geo)
    url = "http://"+ config.IP_ADDR +":5000/get_tweets/"+query+"/"+geo;
    return axios.get(url, {
        headers:{
            "Access-Control-Allow-Origin":"*",
            "consumer-key": config.TW_CUSTOMER_KEY, 
            "consumer-secret-key": config.TW_CUSTOMER_SECRET_KEY,
            "access-token": config.TW_ACCESS_TOKEN,
            "access-secret-token": config.TW_ACCESS_SECRET_TOKEN
        }})
        .then((response) =>{
            // console.log("response:")
            // console.log(response)
            return response
        })
        .catch((error)=> {
            console.log(error)
            return error        
    })
}

