'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import {MeActions} from '../actions/index';
import {MeCSS} from '../styles/index';
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


class Vip extends Component {
    static propTypes = {
        isLogin: PropTypes.bool
    };

    static defaultProps = {
        isLogin: false
    };

    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin
        };
    }

    componentWillMount() {
        this.props.MeActions.getLoginStatus();
    }

    componentWillReceiveProps(nextProps) {
        if ( this.props.isLogin !== nextProps.isLogin) {
            this.setState({isLogin: nextProps.isLogin})
        }
    }
    
    render() {
        return (
            <View style={{flex: 1, marginTop: 58, backgroundColor:'#EEEEE0'}}>
                <View style={
                    {
                    borderBottomWidth:1,
                    marginTop: 10
                    }
                }/>
                <View>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={
                        {
                            flexDirection:'row',
                            justifyContent: 'space-between',
                            height: 40,
                            alignItems: 'center',
                            backgroundColor:'#FFFFFF',
                            paddingLeft:10,
                            paddingRight:10
                        }}>
                            <Text>我的会员</Text>
                            <View>
                                <Text>11月30日到期</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={
                                {
                                borderBottomWidth:1,
                                borderColor:'#A2B5CD',
                                marginLeft:10
                                }
                            }/>
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={{
                            flexDirection:'row',
                            paddingLeft:10,
                            paddingRight:10,
                            height: 40,
                            alignItems: 'center',
                            backgroundColor:'#FFFFFF'
                        }}>
                            <Text>我购买过得图片</Text>
                            <View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'center',
                    height: 40,
                    alignItems: 'center',
                    backgroundColor:'#FFFFFF',
                    marginTop:20
                }}>
                    {
                        this.state.isLogin?
                            <TouchableOpacity onPress={()=>{}}>
                                <View>
                                    <Text>退出登录</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>{}}>
                                <View>
                                    <Text>登录</Text>
                                </View>
                            </TouchableOpacity>
                    }
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
        MeActions: bindActionCreators(MeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Vip);
