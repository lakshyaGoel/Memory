import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Constants } from 'expo';
import Memory from './components/card';
import config from '../config';



class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "memoryList": []
        };
        this.reload = this.reload.bind(this);
    }

    reload(){
        console.log("reload:",this.props);
        var data = {
            userMail: this.props.screenProps.profile.name
        };

        let request = new Request(`${config.API_BASE}/api/db/all-memory`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetch(request)
        .then(response => {
            if(response.status){
                return response;
            }
            console.log(response);
        }).then(res => res.json())
        .then(json => {
            console.log("respond data");
            if(json.status){
                this.setState({"memoryList": json.data});
            }
        });
    }

    componentDidMount(){
        console.log("here in componentDidMount");

       this.reload();
    }

    render(){
        if(this.state.memoryList.length == 0){
            return (
                <View style={styles.container}>
                    <Button onPress={this.reload} title="Reload">Reload</Button>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    {this.state.memoryList.map((data) => {
                        console.log("inside",data);
                        return (<Memory title={data.name} description={data.description} />);
                    })}
                </View>
            )
        }
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


export default Notes;