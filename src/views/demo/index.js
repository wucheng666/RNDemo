// FadeInView.js
import React, { Component } from 'react';
import {NavigationComponent} from '../../base';
import {MainStyle} from '../../configs';
import {
    Animated,Text,View,TouchableOpacity
} from 'react-native';
import FadeInView from './FadeInView'
import Qicai from './Qicai'
import Modalbox from './modalbox'
import Swipeout from '../swipeout'

class FadeInViewDemo extends NavigationComponent {
    constructor(props) {
        super(props);
        this.state = {
            whichModal : ""
        };
    }
    componentDidMount() {
        this.setTitle("Demo");
    }
    backPress = () => {
        this.setState({whichModal : ""})
    }

    render() {
        return (
            <View >
                <TouchableOpacity
                    onPress={()=>this._goTo("FadeInView", "悄悄地")}
                    style={{
                        flexDirection : "row",
                        justifyContent : "center",
                        alignItems : "center",
                        height : 50, backgroundColor : MainStyle.background.color.main}}>
                    <Text style={{color : MainStyle.font.color.color1, fontSize : MainStyle.font.size.size24}}>悄悄地来了</Text>
                </TouchableOpacity>
                <View style={{height : 10}}/>

                <TouchableOpacity
                    onPress={()=>this._goTo("Qicai", "旋转")}
                    style={{
                        flexDirection : "row",
                        justifyContent : "center",
                        alignItems : "center",
                        height : 50, backgroundColor : MainStyle.background.color.main}}>
                    <Text style={{color : MainStyle.font.color.color1, fontSize : MainStyle.font.size.size24}}>旋转</Text>
                </TouchableOpacity>
                <View style={{height : 10}}/>

                <TouchableOpacity
                    onPress={()=>this._goTo("Modalbox", "Modal")}
                    style={{
                        flexDirection : "row",
                        justifyContent : "center",
                        alignItems : "center",
                        height : 50, backgroundColor : MainStyle.background.color.main}}>
                    <Text style={{color : MainStyle.font.color.color1, fontSize : MainStyle.font.size.size24}}>Modal</Text>
                </TouchableOpacity>
                <View style={{height : 10}}/>

                <TouchableOpacity
                    onPress={()=>this._goTo("Swipeout", "Swipeout")}
                    style={{
                        flexDirection : "row",
                        justifyContent : "center",
                        alignItems : "center",
                        height : 50, backgroundColor : MainStyle.background.color.main}}>
                    <Text style={{color : MainStyle.font.color.color1, fontSize : MainStyle.font.size.size24}}>Swipeout</Text>
                </TouchableOpacity>
                <View style={{height : 10}}/>
            </View>
        )
    }

    _goTo = (route, title) => {

        console.log(".......mmmmmm")
        console.log(route, title)
        this.navigate(route, {title: title});
    }
}

export default FadeInViewDemo;