import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Card extends React.Component{
    
    render(){
        var cat = this.props.fact.category
        return(
            <View style={styles.card}>
                <View className="stripe" style={[styles.stripe, 
                cat==="Politics" ? styles.stripePol : 
                cat==="Economy" ? styles.stripeEcon : 
                cat==="Health" ? styles.stripeHealth : 
                cat==="Sports" ? styles.stripeSports : null]} />
                <Text style={styles.category}>{this.props.fact.category}</Text>
                <Text style={styles.headline}>{this.props.fact.headline}</Text>
                <Text style={styles.date}>{this.props.fact.date}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    card:{
        backgroundColor: "#fff",
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1.00,
        elevation: 2,
        marginVertical: 5,
    },
    stripe: {
        backgroundColor: "#4cba54",
        position: "absolute",
        top: 0,
        right: 5,
        width: 4,
        height: 50,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
    },
    stripeEcon:{
        backgroundColor: "#4cba54",
    },
    stripePol:{
        backgroundColor: "#d9c64c",
    },
    stripeHealth:{
        backgroundColor: "#b53e3e",
    },
    stripeSports:{
        backgroundColor: "#339ccc",
    },
    category: {
        alignSelf: "flex-start",
        fontWeight: '200',
    },
    headline:{
        width: "100%",
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: 10
    },
    date:{
        fontWeight: '200',
        paddingTop: 10,
        paddingBottom: 5
    }
});