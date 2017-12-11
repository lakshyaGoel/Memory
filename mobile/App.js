import Expo from 'expo';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import navigation, { TabNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { withAuth } from './Auth';

import Memories from './screens/Notes';
import AddMemory from './screens/AddText';
import AddImage from './screens/AddImage';
import SignIn from './screens/AuthDemoScreen';
import Landing from './screens/LandingScreen';

const RootNavigator = TabNavigator({
  Memories: {
    screen: Memories,
    navigationOptions: {
      title: 'Memories',
      tabBarIcon: ({ tintColor }) => <Entypo name="aircraft" size={32} color={tintColor} />
    },
  },
  AddMemory: {
    screen: AddMemory,
    navigationOptions: {
      title: 'Add Memory',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="airplane-takeoff" size={32} color={tintColor} />
    },

  },
  Image: {
    screen: AddImage,
    navigationOptions: {
      title: 'Save Image',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="camera-retro" size={32} color={tintColor} />
    },

  },
  SignIn:{
    screen: SignIn,
    navigationOptions:{
      title: 'Profile',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="list" size={32} color={tintColor} />
    }
  }
});

class App extends React.Component {

  render() {
    // screenProps is one way to pass props to a navigator
    // https://reactnavigation.org/docs/navigators/navigation-options#Two-Ways-to-specify-each-option
    if(this.props.profile.name){
      return <RootNavigator screenProps={this.props} />
      //return <Text>The value is {this.props.profile.name}</Text>
    }
    else{
      return <Landing screenProps={this.props}/>
      //return <Text>The value is {this.props.profile.name}</Text>
    }
  }

}

Expo.registerRootComponent(withAuth(App));
