/*
 * @Author: chenyu
 * @Date: 2018-04-18 15:21:09
 * @Last Modified by: chenyu
 * @Last Modified time: 2018-05-12 09:15:36
 */

// 'use strict'
import React, { Component } from "react"
import PropTypes from "prop-types"
import { MainStyle } from "/configs"

import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"

export default class Confirm extends Component {
    PropTypes = {
        onLeftPress: PropTypes.func, // 左侧点击回调
        onRightPress: PropTypes.func // 右侧点击回调
    }

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false // 显示 组件自身状态 组件初始化 this.props.modalVisible
        }
    }

    static defaultProps = {
        title: "", // 标题
        content: "", // 内容
        type: "confirm", // comfim:用于确认 info:用于提示(以右边操作为优先)
        leftBnText: "取消", // 左侧文本
        rightBnText: "确定", // 右侧文本
        transparent: true, // 是否透明
        animationType: "fade", // 动画类型 slide、fade、none
        grayLayer : false, //点击灰色区域是否退去modal(true代表需要次操作)
    }

    componentWillReceiveProps(props) {
        if(this.state.modalVisible == props.modalVisible){
            return
        }
        this.setState({ modalVisible: props.modalVisible })
    }

    _onLeftPress = () => {
        this.props.onLeftPress ? this.props.onLeftPress() : this.setState({ modalVisible: false })
    }

    _onRightPress = () => {
        this.props.onRightPress ? this.props.onRightPress() : this.setState({ modalVisible: false })
    }

    _onInfo = () => {
        this.props.onRightPress
            ? this.props.onRightPress()
            : this.props.onLeftPress ? this.props.onLeftPress() : this.setState({ modalVisible: false })
    }

    render() {
        return (
            <Modal
                visible={this.state.modalVisible}
                transparent={this.props.transparent}
                animationType={this.props.animationType}
                onRequestClose={() => this.setState({ modalVisible: false })}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={e => this._modalCancel(e)}

                    style={styles.container}>
                    <View style={[styles.modalContainer,
                    ]}>
                        <View
                            style={{
                                flex: 1,
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.modalContent}>{this.props.content}</Text>
                        </View>
                        <View style={styles.horizonLine} />
                        {this.props.type === "confirm" && (
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.leftBn}
                                    onPress={this._onLeftPress}
                                    underlayColor={"#C5C5C5"}
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.leftBnText}>{this.props.leftBnText}</Text>
                                </TouchableOpacity>
                                <View style={styles.verticalLine} />
                                <TouchableOpacity
                                    style={styles.rightBn}
                                    onPress={this._onRightPress}
                                    underlayColor={"#C5C5C5"}
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.rightBnText}>{this.props.rightBnText}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {this.props.type === "info" && (
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.leftBn}
                                    onPress={this._onInfo}
                                    underlayColor={"#C5C5C5"}
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.rightBnText}>
                                        {this.props.rightBnText || this.props.leftBnText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    _modalCancel = e => {
        if(this.props.grayLayer){
            let top = MainStyle.device.height / 2 - 75
            let bottom = MainStyle.device.height / 2 + 75
            let right = MainStyle.device.width - 20
            let left = 20

            if(e.nativeEvent.pageY < top || e.nativeEvent.pageY > bottom){
                this.setState({
                    modalVisible: false
                })
            }

            if(e.nativeEvent.pageX < left || e.nativeEvent.pageX > right){
                this.setState({
                    modalVisible: false
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        height: 150,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center"
    },
    modalTitle: {
        color: "#000000",
        fontSize: 16,
        marginTop: 10
    },
    modalContent: {
        color:MainStyle.font.color.color2,
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    horizonLine: {
        backgroundColor: MainStyle.border.color.main,
        height: 0.5,
        alignSelf: "stretch"
    },
    verticalLine: {
        backgroundColor: MainStyle.border.color.main,
        width: 1,
        height: 50,
        alignSelf: "stretch"
    },
    leftBn: {
        height: 50,
        borderBottomLeftRadius: 3,
        padding: 7,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    leftBnText: {
        fontSize: 16,
        color: MainStyle.font.color.color3
    },
    rightBn: {
        height: 50,
        borderBottomRightRadius: 3,
        padding: 7,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rightBnText: {
        fontSize: 16,
        color: MainStyle.font.color.color8
    }
})