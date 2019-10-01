import axios from 'react-native-axios'
import {encode as btoa} from 'base-64'

export function init(cuskey, seckey){
    axios.defaults.baseURL = 'https://api.twitter.com';
    //TODO: RFC 1738 this. 
    axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(cuskey + ':' + seckey);
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    axios.defaults.headers.post['Accept-Encoding'] = 'gzip';
}

export function getToken(){
    return axios.post('/oauth2/token', 'grant_type=client_credentials', {
        'User-Agent' : 'whereabouts dev',
        Accept: '*/*',
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