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
              image={imgPath? {uri: imgPath}: require('../../src/image/dummy.png')}>
            <Text style={{marginBottom: 10}}>
                {description? description: "dummy description goes here."}
            </Text>
        </Card>
    )
};

export default class ImageCard extends React.Component {
    constructor(props){
        super(props);
    }

    setNativeProps (nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render(){
        return (
            <View ref={component => this._root = component}>
            <CardComponent title={this.props.title} description={this.props.description} imgPath={this.props.imgPath}/>
            </View>
        )
    }
}