'use strict';

import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import {Actions} from "react-native-router-flux";
import {ElementCSS} from '../styles/index'
import {ElementActions} from '../actions/index';
import {
    StyleSheet,
    Image,
    View,
    Text,
    ListView,
    RefreshControl,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import utils from '../lib/utils';

class Element extends Component {
    static propTypes = {
        elements: PropTypes.instanceOf(Immutable.List),
        itemId: PropTypes.string
    };

    static defaultProps = {
        elements: Immutable.List(),
        itemId: ''
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
        });
        this.state = {
            loadMore: false,
            refreshing: false,
            dataSource: ds.cloneWithRows(props.elements.toArray())
        };

    }

    componentWillMount() {
        this.refresh();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.refreshing || this.state.loadMore){
            this.state.refreshing ? this.setState({refreshing: false}) :
                this.setState({loadMore: false});
            if (!Immutable.is(this.props.elements, nextProps.elements)) {
                this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.elements.toArray())});
            }
        }
    }

    goAlbum(dataRow) {
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
                <Image
                    resizeMode={Image.resizeMode.cover}
                    style={ElementCSS.itemImage}
                    source={cover}>
                    <View style={ElementCSS.itemContent}>
                        <View>
                            <Text numberOfLines={1} style={ElementCSS.nameText}>{dataRow.get('name')}</Text>
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
    };

    refresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            if(this.state.refreshing){
                this.setState({refreshing: false});
            }
        }, 7000);
        this.props.ElementActions.getList(this.props.itemId, 10, 0);
    }

    loadMore() {
        if(this.props.elements.size!==0){
            this.setState({loadMore: true});
            this.props.ElementActions.getList(this.props.itemId, 10, this.props.elements.size);
        }
    }

    render() {
        return (
            <View  style={ElementCSS.container}>
                <ListView
                    refreshControl={
                          <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.refresh.bind(this)}
                          />}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    onEndReached={this.loadMore.bind(this) }
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
        elements: state.element.elements.get(ownProps.itemId)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ElementActions: bindActionCreators(ElementActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Element);
