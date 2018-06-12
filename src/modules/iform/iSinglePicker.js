import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { MainStyle } from "/configs"
import { NavigationComponent } from "/base"
import Picker from "/modules/form/picker"

export default class ISinglePicker extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        labelText: "", //必填， 左侧文案
        dataSource: [], //必填， 数据源（默认是数组中是字符串，若为对象field不能为空）
        value: "",
        placeholder: "",
        field : "",  //数据源为对象时，picker中需要展示的字段对应的属性名
        style: {},  //单元行的样式
        valueStyle : {}, //选中后字体的样式
        leftStyle : {}, //左侧字体的样式
        rightStyle : {}, //右侧整体的样式
        rightTextStyle : {}, //右侧字体的样式
        property: "",


        //以下二个是连着用的
        tips : '',
        hasChildren : false,
        placeholderStyle : {}, //默认提示的样式
    }

    componentDidMount() {}


    render() {

        return (
            <Picker
                labelText={this.props.labelText}
                dataSource={this.props.dataSource}
                field={this.props.field}
                property={this.props.property}
                placeholder={this.props.placeholder}
                placeholderStyle={this.props.placeholderStyle}
                tips={this.props.tips}
                valueStyle={[{
                    fontSize: MainStyle.font.size.size14,
                    color: MainStyle.font.color.color3
                }, this.props.valueStyle]}
                style={[styles.inputStyle, this.props.style]}
                labelStyle={this.props.leftStyle}
                rightStyle={this.props.rightStyle}
                rightTextStyle={this.props.rightTextStyle}
                value={this.props.value}
                editable={true}
                hasChildren={this.props.hasChildren}
                onChange={this._onChange}
            >
                <View>
                    {this.props.children}
                </View>
            </Picker>
        )
    }

    _onChange = value => {
        this.props.onChange(value)
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: MainStyle.background.color.assit3,
        height: 60,
        // width: MainStyle.device.width
    }
})
