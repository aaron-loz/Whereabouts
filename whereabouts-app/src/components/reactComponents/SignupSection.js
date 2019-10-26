import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text} from 'react-native';
import styles from './styles';

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.signUp_container}>
        <Text style={styles.signUp_text}>Create Account</Text>
      </View>
    );
  }
}
