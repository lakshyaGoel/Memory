import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Card, Button } from 'react-native-elements'

const CardComponent = ({title, imgPath, description}) =>{
    return (
        <Card style={{width: "100%"}}
              title={title? title: "Dummy title"}
              image={imgPath? imgPath: require('../../src/image/dummy.png')}>
            <Text style={{marginBottom: 10}}>
                {description? description: "dummy description goes here."}
            </Text>
            <Button
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW Memory'/>
        </Card>
    )
};

export default class Memory extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <CardComponent title={this.props.title}/>
        )
    }
}