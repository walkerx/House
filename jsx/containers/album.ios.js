'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import async from 'async'
import Spinner from 'react-native-loading-spinner-overlay';
import {AlbumActions} from '../actions/index';
import AutoResponisve from 'autoresponsive-react-native';
import {AlbumCSS,ElementCSS,RouteCSS} from '../styles/index';
import { BlurView } from 'react-native-blur';
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
    StatusBar
} from 'react-native';
import utils from '../lib/utils';


class Album extends Component {
    static propTypes = {
        albumDetail: PropTypes.instanceOf(Immutable.Map),
        moreList: PropTypes.instanceOf(Immutable.List),
        albumDetailListLength: PropTypes.number,
        albumMoreListLength: PropTypes.number,
        data: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        albumDetail: Immutable.Map(),
        moreList: Immutable.List(),
        albumDetailListLength: 0,
        albumMoreListLength: 0,
        data: Immutable.Map()
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        this.state = {
            album: props.albumDetail,
            dataSource: ds.cloneWithRows(props.moreList.toArray()),
            ratioArr: [],  //图片高宽比
            visible: true,
            isNew: true,
            moreShow: false
        };
    }

    componentWillMount() {
        this.props.AlbumActions.getAlbumDetail(this.props.data.get('_id'));
        this.props.AlbumActions.getAlbumMore(this.props.data.get('_id'), 10, 0);
        setTimeout(() => {
            if(this.state.visible){
                this.setState({visible: false});
            }
        }, 20000);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.isNew){
            if (this.props.albumDetailListLength !== nextProps.albumDetailListLength ||
                !Immutable.is(this.props.albumDetail, nextProps.albumDetail)
            ) {
                if(nextProps.albumDetail.get('girl')){
                    Actions.refresh({rightTitle:'模特详情',onRight:function(){
                        Actions.model({id:nextProps.albumDetail.get('girl')});
                    }})
                }
                this.setState({album: nextProps.albumDetail});
                if(nextProps.albumDetail && nextProps.albumDetail.get('pics')){
                    let ratioArr = [],
                        that = this,
                        pics =nextProps.albumDetail.get('pics').toArray();
                    async.each(pics, function (pic, callback) {
                        Image.getSize(pic, (width, height) => {
                            ratioArr.push(height/width);
                            return callback(null);
                        },(error)=>{
                            ratioArr.push(1);
                            return callback(error);
                        });
                    }, function (err) {
                        that.setState({ratioArr: ratioArr});
                    });
                }
            }
            if (
                this.props.albumMoreListLength !== nextProps.albumMoreListLength ||
                !Immutable.is(this.props.moreList, nextProps.moreList)
            ) {
                this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.moreList.toArray())});
            }
        }
    }

    componentWillUnmount(){
        this.props.AlbumActions.deleteAlbumDetail();
    };

    getAutoResponisveProps() {
        return {
            itemMargin: 10
        };
    }

    renderChildren() {
        let rowViews = null;
        if(
            this.state.album &&
            this.state.album.get('pics') &&
            this.state.ratioArr.length === this.state.album.get('pics').size &&
            this.state.ratioArr.length>0
        ){
            let that = this;
            rowViews = that.state.album.get('pics').map((pic,index)=>{
                let width = (Dimensions.get('window').width - 30) / 2,
                    height = parseInt(width * this.state.ratioArr[index]);
                var cover = {uri: pic};
                if(!pic || pic.indexOf('http') < 0){
                    cover = null;
                }
                return(
                    <TouchableOpacity
                        style={{width:width,height:height}}
                        key={index}
                        onPress={that.showGirl.bind(that,that.state.album,index)}>
                        <Image
                            onLoadEnd={()=>{
                                if(this.state.visible){
                                    this.setState({moreShow: true,visible: false});
                                }
                            }}
                            resizeMode={Image.resizeMode.cover}
                            style={{width:width,height:height,backgroundColor:'#d2d2d2'}}
                            source={cover} >
                                {
                                    !that.state.album.get('isVip') && index === that.state.album.get('pics').size-1?
                                        <BlurView blurType="light" blurAmount={8} style={[{width:width,height:height},AlbumCSS.blurView]}>
                                            <Text style={AlbumCSS.blurViewText}>未解锁{that.state.album.get('unlock')}张图片</Text>
                                        </BlurView>
                                        :
                                        null
                                }
                        </Image>
                    </TouchableOpacity>
                )
            });
        }
        return rowViews;
    }

    goAlbum(dataRow) {
        this.setState({isNew: false});
        let title = dataRow.get('name').length> 11?
            dataRow.get('name').slice(0,11) + '...'
            :
            dataRow.get('name');
        Actions.album({data: dataRow,title});
    }

    renderRow(dataRow) {
        let cover = {uri: dataRow.get('cover')};
        if(!dataRow.get('cover') || dataRow.get('cover').indexOf('http') < 0){
            cover = null;
        }
        return (
            <TouchableOpacity onPress={this.goAlbum.bind(this, dataRow)}>
                {
                    this.state.moreShow?
                        <Image
                            resizeMode={Image.resizeMode.cover}
                            style={[ElementCSS.itemImage,{width:Dimensions.get('window').width-26,height: parseInt(utils.getDeviceRatio()*214) }]}
                            source={cover}>
                            <View style={[ElementCSS.itemContent,{height: parseInt(utils.getDeviceRatio()*214)}]}>
                                <View>
                                    <Text numberOfLines={1} style={[ElementCSS.nameText,{fontSize: parseInt(utils.getDeviceRatio() * 20)}]}>{dataRow.get('name')}</Text>
                                </View>
                                <Image
                                    resizeMode={Image.resizeMode.stretch}
                                    style={ElementCSS.roundBg}
                                    source={require('../images/common/roundBg.png')}>
                                    <Text style={ElementCSS.picNumText}>{dataRow.get('picNum')} pic</Text>
                                </Image>
                            </View>
                        </Image>
                        :
                        null
                }
            </TouchableOpacity>
        );
    };

    showGirl(data,index){
        this.setState({isNew: false});
        if( !data.get('isVip') && index === data.get('pics').size-1){
            Actions.vip();
        }else{
            var subhead = (index + 1) + '/' + data.get('pics').size;
            Actions.showGirl({data:data, index: index,renderTitle:function(){
                return(
                    <View style={RouteCSS.showGirlTitle}>
                        <Text numberOfLines={1} style={RouteCSS.showGirlTitleText}>
                            {data.get('name')}
                        </Text>
                        <Text style={RouteCSS.showGirlTitleSubheader}>
                            {subhead}
                        </Text>
                    </View>
                )
            }})
        }

    }

    loadMore() {
        this.setState({isNew: true});
        this.props.AlbumActions.getAlbumMore(this.props.data.get('_id'), 10, this.props.moreList.size);
    }

    _renderHeader(){
        let lineWidth = (Dimensions.get('window').width - 80 - 26) / 2;
        return(
            <View>
                <View>
                    <AutoResponisve {...this.getAutoResponisveProps()}>
                        {this.renderChildren()}
                    </AutoResponisve>
                    {
                        this.state.moreShow?
                            <View style={AlbumCSS.footer}>
                                <View style={AlbumCSS.moreView}>
                                    <View style={[AlbumCSS.lineView,{width: lineWidth}]}/>
                                    <View style={AlbumCSS.moreViewMiddle}>
                                        <Text style={AlbumCSS.moreViewText}>更多专辑</Text>
                                    </View>
                                    <View style={[AlbumCSS.lineView,{width: lineWidth}]}/>
                                </View>
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={[{flex: 1},AlbumCSS.scrollView]}>
                <StatusBar
                    barStyle={'default'}
                />
                <Spinner visible={this.state.visible} />
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    showsVerticalScrollIndicator={true}
                    renderHeader={this._renderHeader.bind(this)}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={ this.loadMore.bind(this) }
                    onEndReachedThreshold={50}
                />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let moreList = Immutable.List();
    if(state.album.albumMoreList.last()){
        moreList = state.album.albumMoreList.last().get('albums');
    }
    return {
        albumDetail: state.album.albumDetailList.last(),
        moreList: moreList,
        albumDetailListLength: state.album.albumDetailList.size,
        albumMoreListLength: state.album.albumMoreList.size
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AlbumActions: bindActionCreators(AlbumActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
