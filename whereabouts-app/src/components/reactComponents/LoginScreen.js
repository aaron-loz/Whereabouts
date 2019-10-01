import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, Text, Button} from 'react-native';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import bgSrc from '../images/wallpaper.png';

export default class LoginScreen extends React.Component  {
  static navigationOptions = {
    title: 'Login Screen',
  };
  render() {
    return(
      <Wallpaper>
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit />
      </Wallpaper>

    );
  }
};
