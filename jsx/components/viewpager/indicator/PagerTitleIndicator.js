/**
 * Created by tangzhibin on 16/2/28.
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal,
    Image,
    Platform
} from 'react-native';
import IndicatorViewPager from '../IndicatorViewPager';

var _scrollView: ScrollView,
    scrollStart = false ,
    scrollViewOffset = 0;

export default class PagerTitleIndicator extends Component {
    static propTypes = {
        ...View.propTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        itemStyle: View.propTypes.style,
        itemTextStyle: Text.propTypes.style,
        selectedItemTextStyle: Text.propTypes.style,
        selectedBorderStyle: View.propTypes.style
    };

    static defaultProps = {
        titles: [],
        initialPage: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.initialPage
        };
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selectedIndex != nextState.selectedIndex ||
            this.props.titles + '' != nextProps.titles + '' ||
            this.props.style != nextProps.style ||
            this.props.itemStyle != nextProps.itemStyle ||
            this.props.itemTextStyle != nextProps.itemTextStyle ||
            this.props.selectedItemTextStyle != nextProps.selectedItemTextStyle ||
            this.props.selectedBorderStyle != nextProps.selectedBorderStyle;
    }

    getTitleViews(titles,cancelShowMask,showMask,pager,itemStyle,selectedItemTextStyle,selectedBorderStyle,itemTextStyle,type){
        itemStyle = type === 1? itemStyle : {width:(Dimensions.get('window').width - 20*2)/6};
        let titleViews = titles.map((title, index)=> {
            let isSelected = this.state.selectedIndex === index;
            return (
                <TouchableOpacity
                    key={index}
                    onPress={()=>{cancelShowMask();!isSelected && pager.setPage(index)}}>
                    <View>
                        <View style={[styles.titleContainer, itemStyle]}>
                            <Text
                                style={isSelected && !showMask ? [styles.titleTextSelected, selectedItemTextStyle]: [styles.titleText, itemTextStyle]}
                            >
                                {title}
                            </Text>
                        </View>
                        {isSelected && !showMask ? <View style={[styles.selectedBorder, selectedBorderStyle]}/> : null}
                    </View>
                </TouchableOpacity>
            );
        });
        return  titleViews;
    }

    render() {
        let {titles, pager, itemStyle, itemTextStyle, selectedItemTextStyle, selectedBorderStyle, addIndicatorTitle, showMask, cancelShowMask, modelView} = this.props;
        if (!titles || titles.length === 0) {
            return null;
        }
        let titleViews = this.getTitleViews(titles,cancelShowMask,showMask,pager,itemStyle,selectedItemTextStyle,selectedBorderStyle,itemTextStyle,1),
            maskTitleViews = this.getTitleViews(titles,cancelShowMask,showMask,pager,itemStyle,selectedItemTextStyle,selectedBorderStyle,itemTextStyle,2);
        return (
            <View style={[styles.indicatorContainer, this.props.style]}>
                <Modal
                    ref="_modal"
                    onRequestClose={() => {()=>{}}}
                    transparent={true}
                    visible={showMask}>
                    <ScrollView
                        style={[styles.modalView,{width:Dimensions.get('window').width}]}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.categoryView}>
                            <View>
                                <Text style={styles.categoryText}>专辑分类</Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{cancelShowMask()}}>
                                <View style={styles.cancelImageView}>
                                    <Image
                                        resizeMode={Image.resizeMode.stretch}
                                        style={{width: 18,height:10}}
                                        source={require('../../../images/main/retract.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.showItemView}>
                            {maskTitleViews}
                        </View>
                        {modelView}
                    </ScrollView>
                </Modal>
                <ScrollView
                    ref={(scrollView) => {_scrollView = scrollView}}
                    onScroll={this.handleScroll.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={100}
                    horizontal={true}>
                    {titleViews}
                </ScrollView>
                {addIndicatorTitle}
            </View>
        );
    }

    handleScroll(event: Object) {
        scrollViewOffset = event.nativeEvent.contentOffset.x;
    }

    onPageScroll(e){
        if(_scrollView && this.state.selectedIndex >= 0){
            var selectedIndex = this.state.selectedIndex,
                screenWidth = Dimensions.get('window').width - this.props.addIndicatorTitleWidth,  //屏幕大小
                itemWidth = this.props.itemWidth; //每个按钮的宽度
            if(e.offset!==0){
                if(!scrollStart){
                    if(scrollViewOffset <= itemWidth * selectedIndex &&
                        scrollViewOffset + screenWidth >= itemWidth * (selectedIndex+1)){  //全在屏幕里面
                    }else if(scrollViewOffset > itemWidth * selectedIndex){ //选中有跑到屏幕左边
                        _scrollView.scrollTo({x: itemWidth * selectedIndex});
                    }else{   //选中有跑到屏幕左边
                        _scrollView.scrollTo({x: itemWidth * (selectedIndex+1) - screenWidth});
                    }
                }
                scrollStart = true;
            }else{
                if(scrollViewOffset <= itemWidth * selectedIndex &&
                    scrollViewOffset + screenWidth >= itemWidth * (selectedIndex+1)){  //全在屏幕里面
                }else if(scrollViewOffset > itemWidth * selectedIndex){ //选中有跑到屏幕左边
                    _scrollView.scrollTo({x: itemWidth * selectedIndex});
                }else{   //选中有跑到屏幕左边
                    _scrollView.scrollTo({x: itemWidth * (selectedIndex+1) - screenWidth});
                }
                scrollStart = false;
            }
        }
    }

    onPageSelected(e) {
        this.setState({selectedIndex: e.position});
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#C0C0C0'
    },
    titleText: {
        color: '#333333',
        fontSize: 15
    },
    titleTextSelected: {
        color: '#FF7200',
        fontSize: 15
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent:'center',
        height: 47
    },
    selectedBorder: {
        backgroundColor: '#FF7200',
        height: 2
    },
    modalView: {
        backgroundColor: '#f6f5f5',
        opacity: 0.97,
        marginTop: 58,
        paddingLeft: 20,
        paddingRight: 20
    },
    categoryView:{
        marginTop: 24,
        // marginLeft: 20,
        // marginRight: 20,
        paddingLeft: 9,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    categoryText:{
        fontWeight: 'bold',
        fontSize: 17
    },
    showItemView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 18
    },
    lineView:{
        borderTopWidth: 1,
        marginTop: 0
    },
    cancelView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3D3'
    },

    cancelImageView:{
        width:50,
        height:30,
        ...Platform.select({
            ios: {
                position: 'absolute',
                left:-35,
                top: -5
            },
            android: {
            }
        }),
        paddingLeft: 15,
        paddingTop:5
    }


});