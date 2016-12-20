'use strict';

import React, {PropTypes, Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    ScrollView,
    RefreshControl
} from 'react-native';
import {Actions} from "react-native-router-flux";
import {IndicatorViewPager, PagerTitleIndicator} from '../components/viewpager/index';
import {Element} from './index';
import {MainCSS,ModelCSS} from '../styles/index'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {MainActions,ModelActions} from '../actions/index';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from '../components/rnRootToast/index';


class Main extends Component {

    static propTypes = {
        tagList: PropTypes.instanceOf(Immutable.List),
        modelHotList: PropTypes.instanceOf(Immutable.List),
        requestError: PropTypes.number
    };

    static defaultProps = {
        tagList: Immutable.List(),
        modelHotList: Immutable.List(),
        requestError: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            tags:  props.tagList,
            modelHotList: props.modelHotList,
            visible: true,
            errorRefreshing: false,
            requestError: props.requestError,
            errorShow: false,
            showMask: false
        }
    }

    async componentWillMount() {
        this.props.MainActions.getTagList();
        this.props.ModelActions.getHotModel();
        setTimeout(() => {
            if(this.state.visible){
                this.setState({
                    visible: false
                });
            }
        }, 3000);
    }

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(this.props.tagList, nextProps.tagList)) {
            this.setState({tags:nextProps.tagList});
        }
        if (!Immutable.is(this.props.modelHotList, nextProps.modelHotList)) {
            this.setState({modelHotList:nextProps.modelHotList});
        }
        if (!Immutable.is(this.props.requestError, nextProps.requestError)) {
            this.setState({requestError:nextProps.requestError});
            if(nextProps.requestError > 0){
                let toast = Toast.show('你的网络不给力呢~', {
                    duration: Toast.durations.LONG,
                    position: 58,
                    shadow: false,
                    animation: true,
                    hideOnPress: true,
                    delay: 100,
                    viewStyle:{
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
                setTimeout(function () {
                    Toast.hide(toast);
                }, 2000);
            }
        }
    }



    renderBody() {
        return this.state.tags.map((tag,index)=>{
            return(
                <View key={index} style={MainCSS.mainBodyItem}>
                    <Element itemId={tag.get('name')}/>
                </View>
            )
        });
    }

    _onRefresh(){
        this.setState({errorRefreshing: true});
        this.props.MainActions.getTagList();
        this.props.ModelActions.getHotModel();
        setTimeout(() => {
            if(this.state.errorRefreshing){
                this.setState({
                    errorRefreshing: false
                });
            }
        }, 2000);
    }

    getRequestError(){
        return (
            <ScrollView
                style={{flex: 1,marginTop:58}}
                refreshControl={
                       <RefreshControl
                          refreshing={this.state.errorRefreshing}
                          onRefresh={this._onRefresh.bind(this)}
                       />
                    }
                showsVerticalScrollIndicator={false}>
                <View
                    style={
                        {
                            height:Dimensions.get('window').height-158,
                            width:Dimensions.get('window').width,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }>
                    <Image
                        resizeMode={Image.resizeMode.stretch}
                        style={{height:134,width:100,marginBottom:30}}
                        source={require('../images/main/empty.png')}/>
                    <Text style={{fontSize:13,color:'#a7a7a7'}}>额~好像哪里出错了</Text>
                </View>
            </ScrollView>
        )
    }

    render() {
        var bodyItems = this.renderBody();
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                {
                    this.state.requestError?
                        this.getRequestError()
                        :
                        <IndicatorViewPager
                            style={MainCSS.mainIndicatorViewPager}
                            indicator={this._renderTabIndicator()}>
                            <Spinner visible={this.state.visible} />
                            {bodyItems}
                        </IndicatorViewPager>
                }
            </View>
        );
    }

    _renderTabIndicator() {
        let tabs = [],
            itemWidth = 60,
            addIndicatorTitleWidth =  40;
        this.state.tags.map((tag)=>{
            tabs.push(tag.get('name'));
        });
        return (
            <PagerTitleIndicator
                showMask={this.state.showMask}
                cancelShowMask={this._addIndicatorTitle.bind(this,false)}
                itemWidth={itemWidth}
                itemStyle={{width: itemWidth}}
                itemTextStyle={MainCSS.mainIndicatorText}
                selectedBorderStyle={MainCSS.mainIndicatorSelectedBorder}
                selectedItemTextStyle={MainCSS.mainIndicatorSelectedText}
                style={MainCSS.mainIndicatorContainer}
                addIndicatorTitleWidth={addIndicatorTitleWidth}
                addIndicatorTitle={this._renderAddIndicatorTitle(addIndicatorTitleWidth)}
                modelView={this._renderModelView()}
                titles={tabs}/>
        );
    }

    goModelDetail(model){
        this.setState({showMask:false});
        Actions.model({id:model.get('_id')});
    }

    goAllModel(){
        Actions.modelAll();
        this.setState({showMask:false});
    }

    renderModelHot(){
        let rowViews = null,
            that = this;
        if(this.state.modelHotList){
            rowViews = this.state.modelHotList.map((model,index)=>{
                let width = (Dimensions.get('window').width - 20*2)/3 - 10 - 2;
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
                            <View style={[ModelCSS.modelMoreName,{width:width}]}>
                                <Text numberOfLines={1} style={ModelCSS.modelMoreNameText}>{model.get('name')}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
        }
        return rowViews;
    }

    _renderModelView(){
        return(
            <View style={MainCSS.modelView}>
                <View style={MainCSS.modelViewLine}/>
                <View style={MainCSS.modelHot}>
                    <View>
                        <Text style={MainCSS.modelHotTitleText}>人气模特</Text>
                    </View>
                    <TouchableOpacity onPress={this.goAllModel.bind(this)} >
                        <View style={MainCSS.modelAll}>
                            <View>
                                <Text style={MainCSS.modelAllTitleText}>全部模特</Text>
                            </View>
                            <Image
                                resizeMode={Image.resizeMode.stretch}
                                style={MainCSS.modelAllImage}
                                source={require('../images/model/arrow.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={MainCSS.modelHotList}>
                    {this.renderModelHot()}
                </View>
            </View>
        )
    }

    _renderAddIndicatorTitle(width){
        return (
            <TouchableOpacity onPress={this._addIndicatorTitle.bind(this,true)}>
                <View style={[{width:width},MainCSS.mainAddItemImageView]}>
                    <Image style={MainCSS.mainAddItemImage}  source={require('../images/main/pullDown.png')} />
                </View>
            </TouchableOpacity>
        );
    }

    _addIndicatorTitle(status){
        this.props.ModelActions.getHotModel();
        this.setState({showMask:status});
    }

}

function mapStateToProps(state, ownProps) {
    return {
        tagList: state.main.tagList,
        modelHotList: state.model.modelHotList,
        requestError: state.main.requestError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        MainActions: bindActionCreators(MainActions, dispatch),
        ModelActions: bindActionCreators(ModelActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);