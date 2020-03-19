import 'react-native-gesture-handler';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    RefreshControl
  } from 'react-native';
import React from 'react'
import auth from '@react-native-firebase/auth'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from './tabs/Categories'
import Saved from './tabs/Saved'

import Sports from './categories/Sports'
import Health from './categories/Health'
import Politics from './categories/Poltiics'
import Economy from './categories/Economy'

import Feed from './components/Feed'
import Fact from './components/Fact'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Report from './components/Report'
import Menu from './components/Menu'
import Header from './components/Header'

import CreateFact from './components/CreateFact'
import EditFact from './components/EditFact'
import SearchView from './components/SearchView'

import { fetchFacts } from './networking/Networking'
import { checkUser } from './networking/Authentication'



const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component{
    createTabs = () => 
        <Tabs.Navigator>
            <Tabs.Screen name='Home' children={this.createHomeStack}/>
            <Tabs.Screen name='Categories' children={this.createCategoriesStack}/>
            <Tabs.Screen name='Saved' children={this.createSavedStack}/>
            <Tabs.Screen name='Settings' children={this.createSettingsStack}/>
        </Tabs.Navigator>
    

    createHomeStack = () => 
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Fact' component={Fact}/>
            <Stack.Screen name='Report' component={Report}/>
            <Stack.Screen name='EditFact' component={EditFact}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
        </Stack.Navigator>
    

    createCategoriesStack = () => 
        <Stack.Navigator initialRouteName='Categories'>
            <Stack.Screen name='Categories' component={Categories}/>
            <Stack.Screen name='Fact' component={Fact}/>
            <Stack.Screen name='Report' component={Report}/>
            <Stack.Screen name='Economy' component={Economy}/>
            <Stack.Screen name='Health' component={Health}/>
            <Stack.Screen name='Politics' component={Politics}/>
            <Stack.Screen name='Sports' component={Sports}/>
        </Stack.Navigator>
    

    createSavedStack = () => 
        <Stack.Navigator initialRouteName='Saved'>
            <Stack.Screen name='Saved' component={Saved}/>
            <Stack.Screen name='Fact' component={Fact}/>
            <Stack.Screen name='Report' component={Report}/>
        </Stack.Navigator>
    
    createSettingsStack = () => 
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>

    render(){
        return(
            <NavigationContainer>
                {this.createTabs()}
            </NavigationContainer>
        )
    }
}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      facts: [],
      refreshing: true,
      user: auth().currentUser
    }
  }

  componentDidMount(){
    fetchFacts().then((response) => {
      this.setState({
        facts: response,
        refreshing: false
      })
    })
    checkUser(this.state.user)
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetchFacts().then((response) => {
      this.setState({
          facts: response,
          refreshing: false
        });
    });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.body}>
          <Text style={{alignSelf: "center"}}>Loading Feed</Text>
        </View>
      )
    }

    return(
      <View style={styles.body}>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>}>
            <Feed facts={this.state.facts} navigation={this.props.navigation}></Feed>
          </ScrollView>
        </SafeAreaView>
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
  }
})