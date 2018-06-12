/**
 *  签约合同页面
 *  create by mango
 */

import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {MainStyle} from '/configs';
import {BasePureComponent} from '/base';
import Tips from '/utils/tips';
import PropTypes from 'prop-types';

/**
 *
 * 自定义的switch组件
 * 属性1： dataSource：[] ：数组型数据源，内部对象 {value:1,text:'111'}
 * 属性2： callback：func ：回调函数，回调函数参数为选中的对象obj
 * 属性3：defaultItem ： 默认数据项
 *
 * use example <MySwitch dataSource={dataSource} callback={this.mySwitchCallback} />
 *
 */
export default class MySwitch extends BasePureComponent {

    /*static defaultProps = {
        dataSource: [],
        callback:null
    };*/

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let dataSource = this.props.dataSource;
        let defaultItem = this.props.defaultItem;

        this.state = {
            chooseContractType: defaultItem || dataSource[0]
        };

        this.chooseContract = this.chooseContract.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        let chooseContractType = this.state.chooseContractType;

        if (nextProps.defaultItem.value !== chooseContractType.value) {
            this.setState({chooseContractType: nextProps.defaultItem});
        }
    }

    componentDidMount() {

    }

    render() {

        let chooseContractType = this.state.chooseContractType;

        let dataSource = this.props.dataSource;

        return (
            <View style={[styles.container]}>

                <View style={[styles.containerBg]}></View>

                <TouchableOpacity activeOpacity={1} onPress={this.chooseContract.bind(this, 0)}
                                  style={[styles.touchArea,
                                      chooseContractType.value == dataSource[0].value ?
                                          {
                                              left: -88,
                                              width: 48,
                                              backgroundColor: MainStyle.color.main,
                                              borderRadius: MainStyle.font.size.size12
                                          }
                                          : {left: -88 + 9}
                                  ]}
                >
                    <Text style={{
                        fontSize: 12,
                        color: `${chooseContractType.value == dataSource[0].value ? '#FFFFFF' : '#999999'}`
                    }} allowFontScaling={false}>{dataSource[0].text}</Text>

                </TouchableOpacity>


                <TouchableOpacity activeOpacity={1} onPress={this.chooseContract.bind(this, 1)}
                                  style={[styles.touchArea,
                                      chooseContractType.value == dataSource[0].value ?
                                          {right: 9} :
                                          {
                                              right: 0,
                                              width: 48,
                                              backgroundColor: MainStyle.color.main,
                                              borderRadius: MainStyle.font.size.size12
                                          }
                                  ]}
                >
                    <Text style={{
                        fontSize: MainStyle.font.size.size12,
                        color: `${chooseContractType.value == dataSource[0].value ? '#999999' : '#FFFFFF'}`
                    }} allowFontScaling={false}>{dataSource[1].text}</Text>

                </TouchableOpacity>

            </View>
        )

    }

    chooseContract(index) {

        let dataSource = this.props.dataSource;

        this.setState({
            chooseContractType: dataSource[index]
        });

        this.props.callback && this.props.callback(dataSource[index]);
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBg: {
        height: 24,
        borderWidth: 1,
        borderColor: MainStyle.border.color.main,
        backgroundColor: MainStyle.background.color.assit3,
        position: 'absolute',
        right: 0,
        width: 88,
        borderRadius: 12
    },
    touchArea: {
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }
});