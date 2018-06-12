/**
 * Created by yhy on 2018/1/25.
 *
 * 默认上传地址https://gateway.bm001.com/fw/upload/img
 *
 *  <ImagePage dataSource={this.state.photos} url={"https://gatewaytest.bm001.com/fw/upload/img"} onChange={(data)=>{
                    this.setState({photos:data})
                }}/>
 */

import React,{Component} from "react"
import { TouchableOpacity, StyleSheet, Text, View, NativeModules, FlatList,ScrollView } from "react-native"
import { SafeAreaView } from 'react-navigation';
import { NavigationComponent } from "/base"
import { MainStyle } from "/configs"
import { Form, DateTimePicker, Input, Picker, Region } from "/modules"
import BMIcon from '/modules/bm-icon';
import BmImage from "/modules/image"
import ImageViewer from "/modules/image-viewer"
import { Uploading } from "/modules"
import Util from "underscore"
import request from "/utils/request"
import tips from "/utils/tips"


export default class ImagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    static defaultProps = {
        dataSource:[],//保持状态的数据源
        onChange:()=>{},//操作完数据会将所有数据返回
        url:"https://gateway.bm001.com/fw/upload/img"
    }

    render() {
        let dataList = Util.union([], this.props.dataSource) //占位
        let newDataList = dataList.concat()
        newDataList.unshift([])
        return (
            <SafeAreaView style={styles.container}>
                <Uploading visible={this.state._loading} />
                <ScrollView>
                    <View
                        style={{ margin: 10, width: MainStyle.device.width - 20, flex: 1 }}
                    >
                        <ImageViewer
                            ref={imageViewer => {
                                this.imageViewer = imageViewer
                            }}
                            urls={dataList}
                            selectIndex={0}
                            showDelete={true}
                            onDelete={this._deleteImage}
                        />
                        {dataList.length > 0 ?
                            <FlatList
                                horizontal={false}
                                numColumns={3}
                                style={{
                                    flexDirection: "row",
                                    flex: 1
                                }}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <View style={{ height: 1, backgroundColor: MainStyle.background.color.assit4 }} />
                                    )
                                }}
                                data={newDataList}
                                renderItem={data => {
                                    if (data.index == 0) {
                                        return this._renderFirst()
                                    } else {
                                        return (
                                            <TouchableOpacity
                                                style={{ width: 116, height: 154, margin: 3 }}
                                                onPress={() => {
                                                    this._showImages(data.index - 1)
                                                }}
                                            >
                                                <BmImage
                                                    style={{ width: 114, height: 152 }}
                                                    iconSource={{
                                                        uri:
                                                        data.item.url +
                                                        MainStyle.pic.size.size228x304
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                }}
                            /> : <View>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: 152,
                                        marginBottom: 10,
                                        width: MainStyle.device.width - 20,
                                        backgroundColor: "#fff"
                                    }}
                                    onPress={() => {
                                        this._uploadPhoto()
                                    }}
                                >
                                    <BMIcon
                                        icon="0xe647"
                                        style={{
                                            fontSize: 32,
                                            color: MainStyle.font.color.color8
                                        }}
                                    />
                                    <Text style={{ fontSize: MainStyle.font.size.size14, marginTop: 8, color: MainStyle.font.color.color8 }}>
                                        添加照片
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ width: MainStyle.device.width - 20, height: StyleSheet.hairlineWidth, backgroundColor: MainStyle.border.color.assit4, marginBottom: 10, }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    _renderFirst() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 152,
                        width: 114,
                        margin: 3,
                        backgroundColor: "#fff"
                    }}
                    onPress={() => {
                        this._uploadPhoto()
                    }}
                >
                    <BMIcon
                        icon="0xe647"
                        style={{
                            fontSize: 32,
                            color: MainStyle.font.color.color8
                        }}
                    />
                    <Text style={{ fontSize: MainStyle.font.size.size14, marginTop: 8, color: MainStyle.font.color.color8 }}>
                        添加照片
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    _uploadPhoto = () => {
        let _this = this
        NativeModules.util.photo(
            {
                returnOriginal: false, // false ==>返回经过压缩之后的图片   true ==> 返回原图
                maxSize: 500, //可选 图片的最大大小 单位KB 。 500就是500KB
                returnType: 0 // 可选 1==>返回base64
            },
            (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    _this.setState({
                        filePath: data.filePath
                    })
                    _this._loading()
                    request.upload(_this.props.url,{ path: "file://" + data.filePath }, (res,sign) => {
                        _this._loading()
                        if(!sign){
                            tips.showTips("上传失败，请重试")
                            return
                        }
                        let params = {}
                        params.url = res.url

                        let picList = Util.union([], _this.props.dataSource)
                        picList.push(params)
                        if(_this.props.onChange){
                            _this.props.onChange(picList)
                        }
                    })
                }
            }
        )
    }

    _showImages(index) {
        this.imageViewer.show(index)
    }

    _deleteImage = (url, index) => {
        let picList = this.props.dataSource
        picList.splice(index, 1)
        if(this.props.onChange){
            this.props.onChange(picList)
        }
    }

    _loading = () => {
        let sign = this.state._loading
        if (sign) {
            this.setState({ _loading: false })
        } else {
            this.setState({ _loading: true })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainStyle.background.color.main
    },
    form: {
        marginBottom: 30
    },
    videoBox: {
        width: MainStyle.device.width - 20,
        height: 200,
        backgroundColor: '#fff',
    },
    video: {
        width: MainStyle.device.width - 20,
        height: 200,
        backgroundColor: '#fff',
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 68,
        width: MainStyle.device.width - 20,
        backgroundColor: 'transparent'
    },
    progressBox: {
        width: MainStyle.device.width - 20,
        height: 2,
        backgroundColor: '#ccc'
    },
    progressBar: {
        height: 2,
        backgroundColor: '#ff6600'
    },
    playIcon: {
        position: 'absolute',
        top: 68,
        left: (MainStyle.device.width - 20) / 2 - 32,
        height: 64,
        width: 64,
        // paddingTop: 8,
        paddingLeft: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 32,
        color: '#ed7b66',
        justifyContent: 'center',
        alignItems: 'center'
    },
})