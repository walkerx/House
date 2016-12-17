'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import {LoginActions} from '../actions/index';
import {RegisterCSS} from '../styles/index';
import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal,
    TextInput
} from 'react-native';


class Register extends Component {
    static propTypes = {
        isLogin: PropTypes.bool
    };

    static defaultProps = {
        isLogin: false
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View style={RegisterCSS.container}>
                <View style={RegisterCSS.registerView}>
                    <View style={RegisterCSS.registerItemView}>
                        <View style={RegisterCSS.leftView}>
                            <Text style={RegisterCSS.itemText}>昵称:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={RegisterCSS.textInput}
                                placeholder="请设置账号" />
                        </View>
                    </View>
                    <View style={RegisterCSS.registerLine}/>
                    <View style={RegisterCSS.registerItemView}>
                        <View style={RegisterCSS.leftView}>
                            <Text style={RegisterCSS.itemText}>密码:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={RegisterCSS.textInput}
                                placeholder="请设置密码"
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{}}>
                    <View style={RegisterCSS.registerButton}>
                        <Text style={RegisterCSS.buttonText}>完成注册</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{Actions.login()}}>
                    <View style={RegisterCSS.tipsView}>
                        <Text style={RegisterCSS.tipsText}>已有账号,直接登录</Text>
                    </View>
                </TouchableOpacity>
                <View style={RegisterCSS.thirdPartyView}>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={[RegisterCSS.thirdPartyItem,{backgroundColor:'#2d8bde'}]}>
                            <Text style={RegisterCSS.thirdPartyItemText}>使用QQ登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={[RegisterCSS.thirdPartyItem,{backgroundColor:'#1aad19'}]}>
                            <Text style={RegisterCSS.thirdPartyItemText}>使用微信登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        isLogin: state.me.isLogin
    };
}

function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
