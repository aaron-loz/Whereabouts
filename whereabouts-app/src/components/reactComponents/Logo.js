import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image} from 'react-native';
import styles from './styles';
import logoImg from '../images/logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.logo_container}>
        <Image source={logoImg} style={styles.logo_image} />
        <Text style={styles.logo_text}>WHEREABOUTS</Text>
      </View>
    );
  }
}
