import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { withAuth } from '../Auth';

export default class AuthDemoScreen extends React.Component {

  render() {
    const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;
    const {navigate} = this.props.navigation;

    const msg = (!profile) ? <Text>Hi</Text> : <Text style={styles.title}>Hi, {profile.nickname}</Text>
    const msg1 = (!profile) ? <Text>Hi</Text> : <Text style={styles.title1}>{profile.name}</Text>
    return (
      <View style={styles.container}>
        {msg}
        {msg1}
        <Button title="Log Out" onPress={logout} style={styles.buttonStyle}/>
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 140,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    fontWeight: 'bold'
  },
  title1: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    color: 'grey'
  },
  buttonStyle: {
    width: 150,
    height: 75,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  }
});
