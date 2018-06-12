/**
 * Created by dingle on 2017/7/3.
 */
import React from 'react'
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import BMIcon from '/modules/bm-icon'
import {MainStyle} from '/configs';

import {BasePureComponent} from '/base'

let searchBarHeight = 50;
let searchBarSpace = 10;
let borderRadius = (searchBarHeight - searchBarSpace) * 0.5;

class SearchBar extends BasePureComponent {


    static defaultProps = {
        placeholder:'',  //提示词
        text:'', //输入框内容
    };

    static propTypes = {

        textChangeAction: PropTypes.func, // 文字改变事件回调函数  传参为当前输入框中的文字
        searchAction: PropTypes.func, // 搜索按钮点击事件回调函数  传参为当前输入框中的文字
        placeholder: PropTypes.string,  //搜索提示词
        text:PropTypes.string,  //搜索框内容
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        };
        this.textChangeAction = this.textChangeAction.bind(this);
        this.searchAction = this.searchAction.bind(this);
    }

    // selectionColor = {MainStyle.font.color.color6} 设置光标颜色。

    render() {
        return (
            <View style={[this.props.style,styles.container]}>
                <View style={styles.borderViewStyle}>
                    <TouchableOpacity style={styles.searchBtnStyle}
                                      activeOpacity={0.5} onPress={this.searchAction}>
                        <BMIcon icon = {0xe64b}
                                style={{
                                    marginTop : 2,
                                    color:MainStyle.font.color.color4,
                                    fontSize:MainStyle.font.size.size16
                                    }}/>
                    </TouchableOpacity>

                    <TextInput style={styles.textInputStyle}
                               placeholder={this.props.placeholder}
                               underlineColorAndroid="transparent"
                               autoCapitalize='none'
                               onChangeText={this.textChangeAction}
                               maxLength={15}
                               onSubmitEditing={this.searchAction}
                               value={this.state.text}
                               returnKeyType='search'
                               selectTextOnFocus={true}
                               allowFontScaling={false}/>
                    {this.state.text?
                        <TouchableOpacity
                            style={styles.searchBtnStyle}
                            activeOpacity={0.5}
                            onPress={()=>this._clearAction()}>
                        <BMIcon icon = {0xe64a} style={{color:MainStyle.font.color.color4,fontSize:MainStyle.font.size.size12}}/>
                    </TouchableOpacity> : null
                    }
                </View>
                {/*<TouchableOpacity style={styles.searchCancelBtnStyle}*/}
                                  {/*activeOpacity={0.5}*/}
                                  {/*onPress={this.searchCancelAction}>*/}
                    {/*<Text>取消</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }

    _clearAction(){
        this.setState({
            text:''
        });
        this.props.searchAction && this.props.searchAction("");
    }

    textChangeAction(text) {
        this.setState({
            text
        });
        this.props.textChangeAction && this.props.textChangeAction(text);
    }

    searchAction() {
        this.props.searchAction && this.props.searchAction(this.state.text);
    }

    searchCancelAction() {
        console.log("点击取消按钮.....")
    }
}

const styles = StyleSheet.create({
    container: {
        // marginTop : 20 * 0.5,
        // height: 62 * 0.5,
        // width : 590 * 0.5,
        // marginLeft : 32 * 0.5,
        // paddingHorizontal: 20,
        // backgroundColor: '#ffffff',
        // borderRadius : 25

        // paddingBottom: searchBarSpace,

        flexDirection : "row"

    },
    textInputStyle: {
        flex: 1,
        padding: 0,
        paddingTop : 2,
        // paddingLeft: 8,
        fontSize: 16,
        color: '#999999',
        paddingLeft : -5,
        fontFamily:"PingFangSC-Regular"
    },
    borderViewStyle: {
        marginTop : 10,
        width : MainStyle.device.width - 20,
        height : 31,
        marginLeft :  10,
        backgroundColor: '#FFFFFF',
        borderRadius: borderRadius,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    searchBtnStyle: {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchCancelBtnStyle : {
        marginTop : 35 * 0.5,
        marginLeft : 32 * 0.5,
        fontFamily : "PingFangSC Regular",
        color : "#999999",
        fontSize : 32 * 0.5
    }

});

export default SearchBar;
