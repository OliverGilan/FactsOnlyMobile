import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Card extends React.Component{
    
    render(){
        var cat = this.props.fact.category
        return(
            <View style={styles.card}>
                <Text style={styles.category}>{this.props.fact.category}</Text>
                <Text style={styles.headline}>{this.props.fact.headline}</Text>
                <Text style={styles.date}>{this.props.fact.date}</Text>
                <View className="stripe" style={[styles.stripe, 
                cat==="Politics" ? styles.stripePol : 
                cat==="Economy" ? styles.stripeEcon : 
                cat==="World" ? styles.stripeWorld : 
                cat==="Sports" ? styles.stripeSports : null]} />
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
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 5,
        width: 4,
        borderBottomEndRadius: 3,
        borderTopEndRadius: 3,
    },
    stripeEcon:{
        backgroundColor: "#B5EAD7",
    },
    stripePol:{
        backgroundColor: "#F7F48B",
    },
    stripeWorld:{
        backgroundColor: "#F47C7C",
    },
    stripeSports:{
        backgroundColor: "#B5E0FA",
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