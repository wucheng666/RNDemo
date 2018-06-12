import React, {Component} from "react"
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {MainStyle} from "/configs"
import {NavigationComponent} from "/base"
import BMIcon from "/modules/bm-icon"

export default class AddButton extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        add : ()=>{},
        describe: "",
        describeStyle : {}, //描述的样式
        iconStyle : {}, //icon的样式
        bmIconStyle : {}, //BMIcon的样式
        style: {}
    }

    componentDidMount() {}

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.add()
                }}
            >
                <View style={[styles.main, this.props.style]}>
                    <View style={[styles.icon, this.props.iconStyle]}>
                        <BMIcon
                            style={{
                                color: "white",
                                fontSize: MainStyle.font.size.size14,
                                ...this.props.bmIconStyle
                            }}
                            icon={0xe644}
                        />
                    </View>
                    <Text style={[styles.text, this.props.describeStyle]}>{this.props.describe}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        height: 60,
        backgroundColor: MainStyle.background.color.assit3,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 16,
        width: 25,
        height: 25,
        backgroundColor: MainStyle.background.color.assit11,
        borderRadius: 50,

        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        marginLeft: 12,
        fontSize: MainStyle.font.size.size16,
        fontFamily: MainStyle.font.family.regular,
        color: MainStyle.font.color.color12
    }
})
