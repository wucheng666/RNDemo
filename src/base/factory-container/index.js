/**
 * @name index.js.js
 * @desc
 * @author: Created by XuYong of1615 on 2017/10/15
 */

import React, {Component} from 'react';
import {
    BackHandler,
    View,
    StyleSheet,
    ViewStyle,
    NativeModules,
    Platform
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';

import RouteHelp from '../routeHelp';
const isAndroid = Platform.OS === 'android';

export default class FactoryContainer extends Component {

    constructor(props) {
        super(props);
        let _self = this;

        if (isAndroid) {
            BackHandler.addEventListener('hardwareBackPress', () => {
                // console.log('hardwareBackPress->>');
                _self._handleBackAndroid();
            });
        }
    }

    render() {
        console.log(".....ttttt")
        let _this = this;
        const AppStackNavigator = StackNavigator(this.props.routes, {
            initialRouteName: this.props.initialRoute || 'Home',
            cardStyle: {flex: 1, backgroundColor: '#fff'},
            navigationOptions: {
                // header: null,
                gesturesEnabled: false
            },
            onTransitionEnd: (e) => {
                let {scenes} = e;
                _this.setRouteHelp(scenes)
            }
        });

        return (
            <View style={styles.container}>
                {/*<AppStackNavigator/>*/}

                <AppStackNavigator
                    ref={na => na && (this._navigation = na._navigation)}
                    onNavigationStateChange={(prevState, currentState) => {

                        if (!currentState) {
                            return;
                        }
                        const currentScreen = this._getCurrentRouteName(currentState);
                        const prevScreen = this._getCurrentRouteName(prevState);
                        if (prevScreen !== currentScreen) {
                            this._routes = currentState.routes;
                            this._sceneName = currentScreen;

                            // 如果有eventId 表示需要友盟统计，此时应当调用友盟api
                            if(currentScreen && NativeModules.Umeng){
                                NativeModules.Umeng.onEventWithMap('pageShow',{screenName:this.props.initialRoute + ':' + currentScreen});
                            }
                        }
                    }}
                />
            </View>
        );
    }

    setRouteHelp = (scenes) => {
        let tmp = [];
        for (let i = 0; i < scenes.length; i++) {
            tmp.push(scenes[i].route);
        }
        RouteHelp.routeMapArray = tmp;
    };

    /**
     * 获取当前的路由名称
     * @param navigationState
     * @returns {*}
     * @private
     */
    _getCurrentRouteName = navigationState => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return this._getCurrentRouteName(route);
        }
        return route.routeName;
    };


    /**
     * 处理android的实体键的返回
     */
    _handleBackAndroid = () => {
        // console.log('_handleBackAndroid-- 0-->>', this._sceneName);
        // console.log('current sceneName-->>', this._sceneName);
        // 如果当前显示poUp 先关闭
        // if (this._popUp._getPopUpStatus()) {
        //     msg.emit('pop-up-close', true);
        //     return false;
        // }

        //todo _sceneName is undefine ????;
        /*if (this.props.backOutPages.includes(this._sceneName)) {
            // console.log('_handleBackAndroid-- 1-->>', this._sceneName);
            this._backToLast();
            // 退出时释放监听;
            if (isAndroid) {
                BackHandler.removeEventListener('hardwareBackPress', this._handleBackAndroid);
            }
            this._handleBackOut();
            return true;
        } else {
            // console.log('_handleBackAndroid-- 2-->>', this._sceneName);
            this._backToLast();
            return true;
        }*/

        this._backToLast();
        if (isAndroid) {
            BackHandler.removeEventListener('hardwareBackPress', this._handleBackAndroid);
        }
        this._handleBackOut();
        return true;
    };

    /**
     * 退出微应用；
     * @private
     */
    _handleBackOut = () => {
        NativeModules.micro.close();
    };


    /**
     * 回上一个页面;
     * @private
     */
    _backToLast = () => {
        this._navigation.goBack();
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
