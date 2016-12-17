'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import {LoginActions,MeActions} from '../actions/index';
import {RegisterCSS} from '../styles/index';
import Toast from '../components/rnRootToast/index';
import WeChat from '../lib/react-native-wechat';
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
    TextInput,
    NativeModules,
    NativeAppEventEmitter
} from 'react-native';

var ReactMethod = NativeModules.ReactMethod;

class Login extends Component {
    static propTypes = {
        errResult: PropTypes.instanceOf(Immutable.Map),
        userInfo: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        errResult: Immutable.Map(),
        userInfo: Immutable.Map()
    };

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            passWd: ''
        };
    }

    async componentWillMount() {
        try {
            await WeChat.registerApp('wxdfa578473977cc42');
        } catch (e) {
            console.error(e);
        }
    }

    componentWillUnmount(){
    };

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(this.props.errResult, nextProps.errResult)) {
            Toast.show(nextProps.errResult.get('msg'), {
                duration: Toast.durations.SHORT,
                position: 58,
                shadow: false,
                animation: true,
                hideOnPress: true,
                delay: 100,
                style:{
                    width:Dimensions.get('window').width,
                    height:30,
                    padding: 0,
                    backgroundColor:'#87CEFA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal:0
                },
                textStyle: {
                    fontSize: 13,
                    color:'#ffffff'
                }
            });
        }
        if (!Immutable.is(this.props.userInfo, nextProps.userInfo)) {
            this.props.MeActions.setLocalUserInfo(nextProps.userInfo);
            Actions.pop({popNum:2});
        }
    }

    login(){
        this.props.LoginActions.login(this.state.account,this.state.passWd);
    }

    wxLogin(){
        WeChat.sendAuthRequest('snsapi_userinfo','lucky').then(
            (resp) => {
                console.log(resp);
                if(resp.errCode === 0 && resp.state === 'lucky'){
                    this.props.LoginActions.thirdPartyLogin(2,resp.code);
                }
            }
        ).catch((error)=> {
            console.log(error)
        });
    }

    qqLogin(){
    }
    
    render() {
        return (
            <View style={RegisterCSS.container}>
                <View style={[RegisterCSS.registerLine,{marginTop: 10}]}/>
                <View style={RegisterCSS.registerView}>
                    <View style={RegisterCSS.registerItemView}>
                        <View style={RegisterCSS.leftView}>
                            <Text style={RegisterCSS.itemText}>账号:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={RegisterCSS.textInput}
                                placeholder="请输入账号"
                                onChangeText={(text) => {
                                    this.setState({account:text})
                                }}
                            />
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
                                placeholder="请输入密码"
                                onChangeText={(text) => {
                                    this.setState({passWd:text})
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={RegisterCSS.registerLine}/>
                <TouchableOpacity onPress={this.login.bind(this)}>
                    <View style={RegisterCSS.registerButton}>
                        <Text style={RegisterCSS.buttonText}>登录</Text>
                    </View>
                </TouchableOpacity>
                <View style={[RegisterCSS.thirdPartyView,{marginTop: Dimensions.get('window').height-348}]}>
                    <TouchableOpacity onPress={this.qqLogin.bind(this)}>
                        <View style={[RegisterCSS.thirdPartyItem,{backgroundColor:'#2d8bde'}]}>
                            <Text style={RegisterCSS.thirdPartyItemText}>使用QQ登录</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.wxLogin.bind(this)}>
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
        errResult: state.errorInfo.errResult,
        userInfo: state.login.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        LoginActions: bindActionCreators(LoginActions, dispatch),
        MeActions: bindActionCreators(MeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
