/**
 * Created by PC on 2017/7/20.
 */
import React, { Component } from "react"
import { DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator } from "react-navigation"
import HomeScreen from "./component/HomeScreen"
import NearByScreen from "./component/NearByScreen"
import MineScreen from "./component/MineScreen"
import TabBarItem from "./component/TabBarItem"

export default class Navigation extends Component {
    render() {
        return <Navigator />
    }
}

const StackRouteConfigs = {
    Drawer: {
        screen: Drawer
    }
}
const StackNavigatorConfigs = {
    initialRouteName: "Drawer",
    navigationOptions: {
        title: "标题",
        headerStyle: { backgroundColor: "#5da8ff" },
        headerTitleStyle: { color: "#333333" }
    }
}

const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs)
