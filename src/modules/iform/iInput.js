import React, { Component } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { MainStyle } from "/configs"
import { NavigationComponent } from "/base"

let screenWidth = MainStyle.device.width
export default class IInput extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        rightName: "",
        value: "",
        placeholder: "",
        style: {},
        leftStyle : {}, //,//左侧字体的样式
        rightStyle : {}, //右侧字体的样式
        unitStyle : {}, //单位的样式
        unit : "", //单位
        placeholderTextColor : "#999999", //注释的颜色
        iInputCallBack : ()=>{},
        keyboardType : "default"
    }

    componentDidMount() {}

    render() {
        return (
            <View style={[styles.input, this.props.style]}>
                <Text style={[styles.inputLeft, this.props.leftStyle]}>{this.props.rightName}</Text>
                <View style={[{flexDirection:"row", justifyContent:"center", alignItems:"center", marginRight : 16}]}>
                    <TextInput
                        style={[styles.inputRight, this.props.rightStyle]}
                        underlineColorAndroid="transparent"
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        onChangeText={value => this.props.iInputCallBack(value)}
                        value={this.props.value}
                        allowFontScaling={false}
                        maxLength={15}
                        keyboardType={this.props.keyboardType}
                    />
                    <Text style={this.props.unitStyle}>{this.props.unit}</Text>
                </View>
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
        // marginRight: 16,
        textAlign: "right",
        textAlignVertical: "center",
        fontSize: MainStyle.font.size.size16,
        color: MainStyle.font.color.color3,
        width: screenWidth * 0.5,
        fontFamily: MainStyle.font.family.light
    }
})
