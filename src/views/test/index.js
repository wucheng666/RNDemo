import React from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import { MainStyle } from "/configs"
import { NavigationComponent } from "/base"

import { Form, Input, Label, Region } from "/modules"
import Button from "/modules/button"
import DateUtil from "../../utils/date-util"
import {Confirm, ModalSelect, DashLine, Counter, AddButton,
    IInput, InfoRow, SearchBar, Uploading, Picker, ISinglePicker, DateTimePicker, IDatePicker } from "/modules"

class Test extends NavigationComponent {
    constructor(props) {
        super(props)

        this.state = {
            showConfirm: false,
            showModalSelect: false,

            count: 1,
            inputVal: "",
            imgVisible: false
        }
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => this.setState({ showConfirm: true })}
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                            },styles.wigetStyle]}
                        >
                            <Text style={{ color: "#000000", fontSize : 20 }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({ showModalSelect: true })}
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                            },styles.wigetStyle]}
                        >
                            <Text style={{ color: "#000000", fontSize: 20 }}>Modal选择元素</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ imgVisible: true })
                                setTimeout(() => {
                                    this.setState({ imgVisible: false })
                                }, 3000)
                            }}
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                            },styles.wigetStyle]}
                        >
                            <Text style={{ color: "#000000", fontSize: 20 }}>uploading</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.navigate("IFlatlist", { title: "IFlatlist" })}
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",
                            },styles.wigetStyle]}
                        >
                            <Text style={{ color: "#000000", fontSize: 20 }}>IFlatList列表</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.navigate("SidesLip", { title: "SidesLip" })}
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff",
                                justifyContent: "center",
                                alignItems: "center",

                            },styles.wigetStyle]}
                        >
                            <Text style={{ color: "#000000", fontSize: 20 }}>侧滑</Text>
                        </TouchableOpacity>

                        <View
                            style={[{
                                height: 60,
                                backgroundColor: "#ffffff"}
                                ,styles.wigetStyle]}
                        >
                            <Text style={{ alignSelf: "center", color: "#000000", fontSize: 20 }}>横/竖线</Text>

                            <View style={{ flexDirection: "row" }}>
                                <DashLine
                                    style={{ backgroundColor: "#ffffff", marginLeft: 6 }}
                                    lineStyle={{ backgroundColor: "#999999" }}
                                    type="row"
                                    height={1}
                                    width={2}
                                    space={3}
                                    length={MainStyle.device.width - 30}
                                />

                                <DashLine
                                    style={{ backgroundColor: "#ffffff", marginLeft: 6 }}
                                    lineStyle={{ backgroundColor: "#999999" }}
                                    type="column"
                                    height={1}
                                    width={2}
                                    space={3}
                                    length={25}
                                />
                            </View>
                        </View>

                        <Counter
                            leftName={"选择数量"}
                            value={this.state.count}
                            style={styles.wigetStyle}
                            onBack={num => this.setState({ count: num })}
                        />

                        <AddButton
                            style={styles.wigetStyle}
                            describe={"添加商品"}
                            add={() => {
                                console.log("回调")
                            }}
                        />

                        <InfoRow
                            style={styles.wigetStyle}
                            rightName={"左侧展示的名称"}
                            value={"右侧展示的内容"}
                        />

                        <IInput
                            rightName={"左侧名称"}
                            placeholder={"请输入左侧名称"}
                            placeholderTextColor={MainStyle.font.color.color4}
                            value={this.state.inputVal}
                            myInputCallBack={value => {
                                this.setState({ inputVal: value })
                            }}
                            style={[styles.wigetStyle]}
                            rightStyle={[{ fontSize: MainStyle.font.size.size16, color: MainStyle.font.color.color4 }]}
                            maxLength={11}
                            keyboardType={"numeric"}
                        />

                        <View style={{ height: 60 }}>
                            <SearchBar
                                placeholder={"请输入搜索内容"}
                                searchAction={value => {
                                    console.log(value)
                                }}
                                textChangeAction={text => {
                                    if (__DEV__) {
                                        console.log("改变", text)
                                    }
                                }}
                            />
                        </View>

                        <Picker
                            labelText="字符串集合"
                            dataSource={["name1", "name2", "name3", "name4"]}
                            valueStyle={{
                                fontSize: MainStyle.font.size.size16,
                                color: MainStyle.font.color.color3
                            }}
                            style={[{
                                backgroundColor: MainStyle.background.color.assit3,
                                height: 60,
                                paddingLeft: 16}, styles.wigetStyle]}
                            single={true}
                            value={this.state.selectLevel}
                            property="selectLevel"
                            haveText={false}
                            placeholder="请选择"
                            onChange={data => {
                                console.log(data[0])
                                // this.setState({ selectLevel: data.length ? data[0] : "" })
                            }}
                        />

                        <Picker
                            labelText="对象集合"
                            dataSource={[{id : 1, name : "name1"}, {id : 2, name : "name2"}, {id : 3, name : "name3"}, {id : 4, name : "name4"}]}
                            field={"name"}
                            property="sex"
                            placeholder="请选择套餐卡名称"
                            placeholderStyle={{fontSize : MainStyle.font.size.size16, color : MainStyle.font.color.color4}}
                            tips={"没有可选择的套餐卡"}
                            editable={true}
                            // value={condition.cardName ? condition.cardName : ""}
                            onChange={(d)=>console.log(d)}
                            style={[{height : 60}, styles.wigetStyle]}
                        />

                        <ISinglePicker
                            style={styles.wigetStyle}
                            labelText="IPicker"
                            dataSource={[{id : 1, name : "name1"}, {id : 2, name : "name2"}, {id : 3, name : "name3"}, {id : 4, name : "name4"}]}
                            field={"name"}
                            property="rebate"
                            placeholder="请选择"
                            placeholderStyle={{color : MainStyle.font.color.color3}}
                            value={""}
                            editable={true}
                            onChange={(value)=>console.log(value)}
                        />

                        <DateTimePicker
                            labelText={"时间选择器"}
                            property={this.props.property}
                            timeMode="datetime"
                            returnValueFormat={this.props.returnValueFormat}
                            lastTime={this.props.lastTime}
                            startTime={this.props.startTime}
                            style={[{height : 60},styles.wigetStyle, this.props.style]}
                            valueStyle={{
                                fontSize: MainStyle.font.size.size16,
                                color: MainStyle.font.color.color3
                            }}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={'#999999'}
                            value={this.props.value}
                            onSelect={(value) =>console.log(value)}
                        />

                        <IDatePicker
                            labelText={"IDatePicker"}
                            // labelStyle={{fontSize : MainStyle.font.size.size14, color : MainStyle.font.color.color3}}
                            property={"startTime2"}
                            timeMode="date"
                            returnValueFormat={"YYYY-MM-DD"}
                            startTime={new Date().format("yyyy-MM-dd")}
                            // lastTime={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).format(
                            //     "yyyy-MM-dd hh:mm"
                            // )}
                            // startTime={new Date().format("yyyy-MM-dd hh:mm")}
                            placeholder="请选择具体小时"
                            // placeholderStyle={{fontSize : MainStyle.font.size.size14, color : MainStyle.font.color.color4}}
                            // value={""}
                            valueStyle={{fontSize : MainStyle.font.size.size14, color : MainStyle.font.color.color3}}
                            onSelect={(value)=>console.log(value)}
                            style={styles.wigetStyle}
                        />

                    </ScrollView>
                </View>

                <Button style={{ backgroundColor: MainStyle.background.color.assit11, height: 50 }} onPress={() => {}}>
                    <Text style={{ fontSize: 18, color: "#FFFFFF" }}>新增商品</Text>
                </Button>

                <Confirm
                    onLeftPress={() => {
                        this.setState({ showConfirm: false })
                    }}
                    onRightPress={() => {
                        this.setState({ showConfirm: false }, () => {
                            this._goToList()
                        })
                    }}
                    modalVisible={this.state.showConfirm}
                    content="comfirm的内容"
                    rightBnText={"确定"}
                />

                <ModalSelect
                    modalVisible={this.state.showModalSelect}
                    selectedList={[{ id: 1, name: "11" }]}
                    dataList={[
                        { id: 1, name: "11" },
                        { id: 2, name: "2ddddddddddd2" },
                        { id: 3, name: "33" },
                        { id: 4, name: "44" },
                        { id: 5, name: "55" }
                    ]}
                    idName="id"
                    showName="name"
                    onLeftPress={() => {
                        this.setState({ showModalSelect: false })
                    }}
                    onRightPress={value => {
                        console.log(value)
                        this.setState({ showModalSelect: false })
                    }}
                />

                <Uploading visible={this.state.imgVisible} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainStyle.background.color.main
    },
    //..........................商品管理样式
    //上下架样式
    shelfState: {
        // flexDirection : "row",
        // backgroundColor : MainStyle.background.color.assit3,
        // height : 45,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        backgroundColor: MainStyle.background.color.assit3
    },
    //已上架
    onShelfState: {
        // color : "red",
        marginRight: 54,
        width: 109,
        height: 45
    },
    //未上架
    offShelfState: {
        // color:"red",
        width: 109,
        height: 45
    },
    flatList: {
        // borderTopRightRadius:5,
        // borderTopLeftRadius:5,
        backgroundColor: MainStyle.background.color.main,
        marginTop: 10
        // backgroundColor : "#ffffff",
    },
    //每行样式
    flatListRow: {
        backgroundColor: MainStyle.background.color.assit3,
        flexDirection: "row",
        height: 86
    },
    flatListRowImg: {
        marginTop: 16,
        marginLeft: 16,
        height: 54,
        width: 54,
        backgroundColor: "rgba(90,169,250,0.2)"
    },
    flatListRowImgIco: {
        marginTop: 14,
        marginLeft: 14,
        width: 28,
        height: 28
    },
    flatListRowContent: {
        marginTop: 28,
        marginLeft: 14
    },
    flatListRowContentType: {
        height: 20,
        // width : 35,
        backgroundColor: "rgba(255,166,25,0.2)",
        marginLeft: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    //列表侧滑
    sidesLip: {
        width: 130,
        height: 86
    },

    sidesLipFont: {
        width: 65,
        height: 86,
        justifyContent: "center",
        alignItems: "center"
    },

    //Modal 层
    modaltTop: {
        flex: 1,
        backgroundColor: MainStyle.background.color.assit2,
        opacity: 0.4
    },
    modalBottom: {
        height: 200,
        // position: 'absolute',
        // bottom: 0,
        backgroundColor: MainStyle.background.color.assit3
    },
    modalItemCate: {
        borderRadius: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
        // marginLeft : 8
    },
    wigetStyle: {
        borderBottomColor: MainStyle.background.color.assit4,
        borderBottomWidth: MainStyle.border.size.assit1
    }
})

export default Test
