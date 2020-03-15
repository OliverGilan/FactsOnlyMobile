import React from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { createAccount } from '../networking/Authentication'

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
        }
    }

    static navigationOptions = {
        title: "Sign Up"
    }

    submit(){
        createAccount(this.state.email, this.state.password).then((response) => {
            if(response.status == 200){
                console.log(response)
                console.log("User created");
                Alert.alert('Welcome!', 'Thank you for joining! Feel free to save as many facts as you would like!');
                this.props.navigation.navigate('Feed')
            }else{
                console.log(response)
                console.log("Could not send user info")
            }
        })
    }

    render(){
        return(
            <ScrollView style={styles.page}>
                <Text style={styles.notice}>Create an Account</Text>
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
                        title="Sign Up"
                        color="white"
                        onPress={() => this.submit()}
                    />
                </View>
                <Text style={{alignSelf:"center"}}>--Or if you have an account already--</Text>
                <View style={styles.button}>
                    <Button
                        title="Login"
                        color="white"
                        onPress={() => this.props.navigation.goBack()}
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

export default withNavigation(SignUp);