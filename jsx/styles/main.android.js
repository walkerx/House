import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        mainSearch:{

        },
        mainIndicatorViewPager:{
            flex: 1,
            marginTop:58
        },
        mainIndicatorContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 50,
            backgroundColor: '#f6f5f5',
            opacity: 0.97
        },
        mainIndicatorText:{
            fontSize: 14,
            color: '#000000'
        },
        mainIndicatorSelectedText:{
            fontSize: 17,
            fontWeight: 'bold',
            color: '#000000'
        },
        mainIndicatorSelectedBorder:{
            height: 2,
            backgroundColor: '#000000'
        },
        mainBodyItem:{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'space-around',
            paddingTop:62
        },
        mainAddItemImageView:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
            // backgroundColor: '#cecece'
        },
        mainAddItemImage:{
            width: 18,
            resizeMode:'contain'
        },
        mainCancelView:{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        modelView: {
            marginTop: 18
        },
        modelViewLine: {
            borderTopWidth: 1
        },
        modelHot: {
            marginTop: 28,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        modelHotTitleText: {
            fontSize: 14
        },
        modelAll: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        modelAllTitleText: {
            fontSize: 14,
            color: '#ffc002'
        },
        modelAllImage: {
            width: 7,
            height: 14,
            marginLeft: 7
        },
        modelHotList: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            marginTop: 38
        }
    }
);

