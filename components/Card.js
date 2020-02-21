import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class Card extends React.Component{
    
    render(){
        return(
            <View style={styles.card}>
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
        paddingTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1.00,
        elevation: 2,
        marginVertical: 5
    },
    headline:{
        width: "100%",
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10
    },
    date:{
        fontWeight: '200',
        paddingTop: 10,
        paddingBottom: 5
    }
});