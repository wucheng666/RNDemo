/**
 * 列表中行数据侧滑， 右侧可添加时间
 */
import React, {Component} from 'react';
import {
    NativeModules,
    LayoutAnimation,
    PanResponder,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import {MainStyle} from '/configs';
import {NavigationComponent} from '/base';
import Button from './button'

const { UIManager } = NativeModules;

//动画方式
const customAnimated = {
    customLinear: {
        duration: 300,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.opacity,
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut
        }
    }
};

export default class RowCell extends Component {
    constructor(props) {
        super(props)
        // this.pre_hide = this.props.pre_hide;
        this.preId = this.props.preId;
        this.state = {
            openState: this.props.openState || false, // 开启侧滑 true：开启， false:关闭
            moveWidth: 0,
            isDelete : false //用于判断是不是点击了删除按钮
        }

        //处理宽高
        // this.singlebtnWidth = 65; //单个button宽度，若有多个以第一个为主，默认65
        this.totalWidth = 65; //左侧所有button的宽度和， 默认单个button宽度65
    }


    static defaultProps = {
        animated  : "cover",//非必填  ["cover", "together"],
        id : "", //列表中行数据的唯一键
        optId : "",//前一次滑动的唯一键
        //列表中所有RowCell的实例，需要使用者在使用RowCell组件时添加属性ref={(component)=>{this.refList.push(component)}}，
        // 其中this.refList不需要注明，已集成到NavigationComponent中了
        refList : [],
        //侧滑后右侧的展示内容。例：{text: "上架", btnStyle : {backgroundColor : "#cccccc", width : 65, height : 86}, textStyle : {fontSize : 16, color : "#FFFFFF"}
        //其中btnStyle对象是设置整个button的样式(这里的height要同行高)， textStyle对象是设置button中文字描述的样式（限text样式）
        rightElement : [],
        stopDropdown : ()=>{}, //用于阻止flatList的滚动轴
        queryDetail : ()=>{}, //点击查询详情, 返回行详细数据
        rowInfo : {}, //行详细信息
        pressCallBack : ()=>{}, // 返回rightElement属性集合中的index位置
    }

    /**
     * 隐藏之前展开的行
     * @private
     */
    _prehide = () => {
        let optId = this.props.optId;
        let refList = this.props.refList

        for(let i = 0;i < refList.length; i++){
            if(refList[i] && refList[i].props){
                let id = refList[i].props.id;
                if(optId == id){
                    refList[i].hide();
                }
            }
        }
    }

    componentWillMount() {
        let rightElement = this.props.rightElement || []
        rightElement.forEach((ele, index)=>{
            if(index == 0){
                this.totalWidth = ele.btnStyle && ele.btnStyle.width ? ele.btnStyle.width : 65
            }else{
                this.totalWidth = ele.btnStyle && ele.btnStyle.width ? this.totalWidth + ele.btnStyle.width : this.totalWidth + 65
            }
        })

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);//启用android Layout动画
        }

        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // if(Math.abs(gestureState.dx) > 10){
                    //隐藏之前显示的view
                    // if(this.props.id != this.props.optId){

                    if(this.props.id != this.props.optId){
                        this._prehide();/*隐藏之前显示的view*/
                    }
                    this.setState({isDelete : false})
                // }
            },
            onPanResponderMove: (evt, gestureState) => {

                if(Math.abs(gestureState.dx) > 10){
                    //用于控制父组件FlatList Scroll的滚动
                    if(!this.state.openState && gestureState.dx < 0){
                        this.props.stopDropdown(false);
                    }else{
                        this.props.stopDropdown(true);
                    }

                    // 最近一次的移动距离为gestureState.move{X,Y}
                    // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
                    // 左滑
                    if (!this.state.openState && gestureState.dx < 0) {
                        if(Math.abs(gestureState.dx) <= this.totalWidth) {
                            this.setState({moveWidth: Math.abs(gestureState.dx)})
                        }
                    }

                    // 右滑
                    if (this.state.openState && gestureState.dx > 0) {
                        if(gestureState.dx <= this.totalWidth) {
                            this.setState({ moveWidth: this.totalWidth - gestureState.dx })
                        }
                    }
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {

                if(Math.abs(gestureState.dx) > 10){
                    this.props.stopDropdown(true);

                    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                    // 一般来说这意味着一个手势操作已经成功完成。
                    if(gestureState.dx < 0){
                        // 左滑
                        if (!this.state.openState && (Math.abs(gestureState.dx) > (this.totalWidth / 2) || Math.abs(gestureState.vx) >= 1)) {

                            LayoutAnimation.configureNext(customAnimated.customLinear);
                            this.preId(this.props.id);
                            // this.preId = this.props.id
                            this.setState({ openState: true, moveWidth: this.totalWidth })
                        }else{

                            LayoutAnimation.configureNext(customAnimated.customLinear);
                            this.setState({ openState: false, moveWidth: 0 })
                        }
                    }else{
                        // 右滑
                        // if (this.state.openState && gestureState.dx < 65) {
                        //
                        //     LayoutAnimation.configureNext(customAnimated.customLinear);
                        //     this.setState({ openState: true, moveWidth: 130 })
                        // }else{
                        //     LayoutAnimation.configureNext(customAnimated.customLinear);
                        //     this.setState({ openState: false, moveWidth: 0 })
                        // }
                        LayoutAnimation.configureNext(customAnimated.customLinear);
                        this.setState({ openState: false, moveWidth: 0 })
                    }
                }else{
                    if (!this.state.openState) {
                        this.props.queryDetail(this.props.rowInfo)
                    } else {
                        LayoutAnimation.configureNext(customAnimated.customLinear);
                        this.setState({ openState: false, moveWidth: 0 })
                    }
                }

                // 点击
                // if (gestureState.dx === 0 && gestureState.dy === 0) {
                //     if (!this.state.openState) {
                //         this.props.getDetail(this.props.id)
                //     } else {
                //         this.setState({ openState: false })
                //     }
                // }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                    if(!this.state.openState && (Math.abs(gestureState.dx) >= (this.totalWidth / 2) || Math.abs(gestureState.vx) >= 1)){
                        this.preId(this.props.id);
                        // this.preId = this.props.id
                    }

                    let openState = this.state.openState
                    let moveWith = this.state.moveWidth
                    if (moveWith < this.totalWidth / 2) {
                        moveWith = 0
                        openState = false
                    } else {
                        moveWith = this.totalWidth
                        openState = true
                    }
                    this.setState({ moveWidth: moveWith, openState: openState });
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return false;
            },
            onResponderTerminationRequest: (evt) => {
                return false;
            }
        });
    }

    hide = () => {
        LayoutAnimation.configureNext(customAnimated.customLinear);
        this.setState({
            openState : false,
            moveWidth : 0
        });
    }

    render() {


        let openState = this.state.openState;
        let moveWidth = this.state.moveWidth;
        // 由openState控制
        if (openState && moveWidth == 0) {
            moveWidth = this.totalWidth
        }
        if (!openState && moveWidth == this.totalWidth) {
            moveWidth = 0
        }

        let viewRightStyle = { width: this.totalWidth, zIndex: -1 }
        let touchStyle = moveWidth  ? { right: moveWidth > this.totalWidth ? this.totalWidth : moveWidth } : {};
        let rowInfo = this.props.rowInfo

        return (
            <View key={"rowCell_" + rowInfo.id}>
                <View style={[styles.flatListRow, touchStyle]} {...this._panResponder.panHandlers}>
                    {this.props.children}
                </View>
                {this._renderButtons(this.props.rightElement, openState, moveWidth, rowInfo, viewRightStyle)}
            </View>
        )
    }

    _renderButtons = (buttonsList, isVisible, moveWidth, rowInfo, viewRightStyle) =>{
        console.log(Math.abs(moveWidth))
        if (buttonsList) {
            return <View style={[this.props.animated == "together" ? viewRightStyle : {width : moveWidth ? moveWidth : 0}, styles.buttonsStyle]}>
                {buttonsList.map((btn, index)=>this._renderButton(btn, rowInfo, index))}
                </View>
        } else {
            return <View />
        }
    }

    _renderButton = (buttonInfo, rowInfo, index) => {
        return(
            <Button
                animated={this.props.animated}
                pressCallBack={this.props.pressCallBack}
                index={index}
                key={"button_" + index}
                rowInfo={rowInfo}
                buttonStyle={buttonInfo.btnStyle || {}}
                textStyle={buttonInfo.textStyle || {}}
                >
                {buttonInfo.text}
            </Button>
        )
    }

    _isDelete = (value) => {
        this.setState({
            isDelete : value
        })
    }
}
const styles = StyleSheet.create({

    buttonsStyle : {
        position : 'absolute',
        right : 0,
        justifyContent : "flex-end",
        flexDirection : "row"
    },
    //每行样式
    flatListRow : {
        backgroundColor : MainStyle.background.color.assit3,
        flexDirection : 'row',
        alignItems : "center"
    },
});