/**
 * 表单项目
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, {
    Component
} from 'react';

import {
    StyleSheet, Text
} from 'react-native';

import RowLayout from '../../layout/row';
import Device from '../../device';
import {MainStyle} from '/configs'

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

    render() {
        return (
            <RowLayout style={[styles.container, this.props.style]}>
                <Text style={[styles.label, this.props.labelStyle]} allowFontScaling={false}>
                    {this.props.labelText}
                </Text>

                <Text style={[styles.value, this.props.valueStyle]} allowFontScaling={false}>
                    {this.props.value}
                </Text>
            </RowLayout>
        );

    }

    getValue() {
        return this.props.value;
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: Device.width,
        justifyContent: 'space-around'
    },

    label: {
        fontSize:MainStyle.font.size.size16,
        color:MainStyle.font.color.color2,
        fontFamily:MainStyle.font.family.main
    },

    value: {
        fontSize:MainStyle.font.size.size16,
        color:MainStyle.font.color.color3,
        fontFamily:MainStyle.font.family.main
    }
});