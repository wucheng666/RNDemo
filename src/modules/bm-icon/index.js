/**
 * @name index.js
 * @desc 封装的字体组件；
 * @author: Created by XuYong of1615 on 2017/10/24
 */

import React, {Component} from 'react';
import {
    Text
} from 'react-native';


export default class BMIcon extends Component {

    render() {
        let {icon,style,...others} = this.props;
        style = style || {};
        let {fontFamily,...styleNew} = style;
        styleNew.fontFamily = "iconfont";
        return (
            <Text style={styleNew} {...others}>{String.fromCharCode(icon)}{this.props.children}</Text>
        );
    }
}
