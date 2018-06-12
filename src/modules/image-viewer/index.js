/**
 * 图片浏览器
 *
 *
 * <ImageViewerComponent
 *           ref={(imageViewer)=>{this.imageViewer = imageViewer}}  引用
 *           selectIndex={0}         默认显示第几个图片                                                   选填    默认第一个图
             urls={images}           传入图片的数组  [{url:'http://****.jpg'},{url:'http://****.jpg'}]    必填
             savePicture={true}      是否允许长按保存照片                                                  选填   默认允许
             showDelete={true}       是否显示右上角的删除按钮                                              选填    默认显示
             onDelete={(url,index)=>{}}    删除当前图片的回调   返回值是当前图片的URL以及对应的下标
 />

 想要显示图片浏览器，调用show(index)方法； index代表想要显示图片的下标
 想要关闭图片浏览器，调用close()方法；  当点击删除按钮的时候，默认会关闭当前图片浏览器
 *
 * Created by zhanglin on 2017/7/5.
 */

import React, {Component} from 'react';

import {Modal,TouchableOpacity,ActivityIndicator} from 'react-native'

import {BasePureComponent} from '/base';

import ImageViewer from 'react-native-image-zoom-viewer';

import BMIcon from '../bm-icon'
import {MainStyle} from '/configs'

export  default class ImageViewerComponent extends BasePureComponent {

    static defaultProps = {
        urls:[], //图片数组
        selectIndex:0,  //默认显示第几个图片
        showDelete:true, //右上角是否显示删除按钮
        savePicture:true, //是否允许长按保存图片
        onDelete:()=>{}, // 删除回调
        resize:MainStyle.pic.size.size500x800,
        resizeAble:true
    };

    constructor(props) {
        super(props);

        this.state = {
            modalVisible:false,
            selectIndex:this.props.selectIndex, //当前页
            imageUrls:this.props.urls //图片数组
        };

        this.currentIndex = this.props.selectIndex; //当前页

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.urls && !this.equal(nextProps.urls,this.props.urls)) {
            this.setState({
                imageUrls :  nextProps.urls
            })
        }
    }

    render() {

        return (
            <Modal visible={this.state.modalVisible}
                   animationType={"fade"}
                   transparent={true}>

                <ImageViewer imageUrls={this.state.imageUrls}  //图片数组
                             index = {this.state.selectIndex} //默认显示第几个图片
                             //failImageSource={require('image-new/comment/pic_error.png')} //加载失败显示的图片
                             loadingRender={this.loadingReader.bind(this)}  //渲染loading元素
                             onCancel={this.close.bind(this)}  //取消看图的回调
                             saveToLocalByLongPress={true}  //允许长按保存图片
                             onChange={this.onChange.bind(this)}  //图片切换
                             enableScaling={true}
                     />
                {this.renderClose()}
                {this.renderDrop()}
            </Modal>
        );
    }

    //绘制删除按钮
    renderDrop() {
        return (
            this.props.showDelete?
                <TouchableOpacity style={{position:'absolute',right:10,top:25}} onPress={this.delete.bind(this)}>
                    <BMIcon icon="0xe655" style={{fontSize:18,color:MainStyle.font.color.color6}} />
                </TouchableOpacity>: null
        );
    }
    //绘制关闭按钮
    renderClose() {
        return (
                <TouchableOpacity style={{position:'absolute',left:10,top:25}} onPress={this.close.bind(this)}>
                    <BMIcon icon="0xe648" style={{fontSize:18,color:MainStyle.font.color.color6}} />
                </TouchableOpacity>
        );
    }

    //图片切换
    onChange(index){
        this.currentIndex = index
    }

    //删除图片
    delete() {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.urls[this.currentIndex].url,this.currentIndex); //返回的参数是当前删除图片的url以及对应的下标
            this.close();//关闭当前页面
        }
    }


    //显示浏览器
    show(index){

        let selectIndex  = index;
        if(index==undefined || index == null){
            selectIndex == 0;
        }
        this.currentIndex = selectIndex;
        this.setState({
            modalVisible:true,
            selectIndex:selectIndex

        });
    }

    //关闭浏览器
    close(){
        this.setState({
            modalVisible:false
        });
    }

    //渲染loading元素
    loadingReader(){
        return(
            <ActivityIndicator animating={true}
                               style={{alignItems: 'center',justifyContent: 'center',padding: 8,height: 80}}
                               size="large"
            />
        )
    }


    equal(arr1,arr2){
        if(!arr1 && !arr2)return true;

        if(!arr1 || !arr2)return false;
        if(JSON.stringify(arr1) == JSON.stringify(arr2)){
            return true
        }
        return false
    }

}

