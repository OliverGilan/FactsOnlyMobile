import React from 'react'
import Fact from './components/Fact'
import Report from './components/Report'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Menu from './components/Menu'
import Header from './components/Header'
import Feed from './components/Feed'
import Saved from './components/Saved'
import { fetchFacts } from './components/Networking'
import { checkUser } from './components/Authentication'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import auth from '@react-native-firebase/auth'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  RefreshControl
} from 'react-native';

class App extends React.Component{
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

const Stack = createStackNavigator({
  Feed: {
    screen: App,
    navigationOptions: ({navigation}) => {
      return{
        headerLeft: () => <Header />
      }
    }
  },
  Fact: {
    screen: Fact,

  },
  Report: {
    screen: Report,

  },
  Login: {
    screen: Login,

  },
  SignUp: {
    screen: SignUp,

  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      title: 'Saved Facts'
    }
  }
}, {headerMode: 'float'});

const drawerNavigator = createDrawerNavigator({
  Home: {
    screen: Stack,
  },
}, {
  initialRouteName: 'Home',
  contentComponent: props => <Menu {...props}/>
});

const AppNavigator = createStackNavigator(
  {
    Feed: drawerNavigator,
  },
  {
    headerMode: 'none'
  }
);


export default createAppContainer(AppNavigator);