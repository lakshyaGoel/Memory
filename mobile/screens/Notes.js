import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    FlatList,
    Dimensions
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
        console.log("reload:", this.props);
        var data = {
            userMail: this.props.screenProps.profile.name
        };

        let request = new Request(`${config.API_BASE}/api/db/all-memory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetch(request)
        .then(response =>{
            if(response.status){
                return response;
            }
            console.log(response);
        }).then(res => res.json())
        .then(json =>{
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
            // this.reload();// reload memory item when clicking memoryCardItem
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
            const window = Dimensions.get('window');
            return (
                <View style={styles.container}>
                        <FlatList
                            style={{width: window.width}}
                            data={this.state.memoryList}
                            renderItem={({item}) =>{
                                return (
                                    <TouchableHighlight onPress={this.goToMemory(item._id)}
                                                        style={{flex: 1}}
                                    >
                                        <Memory title={item.name} description={item.description}
                                                imgPath={item.imageIdList[0]? item.imageIdList[0].imageBinary: "" }/>
                                    </TouchableHighlight>
                                );
                            }
                            }
                        />
                </View>
            )
        }
    }
}


class Note2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        console.log("run note2: and see memoryId", props.navigation.state.params.memoryId);
        let memoryId = props.navigation.state.params.memoryId;

        var data = {
            memoryId: memoryId
        };

        let request = new Request(`${config.API_BASE}/api/db/memory-image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetch(request)
        .then(response =>{
            if(response.status){
                return response;
            }
            console.log(response);
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json =>{
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetch(request)
        .then(response =>{
            if(response.status){
                return response;
            }
            console.log(response);
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json =>{
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetch(request)
        .then(response =>{
            if(response.status){
                return response;
            }
            console.log(response);
            // get item's all image well but
            // could not move...
            //
        }).then(res => res.json())
        .then(json =>{
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
            const window = Dimensions.get('window');
            return (
                <View style={styles.container}>
                    <FlatList
                        style={{width: window.width}}
                        data={this.state.memoryList.imageIdList}
                        renderItem={({item}) =>{
                            return (
                                <View style={{flex: 1}}>
                                    <ImageCard style={{flex: 1}}
                                        title={item.title} description={item.description}
                                               imgPath={item.imageBinary}/>
                                </View>
                            );
                        }
                        }
                    />
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
        navigationOptions: ({navigation}) => ({
            title: "All Memory",
        }),
    },
    MemoryDetail: {
        screen: Note2,
        path: "Note2/:memoryId",
        navigationOptions: ({navigation}) => ({
            title: "Memory Image",
        }),
    }
}, {
    initialRouteName: "AllMemory"
});

export default ReadStack;