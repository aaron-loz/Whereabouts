import Firebase from 'firebase';

let config = {
    apiKey: process.env.FB_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.FB_SENDER_ID,
    appId: process.env.FB_APP_ID
};

let app = Firebase.initializeApp(config);
export const db = app.database();