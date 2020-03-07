import React from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import {submitReport} from './Networking'

class Report extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fact: this.props.navigation.getParam('fact'),
            issue: '',
            height: 40,
            email: '',
            submitted: false
        }
    }

    updateSize = (height) => {
        this.setState({
            height
        });
    }

    validateData = () => {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(this.state.issue.trim() === ''){
            Alert.alert(
                'Invalid Field',
                'Issue cannot be empty',
            )
            return;
        }else if(this.state.email.trim() != '' && !re.test(String(this.state.email).toLowerCase())){
            Alert.alert(
                'Invalid Field',
                "Email isn't valid"
            )
            return;
        }

        submitReport(this.state.fact.fid, this.state.issue, this.state.email).then(response => {
            if(response.status == 200){
                this.setState({
                    submitted: true
                })
            }else{
                Alert.alert(
                    'Error',
                    'There was an error sending report. Please try again later',
                )
            }
        })
    }

    render(){
        if(this.state.submitted){
            return(
                <View style={styles.message}>
                    <Text style={{fontWeight: "500", fontSize: 15}}>Issue reported! Thank you for your feedback!</Text>
                </View>
            )
        }

        const {issue, height} = this.state;

        let newStyle={
            height,
            minHeight: 80,
            borderWidth: .25,
            padding: 10,
            marginBottom: 25
        }

        return(
            <ScrollView style={styles.page}>
                <Text style={styles.notice}>Notice An Issue?</Text>
                <Text style={styles.subnotice}>We value accurate information and fixing mistakes so your feedback is appreciated! This is your chance to report an inaccuracy, incompletion, or any other problem with a fact.</Text>
                <View style={styles.reportDetails}>
                    <Text style={styles.fact}>Fact ID#: {this.state.fact.id}</Text>
                    <Text style={styles.fact}>{this.state.fact.headline}</Text>
                </View>
                <Text style={styles.label}>Issue</Text>
                <TextInput style={styles.textbox}
                    placeholder="Outline the problem with the fact here..."
                    onChangeText={(issue) => this.setState({issue})}
                    style={[newStyle]}
                    editable={true}
                    multiline={true}
                    value={issue}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <Text style={styles.label}>Email (optional)</Text>
                <TextInput style={styles.textbox}
                    placeholder="johndoe@gmail.com"
                    onChangeText={(email) => this.setState({email})}
                    editable={true}
                    multiline={false}
                    value={this.state.email}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <View style={styles.button}>
                    <Button
                        title="Submit"
                        color="white"
                        onPress={() => this.validateData()}
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
    subnotice:{
        fontWeight: "500",
        fontSize: 15,
        lineHeight: 21,
        paddingBottom: 25,
    },
    reportDetails: {
        paddingBottom: 15
    },
    fact: {
        fontWeight: "bold",
        lineHeight: 21,
        fontSize: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 3
    },
    textbox: {
        padding: 10,
        borderWidth: .25,
        color: "black"
    },
    button: {
        backgroundColor: "black",
        width: "100%",
        alignSelf: "center",
        marginVertical: 50,
        borderRadius: 25
    },
    message: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default withNavigation(Report);