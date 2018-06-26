import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {MainStyle} from '/configs';
import {NavigationComponent} from '/base';

import {DateTimePicker, Form, Input, Label, Picker, Region} from '/modules';
import {IFlatList} from '/modules'

class IFlatlist extends NavigationComponent {

    constructor(props) {
        super(props);

        this.state = {
            renderProp : "1",
            condition : {
                name : "",
                state : "1",
                pageNum : 0,
                pageSize : 10,
            },
            data : {
                dataList : [],
                pageNum : 0,
                totalCount : 0
            },
            // isScrollEnabled : true, // 判断flatList是否可以滚动
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <IFlatList
                    renderProp={this.state.renderProp}
                    extraData={this.state}
                    data={this.state.data}
                    id={"id"}
                    url={"https://gatewaytest.bm001.com/itemmanage/item/queryProductList"}
                    cellHeight={86}
                    condition={this.state.condition}
                    // requestFn={this.queryList}
                    callBack={this._iflatListCallBack}
                >
                    {this._renderItem}
                </IFlatList>
            </View>
        )
    }

    //回调，用户设置state中的值
    _iflatListCallBack = obj => {
        this.setState(obj)
    }

    //这里是每行要渲染的DOM，自定义
    _renderItem = ({item, index})=> {
        return (
            <View
                key={"id_" + item.id}
                onPress={()=>this.setState({ showConfirm: true })}
                style={{
                    height : 60,
                    backgroundColor : '#ffffff',
                    justifyContent : "center",
                    alignItems : "center",

                    borderBottomColor: "#EEEEEE",
                    borderBottomWidth: MainStyle.border.size.assit1,
                }}>

                <Text style={{color : '#000000', fontSize : 30}}>
                    {item.name}
                </Text>
            </View>
        );
    };

    //模拟后端请求
    queryList = (param, successCallback) => {
        let dataList = this.state.data.dataList
        let data = {}
        data.dataList = []
        data.pageNum = param.pageNum
        data.pageSize = 10
        data.totalCount = 50

        let resultList = []
        for(let i = param.pageNum * param.pageSize ; i < param.pageNum * param.pageSize + param.pageSize; i++){
            resultList.push({id : i, name : "name_" + i})
        }

        data.dataList = resultList
        successCallback(data, true)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainStyle.background.color.main,
    },
});

export default IFlatlist;