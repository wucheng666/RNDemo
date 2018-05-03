/**
 * Created by PC on 2017/7/18.
 */
import React, {Component} from 'react';
import {Text, View} from "react-native";
import {NavigationComponent} from '/base';

export default class Home extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f2a0ff', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 50}}>
                    Mine-   -首页-
                </Text>
            </View>
        );
    }
}