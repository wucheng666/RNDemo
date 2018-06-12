/**
 * 普通条目
 *
 * Created by chenyunjie on 2017/2/6.
 */

import React, {
    Component
} from 'react';

import {
    View, StyleSheet, Text, Image, TouchableOpacity, Platform
} from 'react-native';

import RowLayout from '../../layout/row';

import ImagePicker from 'react-native-image-picker';

import ModuleStyles from '../../styles';

export default class ImageItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: '',
            source: this.props.value || ''
        };

        this.url = '';

        this.doChooseImageAction = this.doChooseImageAction.bind(this);
    }

    componentWillReceiveProps(next) {
        this.setState({source: next.value});
    }

    render() {
        return (
            <RowLayout onPress={this.doChooseImageAction} style={[styles.container, this.props.style]}>
                {/*左侧标题*/}
                <View>
                    <Text style={[{color: '#333'}, this.props.labelStyle]} allowFontScaling={false}>{this.props.labelText || ''}</Text>
                </View>

                <RowLayout style={styles.right}>
                    <TouchableOpacity style={[{marginRight: 5,width: 30, height: 30, borderRadius: 15,overflow: 'hidden', alignItems: 'center', justifyContent: 'center'}, ModuleStyles.border.all]} >
                        <Image style={{width: 20, height: 20}} src={this.state.source || ''} placeholder="head_default"/>
                    </TouchableOpacity>
                    <Image source={require('../images/infor.png')}/>
                </RowLayout>
            </RowLayout>
        );
    }



    // showImagePicker() {
    //     ImagePicker.openPicker({
    //         width: 200,
    //         height: 200,
    //         cropping: true
    //     }).then(image => {
    //         this.setState({path: image.path});
    //         if (this.props.upload) {
    //             this.props.upload(image, (url) => {
    //                 this.url = url;
    //             });
    //         }
    //     });
    // }

    doChooseImageAction() {
        let options = {
            title: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                waitUntilSaved: true
            },
            cancelButtonTitle:'取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: "从照片库中选择"
        };

        let _this = this;
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            }else if (response.error) {
            }else if (response.customButton) {
            } else {
                let source = {uri: 'data:image/jpeg;base64,' + response.data};


                if (Platform.OS === 'android') {
                    source = {uri: response.uri,path:response.path};
                }  else {
                    source = {uri: response.uri.replace('file://', ''),path:response.uri.replace('file://', '')};
                }

                if (this.props.upload) {
                    this.props.upload(source, response.data, (url) => {
                        _this.url = url;
                    });
                }

                _this.setState({source: source.uri});
            }
        });
    }

    getValue() {
        return this.url;
    }

    setValue(v) {

    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-between',
        padding: 10,
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center'
    },
    right: {
        alignItems: 'center'
    }
});