import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class AuthDemoScreen extends React.Component {

  render() {
    const {profile, login, logout, getAuthorizationHeader} = this.props.screenProps;
    const {navigate} = this.props.navigation;

    const msg = (!profile) ? <Text>hi</Text> : <Text>hi {profile.name}</Text>

    return (
      <View style={styles.container}>
        <Button title="Login with Auth0" onPress={login} />
        <Button title="Log Out" onPress={logout} />
        {msg}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
