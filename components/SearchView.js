import React from 'react'
import Card from './Card'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import { StyleSheet } from 'react-native'


class SearchView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            facts: this.props.navigation.getParam('facts'),
        }
    }
    render(){
        return (
            <TextInput></TextInput>
        //     this.props.facts.map((fact,i) => (
        //     <TouchableOpacity 
        //         style={styles.list} 
        //         key={i} 
        //         activeOpacity={.65} 
        //         onPress={() => this.props.navigation.navigate('Fact', {
        //         fact: fact
        //         })}>
        //           <Card fact={fact} key={i} style={styles.feed} />
        //     </TouchableOpacity>))
        )
    }
}

const styles = StyleSheet.create({
    list:{
      alignItems: 'center'
    },
    feed: {
      margin: 25
    }
});

export default withNavigation(SearchView);