/**
 * Created by chenyunjie on 2017/7/11.
 */

import React,{Component} from 'react';

import {View, Text} from 'react-native';

import Select from '../../select';

import ColumnLayout from '../../layout/column';
import RowLayout from '../../layout/column';


/**
 * 表单选项
 *
 * <Selection multi={true|false} dataSource={选项数据}/>
 *
 * editable 是否可编辑
 *
 * editableOnEmpty 为空时是否可编辑
 *
 */
export default class Selection extends Component {

    static defaultProps = {
        editable:true,
        editableOnEmpty: true,  //为空值时是否可编辑，覆盖editable
    };

    render() {

        return (
            <ColumnLayout style={[{padding: 10, backgroundColor: '#fff', justifyContent: 'center'}, this.props.style]}>
                {/*左侧标题*/}
                <View>
                    <Text style={[{color: '#333'}, this.props.labelStyle]} allowFontScaling={false}>{this.props.labelText || ''}</Text>
                </View>

                <RowLayout style={{padding: 10}}>
                    <Select {...this.props}
                            ref={(select) => this.select = select}
                            selectable={this.props.editable}
                            selectableOnEmpty={this.props.editableOnEmpty}
                            type={this.props.multi === true ? 'checkbox' : 'radio'}
                        />
                </RowLayout>
            </ColumnLayout>
        );
    }

    getValue() {
        if (this.props.valueFunction) {
            return this.props.valueFunction(this.select.selectedItems, this.props.data, this.select);
        } else {
            return this.select.selectedItems;
        }
    }

    setValue(v) {
        this.select.selectedItems = v;
    }

}