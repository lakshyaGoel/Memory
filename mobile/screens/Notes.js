import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation'
import Memory from './components/card';
import ImageCard from './components/imageCard';
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
       this.reload();
    }

    goToMemory(memoryId){
        var navi = this.props.navigation;
        return function(){
            navi.navigate('MemoryDetail', {"memoryId": memoryId});
        }
    }

    render(){
        if(this.state.memoryList.length == 0){
            return (
                <View style={styles.container}>
                    <Button onPress={this.reload} title="Relogin and Reload">Reload</Button>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    {this.state.memoryList.map((data) => {
                        console.log("inside",data);
                        return (
                            <TouchableHighlight onPress={this.goToMemory(data._id)}>
                            <Memory title={data.name} description={data.description} imgPath={data.imageIdList[0].imageBinary}/>
                            </TouchableHighlight>
                        );
                    })}
                </View>
            )
        }
    }
}


class Note2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
        console.log("run note2: and see memoryId", props.navigation.state.params.memoryId);
        let memoryId = props.navigation.state.params.memoryId;

        var data = {
            memoryId: memoryId
        };

        let request = new Request(`${config.API_BASE}/api/db/memory-image`, {
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
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json => {
            if(json.status){
                // console.log({"memoryList": json.data});
                this.state.memoryList = json.data;// not so good but
                console.log("get Data from API and setState: ", this.state);
            }
        });

        // this.reload = this.reload.bind(this);
    }

    componentDidMount(){
        let memoryId = this.props.navigation.state.params.memoryId;

        var data = {
            memoryId: memoryId
        };

        let request = new Request(`${config.API_BASE}/api/db/memory-image`, {
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
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json => {
            if(json.status){
                console.log({"memoryList": json.data});
                this.setState({"memoryList": json.data});
                console.log("get Data from API and setState: ", this.state.memoryList.imageIdList);
            }
        });
    }

    reload(){
        let memoryId = this.props.navigation.state.params.memoryId;

        var data = {
            memoryId: memoryId
        };

        let request = new Request(`${config.API_BASE}/api/db/memory-image`, {
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
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json => {
            if(json.status){
                console.log({"memoryList": json.data});
                this.setState({"memoryList": json.data});
                console.log("get Data from API and setState: ", this.state.memoryList.imageIdList);
            }
        });
    }




    goToMemory(memoryId){
        return function(){
        }
    }

    render(){
        if(this.state.memoryList == undefined){
            return (
                <View style={styles.container}>
                    <Button onPress={this.reload} title="Relogin">Reload</Button>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    {this.state.memoryList.imageIdList.map((data) => {
                        return (
                            <TouchableHighlight onPress={this.goToMemory(data._id)}>
                                <ImageCard title={data.title} description={data.description} imgPath={data.imageBinary}/>
                            </TouchableHighlight>
                        );
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

const ReadStack = StackNavigator({
    AllMemory: {
        screen: Notes,
    },
    MemoryDetail:{
        screen: Note2,
        path: "Note2/:memoryId"
    }
}, {
    initialRouteName: "AllMemory"
});

export default ReadStack;