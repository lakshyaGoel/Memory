import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from 'react-native';
import { Form, Separator, InputField, SwitchField, PickerField } from 'react-native-form-generator';
import { Constants, ImagePicker } from 'expo';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast, {DURATION} from 'react-native-easy-toast';



export default class AddImage extends React.Component {
  state = {
    formData:{},
    image: null,
    position: 'top',
    disable_submit: false
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
  handleFormChange(formData){
    const t = formData.title;
    const d = formData.image_description;
    const c = formData.image;
    if(t && d && c){
      this.setState({formData:formData, disable_submit: false});  
      }else{
        this.setState({formData:formData, disable_submit: true});
      }
      
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleSubmit() {
    var imageData = {
      id: "",
      tagIdList: this.state.tags,
      description: "",
      imageBinary: this.state.image,
      userMail: ""
    };
    this.refs.toast.show('Image Saved!', DURATION.LENGTH_SHORT);
    
    // const {getAuthorizationHeader} = this.props.screenProps;
    // const auth = getAuthorizationHeader();
    // let request = new Request(`${config.API_BASE}/api/db/add-note`, {
    //   method: 'POST',
    //   headers: {
    //     "Authorization": auth.Authorization,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(noteData)
    // });
    // fetch(request).then(function (data) {
    //   console.log('Request succeeded with JSON response', data);
    //   if (data.status === 200) {
    //     return true;
    //   }
    // }).then(re => {
    //   this.refs.toast.show('Image Saved!', DURATION.LENGTH_SHORT);
    //   this.setState({formData:{}});
    //   //TO-DO Navigate to ALl Notes
    // })
    //   .catch(function (error) {
    //     console.log('Request failed', error);
    //   });
  }

  render() {
    let { image } = this.state;
    
    return (
      
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Form
        ref='image'
        onChange={this.handleFormChange.bind(this)}
        label="Image">

        <InputField
          ref='image_title'
          label='Title'
          placeholder='Title'/>
          <InputField
          ref='Choose_Image'
          label='Choose Image'
          />

          {/* <PickerField ref='image'
          label='Choose Image'
          options={{
            "": '',
            male: 'Memory1',
            female: 'Memory2'
          }}
          iconRight={
          <MaterialIcons name='chevron-right'
          size={30}
          
          />}/> */}
        <TouchableHighlight onPress={this._pickImageCam}>
          <MaterialCommunityIcons name="camera" size={32}  />
        </TouchableHighlight>

        <TouchableHighlight onPress={this._pickImage}>
          <MaterialIcons name="photo-library" size={32}  />
        </TouchableHighlight>

        
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Separator />
        <InputField 
          label='Description' 
          ref='image_description' 
          placeholder='Description'
          />
          <PickerField ref='memory'
          label='Choose Memory'
          options={{
            "": '',
            Memory1: 'Memory1',
            Memory2: 'Memory2'
          }}
          iconRight={
          <MaterialIcons name='chevron-right'
          size={30}
          
          />}/>
          <InputField
          label='Tags'
          ref='note_tags'
          placeholder='Tags'
          helpText='Enter tags like #note'
          value={this.state.text}/>
      </Form>
        <TouchableHighlight
          disabled={this.state.disable_submit}
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <Toast ref="toast" position={this.state.position}/>
      </ScrollView>);
    
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