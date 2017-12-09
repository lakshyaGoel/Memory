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
    //const {navigate} = this.props.navigation;

    //const msg = (!profile) ? <Text>hi</Text> : <Text>hi {profile.name}</Text>

        return (
            // <View style={styles.container}>
            //   <Text>Landing Page</Text>
            //   <Button title="Login with Auth0" onPress={login} />
            //   <Button title="Log Out" onPress={logout} />
            //   {msg}
            // </View>
            <Image
                source={require('../landing_pic.jpg')}
                style={styles.container}>
                <Button
                    onPress={login}
                    title="Create Memories"
                    fontSize="40"
                    color="brown"
                    textShadowColor="green"
                />
                {/* <Text style={styles.welcome}>
                Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+D or shake for dev menu
                </Text> */}
          </Image>
          )
    
    
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: '#fff',
//     //backgroundImage: 'url()',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: 40,
//   },
// });
