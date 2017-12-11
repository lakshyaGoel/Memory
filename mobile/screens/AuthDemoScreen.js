import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { withAuth } from '../Auth';

export default class AuthDemoScreen extends React.Component {

  render() {
    const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;
    const {navigate} = this.props.navigation;

    const p = (!profile) ? <Text>Hi</Text> : <Image style={styles.logo} source={{uri: profile.picture}} />
    const msg = (!profile) ? <Text>Hi</Text> : <Text style={styles.title}>Hi, {profile.nickname}</Text>
    const msg1 = (!profile) ? <Text>Hi</Text> : <Text style={styles.title1}>{profile.name}</Text>
    return (
      <View style={styles.container}>
        {p}
        {msg}
        {msg1}
        <Button title="Log Out" onPress={logout} style={styles.buttonStyle}/>
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  logo: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:150,
    height:150,
    backgroundColor:'#fff',
    borderRadius:80,
  },
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
