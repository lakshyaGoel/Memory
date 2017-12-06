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
import Toast, {DURATION} from 'react-native-easy-toast';
export default class FormView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{},
      disable_submit: true,
      position: 'top'
    }
  }
  handleFormChange(formData){
    const t = formData.memory_title;
    const d = formData.memory_description;
    const c = formData.memory_country;
    if(t && d && c){
      this.setState({formData:formData, disable_submit: false});  
      }else{
        this.setState({formData:formData, disable_submit: true});
      }
      
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleSubmit() {
    var memoryData = {
      memoryTitle: this.state.formData.memory_title,
      memoryDescription: this.state.formData.memory_description,
      memoryCountry: this.state.formData.memory_country,
      memoryCities: this.state.formData.memory_cities,
      userID: this.props.screenProps.profile.name
    };
    const {getAuthorizationHeader} = this.props.screenProps;
    const auth = getAuthorizationHeader();
    let request = new Request(`${config.API_BASE}/api/db/add-memory`, {
      method: 'POST',
      headers: {
        "Authorization": auth.Authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memoryData)
    });
    fetch(request).then(function (data) {
      console.log('Request succeeded with JSON response', data);
      if (data.status === 200) {
        return true;
      }
    }).then(re => {
      this.refs.toast.show('You got a new Destination. Safe Travels!', DURATION.LENGTH_SHORT);
      //this.setState({formData:{}});
      //TO-DO Navigate to ALl memorys
    })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }
  render(){
    return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <Form
        ref='memory'
        onChange={this.handleFormChange.bind(this)}
        label="Create a Memory">
        <InputField
          ref='memory_title'
          label='Memory'
          placeholder='Memory?'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.memory.refs.memory_title.valid){
                return self.refs.memory.refs.memory_title.validationErrors.join("\n");
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
          ref='memory_description' 
          placeholder='Description'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.memory.refs.memory_description.valid){
                return self.refs.memory.refs.memory_description.validationErrors.join("\n");
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
          label='Country'
          ref='memory_country'
          placeholder='Country Travelling to'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.memory.refs.memory_country.valid){
                return self.refs.memory.refs.memory_country.validationErrors.join("\n");
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
          multiline = {true}
          label = 'Cities'
          ref = 'memory_cities'
          placeholder = 'Cities travelling to'
          autoCapitalize = 'none'
          helpText={((self)=>{
            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.memory.refs.memory_country.valid){
                return self.refs.memory.refs.memory_country.validationErrors.join("\n");
              }

            }
          })(this)}
          validationFunction={[(value)=>{
            if(value == '') return "Required";
            if(!value) return true;
          }, (value)=>{
            if(!value) return true;
          }]} />
        </Form>
        <TouchableHighlight
          disabled={this.state.disable_submit}
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Travel</Text>
        </TouchableHighlight>
        <Toast ref="toast" position={this.state.position}/>
      </ScrollView>);
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 100,
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