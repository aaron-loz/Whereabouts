import React from 'react';
import { Text, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
let accountIdsRef = db.ref('/accountIds');
let friedsIdsRef = db.ref('/friends');
let likesIdsRef = db.ref('/likes');
import styles from './styles';

export default class MapScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map Screen'
    };
  
    state = {
      accounts: [],
      friends: [],
      likes: []
    };
  
    componentDidMount() {
      accountIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let accounts = Object.values(data);
        this.setState({ accounts });
      });
      friedsIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let friends = Object.values(data);
        this.setState({ friends });
      });
      likesIdsRef.on('value', snapshot => {
        let data = snapshot.val();
        let likes = Object.values(data);
        this.setState({ likes });
      });
    }
  
    render() {
      return (
        <View style= {styles.main}>
          <Text style={styles.title}>This is a Map!</Text>

          <Text>--------------------</Text>

          {/* Renders accounts */}
          <Text style={styles.title}>Accounts:</Text>
          <Text>
            {this.state.accounts.length > 0 ? (
              <Text>
                {this.state.accounts.map((acc, index) => {
                  return (
                    <Text key={index}>{acc.id}   </Text>
                  );
                })}
              </Text>
            ) : (
              <Text>No accounts</Text>
            )}
          </Text>

          <Text>--------------------</Text>

          {/* Renders friends */}
          <Text style={styles.title}>Friends:</Text>
          <Text>
            {this.state.friends.length > 0 ? (
              <Text>
                {this.state.friends.map((acc, index) => {
                    return (
                      <Text key={index}>
                        {Object.values(acc).map((friend, index1) => {
                          return(
                            <Text key={index1}>{friend.friendId}  </Text>
                          )
                        })}
                        <Text>...</Text>
                      </Text>
                    );
                })}
              </Text>
            ) : (
              <Text>No friends</Text>
            )}
          </Text>

          <Text>--------------------</Text>

          {/* Renders likes */}
          <Text style={styles.title}>Likes:</Text>
          <Text>
            {this.state.likes.length > 0 ? (
              <Text>
                {this.state.likes.map((acc, index) => {
                    return (
                      <Text key={index}>
                        {Object.values(acc).map((like, index1) => {
                          return(
                            <Text key={index1}>{like.locationId}  </Text>
                          )
                        })}
                        <Text>... </Text>
                      </Text>
                    );
                })}
              </Text>
            ) : (
              <Text>No likes</Text>
            )}
          </Text>

          <Text>--------------------</Text>

        </View>
      );
    }
  };