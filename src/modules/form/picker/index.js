/**
 *
 * 上拉选择框
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, {
    Component
} from 'react';

import {
    View, Text, TouchableOpacity, Image, StyleSheet
} from 'react-native';

import {Picker as RCTPicker} from 'react-native-arenakit';

import RowLayout from '../../layout/row';

import {MainStyle} from '/configs'
import BMIcon from '../../bm-icon'
import PropTypes from 'prop-types';
import Tips from '../../../utils/tips'

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
 */
export default class Picker extends Component {

    static defaultProps = {
        dataSource: [],
        value: '',
        placeholder:'请选择',
        editable:true,
        editableOnEmpty: true,  //为空值时是否可编辑，覆盖editable
        field : "",              //数据源为对象时，picker中需要展示的字段对应的属性名

        //以下使用的前提还是
        tips : "没有可选项",
        rightStyle : {}, //右侧整体的样式
        rightTextStyle : {}, //右侧字体的样式
        hasChildren : false, //判断是否有自定义内容，默认false,为true的时候
        placeholderStyle : {}, //默认提示的样式
    };

    static propTypes = {
        dataSource: PropTypes.array,
        value: PropTypes.any,
        editable: PropTypes.bool,
        editableOnEmpty: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.showPicker = this.showPicker.bind(this);
        this.setValue = this.setValue.bind(this);

        this.state = {
            selectedValue: this.props.value
        };

        this.dataMap = {};
        this.values = this.props.value;

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.values = nextProps.value;
            this.setState({selectedValue: nextProps.value});

            if (this.props.onChange) {
                this.props.onChange([nextProps.value]);
            }
        }
    }

    render() {
        let selectedValue = this.state.selectedValue;

        let selectedValueText = selectedValue;

        if (selectedValue) {
            if (selectedValue && typeof selectedValue==='object' &&
                Array == selectedValue.constructor) {
                selectedValueText = selectedValue ? selectedValue.map((item) => {
                        if (this.props.field && item[this.props.field]) {
                            return item[this.props.field];
                        } else {
                            return item;
                        }
                    }).join(' ') : '';
            } else {
                if (this.props.field && selectedValue[this.props.field]) {
                    selectedValueText = selectedValue[this.props.field];
                } else {
                    selectedValueText = selectedValue;
                }
            }
        }

        if (!selectedValueText || selectedValueText == '') {
            selectedValueText = this.props.actionText || this.props.placeholder;
        }

        let editable = true;

        if (this.props.editable == false) {
            if (!this.state.selectedValue) {
                if (this.props.editableOnEmpty == false) {
                    editable = false;
                }
            } else {
                editable = false;
            }
        }

        return (
            this.props.hasChildren ?
                <TouchableOpacity onPress={this.showPicker}>
                    <View>
                        {this.props.children}
                    </View>
                </TouchableOpacity> :
                <RowLayout onPress={this.showPicker} style={[styles.container, this.props.style]}>
                    {/*左侧标题*/}
                    <View>
                        <Text style={[{marginLeft:6,color: '#333',fontSize:MainStyle.font.size.size16}, this.props.labelStyle]} allowFontScaling={false}>{this.props.labelText || ''}</Text>
                    </View>

                    <RowLayout style={[styles.right, this.props.rightStyle]}>
                        {/*选择的内容*/}
                        <Text style={[
                            styles.value,
                            this.props.valueStyle,
                            editable === false ? styles.valueDisabled : {},
                            this.props.placeholder == selectedValueText ?
                                {
                                    fontSize: MainStyle.font.size.size16,
                                    color: MainStyle.font.color.color4,
                                    fontFamily:MainStyle.font.family.main,
                                    ...this.props.placeholderStyle
                                } : {},
                            this.props.rightTextStyle]} allowFontScaling={false}>{selectedValueText}</Text>
                        {this.renderRight()}
                    </RowLayout>
                </RowLayout>
        )
    }

    renderRight() {

        if (this.props.editable == false) {
            if (!this.state.selectedValue) {
                if (this.props.editableOnEmpty == false) {
                    return;
                }
            } else {
                return;
            }
        }

        let views = [];

        if (this.props.rightRender) {
            views.push(this.props.rightRender());
        }

        if (this.props.iconRender) {
            views.push(this.props.iconRender());
        } else {

            views.push( <BMIcon icon="0xe649" style={{fontSize:14,color:MainStyle.font.color.color4}} key={'picker-right-img'} />);
        }

        return (
            <RowLayout>
                {views}
            </RowLayout>
        );
    }

    showPicker() {

        if (this.editable === undefined) {
            this.editable = this.props.editable;
        }

        if (this.editable === false) {
            if (!this.state.selectedValue) {
                if (this.props.editableOnEmpty === false) {
                    return;
                } else {
                    this.editable = true;
                }
            } else {
                this.editable = false;
            }
        }


        if (this.editable === false) {
            return;
        }
        let object = this.state.selectedValue;

        let selectedValues = [];

        if (!(object && typeof object==='object' &&
            Array == object.constructor)) {
            selectedValues = [object];
        } else {
            selectedValues = object;
        }
        this.values = selectedValues.filter((item) => !!item);

        let selectedItems = this.processSelectedValues(selectedValues);

        let dataSource = this.processDataSource();

        if (!dataSource || dataSource.length == 0) {
            Tips.showTips(this.props.tips)
            return;
        }

        //..............mine.........end............

        let _this = this;
        RCTPicker.init({
            pickerTitleText: this.props.pickerTitle || this.props.placeholder,
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确认',
            pickerData: dataSource,
            selectedValue: selectedItems,
            onPickerConfirm: data => {

                if (data && data.length > 0) {

                    let realData = _this.props.field ? data.map((item) => {
                        return _this.dataMap[item];
                    }) : data;

                    this.setState({selectedValue: realData});
                    this.values = realData;
                    if (_this.props.onChange) {
                        _this.props.onChange(realData, _this);
                    }
                } else {
                    _this.setState({selectedValue: null});
                }
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
                if (_this.props.onSelectChange) {
                    this.props.onSelectChange(data);
                }
            }
        });
        RCTPicker.show();
    }

    processDataSource() {
        if (this.props.dataSource) {
            return this.props.dataSource.map((item) => {
                if (this.props.field && item[this.props.field]) {
                    this.dataMap[item[this.props.field]] = item;
                    return item[this.props.field];
                } else {
                    return item;
                }
            });
        }
        return [];
    }

    processSelectedValues(selectedValues) {
        return selectedValues.filter((o) => {
            return !!o;
        }).map((item) => {
            if (this.props.field && item[this.props.field]) {
                return item[this.props.field];
            } else {
                return item;
            }
        });
    }

    getValue() {

        let selectedValue = this.values;
        if(this.props.valueFunction && selectedValue && selectedValue != ''){
            return this.props.valueFunction(selectedValue, this.props.data);
        }

        return selectedValue
    }

    setValue(v) {
        let selectedValue = v;
        if (v) {

            if (this.props.identifier && this.props.dataSource) {
                this.props.dataSource.map((o) => {

                    let value = v;

                    if (v.length) {
                        value = v[0];
                    }

                    if (o[this.props.identifier] == value[this.props.identifier]) {
                        selectedValue = o;
                    }
                });
            }

            if (selectedValue.length === undefined){
                selectedValue = [selectedValue];
            }

        }

        this.setState({selectedValue: selectedValue});

        this.values = selectedValue;

        if (this.props.onChange) {
            this.props.onChange(selectedValue);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-between',
        padding: 10,
        backgroundColor: '#fff',
        height: 40,
        alignItems: 'center'
    },
    right: {
        alignItems: 'center'
    },

    value: {
        marginRight: 6
    },

    valueDisabled: {
        color: '#ccc',
        marginRight: 6
    },

    placeholderStyle:{
        fontSize: MainStyle.font.size.size16,
        color: MainStyle.font.color.color4,
        fontFamily:MainStyle.font.family.main
    }
});
