import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import navigation, { TabNavigator } from 'react-navigation';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { withAuth } from './Auth';

import Notes from './screens/Notes';
import AddText from './screens/AddText';
import AddImage from './screens/AddImage';
import Options from './screens/Options';
import SignIn from './screens/AuthDemoScreen';

const RootNavigator = TabNavigator({
  Notes: {
    screen: Notes,
    navigationOptions: {
      title: 'Notes',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="note" size={32} color={tintColor} />
    },
  },
  Text: {
    screen: AddText,
    navigationOptions: {
      title: 'Save Text',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="format-text" size={32} color={tintColor} />
    },

  },
  Image: {
    screen: AddImage,
    navigationOptions: {
      title: 'Save Image',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name="image" size={32} color={tintColor} />
    },

  },
  Options: {
    screen: Options,
    navigationOptions: {
      title: 'Options',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="list" size={32} color={tintColor} />
    },
  },
  //Temporary. Needs to be removed after signIn and signUp works
  SignIn:{
    screen: SignIn,
    navigationOptions:{
      title: 'Sign In',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="list" size={32} color={tintColor} />
    }
  }
});

class App extends React.Component {

  render() {
    // screenProps is one way to pass props to a navigator
    // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option
    return <RootNavigator screenProps={this.props} />
  }

}

Expo.registerRootComponent(withAuth(App));
