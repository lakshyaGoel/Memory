import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from '../config'

class FetchDemoScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'no message yet',
      authStatus: 'not tested yet',
    }
  }

  componentDidMount() {
    const {getAuthorizationHeader} = this.props.screenProps;

    // unauthenticated demo

    fetch(`${config.API_BASE}/hello-world`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('fetched:', JSON.stringify(responseJson));
        this.setState({message: responseJson.message});
      })
      .catch((error) => {
        console.error(error);
      });

    // authenticated demo

    let myRequest = new Request(`${config.API_BASE}/api/db/protected`, {
      method: 'GET',
      // this header sends the user token from auth0
      headers: getAuthorizationHeader()
    });
    // console.log('request', myRequest);

    fetch(myRequest)
      .then(response => {
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ 'authStatus': 'works!' });
      })
      .catch(error => {
        this.setState({ 'authStatus': 'broken; are you logged in? check logs.' });
      });
  }

  render() {
    return (
      <View>
        <Text>fetch demo</Text>
        <Text>message: {this.state.message}</Text>
        <Text>auth: {this.state.authStatus}</Text>
      </View>
    );
  }

}

export default FetchDemoScreen;
