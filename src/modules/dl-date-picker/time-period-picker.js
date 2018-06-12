/**
 * Created by chenyunjie on 2017/7/20.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import DLPicker from './dlPicker';

export default class TimePeriodPicker extends PureComponent {
    static propTypes = {
        selectedTime: PropTypes.string,
        timeMode: PropTypes.string
    };

    constructor(props) {
        super(props);
        if (this.props.selectedTime) {
            this.start = this.props.selectedTime.split('-')[0];
            this.end = this.props.selectedTime.split('-')[1];
        }
        this.periodArray = [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00'
        ].map(item => {
            return { label: item, value: item };
        });

        this.onStartChangedHandler = this.onStartChangedHandler.bind(this);
        this.onEndChangedHandler = this.onEndChangedHandler.bind(this);
    }

    render() {
        let selectedIndexStart = 1;
        let selectedIndexEnd = 1;
        this.periodArray.map((item, index) => {
            if (item.value == this.start) {
                selectedIndexStart = index;
            }
            if (item.value == this.end) {
                selectedIndexEnd = index;
            }
        });

        return (
            <View style={{ flexDirection: 'row', flex: 3, alignItems: 'center' }}>
                <DLPicker
                    selectedIndex={selectedIndexStart}
                    timeMode={this.props.timeMode}
                    onSelectedItem={this.onStartChangedHandler}
                    itemHeight={this.props.itemHeight}
                    data={this.periodArray}
                />
                <Text allowFontScaling={false}>至</Text>
                <DLPicker
                    selectedIndex={selectedIndexEnd}
                    timeMode={this.props.timeMode}
                    itemHeight={this.props.itemHeight}
                    onSelectedItem={this.onEndChangedHandler}
                    data={this.periodArray}
                />
            </View>
        );
    }

    onStartChangedHandler(item) {
        this.start = item.value;
        if (this.props.onTimePeriodChanged) {
            this.props.onTimePeriodChanged(this.start, this.end);
        }
    }

    onEndChangedHandler(item) {
        this.end = item.value;
        if (this.props.onTimePeriodChanged) {
            this.props.onTimePeriodChanged(this.start, this.end);
        }
    }
}