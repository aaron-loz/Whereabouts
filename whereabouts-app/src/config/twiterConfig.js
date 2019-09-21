import twitter, {auth} from 'react-native-twitter'

let config = {
    consumerKey = process.env.REACT_APP_CUS_KEY,
    consumeSecret = process.env.REACT_APP_CUS_KEY_SEC
};

let acctdetails = twitter.auth(config, process.env.REACT_APP_CALLBACK);
export const twitdetails = {
    twitid = acctdetails.id,
    user = acctdetails.name,
    accesstok = acctdetails.accessToken
};