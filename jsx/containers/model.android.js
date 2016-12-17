'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import Spinner from 'react-native-loading-spinner-overlay';
import {ModelActions} from '../actions/index';
import {ElementCSS,ModelCSS} from '../styles/index';
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
import utils from '../lib/utils';


class Model extends Component {
    static propTypes = {
        modelDetail: PropTypes.instanceOf(Immutable.Map),
        modelDetailListLength: PropTypes.number,
    };

    static defaultProps = {
        modelDetail: Immutable.Map(),
        modelDetailListLength: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            modelDetail: props.modelDetail,
            visible: true,
            isNew: true
        };
    }

    componentWillMount() {
        this.props.ModelActions.getModelDetail(this.props.id);
        setTimeout(() => {
            if(this.state.visible){
                this.setState({
                    visible: false
                });
            }
        }, 3000);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.isNew){
            if (this.props.modelDetailListLength !== nextProps.modelDetailListLength ||
                !Immutable.is(this.props.modelDetail, nextProps.modelDetail)
            ) {
                this.setState({modelDetail: nextProps.modelDetail})
                setTimeout(() => {
                    if(this.state.visible){
                        this.setState({
                            visible: false
                        });
                    }
                }, 500);
            }
        }
    }

    componentWillUnmount(){
        this.props.ModelActions.deleteModelDetail();
    };

    renderAlbumList() {
        let rowViews = null,
            that = this;
        if(this.state.modelDetail.get('albums')){
            rowViews = this.state.modelDetail.get('albums').map((album,index)=>{
                var cover = {uri: album.get('cover')};
                if(!album.get('cover') || album.get('cover').indexOf('http') < 0){
                    cover = null;
                }
                return (
                    <TouchableOpacity  key={index}  onPress={that.goAlbum.bind(that, album)}>
                        <Image
                            resizeMode={Image.resizeMode.cover}
                            style={ElementCSS.itemImage}
                            source={cover}>
                            <View style={ElementCSS.itemContent}>
                                <View>
                                    <Text numberOfLines={1} style={ElementCSS.nameText}>{album.get('name')}</Text>
                                </View>
                                <Image
                                    resizeMode={Image.resizeMode.stretch}
                                    style={ElementCSS.roundBg}
                                    source={require('../images/common/roundBg.png')}>
                                    <Text style={ElementCSS.picNumText}>{album.get('picNum')} pic</Text>
                                </Image>
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
            });
        }
        return rowViews;
    }

    goAlbum(album) {
        this.setState({isNew: false});
        let title = album.get('name').length> 11?
        album.get('name').slice(0,11) + '...'
            :
            album.get('name');
        Actions.album({data: album,title, hideNavBar:false});
    }

    goModelDetail(model){
        this.setState({isNew: false});
        Actions.model({id:model.get('_id')});
    }

    renderModelMore() {
        let rowViews = null,
            that = this;
        if(this.state.modelDetail.get('relatedPerson')){
            rowViews = this.state.modelDetail.get('relatedPerson').map((model,index)=>{
                var width = (Dimensions.get('window').width - 20*2)/3 - 10;
                let thumbnail = {uri: model.get('thumbnail')};
                if(! model.get('thumbnail') || model.get('thumbnail').indexOf('http') < 0){
                    thumbnail = null;
                }
                return (
                    <TouchableOpacity key={index} onPress={that.goModelDetail.bind(that, model)} >
                        <View  style={ModelCSS.modelMoreItem}>
                            <Image
                                resizeMode={Image.resizeMode.stretch}
                                style={{width:width, height:width,backgroundColor:'#d2d2d2'}}
                                source={thumbnail}>
                            </Image>
                            <View style={ModelCSS.modelMoreName}>
                                <Text style={ModelCSS.modelMoreNameText}>{model.get('name')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
        }
        return rowViews;
    }

    render() {
        let cover = {uri: this.state.modelDetail.get('cover')};
        if(!this.state.modelDetail.get('cover') || this.state.modelDetail.get('cover').indexOf('http') < 0){
            cover = null;
        }
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <Spinner visible={this.state.visible} />
                <View style={[ModelCSS.topView,{width:Dimensions.get('window').width}]}/>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Image
                        resizeMode={Image.resizeMode.cover}
                        style={[ModelCSS.topCover,{width:Dimensions.get('window').width}]}
                        source={cover} >
                        <TouchableOpacity onPress={()=>{Actions.pop()}}>
                            <Image
                                resizeMode={Image.resizeMode.stretch}
                                style={ModelCSS.backBt}
                                source={require('../images/model/backBt.png')}>
                            </Image>
                        </TouchableOpacity>
                    </Image>
                    <View style={ModelCSS.modelName}>
                        <Text style={ModelCSS.modelNameText}>{this.props.modelDetail.get('name')}</Text>
                    </View>
                    <View style={ModelCSS.modelDesc}>
                        <Text style={ModelCSS.modelDescText}>{this.props.modelDetail.get('profileDesc')}</Text>
                    </View>
                    <View style={ModelCSS.modelAlbum}>
                        <View style={ModelCSS.albumLineView}/>
                        <View style={ModelCSS.modelAlbumMiddle}>
                            <Text style={ModelCSS.modelAlbumText}>个人专辑</Text>
                        </View>
                        <View style={ModelCSS.albumLineView}/>
                    </View>
                    <View style={ModelCSS.modelAlbumList}>
                        {this.renderAlbumList()}
                    </View>
                    <View style={ModelCSS.modelMore}>
                        <View style={[ModelCSS.moreLineView,{width:Dimensions.get('window').width/2 - 61}]}/>
                        <View style={ModelCSS.modelMoreMiddle}>
                            <Text style={ModelCSS.modelMoreText}>相关模特</Text>
                        </View>
                        <View style={[ModelCSS.moreLineView,{width:Dimensions.get('window').width/2 - 61}]}/>
                    </View>
                    <View style={ModelCSS.modelMoreList}>
                        {this.renderModelMore()}
                    </View>
                </ScrollView>

            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        modelDetail: state.model.modelDetailList.last(),
        modelDetailListLength: state.model.modelDetailList.size
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ModelActions: bindActionCreators(ModelActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Model);
