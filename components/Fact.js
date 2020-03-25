import React from 'react'
import {View, Text, StyleSheet, Alert, Linking, WebView} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { isSignedIn } from '../networking/Authentication'
import { checkSaved, saveFact, unsaveFact, deletePost, isAdmin } from '../networking/Networking'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import {getLinkPreview} from 'link-preview-js';


export default class Fact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fact: this.props.route.params.fact,
            saved: false,
            loading: true,
            admin: false,
            sources: [],
            hasSource: false,
        }
        this.trySave = this.trySave.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.update = this.update.bind(this)
        this._onRefresh=this._onRefresh.bind(this)
    }

    componentDidMount(){
        if(isSignedIn()){
            var uid = auth().currentUser.uid
            checkSaved(uid, this.state.fact.fid).then((result) => {
                this.setState({
                    saved: result.saved,
                    loading: false
                })
            })
            this.admin().then(res => {
                this.setState({
                    admin: res
                })
            })
        }else{
            this.setState({
                loading: false
            })
        }
        this._onRefresh()
    }

    _onRefresh() {
        console.log("refresh")
        if(this.state.fact.sources !== null && this.state.fact.sources[0]!==""){
            var s = []
            var link = this.state.fact.sources
            link.forEach(link => {
                getLinkPreview(link)
                .then(data => {
                    if(data.siteName === undefined){
                        data.siteName = link.split('/')[2]
                    }
                    s.push(data)
                    this.setState({
                        sources: s,
                        hasSource: true,
                    })
                })
            })
        }
    }

    async admin(){
        var bool = false;
        await isAdmin().then(res=>{
            if(res){
                bool = true
            }
        })
        return bool
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
                <Text style={styles.category}>{this.state.fact.category}</Text>
                <Text style={styles.date}>{this.state.fact.date}</Text>
                <Text style={styles.body}>{this.state.fact.fact}</Text>
                {this.state.hasSource && (
                    <View>
                        <Text style={styles.readMore}>If you'd like to read more...</Text>
                        {this.state.sources.map((object, i) =>(
                            <TouchableOpacity
                            activeOpacity={.65}
                            key={i}
                            onPress={()=>Linking.openURL(object.url)}>
                                <View style={styles.source}>
                                    <Text style={styles.sourceTitle}>{object.title}</Text>
                                    <Text style={styles.sourceName}>{object.siteName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
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
                {isSignedIn() && this.state.admin && (
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
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    headline:{
        width: "100%",
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 10
    },
    category: {
        alignSelf: "flex-start",
        fontWeight: '200',
    },
    date:{
        fontWeight: '200',
        paddingTop: 20,
    },
    body:{
        width: "100%",
        fontSize: 20,
        paddingTop: 10
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
    },
    readMore:{
        width: "100%",
        fontSize: 20,
        fontWeight: "500",
        marginTop: 100,
        marginBottom: 10
    },
    source: {
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'flex-start',
        paddingTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: .5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1.00,
        elevation: 1,
        marginVertical: 5,
    },
    sourceTitle: {
        fontWeight: "500",
        fontSize: 15,
        padding: 2
    },
    sourceName:{
        fontSize: 10,
        fontWeight: "200",
        padding: 2
    }
});
