/**
 * 服务请求，业务相关
 *
 * Created by apple on 2017/1/3.
 */

import http from "/modules/network/http"

import tips from "./tips"

let jwtJson = { shopCode: "DP00004",mainShopCode : "DP00004", shopType: 1, userCode: "B0000001" }
import SFormData from "/modules/form-data"

// callback 回调函数有两个返回值，第一个返回值返回结果数据或错误信息，第二个返回值返回请求是否成功
export default class request {
    static post(url, data, callback, authorization){
        if (authorization !== false) {
            authorization = true
        }

        let params = data

        var requestData = {}
        if (authorization === true) {
            requestData = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=utf-8",
                    jwtJson: JSON.stringify(jwtJson)
                    // Authorization:window.token
                },
                body: JSON.stringify(params)
            }
        } else {
            requestData = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: SFormData(params)
            }
        }
        http(url, requestData, "POST").then(
            response => {
                if (response.result === "ok") {
                    callback(response.data, true)
                } else if (response.result == "fail") {
                    if (response.rescode === 202) {
                        //未登录
                        callback("未登录，请登陆后再试", false)
                    } else {
                        callback(response.msg, false)
                        tips.showTips(response.msg)
                    }
                } else if (response.result == "tokenInvalid") {
                    callback("请重新登录", false)
                } else {
                    //一些未知错误
                    callback(response.error, false)
                }
            },
            error => {
                if (__DEV__) {
                    console.log(error)
                }
                callback("网络差，请稍后再试。", false)
            }
        )
    }

    static upload(url, params, callback) {

        let formData = new FormData()
        let path = params.path;
        var arr = path.split('/');
        let file = {uri:params.path, type: 'image/jpeg', name:arr[arr.length-1]};
        formData.append("file", file);

        let requestData = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                jwtJson: JSON.stringify(jwtJson)
                // Authorization:window.token
            },
            body: formData
        }
        http(url, requestData, "POST").then(
            response => {
                if (response.result === "ok") {
                    callback(response.data, true)
                } else if (response.result == "fail") {
                    if (response.rescode === 202) {
                        //未登录
                        callback("未登录，请登陆后再试", false)
                    } else {
                        callback(response.msg, false)
                        tips.showTips(response.msg)
                    }
                } else if (response.result == "tokenInvalid") {
                    callback("请重新登录", false)
                } else {
                    //一些未知错误
                    callback(response.error, false)
                }
            },
            error => {
                if (__DEV__) {
                    console.log(error)
                }
                callback("网络差，请稍后再试。", false)
            }
        )
    }
}