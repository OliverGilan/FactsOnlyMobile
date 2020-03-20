import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isAdmin } from '../networking/Networking'
import auth from '@react-native-firebase/auth'


export default class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render(){
        return(
            <ScrollView style={{backgroundColor: "#fff"}}>
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
                        <TouchableHighlight
                            style={styles.button}
                            activeOpacity={.65}
                            underlayColor={'lightgray'}
                            onPress={()=> this.props.navigation.navigate('World')}
                            >
                            <Text style={{color: "black", fontWeight: '700', fontSize: 14}}>World</Text>
                        </TouchableHighlight>
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