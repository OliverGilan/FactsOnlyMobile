import React from 'react'
import {View, Text, StyleSheet, Button } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { login } from '../networking/Authentication'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
        }
    }
    
    signin(){
        login(this.state.email, this.state.password).then((user) => {
            if(user){
                this.props.navigation.goBack()
            }
        })
    }

    render(){
        return(
            <ScrollView style={styles.page}>
                <Text style={styles.notice}>Login</Text>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.textbox}
                    placeholder="johndoe@gmail.com"
                    onChangeText={(email) => this.setState({email})}
                    editable={true}
                    multiline={false}
                    value={this.state.email}
                    />
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.textbox}
                    placeholder="********"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    editable={true}
                    multiline={false}
                    value={this.state.password}
                    />
                <View style={styles.button}>
                    <Button
                        title="Login"
                        color="white"
                        onPress={() => this.signin()}
                    />
                </View>
                <Text style={{alignSelf:"center"}}>--OR--</Text>
                <View style={styles.button}>
                    <Button
                        title="Sign Up"
                        color="white"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#fff"
    },
    notice:{
        fontWeight: "bold",
        fontSize: 25,
        paddingBottom: 5
    },
    label: {
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 3
    },
    textbox: {
        padding: 10,
        borderWidth: .25,
        marginBottom: 20,
        color: "black"
    },
    button: {
        backgroundColor: "black",
        width: "100%",
        alignSelf: "center",
        marginVertical: 50,
        borderRadius: 25
    },
})

export default withNavigation(Login);