// FadeInView.js
import React, { Component } from 'react';
import {NavigationComponent} from '../../base';
import {
    Animated,Easing,StyleSheet,Text
} from 'react-native';

export default class FadeInView extends NavigationComponent {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
            fadeInOpacity: new Animated.Value(0) // 初始值
        };
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1, // 目标值
            duration: 5000, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }
    render() {
        return (
            <Animated.View style={[styles.demo, {
                opacity: this.state.fadeInOpacity
            }]}>
                <Text style={styles.text}>悄悄的，我出现了</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    }
});