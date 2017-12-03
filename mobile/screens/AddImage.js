import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Constants, ImagePicker } from 'expo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class AddImage extends React.Component {
  state = {
    image: null,
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  
  _pickImageCam = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;
    
    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={this._pickImageCam}>
          <MaterialCommunityIcons name="camera" size={32}  />
        </TouchableHighlight>

        <TouchableHighlight onPress={this._pickImage}>
          <MaterialIcons name="photo-library" size={32}  />
        </TouchableHighlight>

        
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
