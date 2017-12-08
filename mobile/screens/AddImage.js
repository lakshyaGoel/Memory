import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput
} from 'react-native';
import {Form, Separator, InputField, SwitchField, PickerField} from 'react-native-form-generator';
import {Constants, ImagePicker} from 'expo';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import Toast, {DURATION} from 'react-native-easy-toast';
import config from '../config';

export default class AddImage extends React.Component {
  state = {
    formData: {},
    image: null,
    position: 'top',
    disable_submit: true
  };

  _pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  };

  _pickImageCam = async() => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
    }
  };
  handleFormChange(formData) {
    const t = formData.image_title;
    const d = formData.image_description;
    const c = this.state.image;
    const m = formData.image_memory;
    if (t && d && c && m) {
      this.setState({formData: formData, disable_submit: false});
    } else {
      this.setState({formData: formData, disable_submit: true});
    }
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleSubmit() {
    var imageData = {
      tagIdList: this.state.formData.image_tags,
      description: this.state.formData.image_description,
      title: this.state.formData.image_title,
      imageBinary: this.state.image,
      userMail: this.props.screenProps.profile.name
    };
    const {getAuthorizationHeader} = this.props.screenProps;
    const auth = getAuthorizationHeader();

    let request = new Request(`${config.API_BASE}/api/db/add-image-to-the-memory`, {
      method: 'POST',
      headers: {
        "Authorization": auth.Authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(imageData)
    });
    fetch(request).then(function (data) {
      console.log('Request succeeded with JSON response', data);
      if (data.status === 200) {
        return true;
      }
    }).then(re => {
      this.refs.toast.show('Image Saved!', DURATION.LENGTH_SHORT);
      this.setState({formData: {}});
      //TO-DO Navigate to ALl Notes
    }).catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    let {image} = this.state;

    return (

      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <Form
          ref='image'
          onChange={this.handleFormChange.bind(this)}
          label="Image">

          <InputField
            ref='image_title'
            label='Title'
            placeholder='Title'
            helpText={((self) => {
            if (Object.keys(self.refs).length !== 0) {
              if (!self.refs.image.refs.image_title.valid) {
                return self.refs.image.refs.image_title.validationErrors.join("\n");
              }
            }
          })(this)}
            validationFunction={[
            (value) => {
              if (value == '') 
                return "Required";
              if (!value) 
                return true;
              }
            ,
            (value) => {
              if (!value) 
                return true;
              }
            ]}/>

          <InputField ref='Choose_Image' label='Choose Image'/>
          <TouchableHighlight onPress={this._pickImageCam}>
            <MaterialCommunityIcons name="camera" size={32}/>
          </TouchableHighlight>

          <TouchableHighlight onPress={this._pickImage}>
            <MaterialIcons name="photo-library" size={32}/>
          </TouchableHighlight>

          {image && <Image
            source={{
            uri: image
          }}
            style={{
            width: 200,
            height: 200
          }}/>}
          <Separator/>
          <InputField
            label='Description'
            ref='image_description'
            placeholder='Description'
            helpText={((self) => {
            if (Object.keys(self.refs).length !== 0) {
              if (!self.refs.image.refs.image_title.valid) {
                return self.refs.image.refs.image_title.validationErrors.join("\n");
              }
            }
          })(this)}
            validationFunction={[
            (value) => {
              if (value == '') 
                return "Required";
              if (!value) 
                return true;
              }
            ,
            (value) => {
              if (!value) 
                return true;
              }
            ]}/>
          <PickerField
            ref='image_memory'
            label='Choose Memory'
            options={{
            "": '',
            Memory1: 'Memory1',
            Memory2: 'Memory2'
          }}
            iconRight={< MaterialIcons name = 'chevron-right' size = {
            30
          } />}
            helpText={((self) => {
            if (Object.keys(self.refs).length !== 0) {
              if (!self.refs.image.refs.image_title.valid) {
                return self.refs.image.refs.image_title.validationErrors.join("\n");
              }
            }
          })(this)}
            validationFunction={[
            (value) => {
              if (value == '') 
                return "Required";
              if (!value) 
                return true;
              }
            ,
            (value) => {
              if (!value) 
                return true;
              }
            ]}/>
          <InputField
            label='Tags'
            ref='image_tags'
            placeholder='Tags'
            helpText='Enter tags like #note'
            value={this.state.text}
            helpText={((self) => {
            if (Object.keys(self.refs).length !== 0) {
              if (!self.refs.image.refs.image_title.valid) {
                return self.refs.image.refs.image_title.validationErrors.join("\n");
              }
            }
          })(this)}
            validationFunction={[
            (value) => {
              if (value == '') 
                return "Required";
              if (!value) 
                return true;
              }
            ,
            (value) => {
              if (!value) 
                return true;
              }
            ]}/>
        </Form>
        <TouchableHighlight
          disabled={this.state.disable_submit}
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <Toast ref="toast" position={this.state.position}/>
      </ScrollView>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },

  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});