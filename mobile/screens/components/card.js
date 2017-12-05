import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const CardComponent = () => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
};

class Card extends React.Component {
    render(){
        return (
            <CardComponent/>
        )
    }
}

export default Card;