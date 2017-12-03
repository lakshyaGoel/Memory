import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ScrollView,
  TouchableHighlight, TextInput
} from 'react-native';
import config from '../config';
import { Form, Separator, InputField, SwitchField } from 'react-native-form-generator';

export default class FormView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{},
      note_share: false,
      disable_submit: true
    }
  }
  handleFormChange(formData){
    const t = formData.note_title;
    const d = formData.note_description;
    const c = formData.note_content;
    if(t && d && c){
      this.setState({formData:formData, note_share: formData.sharing_note, disable_submit: false});  
      }else{
        this.setState({formData:formData, note_share: formData.sharing_note, disable_submit: true});
      }
      
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleSubmit() {
    var noteData = {
      noteId: "",
      sharePref: this.state.note_share,
      noteType: "Text",
      noteTitle: this.state.formData.note_title,
      noteDesc: this.state.formData.note_description,
      noteCont: this.state.formData.note_content,
      tags: this.state.formData.note_tags,
      shared: this.state.formData.note_shared,
      userID: this.props.screenProps.profile.name,
      lastEdit: this.props.screenProps.profile.name
    };

    const {getAuthorizationHeader} = this.props.screenProps;
    const auth = getAuthorizationHeader();
    let request = new Request(`${config.API_BASE}/api/db/add-note`, {
      method: 'POST',
      headers: {
        "Authorization": auth.Authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(noteData)
    });
    fetch(request).then(function (data) {
      console.log('Request succeeded with JSON response', data);
      if (data.status === 200) {
        return true;
      }
    }).then(re => {
      console.log("Should go to Home");
    })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }
  render(){
    return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Form
        ref='text_note'
        onChange={this.handleFormChange.bind(this)}
        label="Text Note">
        <InputField
          ref='note_title'
          label='Title'
          placeholder='Title'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.text_note.refs.note_title.valid){
                return self.refs.text_note.refs.note_title.validationErrors.join("\n");
              }

            }
          })(this)}
          validationFunction={[(value)=>{
            if(value == '') return "Required";
            if(!value) return true;
          }, (value)=>{
            if(!value) return true;
          }]}
          />
        <InputField 
          label='Description' 
          ref='note_description' 
          placeholder='Description'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.text_note.refs.note_description.valid){
                return self.refs.text_note.refs.note_description.validationErrors.join("\n");
              }

            }
          })(this)}
          validationFunction={[(value)=>{
            if(value == '') return "Required";
            if(!value) return true;
          }, (value)=>{
            if(!value) return true;
          }]} />

        <InputField
          multiline={true}
          label='Content'
          ref='note_content'
          placeholder='Note Content'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.text_note.refs.note_content.valid){
                return self.refs.text_note.refs.note_content.validationErrors.join("\n");
              }

            }
          })(this)}
          validationFunction={[(value)=>{
            if(value == '') return "Required";
            if(!value) return true;
          }, (value)=>{
            if(!value) return true;
          }]}/>
        
        <InputField
          multiline={true}
          label='Tags'
          ref='note_tags'
          placeholder='Tags'
          helpText='Enter tags like #note'
          value={this.state.text}/>
        
        <SwitchField label='Do You Want to Share?'
          ref="sharing_note"/>
        
        {
          this.state.note_share
            ? <InputField
                multiline={true}
                ref='note_shared'
                placeholder='Share with?'
                helpText='Enter usernames seperated by ,'
                autoCapitalize='none'/>
            : null
        }
        </Form>
        <TouchableHighlight
          disabled={this.state.disable_submit}
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>

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