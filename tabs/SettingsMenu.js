import React from 'react'
import {View, Text, StyleSheet, Image, Alert } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { isSignedIn } from '../networking/Authentication'
import { isAdmin } from '../networking/Networking'
import auth from '@react-native-firebase/auth'


export default class SettingsMenue extends React.Component{
    constructor(props){
        super(props);
        this.state={
            admin: false,
            signedIn: isSignedIn()
        }
    }

    componentDidMount(){
        this.refresh = this.props.navigation.addListener('focus', () => {
            this.updateData()
        })

    }

    componentWillUnmount(){
        this.refresh()
    }

    updateData(){
        this.admin().then(res => {
            this.setState({
                admin: res,
                signedIn: isSignedIn()
            })
        })
    }

    async admin(){
        var bool = false;
        await isAdmin().then(res=>{
            if(res){
                bool = true
            }
        })
        return bool
    }

    logout(){
        auth().signOut();
        Alert.alert('Signed out');
        this.setState({
            signedIn: false,
            admin: false,
        })
        this.forceUpdate()
        this.props.navigation.navigate('Home')
    }

    render(){
        return(
            <ScrollView style={{backgroundColor: "#fff"}}>
                    <View>
                        {this.state.admin && (
                            <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('CreateFact')}
                            >
                                <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Create Fact </Text>
                            </TouchableHighlight>
                        )}
                        {this.state.signedIn && (
                            <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            key="signedIn"
                            underlayColor={'lightgray'}
                            onPress={()=> this.logout()}
                            >
                                <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Sign Out</Text>
                            </TouchableHighlight>
                        )}
                        {!this.state.signedIn && (
                            <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            key="signedOut"
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Login')}
                            >
                                <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Sign In</Text>
                            </TouchableHighlight>
                        )}
                    </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        padding: 20,
        // borderBottomColor: 'black',
        // borderBottomWidth: .25
    }
})