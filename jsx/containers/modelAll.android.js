'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions,ActionConst} from "react-native-router-flux";
import Spinner from 'react-native-loading-spinner-overlay';
import lodash from 'lodash';
import {ModelActions} from '../actions/index';
import {ModelAllCSS,ModelCSS} from '../styles/index';
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


class ModelAll extends Component {
    static propTypes = {
        modelAllList: PropTypes.instanceOf(Immutable.List)
    };

    static defaultProps = {
        modelAllList: Immutable.List()
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        var rows = lodash.chunk(props.modelAllList.toArray(),3);
        this.state = {
            dataSource: ds.cloneWithRows(rows),
            refreshing: false,
            visible: true
        };
    }

    componentWillMount() {
        this.refresh();
        setTimeout(() => {
            if(this.state.visible){
                this.setState({
                    visible: false
                });
            }
        }, 3000);
    }

    componentWillReceiveProps(nextProps) {
        let rows = lodash.chunk(nextProps.modelAllList.toArray(),3);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(rows),refreshing: false});
        setTimeout(() => {
            if(this.state.visible){
                this.setState({
                    visible: false
                });
            }
        }, 500);
    }

    componentWillUnmount(){
        this.props.ModelActions.deleteModelAll();
    };

    goModelDetail(model){
        Actions.model({id:model.get('_id')});
    }

    renderRow(dataRows) {
        let rowViews = dataRows.map((dataRow,index)=>{
            var width = (Dimensions.get('window').width - 20*2)/3 - 10;
            let thumbnail = {uri: dataRow.get('thumbnail')};
            if(! dataRow.get('thumbnail') || dataRow.get('thumbnail').indexOf('http') < 0){
                thumbnail = null;
            }
            return (
                <TouchableOpacity key={index} onPress={this.goModelDetail.bind(this, dataRow)} >
                    <View  style={ModelCSS.modelMoreItem}>
                        <Image
                            resizeMode={Image.resizeMode.stretch}
                            style={{width: width, height: width,backgroundColor:'#d2d2d2'}}
                            source={thumbnail}>
                        </Image>
                        <View style={[ModelCSS.modelMoreName,{width:width}]}>
                            <Text numberOfLines={1}  style={ModelCSS.modelMoreNameText}>{dataRow.get('name')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <View style={ModelAllCSS.modelAllItem}>
                {rowViews}
            </View>
        );
    };

    refresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            if(this.state.refreshing){
                this.setState({refreshing: false});
            }
        }, 7000);
        this.props.ModelActions.getAllModel(12, 0);
    }

    loadMore() {
        this.props.ModelActions.getAllModel(12, this.props.modelAllList.size);
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <Spinner visible={this.state.visible} />
                <ListView
                    style={{marginTop: 83}}
                    refreshControl={
                          <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.refresh.bind(this)}
                          />}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    onEndReached={ this.loadMore.bind(this) }
                    onEndReachedThreshold={50}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {

    return {
        modelAllList: state.model.modelAllList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ModelActions: bindActionCreators(ModelActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelAll);
