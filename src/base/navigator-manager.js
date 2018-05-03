/**
 * Created by chenyunjie on 2017/6/29.
 */

import React, {Component} from 'react';

// import Routes from '/configs/routes';
import {Routes} from '/configs';
import {StackNavigator} from 'react-navigation';

export default (routeConfigMap, stackConfig) => {

    let routeKeys = Object.keys(routeConfigMap);

    let screenModeRoutes = {};

    let modalModeRoutes = {};

    routeKeys.map((routeKey) => {

        let route = routeConfigMap[routeKey];

        if (route.mode && route.mode === 'modal') {
            modalModeRoutes[routeKey] = route;
        } else {
            screenModeRoutes[routeKey] = route;
        }
    });

    let screenModeStackNavigator = StackNavigator(screenModeRoutes, stackConfig);

    let routes = Object.assign({}, {}, screenModeRoutes);

    let modalModeStackNavigator = StackNavigator(modalModeRoutes, stackConfig);

};
