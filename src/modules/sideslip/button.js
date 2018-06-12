import React, {Component} from 'react';
import {MainStyle} from '/configs';

import {Platform, StyleSheet, Text, TouchableOpacity,} from 'react-native';

export default class Button extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    static defaultProps = {
        animated : "covor",
        rowInfo : {}, //行详情数据
        buttonStyle : {},//单个button的样式
        textStyle : {}, //每个button文字描述的样式（限字体样式）
        pressCallBack : ()=>{}, //点击button的回调函数
        index : "", //返回在rightElement数组中的位置
    }

    render() {
        return(
            <TouchableOpacity
                onPress={()=>this.props.pressCallBack(this.props.rowInfo, this.props.index)}
                style={[styles.buttonStyle, this.props.buttonStyle || {}, this.props.animated == "together" ? {} : {flexShrink : 1}]}>
                {this._renderText()}
            </TouchableOpacity>
        )
    }

    _renderText = () => {
        return(
            <Text
                numberOfLines={1}
                ellipsizeMode={Platform.OS ==='ios' ? 'clip' : 'tail'}
                style={[styles.tStyle, this.props.textStyle]}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    tStyle : {
        fontSize : 16,
        color : "#FFFFFF"
    },
    buttonStyle : {
        width : 65,
        justifyContent : "center",
        alignItems : "center",
    },
});