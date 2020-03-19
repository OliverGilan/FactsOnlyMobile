import React from 'react'
import Feed from '../components/Feed'
import { getPoliticalFacts } from '../networking/Networking'
import {View, Text, StyleSheet, RefreshControl, Alert} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'


export default class Economy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            facts: [],
            loading: true,
            refreshing: false,
        }
    }

    componentDidMount(){
        getPoliticalFacts().then((response) => {
            if(response.error){
                Alert.alert('Error!', 'It seems you are not authorized to view saved facts...')
                this.props.navigation.navigate('Feed')
            }else{
                this.setState({
                    facts: response,
                    loading: false,
                    refreshing: false
                })
            }
        })
    }

    _onRefresh() {
        this.setState({refreshing: true});
        getPoliticalFacts().then((response) => {
          this.setState({
              facts: response,
              refreshing: false
            });
        });
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.body}>
                    <Text style={{alignSelf:"center"}}>Loading Feed</Text>
                </View>
            )
        }

        return(
            <View style={styles.body}>
                <ScrollView style={styles.feed}
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}>
                    <Feed facts={this.state.facts} navigation={this.props.navigation}></Feed>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: "center",
        width: "100%",
    },
    feed: {
        maxWidth: "100%", 
        flex: 1}
});