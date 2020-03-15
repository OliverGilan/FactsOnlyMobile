import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { isSignedIn } from '../networking/Authentication'
import { checkSaved, saveFact, unsaveFact, deletePost, isAdmin } from '../networking/Networking'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'


class Fact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fact: this.props.navigation.getParam('fact'),
            saved: false,
            loading: true
        }
        this.trySave = this.trySave.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount(){
        if(isSignedIn()){
            var uid = auth().currentUser.uid
            checkSaved(uid, this.state.fact.fid).then((result) => {
                // console.log(result)
                this.setState({
                    saved: result.saved,
                    loading: false
                })
            })
        }else{
            this.setState({
                loading: false
            })
        }
    }

    update(saved) {
        this.setState({
            saved: saved
        })
    }

    trySave() {
        var uid = auth().currentUser.uid
        if(!isSignedIn()){
            Alert.alert(
                'Cannot Save Article',
                'You must be signed in to save articles',
                [
                    {text: 'Sign In', onPress: () => this.props.navigation.navigate('Login')},
                    {text: 'Cancel', style: 'cancel'}
                ]
            )
        }else{
            if(this.state.saved){
                //Unsave
                unsaveFact(this.state.fact.fid, uid)
                    .then((response) => {
                        if(response){
                            this.update(false)
                        }
                    })
            }else{
                //Save
                saveFact(this.state.fact.fid, uid)
                    .then((response) => {
                        if(response){
                            this.update(true)
                        }
                    })
            }
        }
    }

    tryDelete() {
        Alert.alert(
            'Delete?',
            '',
            [
                {text: 'OK', onPress: () => this.delete()},
                {text: 'Cancel', style: 'cancel'}
            ]
        )
    }

    delete() {
        deletePost(this.state.fact.fid)
        .then(res=>{
            if(res){
                Alert.alert(
                    'Deleted',
                    '',
                    [
                        {text: 'OK', style: 'confirm'}
                    ]
                )
            }else{
                Alert.alert(
                    'Error Deleting',
                    res,
                    [
                        {text: 'OK', style: 'cancel'}
                    ]
                )
            }
        })
    }

    render(){
        return(
            <ScrollView style={styles.margin}>
                <Text style={styles.headline}>
                    {this.state.fact.headline}
                </Text>
                <Text style={styles.date}>{this.state.fact.date}</Text>
                <Text style={styles.body}>{this.state.fact.fact}</Text>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        activeOpacity={.65} 
                        onPress={() => this.props.navigation.navigate('Report', {
                        fact: this.state.fact
                        })}>
                        <Text style={styles.flags}>report</Text>
                    </TouchableOpacity>
                    {!this.state.saved && <TouchableOpacity 
                        activeOpacity={.65} 
                        onPress={() => this.trySave()}>
                        <Text style={styles.flags}>save</Text>
                    </TouchableOpacity>}
                    {this.state.saved && <TouchableOpacity 
                        activeOpacity={.65} 
                        onPress={() => this.trySave()}>
                        <Text style={styles.flags}>unsave</Text>
                    </TouchableOpacity>}
                </View>
                {isAdmin && (
                    <View style={styles.adminFooter}>
                        <TouchableOpacity 
                            activeOpacity={.65} 
                            onPress={() => this.props.navigation.navigate('EditFact', {
                                fact: this.state.fact
                            })}>
                            <Text style={styles.flags}>Edit</Text>
                        </TouchableOpacity>
                         <TouchableOpacity 
                            activeOpacity={.65} 
                            onPress={() => this.tryDelete()}>
                            <Text style={styles.flags}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    margin:{
        paddingBottom: 35,
        backgroundColor: "#fff"
    },
    headline:{
        width: "100%",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingTop: 10
    },
    date:{
        fontWeight: '200',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 5
    },
    body:{
        width: "100%",
        fontSize: 20,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    footer:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 50
    },
    adminFooter:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 50
    },
    flags:{
        color: "gray",
        padding: 10,
    }
});

export default withNavigation(Fact);