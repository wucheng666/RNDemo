/**
 * Created by chenyunjie on 2017/6/27.
 */

import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Image, Platform,NativeModules} from 'react-native';

import {NavigationActions} from 'react-navigation';
import {MainStyle} from '/configs';

import RouteHelp from './routeHelp';

import BMIcon from '/modules/bm-icon';


export default class NavigationComponent extends Component {

    static pages = {};
    static navigationOptions = ({navigation}) => {

        //自定义头部左侧返回视图
        /*如果想要拦截返回按钮，在页面写以下代码
              backPress = (navigation) =>{
            // 自己想要进行的操作，
            console.log("自定义了。。");
            // navigation.goBack(); // 即可返回上一个页面
        }
         */
        let headerLeftView = (
            <View>
                <TouchableOpacity style={{width:44,height:44,justifyContent:'center',alignItems:'center'}}
                                  onPress={()=>{
                                      let currentPage = NavigationComponent.pages[navigation.state.key];
                                      if(currentPage.backPress){  //如果页面设置了backPress的回调，则响应回调并把navigation传过去
                                          currentPage.backPress(navigation);
                                      }else {  //否则默认返回上一个页面
                                          let canGoBack = navigation.goBack();
                                          if (!canGoBack){
                                              NativeModules.micro.close();
                                          }
                                      }
                                  }}>
                    {/*<Image source={require('#/images/base/navBarLeft.png')}/>*/}
                    <BMIcon icon={0xe648}
                            style={{
                                fontSize : 18,
                                // marginLeft : 16,
                                color : MainStyle.color.assit6
                            }}/>
                </TouchableOpacity>
            </View>
        );

        let headerRightView = (navigation.state.params && navigation.state.params.headerRight) ? navigation.state.params.headerRight : null;

        if (navigation.state.params) {

            let os = Platform.OS;

            return {
                headerTitleStyle: {
                    alignSelf: 'center',
                    fontFamily: 'PingFangSC-Medium',
                    fontSize: MainStyle.font.size.size18
                },
                title: navigation.state.params.title, // 这里navigation有bug， 首页第一次进来不能同时设定title和right
                headerTintColor: '#fff',
                headerLeft:headerLeftView,
                headerRight:headerRightView || <Text/>,
                headerStyle: {
                    backgroundColor: MainStyle.background.color.assit11,
                    height: 44,
                    shadowOpacity: 0,
                    elevation: 0,
                    borderBottomWidth : 0
                },
            };
        }
    };

    constructor(props) {
        super(props);
        if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {
            this.data = this.props.navigation.state.params;
        } else {
            this.data = {};
        }
        if(this.props.navigation){
            NavigationComponent.pages[this.props.navigation.state.key] = this;
        }
        this.setParams({
            needRefresh : true // 判断是否需要刷新,默认需要刷新
        })
        /**
         * 封装侧滑组件时用到；主要用于收集所有列表行组件实例
         * @type {Array}
         */
        this.refList = [];
    }

    /**
     * 页面跳转
     *
     * @param routeName   路由的名字
     * @param params      参数
     */
    navigate(routeName, params) {
        if (this.props.navigation) {
            this.props.navigation.navigate(routeName, params);
        }
    }

    /**
     * 返回到上一个页面
     */
    goBack(){
        if (this.props.navigation) {
            this.props.navigation.goBack();
        }
    }

    /**
     * 返回到指定的页面
     *
     * @param routeName   指定页面的路由名称   必填
     * @param params      带过去的参数  选填
     */
    goBackToRoute(routeName,params = null){
        let i = 0;
        let length = RouteHelp.routeMapArray.length;
        for(let j = length - 1;j>-1;j --){
            let routeInfo = RouteHelp.routeMapArray[j];
            if(routeInfo.routeName === routeName){
                i = j;
                break;
            }
        }
        let index = i+1;//这里多加一层fix stackRoutes 里回到传入key的层再减一层
        if(index === length){//防止数组越界
            index = length -1;
        }
        let key = RouteHelp.routeMapArray[index].key;
        if (this.props.navigation) {
            const backAction = NavigationActions.back({
                key: key
            });
            //
            this.props.navigation.dispatch(backAction);
        }

        let routeObject = RouteHelp.routeMapArray[index]; //得到跳转页面的路由对象
        routeObject.params.callback&&routeObject.params.callback(params);  //如果设置了回调的方法，则把参数传过去

    }


    /**
     * 隐藏头部
     */
    hideHeader() {
        this.setParams(this.addParams('header', <View/>));
    }

    componentDidMount() {
        if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params) {

            let {setParams}  = this.props.navigation;

            setParams({title: this.props.navigation.state.params.title});
        }
    }

    /**
     * 设置当前标题，仅在页面加载完成之后调用
     *
     * @param title
     */
    setTitle(title) {
        this.setParams(this.addParams('title', title));
    }

    setRight(component) {
        this.setParams(this.addParams('headerRight', component));
    }

    setParams(params) {

        if (this.props.navigation) {
            let setParamsAction = NavigationActions.setParams({
                params: params,
                key: this.props.navigation.state.key
            });
            this.props.navigation.dispatch(setParamsAction);
        }
    }

    addParams(key, object) {
        if (this.props.navigation) {
            let currentParams = this.props.navigation.state.params;
            if (!currentParams) {
                currentParams = {};
            }
            currentParams[key] = object;
            return currentParams;
        }
        return {};
    }

}