import tweenState from "react-tween-state"
import NativeButton from "./NativeButton"
import styles from "./styles"
import SwipeoutBtn from "./SwipeoutBtn"

import React, { Component } from "react"
import PropTypes from "prop-types"
import createReactClass from "create-react-class"

import { PanResponder, TouchableHighlight, StyleSheet, Text, View, ViewPropTypes } from "react-native"
import { NavigationComponent } from "../../base"

export default class Swipeout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            autoClose: this.props.autoClose || false,
            btnWidth: 0,
            btnsLeftWidth: 0,
            btnsRightWidth: 0,
            contentHeight: 0,
            contentPos: 0,
            contentWidth: 0,
            openedRight: false,
            swiping: false,
            tweenDuration: 160,
            timeStart: null,

            disabled: false,
            rowID: -1,
            sectionID: -1,
            sensitivity: 50
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onStartShouldSetPanResponderCapture: (event, gestureState) =>{
                console.log("0000000")
                // this.state.openedLeft || this.state.openedRight
                return true
            },

            onMoveShouldSetPanResponderCapture: (event, gestureState) =>
            {
                console.log("111111111")
                // Math.abs(gestureState.dx) > this.props.sensitivity &&
                // Math.abs(gestureState.dy) <= this.props.sensitivity

                return true
            },
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
            onShouldBlockNativeResponder: (event, gestureState) => false,
            onPanResponderTerminationRequest: () => false
        })
    }

    componentWillReceiveProps = (nextProps) =>{
        if (nextProps.close) this._close()
        if (nextProps.openRight) this._openRight()
        if (nextProps.openLeft) this._openLeft()
    }

    _handlePanResponderGrant = (e, gestureState) =>{
        console.log("222222222")
        if (this.props.disabled) return
        if (!this.state.openedLeft && !this.state.openedRight) {
            this._callOnOpen()
        } else {
            this._callOnClose()
        }
        this.refs.swipeoutContent.measure((ox, oy, width, height) => {
            let buttonWidth = this.props.buttonWidth || width / 5
            this.setState({
                btnWidth: buttonWidth,
                btnsLeftWidth: this.props.left ? buttonWidth * this.props.left.length : 0,
                btnsRightWidth: this.props.right ? buttonWidth * this.props.right.length : 0,
                swiping: true,
                timeStart: new Date().getTime()
            })
        })
    }

    _handlePanResponderMove = (e, gestureState) =>{
        if (this.props.disabled) return
        var posX = gestureState.dx
        var posY = gestureState.dy
        var leftWidth = this.state.btnsLeftWidth
        var rightWidth = this.state.btnsRightWidth
        if (this.state.openedRight) var posX = gestureState.dx - rightWidth
        else if (this.state.openedLeft) var posX = gestureState.dx + leftWidth

        //  prevent scroll if moveX is true
        var moveX = Math.abs(posX) > Math.abs(posY)
        if (this.props.scroll) {
            if (moveX) this.props.scroll(false)
            else this.props.scroll(true)
        }
        if (this.state.swiping) {
            //  move content to reveal swipeout
            if (posX < 0 && this.props.right) {
                this.setState({ contentPos: Math.min(posX, 0) })
            } else if (posX > 0 && this.props.left) {
                this.setState({ contentPos: Math.max(posX, 0) })
            }
        }
    }

    _handlePanResponderEnd=(e, gestureState) =>{
        if (this.props.disabled) return
        var posX = gestureState.dx
        var contentPos = this.state.contentPos
        var contentWidth = this.state.contentWidth
        var btnsLeftWidth = this.state.btnsLeftWidth
        var btnsRightWidth = this.state.btnsRightWidth

        //  minimum threshold to open swipeout
        var openX = contentWidth * 0.33

        //  should open swipeout
        var openLeft = posX > openX || posX > btnsLeftWidth / 2
        var openRight = posX < -openX || posX < -btnsRightWidth / 2

        //  account for open swipeouts
        if (this.state.openedRight) var openRight = posX - openX < -openX
        if (this.state.openedLeft) var openLeft = posX + openX > openX

        //  reveal swipeout on quick swipe
        var timeDiff = new Date().getTime() - this.state.timeStart < 200
        if (timeDiff) {
            var openRight = posX < -openX / 10 && !this.state.openedLeft
            var openLeft = posX > openX / 10 && !this.state.openedRight
        }

        if (this.state.swiping) {
            if (openRight && contentPos < 0 && posX < 0) {
                this._open(-btnsRightWidth, "right")
            } else if (openLeft && contentPos > 0 && posX > 0) {
                this._open(btnsLeftWidth, "left")
            } else {
                this._close()
            }
        }

        //  Allow scroll
        if (this.props.scroll) this.props.scroll(true)
    }

    _tweenContent(state, endValue) {
        let that = this
        that.tweenState(state, {
            easing: tweenState.easingTypes.easeInOutQuad,
            duration: endValue === 0 ? this.state.tweenDuration * 1.5 : this.state.tweenDuration,
            endValue: endValue
        })
    }

    _rubberBandEasing(value, limit) {
        if (value < 0 && value < limit) return limit - Math.pow(limit - value, 0.85)
        else if (value > 0 && value > limit) return limit + Math.pow(value - limit, 0.85)
        return value
    }

    //  close swipeout on button press
    _autoClose(btn) {
        if (this.state.autoClose) this._close()
        var onPress = btn.onPress
        if (onPress) onPress()
    }

    _open(contentPos, direction) {
        const left = direction === "left"
        const { sectionID, rowID, onOpen } = this.props
        onOpen && onOpen(sectionID, rowID, direction)
        this._tweenContent.bind(this, "contentPos", contentPos)
        this.setState({
            contentPos,
            openedLeft: left,
            openedRight: !left,
            swiping: false
        })
    }

    _close() {
        const { sectionID, rowID, onClose } = this.props
        if (onClose && (this.state.openedLeft || this.state.openedRight)) {
            const direction = this.state.openedRight ? "right" : "left"
            onClose(sectionID, rowID, direction)
        }
        this._tweenContent.bind(this, "contentPos", 0)
        this._callOnClose()
        this.setState({
            openedRight: false,
            openedLeft: false,
            swiping: false
        })
    }

    _callOnClose() {
        if (this.props.onClose) this.props.onClose(this.props.sectionID, this.props.rowID)
    }

    _callOnOpen() {
        if (this.props.onOpen) this.props.onOpen(this.props.sectionID, this.props.rowID)
    }

    _openRight() {
        this.refs.swipeoutContent.measure((ox, oy, width, height) => {
            let btnWidth = this.props.buttonWidth || width / 5

            this.setState(
                {
                    btnWidth,
                    btnsRightWidth: this.props.right ? btnWidth * this.props.right.length : 0
                },
                () => {
                    this._tweenContent.bind(this, "contentPos", -this.state.btnsRightWidth)
                    this._callOnOpen()
                    this.setState({
                        contentPos: -this.state.btnsRightWidth,
                        openedLeft: false,
                        openedRight: true,
                        swiping: false
                    })
                }
            )
        })
    }

    _openLeft() {
        this.refs.swipeoutContent.measure((ox, oy, width, height) => {
            let btnWidth = this.props.buttonWidth || width / 5

            this.setState(
                {
                    btnWidth,
                    btnsLeftWidth: this.props.left ? btnWidth * this.props.left.length : 0
                },
                () => {
                    this._tweenContent.bind(this, "contentPos", this.state.btnsLeftWidth)
                    this._callOnOpen()
                    this.setState({
                        contentPos: this.state.btnsLeftWidth,
                        openedLeft: true,
                        openedRight: false,
                        swiping: false
                    })
                }
            )
        })
    }

    render() {

        console.log("swipeout...render...")
        var contentWidth = this.state.contentWidth
        // var posX = getTweeningValue("contentPos")
        var posX = this.state.contentPos

        var styleSwipeout = [styles.swipeout, this.props.style]
        if (this.props.backgroundColor) {
            styleSwipeout.push([{ backgroundColor: this.props.backgroundColor }])
        }

        var limit = -this.state.btnsRightWidth
        if (posX > 0) var limit = this.state.btnsLeftWidth

        var styleLeftPos = {
            left: {
                left: 0,
                overflow: "hidden",
                width: Math.min(limit * (posX / limit), limit)
            }
        }
        var styleRightPos = {
            right: {
                left: Math.abs(contentWidth + Math.max(limit, posX)),
                right: 0
            }
        }
        var styleContentPos = {
            content: {
                left: this._rubberBandEasing(posX, limit)
            }
        }

        var styleContent = [styles.swipeoutContent]
        styleContent.push(styleContentPos.content)

        var styleRight = [styles.swipeoutBtns]
        styleRight.push(styleRightPos.right)

        var styleLeft = [styles.swipeoutBtns]
        styleLeft.push(styleLeftPos.left)

        var isRightVisible = posX < 0
        var isLeftVisible = posX > 0

        console.log(styleSwipeout)
        console.log(styleContent)
        console.log(styleRight)

        console.log("swipeout...render.......end....")

        return (
            <View style={styleSwipeout}>
                <View
                    ref="swipeoutContent"
                    style={styleContent}
                    onLayout={this._onLayout.bind(this)}
                    {...this._panResponder.panHandlers}
                >
                    {this.props.children}
                </View>

                {this._renderButtons(this.props.right, isRightVisible, styleRight)}
                {this._renderButtons(this.props.left, isLeftVisible, styleLeft)}
            </View>
        )
    }

    _onLayout(event) {
        let that = this
        var { width, height } = event.nativeEvent.layout
        console.log(`width:${width}   height:${height}`)
        that.setState({
            contentWidth: width,
            contentHeight: height
        })
    }

    _renderButtons(buttons, isVisible, style) {
        console.log("sssss......")
        console.log(style)
        console.log("sssss..........end.")
        if (buttons && isVisible) {
            return <View style={style}>{buttons.map(this._renderButton.bind(this))}</View>
        } else {
            return <View />
        }
    }

    _renderButton(btn, i) {
        let that = this
        return (
            <SwipeoutBtn
                backgroundColor={btn.backgroundColor}
                color={btn.color}
                component={btn.component}
                disabled={btn.disabled}
                height={that.state.contentHeight}
                key={i}
                onPress={() => that._autoClose(btn)}
                text={btn.text}
                type={btn.type}
                underlayColor={btn.underlayColor}
                width={that.state.btnWidth}
            />
        )
    }
}
