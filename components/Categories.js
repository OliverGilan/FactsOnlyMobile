import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isSignedIn } from '../networking/Authentication'
import { isAdmin } from '../networking/Networking'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'


class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            admin: false
        }
    }

    componentDidMount(){
        this.admin().then(res => {
            this.setState({
                admin: res
            })
        })
    }

    logout(){
        auth().signOut();
        this.props.navigation.goBack();
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

    render(){
        return(
            <ScrollView>
            <SafeAreaView>
                    <View>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Economy')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Economy</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Health')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Health</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Politics')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Politics</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Sports')}
                        >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>Sports</Text>
                        </TouchableHighlight>
                    </View>
            </SafeAreaView>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        padding: 20,
    }
})
export default Menu;