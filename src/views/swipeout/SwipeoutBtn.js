import tweenState from 'react-tween-state';
import NativeButton from './NativeButton';
import styles from './styles';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import {
    PanResponder,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    ViewPropTypes,
} from 'react-native';
import {NavigationComponent} from '../../base';

export default class SwipeoutBtn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            backgroundColor: null,
            color: null,
            component: null,
            underlayColor: null,
            height: 0,
            onPress: null,
            disabled: false,
            text: 'Click me',
            type: '',
            width: 0,
        }
    }

    // propTypes: {
    //     backgroundColor: PropTypes.string,
    //     color: PropTypes.string,
    //     component: PropTypes.node,
    //     onPress: PropTypes.func,
    //     text: PropTypes.node,
    //     type: PropTypes.string,
    //     underlayColor: PropTypes.string,
    // },

    // getDefaultProps() {
    //     return {
    //         backgroundColor: null,
    //         color: null,
    //         component: null,
    //         underlayColor: null,
    //         height: 0,
    //         onPress: null,
    //         disabled: false,
    //         text: 'Click me',
    //         type: '',
    //         width: 0,
    //     };
    // }

    render() {
        var btn = this.props;

        var styleSwipeoutBtn = [styles.swipeoutBtn];

        //  apply "type" styles (delete || primary || secondary)
        if (btn.type === 'delete') styleSwipeoutBtn.push(styles.colorDelete);
        else if (btn.type === 'primary') styleSwipeoutBtn.push(styles.colorPrimary);
        else if (btn.type === 'secondary') styleSwipeoutBtn.push(styles.colorSecondary);

        //  apply background color
        if (btn.backgroundColor) styleSwipeoutBtn.push([{ backgroundColor: btn.backgroundColor }]);

        styleSwipeoutBtn.push([{
            height: btn.height,
            width: btn.width,
        }]);

        var styleSwipeoutBtnComponent = [];

        //  set button dimensions
        styleSwipeoutBtnComponent.push([{
            height: btn.height,
            width: btn.width,
        }]);

        var styleSwipeoutBtnText = [styles.swipeoutBtnText];

        //  apply text color
        if (btn.color) styleSwipeoutBtnText.push([{ color: btn.color }]);

        return  (
            <NativeButton
                onPress={this.props.onPress}
                underlayColor={this.props.underlayColor}
                disabled={this.props.disabled}
                style={[styles.swipeoutBtnTouchable, styleSwipeoutBtn]}
                textStyle={styleSwipeoutBtnText}>
                {
                    (btn.component ?
                            <View style={styleSwipeoutBtnComponent}>{btn.component}</View>
                            :
                            btn.text
                    )
                }
            </NativeButton>
        );
    }
}
