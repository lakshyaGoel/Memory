import React, {Component} from 'react';
import {StyleSheet, Text, ScrollView, TouchableHighlight} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: 'black',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
};

const options = {
  fields: {
    title: {
      error: 'A Title is needed'
    },
    description: {
      error: 'Write a small Description'
    },
    content: {
      error: 'Here goes the Note',
      multiline: true
    },
    tags: {
      placeholder: 'Enter tags e.g. #note'
    },
    users: {
      editable: false,
      placeholder: 'Enter usernames seperated by ,',
    }
  },
  stylesheet: formStyles
};

var Note = t.struct({
  title: t.String,
  description: t.String,
  content: t.String,
  tags: t.maybe(t.String),
  share: t.Boolean,
  users: t.maybe(t.String),
});

export default class AddText extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onChange = this
      .onChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleSubmit = () => {
    const value = this
      ._form
      .getValue();
    if (value) {
      console.log(value);
    }
  }
  getInitialState() {
    return {
      options: options,
      value: null,
      height: '35'
    };
  }

  onChange(value) {
    var options = t.update(this.state.options, {
      fields: {
        users: {
          editable: {'$set': value.share}
        }
      }
    });
    this.setState({options: options, value: value});
  }
  render() {
    
    return (
      <ScrollView style={styles.container}>
        <Form
          ref={c => this._form = c}
          type={Note}
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
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