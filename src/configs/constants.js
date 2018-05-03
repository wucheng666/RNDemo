/**
 * @name route.js
 * @desc 本地配置信息；
 * @author: Created by XuYong of1615 on 2017/10/10
 */

import {
    NativeModules
} from 'react-native';

module.exports = {

    apiHost : "https://gatewaytest.bm001.com",
    // apiHost : "http://gateway.bm001.com",
    /**
     * 跳转到指定的页面；
     * @param microAppRouter
     * @param childRoute
     * @param pageType
     */
    commonGoToTargetPage: (_self, microAppRouter, childRoute, pageType) => {
        console.log(`go to ${pageType} page -- router: ${microAppRouter}`);

        // Child_Route // todo 判断 Child_Route 是否有值，有就直接 navigate 到该页面，否则直接 到微应用主页；

        if (microAppRouter && childRoute) {
            _self.navigate(`${microAppRouter}`, {
                title: '我的', data: {name: '我的', router: `${microAppRouter}`}
            });
        } else {
            NativeModules.extra.openUri({
                key: `${microAppRouter}`,
                value: {
                    adminId: `rn go to ${pageType} page -- router: ${microAppRouter}`,
                    Child_Route: `${childRoute}`,
                }
            }, (error, events) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(events)
                }
            });
        }
    },

    //商品列表转map
    productArrayToMap: (products) => {
        let productMap = {};
        products.map((product) => {
            productMap[product.id] = product;
        });
        return productMap;
    },

    /**
     *
     * 根据订单输入订单所处的状态
     * 待接单
     String PENDING_TAKE_TRADE = "pending_take_trade";
     * 待选择阿姨
     String PENDING_CHOICE_AUNT = "pending_choice_aunt";
     * 待面试
     String PENDING_INTERVIEW = "pending_interview";
     * 待签订合同
     String PENDING_SIGNED = "pending_signed";
     * 待完成(服务中)
     String PENDING_COMPLETE = "pending_complete";
     * 待雇主完成支付
     String PENDING_PAY = "pending_pay";
     */
    orderStatusText: (trade) => {
        let cateId = trade.cateId;
        let flowStatus = trade.flowStatus;
        let status = trade.status;// 8 取消中  9  已取消   0 正常
        let statusText = '';

        //保洁
        if (cateId === 2) {
            if (status === 0) {
                if (flowStatus === 'pending_take_trade') {//待接单
                    statusText = '待接单';
                } else if (flowStatus === 'pending_pay') {//待付款
                    statusText = '待收款';
                } else if (flowStatus === 'pending_choice_aunt') {//待派工
                    statusText = '待派工';
                } else if (flowStatus === 'pending_complete') {//已派工待完成
                    statusText = '已派工';
                } else if (flowStatus === 'complete') {//已完成
                    statusText = '已完成';
                } else {//其他都是待接单
                    statusText = '待接单';
                }
            } else if (status === 8) {
                statusText = '取消中'
            } else if (status === 9) {
                statusText = '已取消'
            }
        }
        //家政
        else if (cateId === 1) {
            if (status === 0) {
                if (flowStatus === 'pending_take_trade') {//待接单
                    statusText = '待接单';
                } else if (flowStatus === 'pending_choice_aunt') {//待选择阿姨（待处理）
                    statusText = '待处理';
                } else if (flowStatus === 'pending_interview') {//待面试
                    statusText = '待面试';
                } else if (flowStatus === 'pending_signed') {//待签约
                    statusText = '待签约';
                } else if (flowStatus === 'pending_pay') {//待付款
                    statusText = '待付款';
                } else if (flowStatus === 'complete') {//服务中及待完成
                    statusText = '已完成';
                } else {
                    statusText = '待接单';
                }
            } else if (status === 8) {
                statusText = '取消中'
            } else if (status === 9) {
                statusText = '已取消'
            }
        }

        return statusText;
    },


    /**
     * 根据商品icon图标的url，找到对应的背景色色值
     * @param iconUrl
     *
     */
    getBGColorByIconUrl(iconUrl) {
        if (iconUrl) {
            let iconName = iconUrl.substring(iconUrl.lastIndexOf('/') + 1, iconUrl.lastIndexOf('.'));

            if (iconName === 'bj-001' || iconName === 'bj-010' || iconName === 'bj-013' || iconName === 'bj-020'
                || iconName === 'bj-024' || iconName === 'bj-027' || iconName === 'bj-030' || iconName === 'bj-031'
                || iconName === 'bj-041' || iconName === 'bj-045' || iconName === 'bj-051' || iconName === 'bj-056'
                || iconName === 'bj-061' || iconName === 'lm-10' || iconName === 'lm-65' || iconName === 'lm-73') {
                return '#ebf3fa';
            } else if (iconName === 'bj-002' || iconName === 'bj-007' || iconName === 'bj-028' || iconName === 'bj-033'
                || iconName === 'bj-035' || iconName === 'bj-052' || iconName === 'lm-11' || iconName === 'lm-69') {
                return '#eff5ea';
            } else if (iconName === 'bj-003' || iconName === 'bj-006' || iconName === 'bj-009' || iconName === 'bj-022'
                || iconName === 'bj-032' || iconName === 'bj-037' || iconName === 'bj-042' || iconName === 'bj-047'
                || iconName === 'bj-050' || iconName === 'bj-053' || iconName === 'bj-055' || iconName === 'bj-058'
                || iconName === 'bj-062' || iconName === 'lm-2' || iconName === 'lm-4' || iconName === 'lm-70') {
                return '#e5f5f8';
            } else if (iconName === 'bj-004' || iconName === 'bj-005' || iconName === 'bj-008' || iconName === 'bj-011'
                || iconName === 'bj-017' || iconName === 'bj-019' || iconName === 'bj-026' || iconName === 'bj-039'
                || iconName === 'bj-044' || iconName === 'bj-054' || iconName === 'bj-059' || iconName === 'lm-1'
                || iconName === 'lm-12' || iconName === 'lm-13' || iconName === 'lm-67' || iconName === 'lm-72'
                || iconName === 'lm-75') {

                return '#fff5e5';
            } else if (iconName === 'bj-015' || iconName === 'bj-016' || iconName === 'bj-023' || iconName === 'bj-025'
                || iconName === 'bj-036' || iconName === 'bj-043' || iconName === 'bj-048' || iconName === 'bj-049'
                || iconName === 'bj-064' || iconName === 'lm-1' || iconName === 'lm-12' || iconName === 'lm-13'
                || iconName === 'lm-72' || iconName === 'lm-75' || iconName === 'lm-3' || iconName === 'lm-5'
                || iconName === 'lm-71') {

                return '#feeff0';
            } else if (iconName === 'bj-012' || iconName === 'bj-014' || iconName === 'bj-018' || iconName === 'bj-021'
                || iconName === 'bj-029' || iconName === 'bj-034' || iconName === 'bj-038' || iconName === 'bj-040'
                || iconName === 'bj-046' || iconName === 'bj-057' || iconName === 'bj-060' || iconName === 'bj-063'
                || iconName === 'lm-6' || iconName === 'lm-15' || iconName === 'lm-74' || iconName === 'lm-101') {

                return '#f0f0f6';
            } else if (iconName === 'lm-14' || iconName === 'lm-68') {
                return '#eaeff5';
            } else {
                return '#fff5e5';
            }

        } else {
            return '#fff5e5';
        }
    }

};