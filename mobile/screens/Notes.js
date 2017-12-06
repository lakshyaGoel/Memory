import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Memory from './components/card';

// TODO: use Stateless Functional Component(SFC) to make your component smaller and maintainable!
// TODO: separate Presentational Component(=SFC) and Container Component
// TODO: one good idea relate to function in SFC is send parameter and function from Container Component to SFC, not define function!
// What a great idea this is!
//
// don't know SFC? google it!
// or see below.
const item = ({text}) => {
    return (
        <View><Text>This is SFC, {text}</Text></View>
    );
};
export default class Notes extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Memory/>
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
