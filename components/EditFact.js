import React from 'react'
import {View, Text, StyleSheet, Button, Alert, Picker} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { editPost } from '../networking/Networking'

export default class EditFact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fact: this.props.route.params.fact,
            body: this.props.route.params.fact.fact,
            height: 40,
            category: this.props.route.params.fact.category,
            headline: this.props.route.params.fact.headline,
            fid: this.props.route.params.fact.fid,
            date: this.props.route.params.fact.date,
            submitted: false,
            sources: this.props.route.params.fact.sources ? this.props.route.params.fact.sources.join() : null
        }
    }

    updateSize = (height) => {
        this.setState({
            height
        });
    }

    submit = () => {
        var sauce = this.state.sources.split(',')
        editPost(this.state.fid, this.state.date, this.state.headline, this.state.body, this.state.category, sauce)
        .then(res=>{
            if(res === true){
                this.setState({
                    submitted: true
                })
            }else{
                Alert.alert(res)
            }
        })
    }

    render(){
        if(this.state.submitted){
            return(
                <View style={styles.message}>
                    <Text style={{fontWeight: "500", fontSize: 15}}>Fact Edited</Text>
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
                <Text style={styles.notice}>Edit Fact</Text>
                <Text style={styles.label}>Fact Id #: {this.state.fid}</Text>
                <Text style={styles.label}>Headline</Text>
                <TextInput style={styles.textbox}
                    placeholder="Headline..."
                    onChangeText={(headline) => this.setState({headline})}
                    editable={true}
                    multiline={false}
                    value={this.state.headline}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <Text style={styles.label}>Date</Text>
                <TextInput style={styles.textbox}
                    placeholder="Headline..."
                    onChangeText={(date) => this.setState({date})}
                    editable={true}
                    multiline={false}
                    value={this.state.date}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <Text style={styles.label}>Fact</Text>
                <TextInput style={styles.textbox}
                    placeholder="Fact Body here..."
                    onChangeText={(body) => this.setState({body})}
                    style={[newStyle]}
                    editable={true}
                    multiline={true}
                    value={this.state.body}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <Text style={styles.label}>Sources</Text>
                <TextInput style={styles.textbox}
                    placeholder="Sources here..."
                    onChangeText={(sources) => this.setState({sources})}
                    style={[newStyle]}
                    editable={true}
                    multiline={true}
                    value={this.state.sources}
                    onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                    />
                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={this.state.category}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({category: itemValue})
                }>
                    <Picker.Item label="Economy" value="Economy" />
                    <Picker.Item label="World" value="World" />
                    <Picker.Item label="Politics" value="Politics" />
                    <Picker.Item label="Sports" value="Sports & Entertainment" />
                </Picker>

                <View style={styles.button}>
                    <Button
                        title="Submit"
                        color="white"
                        onPress={() => this.submit()}
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
    },
    picker:{
        paddingVertical: 0,
        marginHorizontal: 0,
    },
    pickerItem:{
        height: 88,

    }
});