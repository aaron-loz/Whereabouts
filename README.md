Whereabouts is a ReactNative application which allows a user to view a map of tweets of those they follow.  
Our goal is to give an alternative view of our surroundings by mapping social interactions on twitter.
The application is interactive, user focused, and simply designed.  

Currently this application is built for Android devices.  Contributions to the ios code will be welcomed after december 22, 2019.

Our main tech stack:
React builds an application on the user’s mobile device and handles all client-side requests like authentification, navigation across pages, and liking favourite twits It also manimulates with data from Firebase. </br>
Flasks receives requests from React to fetch the data, then it makes requests to Twitter API, and sends received response to React.</br>
Firebase stores the data and allow to CRUD them from React.

To start the app, you should have npm cli, expo, react-native, python, and flask installed.
After installing tools, build the app using `npm install` and `npm start`, then scan QR code from the mobile app Expo.

 
 
WhereAbouts is designed and developed by Clara Fairbanks, Aaron Lopez and Liudmila Zyrianova.
