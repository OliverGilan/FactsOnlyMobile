import React from 'react'
import {View, Text, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'


class Header extends React.Component{
    render(){
        return(
            <View>
                <TouchableOpacity
                    style={{paddingHorizontal: 25}}
                    activeOpacity={.65}
                    onPress={() => this.props.navigation.openDrawer()}>
                        <Image style={{width: 25, height: 25}} source={require('../resources/icon.png')} />
                    {/* <Text>FO</Text> */}
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default withNavigation(Header);