/**
 * Created by dingle on 2017/4/1.
 */
/**
 * Created by dingle on 2017/3/31.
 */
import React, {Component, PureComponent}from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,

} from 'react-native';
import moment from 'moment'
import DLPicker from './dlPicker'
import {padStart} from './numberTool'

class TimePicker extends PureComponent {

    static propTypes = {
        selectedTime: PropTypes.string,
        // 每天可用的时间区间 0~23点
        workStartTime: PropTypes.number.isRequired,
        workEndTime: PropTypes.number.isRequired,

        // 多少分钟间隔
        period: PropTypes.number.isRequired,

        onTimeChange: PropTypes.func,

        itemHeight: PropTypes.number,

        timeMode : PropTypes.string
    };

    constructor(props) {
        super(props);
        let selectedDate = "";
        //  按照规则计算出当前初始选中时间
        if(this.props.timeMode == "time"){
            selectedDate = moment(this.props.selectedTime, "HH:mm").utcOffset(8);
        }else{
            selectedDate = moment(this.props.selectedTime).utcOffset(8);
        }

        let hour = selectedDate.hour();
        if (hour >= this.props.workEndTime) {
            //目前版本不需要这个条件
            // selectedDate.hour(this.props.workEndTime);
            // selectedDate.minute(0);
        } else if (hour < this.props.workStartTime) {
            selectedDate.hour(this.props.workStartTime)
        }
        let minuteNum = Math.floor(selectedDate.minute() / this.props.period) * this.props.period;
        selectedDate.minute(minuteNum);


        this.hourData = [];
        for (let i = 0; i <= (this.props.workEndTime - this.props.workStartTime); i++) {
            let value = this.props.workStartTime + i;
            let label = value + '点';
            this.hourData.push({value, label});
        }
        this.hourSelectedIndex = selectedDate.hour() - this.props.workStartTime;


        this.minuteData = [];
        for (let i = 0; i < 60; i += this.props.period) {
            let value = i;
            let label = i + '分';
            this.minuteData.push({value, label});
        }
        this.minuteSelectedIndex = Math.floor(selectedDate.minute() / this.props.period);


    }

    render() {
        return (
            <View style={styles.container}>
                {this.getHourPicker()}
                {this.getMinutePicker()}
            </View>
        )
    }

    getHourPicker() {

        return (
            <DLPicker data={this.hourData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedHourItem.bind(this)}
                      selectedIndex={this.hourSelectedIndex}
                      ref={(picker)=>this._hourPicker=picker}
            />
        )
    }

    _onSelectedHourItem(itemData) {
        this.selectedHour = itemData.value;

        this.putSelectedTimeStr();
    }

    getMinutePicker() {

        return (
            <DLPicker data={this.minuteData}
                      itemHeight={this.props.itemHeight}
                      onSelectedItem={this._onSelectedMinuteItem.bind(this)}
                      selectedIndex={this.minuteSelectedIndex}
                      ref={(picker)=>this._minutePicker=picker}
            />
        )
    }

    _onSelectedMinuteItem(itemData) {
        this.selectedMinute = itemData.value;

        this.putSelectedTimeStr();
    }

    // 组装最终数据 -- 上传给父组件
    putSelectedTimeStr() {
        let hour = this.selectedHour;
        // if(hour == this.props.workEndTime && this.selectedMinute != 0){
        //     this._minutePicker.scrollToIndex(0);
        //     this.selectedMinute = 0;
        // }
        let selectedDate = ""
        if(this.props.timeMode == "time"){
            selectedDate = moment(this.props.selectedTime, "HH:mm").utcOffset(8);
            // selectedDate = moment(this.props.selectedTime, "HH:mm").utcOffset(8);
        }else{
            selectedDate = moment(this.props.selectedTime).utcOffset(8);
        }

        // window.alert("this.selectedHour..", this.selectedHour)
        // window.alert("this.selectedMinute..", this.selectedMinute)
        let hourStr = this.selectedHour !== undefined || this.selectedHour ? padStart(this.selectedHour, 2, '0') : selectedDate.hour();
        let minuteStr = this.selectedMinute !== undefined || this.selectedMinute ? padStart(this.selectedMinute, 2, '0') : selectedDate.minute();
        let timeStr = hourStr + ':' + minuteStr;
        // window.alert("putSelectedTimeStr..", timeStr)
        this.props.onTimeChange(timeStr)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'stretch',
    }

});

export default TimePicker;