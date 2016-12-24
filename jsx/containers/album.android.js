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
    StatusBar,
    findNodeHandle
} from 'react-native';
import utils from '../lib/utils';


class Album extends Component {
    static propTypes = {
        albumDetail: PropTypes.instanceOf(Immutable.Map),
        albumDetailListLength: PropTypes.number,
        data: PropTypes.instanceOf(Immutable.Map)
    };

    static defaultProps = {
        albumDetail: Immutable.Map(),
        albumDetailListLength: 0,
        data: Immutable.Map()
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        this.state = {
            album: props.albumDetail,
            ratioArr: [],  //图片高宽比
            visible: true,
            isNew: true,
            moreShow: false,
            viewRef: 0,
            dataSource: ds.cloneWithRows([])
        };
    }

    componentWillMount() {
        this.props.AlbumActions.getAlbumDetail(this.props.data.get('_id'));
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
                if(nextProps.albumDetail.get('moreAlbums')){
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.albumDetail.get('moreAlbums').toArray())});
                }
                this.setState({album: nextProps.albumDetail});
                if(nextProps.albumDetail.get('girl')){
                    Actions.refresh({rightTitle:'模特详情',onRight:function(){
                        Actions.model({id:nextProps.albumDetail.get('girl')});
                    }})
                }
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

    imageLoaded(isBlur) {
        if(this.state.visible){
            this.setState({moreShow: true,visible: false});
        }
        if(isBlur){
            this.setState({viewRef: findNodeHandle(this.imageRef)})
        }
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
                        activeOpacity={0.9}
                        style={{width:width,height:height}}
                        key={index}
                        onPress={that.showGirl.bind(that,that.state.album,index)}>
                        {
                            !that.state.album.get('isVip') && index === that.state.album.get('pics').size-1?
                                <Image
                                    onLoadEnd={this.imageLoaded.bind(this,true)}
                                    resizeMode={Image.resizeMode.cover}
                                    ref={(ref)=>{that.imageRef = ref}}
                                    style={{width:width,height:height,backgroundColor:'#d2d2d2'}}
                                    source={cover} >
                                        <BlurView
                                            blurRadius={10}
                                            downsampleFactor={5}
                                            overlayColor={'rgba(255, 255, 255, .25)'}
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                bottom: 0,
                                                right: 0,
                                                width:width,
                                                height:height
                                            }}
                                            viewRef={this.state.viewRef}>
                                        </BlurView>
                                        <View style={[{width:width,height:height},AlbumCSS.blurView]}>
                                            <Text style={AlbumCSS.blurViewText}>未解锁{that.state.album.get('unlock')}张图片</Text>
                                        </View>
                                </Image>
                                :
                                <Image
                                    onLoadEnd={this.imageLoaded.bind(this,false)}
                                    resizeMode={Image.resizeMode.cover}
                                    style={{width:width,height:height,backgroundColor:'#d2d2d2'}}
                                    source={cover} />
                        }
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

    renderMoreView(){
        return this.state.album.get('moreAlbums').map((dataRow,index)=>{
            let cover = {uri: dataRow.get('cover')};
            if(!dataRow.get('cover') || dataRow.get('cover').indexOf('http') < 0){
                cover = null;
            }
            return (
                <TouchableOpacity key={index} onPress={this.goAlbum.bind(this, dataRow)}>
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
                </TouchableOpacity>
            );
        });
    }

    renderRow(dataRow){
        let cover = {uri: dataRow.get('cover')};
        if(!dataRow.get('cover') || dataRow.get('cover').indexOf('http') < 0){
            cover = null;
        }
        return (
            <TouchableOpacity onPress={this.goAlbum.bind(this, dataRow)}>
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
            </TouchableOpacity>
        );
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
                />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        albumDetail: state.album.albumDetailList.last(),
        albumDetailListLength: state.album.albumDetailList.size
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AlbumActions: bindActionCreators(AlbumActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
