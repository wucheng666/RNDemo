import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { MainStyle } from "/configs"
import { NavigationComponent } from "/base"
import DateTimePicker from "/modules/form/date-picker"

export default class IDatePicker extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        labelText: "",
        labelStyle : {},
        returnValueFormat: "YYYY-MM-DD HH:mm", //默认年月日
        startTime:undefined,
        lastTime:undefined,
        value: "",
        placeholder: "",
        placeholderStyle : {},
        property: "",
        style: {},
        timeMode : "datetime"
    }

    componentDidMount() {}

    render() {
        return (
            <DateTimePicker
                labelText={this.props.labelText}
                labelStyle={this.props.labelStyle}
                property={this.props.property}
                placeholderStyle={this.props.placeholderStyle}
                timeMode={this.props.timeMode}
                returnValueFormat={this.props.returnValueFormat}
                lastTime={this.props.lastTime}
                startTime={this.props.startTime}
                style={[styles.inputStyle, this.props.style]}
                valueStyle={[{
                    fontSize: MainStyle.font.size.size16,
                    color: MainStyle.font.color.color3
                }, this.props.valueStyle]}
                placeholder={this.props.placeholder}
                placeholderTextColor={"#999999"}
                value={this.props.value}
                onSelect={this._myOnSelect}
            />
        )
    }

    _myOnSelect = value => {
        this.props.onSelect(value)
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: MainStyle.background.color.assit3,
        height: 60,
        width: MainStyle.device.width
    }
})
