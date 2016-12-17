'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import moment from 'moment';
import {MeActions} from '../actions/index';
import {MeCSS} from '../styles/index';
import Toast from '../components/rnRootToast/index';
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
    Modal
} from 'react-native';


class Me extends Component {
    static propTypes = {
        userInfo: PropTypes.instanceOf(Immutable.Map),
        localUserInfo: PropTypes.instanceOf(Immutable.Map),
        errAuth: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        userInfo: Immutable.Map(),
        localUserInfo: Immutable.Map(),
        errAuth: Immutable.Map()
    };

    constructor(props) {
        super(props);
        this.state = {
            localUserInfo: props.localUserInfo
        };
    }

    componentWillMount() {
        this.props.MeActions.getUserInfo();
        this.props.MeActions.getLocalUserInfo();
    }

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(this.props.userInfo, nextProps.userInfo)) {
            this.props.MeActions.setLocalUserInfo(nextProps.userInfo);
        }
        if(!Immutable.is(this.props.localUserInfo, nextProps.localUserInfo)){
            this.setState({localUserInfo:nextProps.localUserInfo})
        }
        if(!Immutable.is(this.props.errAuth, nextProps.errAuth)){
            this.props.MeActions.setLocalUserInfo(Immutable.Map());
            Toast.show(nextProps.errAuth.get('msg'), {
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
    }

    logout(){
        this.props.MeActions.logout();
        this.props.MeActions.setLocalUserInfo(Immutable.Map());
    }
    
    render() {
        let vipEndTime = '';
        if(this.state.localUserInfo.get('vipEndTime')
            && moment(this.state.localUserInfo.get('vipEndTime')).format('YYYYMMDD') >= moment().format('YYYYMMDD')){
            vipEndTime = moment(this.state.localUserInfo.get('vipEndTime')).format('YYYY年MM月DD日');
        }
        return (
            <View style={MeCSS.container}>
                <View style={MeCSS.itemsView}>
                    <View style={MeCSS.lineView}/>
                    <TouchableOpacity onPress={()=>{Actions.vip()}}>
                        <View style={MeCSS.vipView}>
                            <Text>我的会员: {this.state.localUserInfo.get('account')}</Text>
                            <View style={MeCSS.vipRightView}>
                                {
                                    vipEndTime.length>0?
                                        <Text style={MeCSS.vipDuration}>{vipEndTime}到期</Text>
                                        :
                                        <Text style={[MeCSS.vipDuration,{color:'#ff6600'}]}>未开通</Text>
                                }
                                <Image
                                    resizeMode={Image.resizeMode.stretch}
                                    style={MeCSS.arrowImage}
                                    source={require('../images/me/arrow.png')}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={MeCSS.lineView}/>
                </View>
                {
                    this.state.localUserInfo.get('account')?
                        <TouchableOpacity onPress={this.logout.bind(this)}>
                            <View style={MeCSS.loginView}>
                                <Text style={MeCSS.buttonText}>退出登录</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=>{Actions.register()}}>
                            <View style={MeCSS.loginView}>
                                <Text style={MeCSS.buttonText}>登录 / 注册</Text>
                            </View>
                        </TouchableOpacity>
                }

            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        userInfo: state.me.userInfo,
        localUserInfo: state.me.localUserInfo,
        errAuth: state.errorInfo.errAuth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        MeActions: bindActionCreators(MeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);
