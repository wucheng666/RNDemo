/**
 * 针对RN的flatList再封装一层
 */
import React, {Component} from "react"
import {FlatList, View, StyleSheet, Dimensions} from "react-native"
import {NavigationComponent} from "/base"
import NoContent from "../defaultpage/noContent"
import Loading from "../defaultpage/loading"
import LoadingError from "../defaultpage/loadingError"
import request from '/utils/request';
import Constants from '/configs/constants'

export default class IFlatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false, // 同flatList

            //缺省页状态
            isLoading: true, // 加载页
            hasNoContent: false, // 暂无内容页
            isLoadingError: false //加载失败页
        }
    }

    static defaultProps = {
        url : "", //必填,网络请求（完整信息例如：https://gatewaytest.bm001.com/itemmanage/item/queryProductList）
        // this.state中需要定义缺省页状态 ： isLoading : true, hasNoContent : false, isLoadingError : false,
        // this.state中canSearch用来控制是否有下拉搜索
        refreshList : "", //此属性变化表示要重新渲染（建议填new Date().getTime()）
        style: {// 必填，flatList的样式
            backgroundColor: "#f3f4f5",
            marginTop: 10
        },
        extraData : {}, //监控数据变化，以便重新渲染列表
        children: "", // 必填，行能具体结构
        data: { //非必填，为所有数据对象 (后面会写到引用页面 this.state中，格式为：data : {dataList : [], pageNum : 0, totalCount : 0})
            dataList : [],
            pageNum : 0,
            totalCount : 0
        },
        id: "", // 必填，行唯一主键的字段名
        cellHeight: 86, //必填，行高度
        condition: "", //必填，查询列表接口入参 (这里需要在 this.state中定义，格式为：condition : {pageNum : 0,pageSize : 10} 这里condition中至少包含pageNum,pageSize二个字段)
        isScrollEnabled: true, //非必填， 判断flatList是否可以滚动 (有侧滑时需要传)
        // requestFn: () => {}, //请求数据的接口
        // defaultPage : null , //缺省页（包括数据渲染中，数据为空，数据异常等情况的展示页）
    }

    componentDidMount() {
        let condition = this.props.condition
        //iFlatList刚加载的时候渲染，但flatList本身会触发一次下拉，避免短时间内请求被拦截导致报错
        condition._t = new Date().getTime()
        this._queryList(this.props.condition)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.refreshList != this.props.refreshList){
            this.setState({
                isLoading : true,
                hasNoContent : false,
                isLoadingError : false,
            })

            this._queryList(nextProps.condition)
        }
    }

    render() {
        let dataList = this.props.data.dataList

        console.log("this.props.isScrollEnabled。。。", this.props.isScrollEnabled)

        return this.state.isLoading ? (
            <Loading />
        ) : this.state.hasNoContent ? (
            <NoContent />
        ) : this.state.isLoadingError ? (
            <LoadingError reload={() => this._queryList(this.props.condition)} />
        ) : (
            <FlatList
                style={this.props.style}
                extraData={this.props.extraData}
                data={dataList}
                renderItem={this.props.children}
                keyExtractor={(item, index) => "IFlatList_" + item[this.props.id] + "_" + index}
                getItemLayout={this._getItemLayout}
                initialNumToRender={Math.floor(Dimensions.get('window').height / this.props.cellHeight)}
                // ListEmptyComponent={this.props.defaultPage}
                ItemSeparatorComponent={this._separator}
                ListFooterComponent={this._separator}
                onEndReached={this._pullUpLoad.bind(this, this.props.condition)}
                onEndReachedThreshold={0.15}
                // onRefresh={this._pullDownRefresh.bind(this, this.props.condition)}
                refreshing={this.state.refreshing}
                scrollEnabled={this.props.scrollEnabled}
                // scrollEnabled={false}
            />
        )
    }

    _separator = () => {
        return (
            <View
                style={{
                    borderBottomColor: "#EEEEEE",
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}
            />
        )
    }

    _getItemLayout = (data, index) => {
        return { length: this.props.cellHeight, offset: (this.props.cellHeight + 1) * index, index }
    }

    // 下拉刷新中；
    _pullDownRefresh = condition => {
        //是否需要下拉搜索
        // this.props.callBack({ canSearch: true })

        if (__DEV__) {
            console.log("下拉刷新中111。。。")
        }

        this.setState({
            refreshing : true
        })

        condition.pageNum = 0
        this._queryList(condition)
    }

    // 上拉加载中；
    _pullUpLoad = condition => {
        if (__DEV__) {
            console.log("上拉刷新中。。。")
        }

        let data = this.props.data

        if (data && data.dataList && data.dataList.length === data.totalCount) return;
        this._queryList(condition)
    }



    _queryList = (params) => {
        request.post(this.props.url, params, this._callback.bind(this, params), true);
    }


    _callback = (params, data, flag) => {
        if (__DEV__) {
            console.log(`列表-- flag-->>`,data, flag);
        }

        let result = {}
        result.dataList = params.pageNum > 0 ? this.props.data.dataList.concat(data.dataList) : data.dataList
        result.totalCount = data.totalCount

        let hasNoContent = false

        if (data.totalCount == 0) {
            hasNoContent = true
        } else {
            hasNoContent = false
        }

        if (flag) {
            params.pageNum = data.pageNum + 1
            this.props.callBack({
                data: result,
                condition : params,
            })

            this.setState({
                refreshing : true,
                //去除缺省页
                isLoading: false,
                hasNoContent: hasNoContent,
                isLoadingError: false
            })
        } else {
            this.setState({
                refreshing : true,
                isLoadingError: true,
                isLoading: false,
                hasNoContent: false
            })
        }

        this.setState({
            refreshing : false
        })
    }
}
