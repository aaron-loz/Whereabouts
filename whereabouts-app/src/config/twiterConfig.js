import twitter, {auth} from 'react-native-twitter'

let config = {
    consumerKey = process.env.REACT_APP_CUS_KEY,
    consumeSecret = process.env.REACT_APP_CUS_KEY_SEC
};

let acctdetails = twitter.auth(config, process.env.REACT_APP_CALLBACK);
class keepdeets {
    constructor(acctdetails) {
        this.twitid = acctdetails.id,
            this.user = acctdetails.name,
            this.accesstok = acctdetails.accessToken;
    }
};
export const twitdetails = new keepdeets(acctdetails)