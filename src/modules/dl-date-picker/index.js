import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, StyleSheet, Text, TouchableOpacity, Platform, PixelRatio } from 'react-native';

import DateTimePicker from './dateTimePicker';
import TimePicker from './timePicker';
import HalfDayPicker from './halfDayPicker';
import TimePeriodPicker from './time-period-picker';
import YearAndMonthPicker from './YearAndMonthPicker';

import moment from 'moment';
import RootSiblings from 'react-native-root-siblings';

let datePickerHeight = 30 * 7;
let datePickerView = null;
const selectedAreaHeight = 30;

/**
 * 弹出日期选择控件
 *  pickerSetting 参数是一个对象，用于设置picker。参数字段内容参照propTypes。
 *  参数不用全传，本组件设置了默认参数。
 */
export function showDatePicker(pickerSetting) {
    const datePicker = (
        <View style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <DLDatePick {...pickerSetting} />
        </View>
    );

    if (datePickerView) {
        datePickerView.update(datePicker);
    } else {
        datePickerView = new RootSiblings(datePicker);
    }
}

/**
 * 隐藏 日期选择控件
 */
export function hiddenDatePicker() {
    if (datePickerView) {
        datePickerView.destroy();
        datePickerView = null;
    }
}

class DLDatePick extends PureComponent {
    static propTypes = {
        // timeMode => time: HH:mm  datetime: YYYY-MM-DD HH:mm  date: YYYY-MM-DD  day: YYYY-MM-DD (0 上午/1 下午)
        timeMode: PropTypes.oneOf(['time', 'datetime', 'date', 'day', 'timePeriod', 'yearAndMonth']), // 组件的模式
        lastTime: PropTypes.string, // 最后可选时间
        startTime: PropTypes.string, // 最早可选时间
        selectedTime: PropTypes.string, // 当前选中时间
        onCancel: PropTypes.func, // 取消按钮回调方法
        onSure: PropTypes.func, // 确定按钮回调方法
        returnValueFormat: PropTypes.string, // 返回时间字符串样式

        // 每天可用的时间区间 0~23点
        workStartTime: PropTypes.number, // 小时数的区间最小值
        workEndTime: PropTypes.number, // 小时数的区间最大值

        // 多少分钟间隔
        period: PropTypes.number // 分钟数的间隔段位 比如15分钟一段 分钟数列就显示（0，15，30，45）
    };

    static defaultProps = {
        timeMode: 'datetime',
        returnValueFormat: 'YYYY-MM-DD HH:mm',
        selectedTime: moment()
            .utcOffset(8)
            .format('YYYY-MM-DD HH:mm'),
        lastTime: moment()
            .add(10, 'y')
            .utcOffset(8)
            .format('YYYY-MM-DD HH:mm'),
        startTime: moment()
            .subtract(10, 'y')
            .utcOffset(8)
            .format('YYYY-MM-DD HH:mm'),
        // 每天可用的时间区间 0~23点
        workStartTime: 0,
        workEndTime: 23,

        // 多少分钟间隔
        period: 1
    };

    constructor(props) {
        super(props);

        let reasonableTime = this.props.selectedTime;
        this.state = {
            nowSelectedTime: reasonableTime
        };

        this.onTimePeriodChangedHandler = this.onTimePeriodChangedHandler.bind(this);

        if (Platform.OS == 'android') {
            let selectedStr = this.props.selectedTime;

            if (this.props.timeMode == 'time' || this.props.timeMode == 'timePeriod') {
                this._selectedTime = selectedStr;
            } else {
                this._selectedDate = selectedStr.substr(0, 10);
                this._selectedTime = selectedStr.substr(11, 5);
                this._yearAndMonth = selectedStr.substr(0, 7);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ flex: 1 }} onPress={this._dismiss.bind(this)} />
                <View style={{ backgroundColor: '#453445', justifyContent: 'flex-end' }}>
                    <View style={styles.toolBarStyle}>
                        <TouchableOpacity style={styles.btn} onPress={this._dismiss.bind(this)}>
                            <Text style={styles.touchCancelBarStyle} allowFontScaling={false}>
                                取消
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={this._handleSubmit.bind(this)}>
                            <Text style={styles.touchConfirmBarStyle} allowFontScaling={false}>
                                确认
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentView}>
                        <View style={styles.promptViewStyle} />
                        {this.loadPickerView()}
                    </View>
                </View>
            </View>
        );
    }

    _dismiss() {
        // 点击取消或者空白区域处理
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        hiddenDatePicker();
    }

    _handleSubmit() {
        // 点击确定处理

        if (this.props.timeMode === 'timePeriod') {
            if (this.props.onSure) {
                let succeed = this.props.onSure(this.periodStart, this.periodEnd);

                if (succeed !== false) {
                    hiddenDatePicker();
                }
            }
        } else if (this.props.timeMode == 'yearAndMonth' && this._yearAndMonth) {
            this.props.onSure && this.props.onSure(this._yearAndMonth);
            hiddenDatePicker();
        } else {
            let dateStr = '';
            let formatStr = '';

            if (this.props.timeMode == 'datetime' && this._selectedDate && this._selectedTime) {
                dateStr = this._selectedDate + ' ' + this._selectedTime;
                formatStr = 'YYYY-MM-DD HH:mm';
            } else if ((this.props.timeMode == 'date' || this.props.timeMode == 'day') && this._selectedDate) {
                dateStr = this._selectedDate;
                formatStr = 'YYYY-MM-DD';
            } else if (this.props.timeMode == 'time' && this._selectedTime) {
                dateStr = this._selectedTime;
                formatStr = 'HH:mm';
            }

            let selectedTime = moment(dateStr, formatStr);

            let selectedStr = selectedTime.format(this.props.returnValueFormat);

            if (this.props.timeMode == 'time') {
                if (!moment(dateStr, 'HH:mm').isValid()) {
                    selectedStr = '';
                }
            } else {
                if (!moment(dateStr).isValid()) {
                    selectedStr = '';
                }
            }
            this.props.onSure && this.props.onSure(selectedStr, this._selectedHalfDay);
            hiddenDatePicker();
        }
    }

    loadPickerView() {
        switch (this.props.timeMode) {
            case 'timePeriod':
                return [this.loadTimePeriodPicker()];
                break;
            case 'time':
                return [this.loadTimePicker()];
                break;
            case 'datetime':
                return [this.loadDateTimePicker(), this.loadTimePicker()];
                break;
            case 'date':
                return [this.loadDateTimePicker()];
                break;
            case 'day':
                return [this.loadDateTimePicker(), this.loadHalfDayPicker()];
                break;

            case 'yearAndMonth':
                return [this.loadYearAndMonthPicker()];
                break;
        }
    }

    // 上午下午picker
    loadHalfDayPicker() {
        return (
            <HalfDayPicker
                key={'HalfDayPicker'}
                selectedTime={this.state.nowSelectedTime}
                onTimeChange={this._onHalfDayPickerChange.bind(this)}
                itemHeight={selectedAreaHeight}
            />
        );
    }

    _onHalfDayPickerChange(value) {
        this._selectedHalfDay = value;
    }

    // 时分picker (修改，添加开始结束时间用于可以限定到时分)
    loadTimePicker() {
        return (
            <TimePicker
                key={'TimePicker'}
                timeMode={this.props.timeMode}
                selectedTime={this.state.nowSelectedTime}
                workStartTime={this.props.workStartTime}
                workEndTime={this.props.workEndTime}
                period={this.props.period}
                onTimeChange={this._onTimePickerChange.bind(this)}
                itemHeight={selectedAreaHeight}
            />
        );
    }

    loadTimePeriodPicker() {
        return (
            <TimePeriodPicker
                key="periodTimePicker"
                timeMode={this.props.timeMode}
                selectedTime={this.state.nowSelectedTime}
                onTimePeriodChanged={this.onTimePeriodChangedHandler}
                itemHeight={selectedAreaHeight}
            />
        );
    }

    onTimePeriodChangedHandler(start, end) {
        this.periodStart = start;
        this.periodEnd = end;
    }

    _onTimePickerChange(value) {
        this._selectedTime = value;
    }

    // 年月日
    loadDateTimePicker() {
        return (
            <DateTimePicker
                key={'DateTimePicker'}
                lastTime={this.props.lastTime.substring(0, 10)}
                startTime={this.props.startTime.substring(0, 10)}
                selectedTime={this.state.nowSelectedTime}
                onTimeChange={this._onDateTimePickerChange.bind(this)}
                itemHeight={selectedAreaHeight}
            />
        );
    }
    _onDateTimePickerChange(value) {
        switch (value.slice(5, 10)) {
            case '02-29':
                value.slice(0, 5) % 4 == 0
                    ? (this._selectedDate = value.slice(0, 5) + '02-29')
                    : (this._selectedDate = value.slice(0, 5) + '02-28');
                break;
            case '02-30':
                this._selectedDate = value.slice(0, 5) + '02-28';
                break;
            case '02-31':
                this._selectedDate = value.slice(0, 5) + '02-28';
                break;
            case '04-31':
                this._selectedDate = value.slice(0, 5) + '04-30';
                break;
            case '06-31':
                this._selectedDate = value.slice(0, 5) + '06-30';
                break;
            case '09-31':
                this._selectedDate = value.slice(0, 5) + '09-30';
                break;
            case '11-31':
                this._selectedDate = value.slice(0, 5) + '11-30';
                break;
            default:
                this._selectedDate = value;
        }
    }

    loadYearAndMonthPicker() {
        return (
            <YearAndMonthPicker
                key={'YearAndMonthPicker'}
                lastTime={this.props.lastTime.substring(0, 10)}
                startTime={this.props.startTime.substring(0, 10)}
                selectedTime={this.state.nowSelectedTime}
                onTimeChange={this._onYearAndMonthPickerChange.bind(this)}
                itemHeight={selectedAreaHeight}
            />
        );
    }
    _onYearAndMonthPickerChange(value) {
        this._yearAndMonth = value;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(90,90,90,0.5)',
        justifyContent: 'flex-end'
    },
    contentView: {
        height: datePickerHeight,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingHorizontal: 12,
        justifyContent: 'flex-end'
    },
    toolBarStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        height: 44,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: '#eeeeee'
    },
    touchCancelBarStyle: {
        color: '#999999',
        fontSize: 16
    },
    touchConfirmBarStyle: {
        color: '#5AA9FA',
        fontSize: 16
    },
    promptViewStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: (datePickerHeight - selectedAreaHeight) / 2,
        height: selectedAreaHeight,
        borderColor: '#eee',
        padding: 15,
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get()
    },
    btn: {
        width: 80,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DLDatePick;