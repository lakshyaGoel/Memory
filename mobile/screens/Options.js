import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class Options extends React.Component {

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Show Options</Text>
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
