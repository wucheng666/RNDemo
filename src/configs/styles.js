/**
 * 样式定义
 *
 * Created by chenyunjie on 2017/6/28.
 */

import {PixelRatio, Dimensions, StyleSheet} from 'react-native';

const MainStyle = {

    device: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    size: (v) => v / PixelRatio.get(),

    font: {
        size: {
            size10: 10,//弱
            size12: 12,//一般
            size14: 14,//一般
            size16: 16,//重要
            size18: 18, //重要
            size24: 24, //
            size28: 28
        },
        color: {
            color1: '#000000',
            color2: '#333333',
            color3: '#666666',
            color4: '#999999',
            color5: '#cccccc',
            color6: '#ffffff',
            color7: '#f86670',
            color8: '#40b0ff',
            color9: '#ed9c27',
            color10: '#e0e0e0',
            color11: '#FFAC32',
            color12: '#5AA9FA'
        },
        family : {
            regular : "PingFangSC-Regular",
            light : "PingFangSC-Light"
        }
    },

    border: {
        size: {
            main: 1,
            assit1: StyleSheet.hairlineWidth, //相当于原来的0.5  这一常量定义了当前平台上的最细的宽度，不是固定值，因为不同的平台和不同的屏幕像素密度会导致不同的结果
            assit2: 2,
            zero: 0
        },
        color: {
            main: '#dcdcdc',
            assit1: '#f86670',
            assit2: '#cccccc',
            assit3: '#40b0ff',
            assit4 : '#EEEEEE'
        }
    },

    //颜色定义，所有界面，理论上一个app的配色不会很多
    color: {
        main: '#40b0ff',  //标准色
        assit1: '#ffbd2d', //3个辅色
        assit2: '#28c840',
        assit3: '#ff5f59',
        assit4: '#cccccc',
        assit5: '#80caff',
        assit6: '#f7f7f7',
        assit11: '#FE3B31',
        assit12: '#ffffff'

    },

    //背景色调
    background: {
        color: {
            main: '#f3f4f5',
            assit1: '#f7f7f7',
            assit2: '#000000',
            assit3: '#ffffff',
            assit4: '#eeeeee',
            assit5: '#80caff',
            assit6: '#efefef',
            assit7: '#47B1FF',
            assit8: '#cccccc',
            assit9: '#40b0ff',
            searchBar: 'rgba(255,255,255,0.3)',
            assit10: '#e9e9ef',
            assit11: '#5AA9FA',
            assit12 : "#5AA9FA"
        }
    }
};


module.exports = MainStyle;