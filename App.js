/**
 * @name index.js
 * @desc RN 顶级页面；
 * @author:
 */

import React, { Component } from "react"
import { Text, View, NativeModules } from "react-native"

import FactoryContainer from "./src/base/factory-container"
import Routes from "./src/configs/routes"

let routes = require("./routes.json")

const backOutPages = routes.map(route => {
    console.log(`route :`)
    console.log(route)
    return route.buildFileName
})

export default class App extends Component {
    props: {
        // 初始化页面
        initialRoute: string
    }

    constructor(props) {
        super(props)
        console.disableYellowBox = true

        if (!this.props.initialRoute) {
            this.props.initialRoute = backOutPages[0]
        }

        // // 给NativeModules.extra.openUri 函数加上友盟统计。
        // let oldOpen = NativeModules.extra.openUri;
        //
        // NativeModules.extra.openUri = (data,fun)=>{
        //     if(data.key){
        //         NativeModules.Umeng.onEventWithMap('moduleShow',{moduleName:data.key});
        //     }
        //     oldOpen(data,fun)
        // };

        // if(this.props.token){
        //     window.token = this.props.token;
        // }
    }

    render() {
        console.log("...jjj")
        console.log(this.props)
        console.log(backOutPages)

        return <FactoryContainer initialRoute={this.props.initialRoute} routes={Routes} />
    }
}
