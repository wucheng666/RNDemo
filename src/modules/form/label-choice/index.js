/**
 * 表单项目
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, { Component } from "react"
import { MainStyle } from "/configs"

import { View, StyleSheet, Text } from "react-native"

import RowLayout from "../../layout/row"
import BMIcon from "../../bm-icon"

/**
 *
 * labelText：同input
 *
 * property: 同input
 *
 * value: 同input
 *
 * labelStyle: 左侧文本样式
 *
 * valueStyle: 右侧值样式
 *
 * onChange: 内容变化回调
 *
 */
export default class Label extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    static defaultProps = {
        placeholder: "",
        value: "",
        onPress: () => {}
    }

    render() {
        let rdText = this.props.value
        if (this.state.value) {
            rdText = this.state.value
        }
        if (rdText && rdText.length > 12) {
            rdText = rdText.substring(0, 12) + "..."
        }

        if (!rdText) {
            rdText = this.props.placeholder
        }
        return (
            <RowLayout style={[styles.container, this.props.style]} onPress={this._onPress}>
                <View>
                    <Text style={[styles.label, this.props.labelStyle]} allowFontScaling={false}>
                        {this.props.labelText}
                    </Text>
                </View>

                <RowLayout  style={styles.right}>
                    <Text style={[this.props.value ? styles.value : styles.valueDisabled]}>{rdText}</Text>
                    <BMIcon icon="0xe649" style={{ fontSize: 14, color: MainStyle.font.color.color4 }} />
                </RowLayout>
            </RowLayout>
        )
    }

    _onPress = () => {
        this.props.onPress()
    }

    getValue() {
        return this.props.value
    }

    setValue(val) {
        this.setState({
            value: val
        })
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 10,
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        backgroundColor: "#fff"
    },

    label: {
        color: "#333",
        fontSize:MainStyle.font.size.size16,
        fontFamily:"PingFangSC-Regular"
    },
    right: {
        alignItems:"center",
        justifyContent:"flex-end",
    },
    value: {
        textAlign: "right",
        textAlignVertical: "center",
        paddingTop: 0,
        paddingBottom: 0,
        marginRight: 5,
        fontSize: MainStyle.font.size.size16,
        color: MainStyle.font.color.color3
    },

    valueDisabled: {
        color: MainStyle.font.color.color4,
        fontSize:MainStyle.font.size.size16,
        marginRight: 5,
        fontFamily:"PingFangSC-Regular"
    }
})
