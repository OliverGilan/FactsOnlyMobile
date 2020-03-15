import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isSignedIn } from '../networking/Authentication'
import { isAdmin } from '../networking/Networking'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'


class Menu extends React.Component{
    logout(){
        auth().signOut();
        this.props.navigation.goBack();
    }

    render(){
        return(
            <ScrollView>
            <SafeAreaView style={{marginVertical: 20}}>
                <Image style={{width: "80%", height: "80%", alignSelf: "center", }} source={require('../resources/icon.png')} />
                {isSignedIn() && isAdmin() && (
                    <View style={{marginVertical: 25}}>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('CreateFact')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Create Fact </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Saved')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Saved Facts </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.logout()}
                        >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Sign Out </Text>
                        </TouchableHighlight>
                    </View>
                )}
                {isSignedIn() && !isAdmin() && (
                    <View style={{marginVertical: 25}}>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('Saved')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Saved Facts </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.logout()}
                        >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Sign Out </Text>
                        </TouchableHighlight>
                    </View>
                )}
                {!isSignedIn() && (
                    <View style={{marginVertical: 40}}>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={.65}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}> Sign In </Text>
                        </TouchableOpacity>
                    </View>
                )}
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