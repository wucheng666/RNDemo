import React, {Component} from "react"
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import {MainStyle} from "/configs"

export default class LoadingError extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://bm-oss.oss-cn-hangzhou.aliyuncs.com/arena/arenaprod/system/jzsb@2x.png" }}
                    style={{ width: 100, height: 80, alignSelf: "center", marginBottom: 11 }}
                />

                <Text style={styles.textStyle}>加载失败</Text>
                <TouchableOpacity
                    onPress={() => this.props.reload()}>
                    <Text style={[styles.textStyle, styles.reload]} >
                        重新加载
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    reload: {
        width: 90,
        height: 28,
        marginTop: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: MainStyle.color.main,
        color: MainStyle.color.main,
        borderRadius: 15,
        alignSelf: "center",
        lineHeight: 23.5
    },
    container: {
        flex: 1,
        width: MainStyle.device.width,
        margin: "auto",
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
