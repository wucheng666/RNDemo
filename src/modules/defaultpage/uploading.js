/**
 * Created by yhy on 2018/2/2.
 */
import React, { Component } from "react"
import { View, Image, Modal, Text } from "react-native"
import { BasePureComponent } from "/base"
import { MainStyle } from "/configs"

export default class Uploading extends Component {
    static defaultProps = {
        visible: false,
    }

    render() {
        return (
            <Modal visible={this.props.visible} animationType={null} transparent={true}>
                <View
                    style={{
                        width: MainStyle.device.width,
                        height: MainStyle.device.height,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: MainStyle.background.color.assit2,
                        opacity: 0.6
                    }}
                />
                <Image
                    source={{
                        uri: "https://bm-oss.oss-cn-hangzhou.aliyuncs.com/arena/arenaprod/cuser/uploading.gif"
                    }}
                    style={{
                        width: 100,
                        height: 20,
                        marginTop: -(MainStyle.device.height / 2 + 50),
                        marginLeft: (MainStyle.device.width - 100) / 2
                    }}
                />
                <Text
                    style={{
                        fontSize: 14,
                        color: MainStyle.font.color.color6,
                        marginLeft: (MainStyle.device.width - 50) / 2,
                        marginTop: 10
                    }}
                >
                    上传中...
                </Text>
            </Modal>
        )
    }
}
