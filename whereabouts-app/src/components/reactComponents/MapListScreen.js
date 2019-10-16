import React from 'react';
import { Alert, FlatList, Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { db } from '../../config/firebaseConfig';
//import CustomRow from './CustomRow';
import styles from './styles';
import likeimg from '../images/like.png';

export default class MapListScreen extends React.Component  {
    static navigationOptions = {
      title: 'Map List',
    };

    //boilerplate data
    getData() {
      return [
        {
          key: 1, title: '@joetheguy',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 2,
          title: '@janethejane',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
        {
          key: 3, title: '@benjiiiii',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 4,
          title: '@ali123456',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
        {
          key: 5, title: '@markuslarkus',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 6,
          title: '@fridafrido',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
        {
          key: 7, title: '@joetheguy',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 8,
          title: '@janethejane',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
        {
          key: 9, title: '@benjiiiii',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 10,
          title: '@ali123456',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
        {
          key: 11, title: '@markuslarkus',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://vivirtupasion.com/wp-content/uploads/2016/05/DANI_PERFILzoomCircle.png',
          location: 'tagged location'
        },
        {
          key: 12,
          title: '@fridafrido',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
          image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png',
          location: 'tagged location'
        },
      ]
    }

    render() {
      return (
        <View style={styles.list_container}>
          <FlatList
            data={this.getData()}
            renderItem={({ item }) =>
              <View style={styles.r_container}>
                  <Image source={{ uri: item.image_url }} style={styles.r_photo} />
                  <View style={styles.r_container_text}>
                      <Text style={styles.r_title}>
                          {item.title}
                      </Text>
                      <Text style={styles.r_description}>
                          {item.description}
                      </Text>
                      <Text style={styles.r_location}>
                          {item.location}
                      </Text>
                  </View>
                  <Image source={likeimg} style={styles.r_photo} />

              </View>
            }
          />
      </View>

      );
    }
  };
