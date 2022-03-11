
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
// import { Header } from 'native-base';

const width = Dimensions.get('window').width;

class CustomHeader extends Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#F9F7FC',elevation: 3.69, }}>
                <StatusBar backgroundColor={'#000'} barStyle="light-content" />
                <View style={{ flexDirection: 'row', width:width,height: 80, alignItems: 'center'}}>
                    <View>{this.props.Left}</View>
                    <View style={{flex:1, alignItems: 'center'}}>{this.props.Center}</View>
                    {/* <View>{this.props.children}</View> */}
                    <View>{this.props.Right}</View>
                </View>
            </SafeAreaView>
        )
    }
}
export { CustomHeader }