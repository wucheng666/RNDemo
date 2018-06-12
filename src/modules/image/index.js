/**
 * 图片组件  可设置占位图、加载失败的图
 *
 * <ImageComponent url={{uri:"***"} || require()} 图片路径      必填
 *                 placeholder={require()}  //占位图   选填  默认有一张占位图
 *                 errorImage={require()}   //图片加载失败的图    选填    默认有一张加载失败的图
 *                />
 *
 * Created by zhanglin on 2017/7/10.
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Image} from 'react-native'

import {BasePureComponent} from '/base';


export  default class ImageComponent extends BasePureComponent {

    static defaultProps = {
        placeholder: require('./resource/pic_loading.png'),
        errorImage: require('./resource/pic_error.png'),
    }

    static propTypes = {
        placeholder : PropTypes.number,
        errorImage : PropTypes.number,
        iconSource : PropTypes.oneOfType([PropTypes.number,PropTypes.object]).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isFailed : false //图片是否加载失败
        };
    }

    render() {
        if(this.state.isFailed){  //如果加载失败  显示加载失败的图片
            return <Image {...this.props} source={this.props.errorImage}/>
        }


        if(typeof this.props.iconSource == "number"){  //如果是加载的本地资源图片
            return <Image {...this.props} source = {this.props.iconSource}/>
        }else {  //如果加载的是网络图片
            if(this.props.iconSource && this.props.iconSource.uri){  //如果uri的值不为null

                return <Image {...this.props}
                    source = {this.props.iconSource}
                    defaultSource = {this.props.placeholder}
                    onLoadStart = {this._imageLoadStart.bind(this)}
                    onLoad = {this._imageLoad.bind(this)}
                    onLoadEnd={this._imageLoadEnd.bind(this)}
                    onError = {this._imageLoadError.bind(this)}
                />
            }else {
                return <Image {...this.props} source={this.props.errorImage}/>
            }
        }
    }

    //加载开始时
    _imageLoadStart(){

    }

    //加载成功完成时
    _imageLoad(){

    }

    //加载结束后，不论成功还是失败
    _imageLoadEnd(e) {

    }

    //加载失败
    _imageLoadError(e){

        if(__DEV__){console.log(e.nativeEvent.error);}

        this.setState({
            isFailed : true
        });
    }

}

