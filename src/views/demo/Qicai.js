// FadeInView.js
import React, { Component } from 'react';
import {NavigationComponent} from '../../base';
import {
    Animated,Easing,StyleSheet,Text
} from 'react-native';

export default class Qicai extends NavigationComponent {
    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0)
        };
    }

    componentDidMount() {
        var timing = Animated.timing;
        Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
            return timing(this.state[property], {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear
            });
        })).start();
    }
    render() {
        return (
            <Animated.View style={[styles.demo, {
                opacity: this.state.fadeInOpacity,
                transform: [{
                    rotateZ: this.state.rotation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}><Animated.Text style={{
                fontSize: this.state.fontSize.interpolate({
                    inputRange: [0,1],
                    outputRange: [12,26]
                })
            }}>我骑着七彩祥云出现了😈💨</Animated.Text>
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