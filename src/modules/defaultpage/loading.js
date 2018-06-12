import React, { Component } from "react"
import { Text, Image, View, StyleSheet } from "react-native"
import { MainStyle } from "/configs"
export default class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://bm-oss.oss-cn-hangzhou.aliyuncs.com/arena/arenaprod/system/jzz.gif" }}
                    style={{ width: 49, height: 30 }}
                />
                <Text style={[styles.textStyle, { marginTop: 16 }]}>加载中</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: MainStyle.device.width,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 14,
        color: MainStyle.color.color4
    }
})
