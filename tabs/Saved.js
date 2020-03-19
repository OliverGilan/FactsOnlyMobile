import React from 'react'
import Feed from '../components/Feed'
import { getSavedFacts } from '../networking/Networking'
import {View, Text, StyleSheet, RefreshControl, Alert, TouchableHighlight, Button} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'


export default class Saved extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            facts: [],
            refreshing: false,
            signedIn: false,
        }
    }

    componentDidMount(){
        this.refresh = this.props.navigation.addListener('focus', () => {
            this._onRefresh()
        })
        
    }

    componentWillUnmount(){
        this.refresh()
    }

    _onRefresh() {
        var user = auth().currentUser
        if(!user){
            this.setState({
                signedIn: false
            })
            return
        }
        this.setState({refreshing: true});
        getSavedFacts(auth().currentUser.uid).then((response) => {
          this.setState({
              facts: response,
              refreshing: false,
              signedIn: true,
            });
        });
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.body}>
                    <Text style={{alignSelf:"center"}}>Loading Feed</Text>
                </View>
            )
        }else if(!this.state.signedIn){
            return(
                <View style={styles.bodyOut}>  
                <ScrollView contentContainerStyle={styles.one}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}>
                    <View style={styles.button}>
                        <Button
                            title="Sign In to Save Facts"
                            color="white"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                    </ScrollView>
                </View>
            )
        }else{
            return(
                <View style={styles.body}>
                    <ScrollView style={styles.feed}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}>
                        <Feed facts={this.state.facts} navigation={this.props.navigation}></Feed>
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: "center",
        width: "100%",
    },
    bodyOut:{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "black",
        paddingHorizontal: 25,
        alignSelf: "center",
        marginVertical: 50,
        borderRadius: 25
    },
    feed: {
        maxWidth: "100%", 
        flex: 1
    },
    one:{
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    }
});