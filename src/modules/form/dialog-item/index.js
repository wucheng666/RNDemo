/**
 *
 * 上拉选择框
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, { Component } from "react"

import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native"
import { MainStyle } from "/configs"
import RowLayout from "../../layout/row"
import Utils from "underscore"
import PropTypes from 'prop-types';

import BMIcon from '../../bm-icon'
/**
 *  props
 *      value={}            //选中值
 *      dataSource={[]}     //数据源,支持对象数组，但显示的label不可以重复
 *      placeholder = "请选择"  //提示词
 *      onChange={function} //值变化回调
 *      onSelectChange={}   //选择变化回调
 *      iconRender={render function} //自定义右侧icon渲染
 *      labelText="text"    //文本
 *      pickerTitle         // 选择器标题
 *      field               //数据源为对象时取的label值属性名字
 *      actionText          //未选择时右侧显示文本
 *      identifier          //唯一标识字段名称
 *      editable
        editableOnEmpty  //为空值时是否可编辑，覆盖editable
 *  methods
 *      getValue()
 *
 *      支持选项中存在选中后其他都不选的选项 加入属性single
 *
 */
export default class Picker extends Component {
    static defaultProps = {
        dataSource: [],
        placeholder: "请选择",
        editable: true,
        editableOnEmpty: true, //为空值时是否可编辑，覆盖editable
        selected: [],
        single: false,
        haveText: true,
        text: "",
        textVal: "",
        maxLength: 100,
        valueStyle: "",
        textPlaceholder: "请输入",
        keyboardType: "default",
        visible: false,
        changeInfo: () => {}
    }

    static propTypes = {
        dataSource: PropTypes.array,
        value: PropTypes.any,
        editable: PropTypes.bool,
        editableOnEmpty: PropTypes.bool
    }

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            selected: this.props.selected || new Array(),
            textVal: this.props.textVal || "",
            defaultText: ""
        }
    }

    render() {
        let showText = Utils.pluck(this.props.selected, "text").join(" ") || this.props.placeholder;
        return (
            <RowLayout onPress={this.showPicker} style={[styles.container, this.props.style]}>
                {/*左侧标题*/}
                <View>
                    <Text style={[{ color: "#333",fontSize:MainStyle.font.size.size16 }, this.props.labelStyle]} allowFontScaling={false}>
                        {this.props.labelText || ""}
                    </Text>
                </View>

                <RowLayout style={styles.right}>
                    {/*选择的内容*/}
                    <Text style={[styles.value, showText!=this.props.placeholder?this.props.valueStyle:styles.placeholderStyle]} allowFontScaling={false}>
                        {showText}
                    </Text>
                    {this.renderRight()}
                    {this._renderModal()}
                </RowLayout>
            </RowLayout>
        )
    }

    _renderModal = () => {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => {
                    this._setModalVisible(false)
                }}
            >
                <View style={dialogStyles.container}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            this._setModalVisible(false)
                        }}
                    />
                    <View style={{ height: 220 }}>
                        <View
                            style={{
                                backgroundColor: MainStyle.background.color.assit3,
                                justifyContent: "flex-end"
                            }}
                        >
                            <View style={dialogStyles.toolBarStyle}>
                                <TouchableOpacity
                                    style={dialogStyles.btn}
                                    onPress={() => {
                                        this._setModalVisible(false)
                                    }}
                                >
                                    <Text style={dialogStyles.cancelBtnStyle} allowFontScaling={false}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={dialogStyles.btn}
                                    onPress={() => {
                                        this._setModalVisible(false)
                                    }}
                                >
                                    <Text style={dialogStyles.touchBarStyle} allowFontScaling={false}>
                                        确认
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={dialogStyles.contentView}>
                            <View style={{ flex: 1, backgroundColor: MainStyle.background.color.assit3 }}>
                                <View
                                    style={{
                                        width: MainStyle.device.width,
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        alignItems:"center",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: MainStyle.device.width,
                                            height: 16
                                        }}
                                    />
                                    {this._renderItemList()}
                                </View>
                                {this.props.haveText ? (
                                    <View>
                                        <View
                                            style={{
                                                width: MainStyle.device.width,
                                                backgroundColor: MainStyle.background.color.assit6,
                                                height: 8
                                            }}
                                        />

                                        <View style={{ width: MainStyle.device.width }}>{this._renderInput()}</View>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    _renderItemList = () => {
        let itemCateList = this.props.dataSource

        let buttonLength = (MainStyle.device.width - 16 - 8 - 8 - 16) / 3
        let _this = this
        return itemCateList.map((item, index) => {
            let width = item.length > 5 ? buttonLength + (item.length - 5) * 10 + 12 : buttonLength

            let textColor = Utils.find(this.props.selected, it => {
                return it.value == item.value
            })
                ? "#FFFFFF"
                : "#999999"

            let backgroundColor = Utils.find(this.props.selected, it => {
                return it.value == item.value
            })
                ? "#5AA9FA"
                : "#F8F8F8"

            return (
                <TouchableOpacity onPress={() => _this._chooseItem(item)}>
                    <View
                        key={index + "_" + item.value}
                        style={[
                            inputStyle.modalItemCate,
                            {
                                backgroundColor: backgroundColor,
                                width: width
                            }
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                color: textColor
                            }}
                        >
                            {item.text}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    _renderInput = () => {
        let inputVal = this.props.textVal

        return (
            <View style={[inputStyle.container]}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={this.props.textPlaceholder}
                    multiline={true}
                    onChangeText={this._changeText}
                    placeholderTextColor={MainStyle.color.color5}
                    value={inputVal}
                    maxLength={this.props.maxLength}
                    editable={this.props.editable}
                    keyboardType={this.props.keyboardType}
                    style={[inputStyle.input, this.props.valueStyle]}
                    allowFontScaling={false}
                />

            </View>
        )
    }

    _changeText = text => {
        if (this.props.changeInfo) {
            this.props.changeInfo({ text: text, selected: this.props.selected })
        }
    }
    _chooseItem = item => {
        let arr = this.props.selected || []
        if (
            Utils.find(arr, it => {
                return item.value == it.value
            })
        ) {
            if (this.props.single) {
                arr = []
            } else {
                arr = Utils.filter(arr, it => {
                    return it.value != item.value
                })
            }
        } else {
            if (this.props.single) {
                arr = [item]
            } else {
                if(item.single){
                    arr = [item]
                }else{
                    arr = Utils.filter(arr,(it)=>{
                        return !it.single
                    })
                    arr.push(item)
                }
            }
        }
        if (this.props.changeInfo) {
            this.props.changeInfo({ text: this.props.textVal, selected: arr })
        }
    }

    _setModalVisible = visible => {
        this.setState({ visible: visible })
    }
    renderRight = () => {
        let views = []

        if (this.props.rightRender) {
            views.push(this.props.rightRender())
        }

        if (this.props.iconRender) {
            views.push(this.props.iconRender())
        } else {
            views.push(<BMIcon icon="0xe649" style={{fontSize:1,color:MainStyle.font.color.color4}} key={'picker-right-img'} />)
        }

        return <RowLayout>{views}</RowLayout>
    }

    showPicker = () => {
        this.setState({ visible: true })
    }

    getValue = () => {
        return { text: this.props.textVal, selected: this.props.selected }
    }

    setValue(v) {}
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        paddingLeft:16,
        backgroundColor: "#fff",
        height: 20,
        alignItems: "center"
    },
    right: {
        alignItems:"center",
        justifyContent:"flex-end"
    },

    value: {
        marginRight: 16,
        fontSize:MainStyle.font.size.size16,
        color:MainStyle.font.color.color3
    },

    placeholderStyle: {
        marginRight: 13,
        fontSize:MainStyle.font.size.size16,
        color:MainStyle.font.color.color4
    },

    valueDisabled: {
        color: "#ccc",
        marginRight: 5
    }
})

const inputStyle = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 16
    },
    modalItemCate: {
        borderRadius: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        marginBottom: 16
    }
})

const dialogStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(90,90,90,0.4)"
    },
    contentView: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    toolBarStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: MainStyle.background.color.assit3,
        flexDirection: "row",
        height: 44,
        paddingHorizontal: 8,
        borderBottomWidth:1,
        borderBottomColor:MainStyle.border.color.assit4

    },
    touchBarStyle: {
        color: MainStyle.font.color.color8,
        fontSize: 16,
        fontFamily:MainStyle.font.family.main
    },
    cancelBtnStyle: {
        color: MainStyle.font.color.color4,
        fontSize: 16,
        fontFamily:MainStyle.font.family.main
    },
    btn: {
        width: 80,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    }
})
