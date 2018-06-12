/*
 * @Author: wucheng
 * @Date: 2018-06-06 15:21:09
 * @Last Modified by: 
 * @Last Modified time:
 */

// 'use strict'
import React, { Component } from "react"
import { MainStyle } from "/configs"

import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from "react-native"

export default class ModalSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false, // 显示 组件自身状态 组件初始化 this.props.modalVisible
            choosedList: [], //选中项列表
            selectedList: []
        }
    }

    static defaultProps = {
        selectedList: [], //编辑时必填，初始化时选中的数据
        dataList: [], //必填, 需要渲染的元素集合，
        showName: "", //必填, 需要展示的字段名称
        idName: "", //必填, dataList中每项元素的唯一键值
        onLeftPress: () => {}, //必填, 点击左侧按钮时所要做的事件
        onRightPress: () => {}, //必填, 点击右侧按钮时所要做的事件
        type: "single", //默认单选
        grayLayer: false //点击灰色区域是否退去modal(true代表需要次操作)
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps..", props.modalVisible)
        if (this.state.modalVisible == props.modalVisible) {
            return
        }
        this.setState({ modalVisible: props.modalVisible })

        if (props.selectedList) {
            this.setState({ selectedList: props.selectedList, choosedList: props.selectedList })
        }
    }

    render() {

        return (
            <Modal
                animationType={null}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.")
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={e => this._modalCancel(e)}
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        flexDirection: "column-reverse"
                    }}
                >
                    <View style={[styles.modalBottom]}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 50,
                                borderBottomColor: "#EEEEEE",
                                borderBottomWidth: MainStyle.border.size.assit1
                            }}
                        >
                            <TouchableOpacity onPress={() => this._onLeftPress()}>
                                <Text
                                    style={{
                                        marginLeft: 16,
                                        fontSize: 16,
                                        fontFamily: "PingFangSC-Regular",
                                        color: "#999999"
                                    }}
                                >
                                    取消
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this._onRightPress()
                                }}
                            >
                                <Text
                                    style={{
                                        marginRight: 16,
                                        fontSize: 16,
                                        fontFamily: "PingFangSC-Regular",
                                        color: "#5AA9FA"
                                    }}
                                >
                                    确定
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    marginLeft: 16,
                                    marginRight: 3,
                                    marginBottom: 23
                                }}
                            >
                                {this._getList()}
                            </View>
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    _onLeftPress = () => {
        this.props.onLeftPress ? this.props.onLeftPress() : this.setState({ modalVisible: false })
    }

    _onRightPress = () => {
        this.props.onRightPress ? this.props.onRightPress(this.state.choosedList) : this.setState({ modalVisible: false })
    }

    _getList = () => {
        let dataList = this.props.dataList
        let choosedList = this.state.choosedList

        return dataList.map((data, index) => {
            let dIndex = choosedList.findIndex(ch => ch[this.props.idName] == data[this.props.idName])

            return (
                <View key={"list_" + index}>
                    <TouchableOpacity
                        onPress={() => this._choosed(data)}
                        style={{
                            borderRadius: 31,
                            paddingLeft: 12,
                            paddingRight: 10,

                            height: 31,
                            minWidth: 108,
                            width: "auto",
                            backgroundColor:
                                dIndex != -1 ? MainStyle.background.color.assit11 : MainStyle.background.color.assit3,
                            borderWidth: MainStyle.border.size.assit1,
                            borderColor: MainStyle.border.color.assit5,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 16,
                            marginRight: 10
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: MainStyle.font.family.regular,
                                fontSize: MainStyle.font.size.size14,
                                color: dIndex != -1 ? MainStyle.font.color.color6 : MainStyle.font.color.color12
                            }}
                        >
                            {data[this.props.showName] ? data[this.props.showName] : ""}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    _choosed = data => {
        let idName = this.props.idName

        if (this.props.type == "single") {
            //单选
            this.setState({
                choosedList: [data]
            })
        } else {
            let choosedList = this.state.choosedList
            let fIndex = choosedList.findIndex(c => c[idName] == data[idName])

            if (fIndex == -1) {
                //没有选中过
                choosedList.push(data)
                this.setState({
                    choosedList: choosedList
                })
            } else {
                //去除已选中的
                choosedList.splice(fIndex, 1)
                this.setState({
                    choosedList: choosedList
                })
            }
        }
    }

    _modalCancel = e => {
        if (this.props.grayLayer) {
            let top = MainStyle.device.height - 200 - 25

            if (e.nativeEvent.pageY < top) {
                this.setState({
                    modalVisible: false
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    modalBottom: {
        height: 200,
        backgroundColor: MainStyle.background.color.assit3
    }
})
