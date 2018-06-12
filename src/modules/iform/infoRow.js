import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"
import { MainStyle } from "/configs"
import { NavigationComponent } from "/base"

let screenWidth = MainStyle.device.width
export default class InfoRow extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        leftName: "",
        rightName: "",
        leftStyle : {}, //左侧字体的样式
        rightStyle : {}, //右侧字体的样式
        style : {}, //行样式
    }

    render() {
        return (
            <View style={[styles.input, this.props.style]}>
                <Text style={[styles.inputLeft, this.props.leftStyle]}>{this.props.leftName}</Text>
                <Text style={[styles.inputRight, this.props.rightStyle]}>{this.props.rightName}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        backgroundColor: MainStyle.background.color.assit3,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputLeft: {
        marginLeft: 16,
        alignSelf: "center",
        fontSize: MainStyle.font.size.size16,
        color: MainStyle.font.color.color2
    },
    inputRight: {
        marginRight: 16,
        textAlign: "right",
        // textAlignVertical: "center",
        fontSize: MainStyle.font.size.size16,
        color: MainStyle.font.color.color3,
        width: screenWidth * 0.5,
        fontFamily: MainStyle.font.family.light,

        alignSelf : "center",
    }
})
