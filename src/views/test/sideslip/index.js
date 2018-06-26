/**
 * 用例，列表添加侧滑组件
 * **/
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {MainStyle} from '/configs';
import {NavigationComponent} from '/base';

import {IFlatList, RowCell} from '/modules'

export default class SidesLip extends NavigationComponent {

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
            isScrollEnabled : true, // 判断flatList是否可以滚动
        };

        // this.reflist = []
        this.optId = -1;
    }

    componentDidMount() {
        // console.log(<SidesLip/>)
    }

    render() {
        return (
            <View style={styles.container}>
                <IFlatList
                    renderProp={this.state.renderProp}
                    extraData={this.state}
                    data={this.state.data}
                    id={"id"}
                    cellHeight={86}
                    condition={this.state.condition}
                    requestFn={this.queryList}
                    callBack={this._iflatListCallBack}
                    scrollEnabled={this.state.isScrollEnabled}
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
            <RowCell
                rightElement={[
                    {text: "上架",
                        btnStyle : {backgroundColor : "#cccccc", width : 65, height : 86},
                        textStyle : {fontSize : 16, color : "#FFFFFF"}
                    },
                    {text: "删除",
                        btnStyle : {backgroundColor : "#FE3B31", width : 65, height : 86},
                        textStyle : {fontSize : 16, color : "#FFFFFF"}
                    },
                    {text: "删除2",
                        btnStyle : {backgroundColor : "#40b0ff", width : 65, height : 86},
                        textStyle : {fontSize : 16, color : "#FFFFFF"}
                    }]}
                stopDropdown={this._stopDropdown}
                optId={this.optId}
                ref={(component)=>{this.refList.push(component)}}
                refList={this.refList}
                id ={item.id}
                rowInfo={item}
                queryDetail={this._queryDetail}
                pressCallBack={this._pressCallBack}
                preId = {this._preId}
            >
                <View
                    style={{
                        // height : 60,
                        height : 86,
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
            </RowCell>
        );
    };

    _queryDetail = (data) => {
        console.log(`点击行，查询行详情`, data)
    }

    _pressCallBack = (data, index) => {
        console.log("返回行详情数据", data)
        console.log(`返回在rightElement属性集合中的index : ${index}`)
    }


    //这里是每行要渲染的DOM，自定义
    _renderItem2 = ({item, index})=> {
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

            // for(let i = 0 ; i < 1; i++){
            //     resultList.push({id : i, name : "name_" + i})
            // }

            data.dataList = resultList
            successCallback(data, true)
    }

    //阻止flatList 下拉
    _stopDropdown = (value) => {
        console.log("stop...", value)
        this.setState({
            isScrollEnabled : value
        })
    }

    /*隐藏前一个的id显示*/
    _preId = (inputId)=>{
        this.optId = inputId;
    }

    /*根据id 隐藏前一个 显示*/
    pre_hide = () => {
        let optId = this.optId;
        let len = this.refList.length;

        for(let i = 0;i < len; i++){
            if(this.refList[i] && this.refList[i].props){
                let id = this.refList[i].props.id;
                if(optId == id){
                    this.refList[i].hide();
                }
            }
        }
        this.optId = -1;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainStyle.background.color.main,
    },
});