/**
 * form表单
 *
 * Created by chenyunjie on 2017/1/17.
 */

import React, {
    Component
} from 'react';

import {
    View
} from 'react-native';


import Picker from '/modules/form/picker';
import DatePicker from '/modules/form/date-picker';
import ImageItem from '/modules/form/image-item';
import Input from '/modules/form/input';
import Region from '/modules/form/region';
import Selection from '/modules/form/selection'
import InputArea from '/modules/form/input-area'
/**
 *
 * 表单项必须要有 property属性及getValue方法
 *
 * <Form group={true|false 是否为表单组，表单组返回数组对象，且需要传入property及value值}>
 *
 *     <Input ..../>
 *
 * </Form>
 *
 */
export default class Form extends Component {

    constructor(props) {
        super(props);

        //表单项列表
        this.formTypeList = [Picker, DatePicker, ImageItem, Input, Region, Selection, Form ,InputArea];
        this.isFormItem = this.isFormItem.bind(this);
    }

    render() {
        return (
            <View style={[this.props.sdqssdhgfdsx]}>
                {this.renderComponent()}
            </View>
        );
    }

    renderComponent() {
        let _this = this;
        let children = React.Children.map(this.props.children, (child,index) => {

            if (child) {
                let element = React.cloneElement(child);
                return element;
            }

        }).filter((item) => !!item);

        if (!this.props.separator) {
            return children;
        }

        let size = children.length * 2 - 1;
        let array = [];

        for (let i=0; i<size; i++) {
            if (i % 2 == 0) {
                array.push(children[i / 2]);
            } else {
                array.push(this.props.separator());
            }
        }

        return array;
    }

    //获取表单数据
    data() {
        //抽出form树结构,删除多余节点

        try {
            let tree = {children: []};
            this.getTreeChildren(this, tree, this.isFormItem);
            tree.currentInstance = this;

            if (this.props.group === true) {
                return this.formGroups(tree);
            } else {
                return this.formItems(tree);
            }
        } catch (e) {
        }

    }

    reset() {
        let tree = {children: []};
        this.getTreeChildren(this, tree, this.isFormItem);
        tree.currentInstance = this;
        this.emptyFormItems(tree);
    }

    getValue() {
        return this.data();
    }

    /**
     * 为表单设置值
     *
     * @param formData
     * @returns {*}
     */
    setValue(formData) {
        let tree = {children: []};
        this.getTreeChildren(this, tree, this.isFormItem);
        tree.currentInstance = this;

        if (this.props.group === true) {
            return this.setGroupFormItems(tree, formData);
        } else {
            return this.setFormItems(tree, formData);
        }
    }

    setFormItems(tree,data) {
        if (tree.children && tree.children.length && data) {
            tree.children.map((child) =>{
                if (child) {
                    let childRef = child.currentInstance;
                    if (childRef) {
                        if (childRef.props.property) {

                            if (childRef.props.property.indexOf(',') >= 0) {
                                let compositeData = {};

                                let properties = childRef.props.property.split(',');

                                //设置组合属性值为一个对象-单cell 多属性情况
                                properties.forEach((p) => {
                                    compositeData[p] = data[p];
                                });

                                childRef.setValue(compositeData);

                            } else {
                                let v = data[childRef.props.property];
                                childRef.setValue(v);
                            }
                        }
                    }
                }
            });
        }
    }

    emptyFormItems(tree) {
        if (tree.children && tree.children.length) {
            tree.children.map((child) =>{
                if (child) {
                    let childRef = child.currentInstance;
                    if (childRef) {
                        childRef.setValue(null);
                    }
                }
            });
        }
    }



    setGroupFormItems(tree, array) {
        if (tree.children && tree.children.length) {
            tree.children.map((child) => {
                if (child) {
                    let childRef = child.currentInstance;
                    if (childRef) {
                        //从数组中选择对应的值，该函数需入参传递
                        if (childRef.props.chooseValue) {
                            let value = childRef.props.chooseValue(array, childRef);
                            childRef.setValue(value);
                        }
                    }
                }
            });
        }
    }

    formItems(tree) {

        let data = {};
        if (tree.children && tree.children.length) {
            tree.children.map((child) => {
                let childRef = child.currentInstance;
                if (childRef && childRef.getValue) {
                    let v = childRef.getValue();
                    if (v && childRef.props.property || v === 0 && childRef.props.property) {

                        //考虑单form cell 存在多值绑定，如选择地址会返回省市区，以对象形式assign至当前form表单数据对象
                        if (childRef.props.property.indexOf(',') >= 0) {
                            let properties = childRef.props.property.split(',');

                            properties.forEach((p) => {
                                data[p] = v[p];
                            });
                        } else {
                            data[childRef.props.property] = v;
                        }
                    }
                }
            });
        }
        return data;
    }

    formGroups(tree) {
        let groupList = [];
        if (tree.children && tree.children.length) {
            tree.children.map((child) => {

                let childRef = child.currentInstance;

                if (childRef && childRef.getValue) {
                    let value = childRef.getValue();
                    if (value && childRef.props.property) {
                        let itemData = {};
                        itemData[childRef.props.property] = value;
                        groupList.push(itemData);
                    } else {
                        if (value && childRef.props.valueFunction) {
                            groupList.push(value);
                        }
                    }
                }
            });
        }
        return groupList;
    }

    /**
     * 判断是否为表单项目
     *
     * @param t 节点类型
     */

    isFormItem(t) {
        return !!this.formTypeList.filter((item) => {
            return t instanceof item || t.isFormCell === true;
        }).length;
    }

    getTreeChildren(node, rootNode, filterFunction) {
        if (node instanceof React.Component) {
            node = node._reactInternalInstance;
        }
        let vnode = {children: []};

        if (!rootNode) {
            rootNode = vnode;
        }

        if (node && node._renderedComponent) {

            let comInstance = this.getFilteredValidComponent(node._renderedComponent, filterFunction);

            let sub = {children: []};
            if (comInstance) {

                sub.currentInstance = comInstance;

                rootNode.children.push(sub);

                this.getTreeChildren(node._renderedComponent, sub, filterFunction);
            } else {
                this.getTreeChildren(node._renderedComponent, rootNode, filterFunction);
            }

        } else if (node && node._renderedChildren) {

            for (let key in node._renderedChildren) {
                if (node._renderedChildren.hasOwnProperty(key) && key.indexOf('.') == 0) {
                    let child = node._renderedChildren[key];
                    let inst = this.getFilteredValidComponent(child, filterFunction);
                    let subnode = {children: []};

                    if (inst) {

                        subnode.currentInstance = inst;

                        rootNode.children.push(subnode);

                        this.getTreeChildren(child, subnode, filterFunction);

                    } else {
                        this.getTreeChildren(child, rootNode, filterFunction);
                    }
                }
            }
        }
    }

    getFilteredValidComponent(component, filterFunction) {

        if (!component) {
            return null;
        }

        let  instance = this.getValidComponent(component);
        if (instance && (!filterFunction || filterFunction(instance) === true)) {
            return instance;
        }
        return instance;
    }

    getValidComponent(node) {

        node = node._instance;

        if (!node || !node.getValue) {

            node = null;
        }
        return node;
    }
}
