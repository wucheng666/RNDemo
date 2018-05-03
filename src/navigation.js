// /**
//  * Created by PC on 2017/7/20.
//  */
// import React, {Component} from 'react';
// import {DrawerNavigator, StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
// import HomeScreen from "./component/HomeScreen";
// import NearByScreen from "./component/NearByScreen";
// import MineScreen from "./component/MineScreen";
// import TabBarItem from "./component/TabBarItem";
//
// export default class Navigation extends Component {
//     render() {
//         return (
//             <Navigator/>
//         );
//     }
// }
//
// const DrawerRouteConfigs = {
//     Home: {
//         screen: HomeScreen,
//         navigationOptions: ({navigation}) => ({
//             drawerLabel : '首页1',
//             drawerIcon : ({focused, tintColor}) => (
//                 <TabBarItem
//                     tintColor={tintColor}
//                     focused={focused}
//                     normalImage={require('./img/tabbar/pfb_tabbar_homepage_2x.png')}
//                     selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected_2x.png')}
//                 />
//             ),
//         }),
//     },
//     NearBy: {
//         screen: NearByScreen,
//         navigationOptions: {
//             drawerLabel : '附近',
//             drawerIcon : ({focused, tintColor}) => (
//                 <TabBarItem
//                     tintColor={tintColor}
//                     focused={focused}
//                     normalImage={require('./img/tabbar/pfb_tabbar_merchant_2x.png')}
//                     selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected_2x.png')}
//                 />
//             ),
//         },
//     },
//     Mine: {
//         screen: MineScreen,
//         navigationOptions: {
//             drawerLabel : '我的',
//             drawerIcon : ({focused, tintColor}) => (
//                 <TabBarItem
//                     tintColor={tintColor}
//                     focused={focused}
//                     normalImage={require('./img/tabbar/pfb_tabbar_mine_2x.png')}
//                     selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected_2x.png')}
//                 />
//             ),
//         },
//     }
// };
//
// const DrawerNavigatorConfigs = {
//     initialRouteName: 'Home',
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     lazy: true,
//     tabBarOptions: {}
// };
//
//
// const Drawer = DrawerNavigator(DrawerRouteConfigs, DrawerNavigatorConfigs);
//
//
// const StackRouteConfigs = {
//     Drawer: {
//         screen: Drawer,
//     }
// };
//
// const Navs = StackNavigator({
//     Home: { screen: "./views/home" },
//     // HomeTwo: {
//     //     screen: HomeTwo,  // 必须, 其他都是非必须
//     //     path:'app/homeTwo', //使用url导航时用到, 如 web app 和 Deep Linking
//     //     navigationOptions: {}  // 此处设置了, 会覆盖组件内的`static navigationOptions`设置. 具体参数详见下文
//     // },
//     HomeThree: { screen: "./views/index2" },
//     HomeFour: { screen: "./views/index3" }
// }, {
//     initialRouteName: 'Home', // 默认显示界面
//     navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
//         header: {  // 导航栏相关设置项
//             backTitle: '返回',  // 左上角返回键文字
//             style: {
//                 backgroundColor: '#fff'
//             },
//             titleStyle: {
//                 color: 'green'
//             }
//         },
//         cardStack: {
//             gesturesEnabled: true
//         }
//     },
//     mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
//     headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
//     onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
//     onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
// });
//
// const StackNavigatorConfigs = {
//     initialRouteName: 'Drawer',
//     navigationOptions: {
//         title: '标题',
//         headerStyle: {backgroundColor: '#5da8ff'},
//         headerTitleStyle: {color: '#333333'},
//     }
// };
//
// const Navigator = StackNavigator(Navs, StackNavigatorConfigs);