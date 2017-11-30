import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class AddText extends React.Component {

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Show functionality to add a Text Note</Text>
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
