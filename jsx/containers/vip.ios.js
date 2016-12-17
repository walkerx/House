'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import moment from 'moment';
import {VipActions} from '../actions/index';
import {VipCSS} from '../styles/index';
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
    Alert,
    NativeModules
} from 'react-native';

//创建原生模块实例
var ReactMethod = NativeModules.ReactMethod;

class Vip extends Component {
    static propTypes = {
        vipList: PropTypes.instanceOf(Immutable.List),
        localUserInfo: PropTypes.instanceOf(Immutable.Map),
        wxPayResult: PropTypes.instanceOf(Immutable.Map),
        aliPayResult: PropTypes.string
    };

    static defaultProps = {
        vipList: Immutable.List(),
        localUserInfo: Immutable.Map(),
        wxPayResult: Immutable.Map(),
        aliPayResult: ''
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        this.state = {
            dataSource: ds.cloneWithRows(props.vipList.toArray()),
            localUserInfo: props.localUserInfo,
            visible: false,
            vipId: '',
            payType: ''
        };
    }

    async componentWillMount() {
        this.props.VipActions.getVipList();
        // try {
        //     await WeChat.registerApp('wx8684544c6fc01fcb');
        // } catch (e) {
        //     console.error(e);
        // }
    }

    componentWillReceiveProps(nextProps) {
        if(!Immutable.is(this.props.localUserInfo, nextProps.localUserInfo)){
            this.setState({localUserInfo:nextProps.localUserInfo})
        }
        if (!Immutable.is(this.props.vipList, nextProps.vipList)) {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.vipList.toArray())});
        }
        if (!Immutable.is(this.props.wxPayResult, nextProps.wxPayResult)) {
            // ReactMethod.doWxPay(
            //     nextProps.wxPayResult.get('partnerid'),
            //     nextProps.wxPayResult.get('prepayid'),
            //     nextProps.wxPayResult.get('package'),
            //     nextProps.wxPayResult.get('noncestr'),
            //     nextProps.wxPayResult.get('timestamp'),
            //     nextProps.wxPayResult.get('sign')
            // );
        }
        if (!Immutable.is(this.props.aliPayResult, nextProps.aliPayResult)) {
            ReactMethod.doAliPay(nextProps.aliPayResult);
        }
    }

    openVip(vipId){
        if(this.state.localUserInfo.get('account')){
            this.setState({visible: true, vipId: vipId});
        }else{//未登录
            Actions.register();
        }
    }

    renderRow(dataRow,p,index) {
        return (
            <View>
                <View style={VipCSS.payItem}>
                    <View  style={VipCSS.payItemLeft}>
                        <View style={VipCSS.payItemLeftTop}>
                            <Text>{dataRow.get('name')}</Text>
                            <Text style={VipCSS.payItemLeftPrice}>¥{dataRow.get('price')}</Text>
                        </View>
                        <View>
                            <Text style={VipCSS.payItemLeftBottomText}>
                                {dataRow.get('desc')}
                            </Text>
                        </View>
                    </View>
                    {
                        dataRow.get('recommend') === 1?
                            <View style={VipCSS.payItemRight}>
                                <View style={VipCSS.payItemRightRecommend}>
                                    <Text style={VipCSS.payItemRightRecommendText}>
                                        推荐
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={this.openVip.bind(this,dataRow.get('_id'))}>
                                    <View style={VipCSS.payItemRightRecommendOpen}>
                                        {
                                            this.state.localUserInfo.get('account')
                                                && this.state.localUserInfo.get('vipEndTime')
                                                && moment(this.state.localUserInfo.get('vipEndTime')).format('YYYYMMDD') >= moment().format('YYYYMMDD')?
                                                    <Text style={VipCSS.payItemRightOpenText}>
                                                        续费
                                                    </Text>
                                                    :
                                                    <Text style={VipCSS.payItemRightOpenText}>
                                                        立即开通
                                                    </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={this.openVip.bind(this,dataRow.get('_id'))}>
                                <View style={VipCSS.payItemRightOpen}>
                                    {
                                        this.state.localUserInfo.get('account')
                                        && this.state.localUserInfo.get('vipEndTime')
                                        && moment(this.state.localUserInfo.get('vipEndTime')).format('YYYYMMDD')>= moment().format('YYYYMMDD')?
                                            <Text style={VipCSS.payItemRightOpenText}>
                                                续费
                                            </Text>
                                            :
                                            <Text style={VipCSS.payItemRightOpenText}>
                                                立即开通
                                            </Text>
                                    }
                                </View>
                            </TouchableOpacity>
                    }
                </View>
                {
                    index < this.props.vipList.size-1?
                        <View style={VipCSS.payLine}/>
                        :
                        null
                }
            </View>
        );
    };

    cancelPay(){
        this.setState({visible: false})
    }

    wxPay(){
        this.setState({payType: 'wxPay'});
        this.props.VipActions.wxPay(this.state.vipId);
    }

    aliPay(){
        this.setState({payType: 'aliPay'});
        this.props.VipActions.aliPay(this.state.vipId);
    }
    
    render() {
        return (
            <View style={VipCSS.container}>
                <Modal
                    ref="_modal"
                    transparent={true}
                    visible={this.state.visible}>
                    <View style={VipCSS.modalView}>
                        <TouchableOpacity onPress={this.wxPay.bind(this)}>
                            <View style={VipCSS.modalItem}>
                                <Text style={VipCSS.modalItemText}>微信支付</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={VipCSS.modalLine}/>
                        <TouchableOpacity onPress={this.aliPay.bind(this)}>
                            <View style={VipCSS.modalItem}>
                                <Text style={VipCSS.modalItemText}>支付宝支付</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={VipCSS.modalLine}/>
                        <TouchableOpacity onPress={this.cancelPay.bind(this)}>
                            <View style={VipCSS.modalItem}>
                                <Text style={VipCSS.modalItemText}>取消</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={VipCSS.vipDesc}>
                    <View style={VipCSS.descItem}>
                        <View style={VipCSS.descItemView}>
                            <Image
                                style={VipCSS.descItemImage}
                                resizeMode={Image.resizeMode.cover}
                                source={require('../images/vip/desc1.png')}
                            />
                            <Text style={VipCSS.descItemText1}>资源无锁</Text>
                            <Text style={VipCSS.descItemText2}>全部资源免费获取</Text>
                        </View>
                        <View style={VipCSS.descItemView}>
                            <Image
                                style={VipCSS.descItemImage}
                                resizeMode={Image.resizeMode.cover}
                                source={require('../images/vip/desc2.png')}
                            />
                            <Text style={VipCSS.descItemText1}>高清大图</Text>
                            <Text style={VipCSS.descItemText2}>高清大图免费下载</Text>
                        </View>
                    </View>
                    <View style={[VipCSS.descItem,{marginTop:18}]}>
                        <View style={VipCSS.descItemView}>
                            <Image
                                style={VipCSS.descItemImage}
                                resizeMode={Image.resizeMode.cover}
                                source={require('../images/vip/desc3.png')}
                            />
                            <Text style={VipCSS.descItemText1}>抢鲜套图</Text>
                            <Text style={VipCSS.descItemText2}>全网最新抢先看</Text>
                        </View>
                        <View style={VipCSS.descItemView}>
                            <Image
                                style={VipCSS.descItemImage}
                                resizeMode={Image.resizeMode.cover}
                                source={require('../images/vip/desc4.png')}
                            />
                            <Text style={VipCSS.descItemText1}>宽带加速</Text>
                            <Text style={VipCSS.descItemText2}>加载速度提升5倍</Text>
                        </View>
                    </View>
                </View>
                <View style={VipCSS.descLine}/>
                <View>
                    <ListView
                        style={VipCSS.vipPay}
                        enableEmptySections={true}
                        showsVerticalScrollIndicator={false}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
                <View style={VipCSS.descLine}/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        vipList: state.vip.vipList,
        localUserInfo: state.me.localUserInfo,
        wxPayResult: state.vip.wxPayResult,
        aliPayResult: state.vip.aliPayResult
    };
}

function mapDispatchToProps(dispatch) {
    return {
        VipActions: bindActionCreators(VipActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Vip);