import React from 'react'
import Card from './Card'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'


export default class Feed extends React.Component{

    render(){
        return (
            this.props.facts.map((fact,i) => (
            <TouchableOpacity 
                style={styles.list} 
                key={i} 
                activeOpacity={.65} 
                onPress={() => this.props.navigation.navigate('Fact', {
                fact: fact
                })}>
                  <Card fact={fact} key={i} style={styles.feed} />
            </TouchableOpacity>))
        )
    }
}

const styles = StyleSheet.create({
    list:{
      alignItems: 'center'
    },
    feed: {
      margin: 25
    }
});