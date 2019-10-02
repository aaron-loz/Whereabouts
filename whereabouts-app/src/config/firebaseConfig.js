import Firebase from 'firebase';
import Config from '../../config';

let config = {
    apiKey: Config.FB_KEY,
    authDomain: Config.FB_AUTH_DOMAIN,
    databaseURL: Config.FB_URL,
    projectId: Config.FB_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: Config.FB_SENDER_ID,
    appId: Config.FB_APP_ID
};


let app = Firebase.initializeApp(config);
export const db = app.database();
