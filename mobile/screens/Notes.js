import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from './components/card';

export default class Notes extends React.Component{

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Show All notes (My Notes + Shared Notes) with a toggle at the top to show only My Notes. Also, show a small icon if the note is a Shared Note</Text>
        <Card/>
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
