/**
 * Created by dingle on 2017/3/31.
 */
import React, {Component, PureComponent}from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    Platform
} from 'react-native';


class DLPicker extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            scrollIndexF: this.props.selectedIndex
        }
    }

    static propTypes = {
        data: PropTypes.array,
        itemHeight: PropTypes.number.isRequired,
        onSelectedItem: PropTypes.func.isRequired,
        selectedIndex: PropTypes.number
    };


    componentDidMount() {
        this.scrollToIndex(this.props.selectedIndex);
    }

    scrollToIndex(selectedIndex) {

        let contentOffsetY = (selectedIndex) * this.props.itemHeight;

        InteractionManager.runAfterInteractions(() => {
            //先判断scrollView创建好了没，再去滚动，防止点击太快导致的bug
            this._scrollView&&this._scrollView.scrollTo({x: 0, y: contentOffsetY, animated: true});

        });
    }

    render() {

        let items = this.loadHolderViews();
        items.push(this.props.data.map((data, index) => {
            let dif = Math.abs(index - this.state.scrollIndexF);
            let itemOpacity = 1 - dif * 0.2;
            let scale = 1 - dif * 0.1;

            return (
                <View key={index} style={[styles.itemStyle, {height: this.props.itemHeight, opacity: itemOpacity}]}>
                    <Text style={[styles.itemLabelStyle, {transform: [{scale: scale}]}]}
                          allowFontScaling={false}>{data.label || data}</Text>
                </View>
            )
        }));

        items.push(this.loadHolderViews());

        return (
            <ScrollView ref={(scrollView) => {this._scrollView = scrollView}}
                        onScroll={this._onScroll.bind(this)}
                        scrollEventThrottle={50}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={this.props.itemHeight}
                        snapToAlignment={'center'}
                        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                        onScrollEndDrag={this._onScrollEndDrag.bind(this)}
            >
                {items}
            </ScrollView>
        )

    }

    loadHolderViews() {
        let views = [1, 2, 3].map((v, i) => {
            return (
                <View key={i} style={[styles.itemStyle, {height: this.props.itemHeight}]}/>
            )
        });

        return views;
    }

    _onScroll(e) {
        let contentOffsetY = e.nativeEvent.contentOffset.y;
        // let scrollHeight = e.nativeEvent.layoutMeasurement.height;
        let itemHeight = this.props.itemHeight;
        let itemIndexF = contentOffsetY / itemHeight;
        this.setState({
            scrollIndexF: itemIndexF
        });
    }


    _onMomentumScrollEnd(e) {
        this.scrollEndTodo(e);
    }

    _onScrollEndDrag(e) {
        if (Platform.OS == 'android') {
            this.scrollEndTodo(e);
        }
    }

    scrollEndTodo(e) {

        let itemHeight = this.props.itemHeight;
        let itemIndex = Math.round(e.nativeEvent.contentOffset.y / itemHeight);

        if (Platform.OS == 'android') {
            this._scrollView.scrollTo({x: 0, y: itemIndex * itemHeight, animated: true});
        }

        if (itemIndex < this.props.data.length) {
            let itemData = this.props.data[itemIndex];
            if (itemData && typeof (itemData.value) === 'number') {
                this.props.onSelectedItem(itemData);
            }else {
                if(__DEV__){
                    console.log('异常')
                }
            }
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    itemStyle: {
        borderColor: '#000000',
        justifyContent: 'center'
    },
    itemLabelStyle: {
        fontSize: 20,
        color: '#121212',
        textAlign: 'center'
    }


});

export default DLPicker
