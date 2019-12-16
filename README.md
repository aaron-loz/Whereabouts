# About
Whereabouts is a ReactNative application which allows a user to view a map of tweets of those they follow.  
Our goal is to give an alternative view of our surroundings by mapping social interactions on twitter.
The application is interactive, user focused, and simply designed.  

Currently this application is built for Android devices.  Contributions to the ios code will be welcomed after december 22, 2019.

Our main tech stack:
React builds an application on the user’s mobile device and handles all client-side requests like authentification, navigation across pages, and liking favourite twits It also manimulates with data from Firebase. </br>
Flasks receives requests from React to fetch the data, then it makes requests to Twitter API, and sends received response to React.</br>
Firebase stores the data and allow to CRUD them from React.

To start the app, you should have npm cli, expo, react-native, python, and flask installed.
For the flask instruction, you should follow these [steps](https://github.com/aaron-loz/Whereabouts/blob/master/flask-server/README.txt).
After installing tools, build the app using `npm install` and `npm start`, then scan QR code from the mobile app Expo.

 
 
WhereAbouts is designed and developed by Clara Fairbanks, Aaron Lopez and Liudmila Zyrianova.

# Quick start
1. Ensure you're in \whereabouts-app\ directory.
2. type in  `npm start`
3. In a separate shell, start flask server(details in \flask-server\README.txt)
4. On the phone, open the "expo" app.
5. After going on barcode scanner, go to the web page opened by `npm` and scan the barcode in the lower-left corner.

# Core Functionalities
  ## Map Screen
   The map screen displays every tweet with a location tagged on it within the range of the user by 10 miles. If scrolling around, new tweets will appear at their associated tags. If clicked on, a drawer will display the tweet at the bottom of the screen to be read and/or liked. If liked, it will appear in the Likes screen.
  ## List Screen
    The list screen is an easy to read view of the map screen for ease-of-perusing. It takes all the tweets in order of geographic distance, and lists them with their location and an ability to like said tweets, which are then added to the Likes screen.
  ## Likes
    The likes screen shows all tweets that are currently liked from the user's map screen, allowing a revisitng of the saved locations.