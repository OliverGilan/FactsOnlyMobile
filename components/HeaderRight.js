import React from 'react'
import {View, Text, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'


class HeaderRight extends React.Component{
    render(){
        return(
            <View>
                <TouchableOpacity
                    style={{paddingHorizontal: 25}}
                    activeOpacity={.65}
                    onPress={() => this.props.navigation.navigate('Search')}>
                        <Image style={{width: 25, height: 25}} source={require('../resources/search.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(HeaderRight);