import React, {Component} from "react"
import {Image, StyleSheet, Text, View} from "react-native"
import {NavigationComponent} from "/base"
import {MainStyle} from "/configs"

let width = MainStyle.device.width

export default class NoContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://bm-oss.oss-cn-hangzhou.aliyuncs.com/arena/arenaprod/system/zwnr@2x.png" }}
                    style={{ width: 100, height: 80, alignSelf: "center", marginBottom: 15 }}
                />
                <Text style={styles.textStyle}>暂无内容</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: MainStyle.device.width,
        margin: "auto",
        textAlign: "center",
        justifyContent : "center",
        alignItems : "center"
    },
    textStyle: {
        fontFamily: "PingFangSC-Regular",
        fontSize: 14,
        color: "#999999",
        textAlign: "center",
        margin: "auto"
    }
})
