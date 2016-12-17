import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        topView:{
            backgroundColor: '#feda00',
            height:20
        },
        topCover: {
            height:250,
            backgroundColor:'#d2d2d2'
        },
        backBt:{
            width:30,
            height:30,
            marginTop:12,
            marginLeft:10
        },
        modelName:{
            marginTop: 40,
            alignItems: 'center'
        },
        modelNameText:{
            fontSize: 24,
            fontWeight: 'bold'
        },
        modelDesc: {
            marginTop: 37,
            paddingLeft: 30,
            paddingRight: 30
        },
        modelDescText: {
            fontSize: 12,
            lineHeight: 18
        },
        modelAlbum: {
            marginTop: 53,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        modelAlbumText: {
            fontSize: 17,
            fontWeight: 'bold'
        },
        modelAlbumMiddle:{
            height: 17,
            marginLeft:10,
            marginRight:10,
            justifyContent: 'center'
        },
        albumLineView: {
            borderRightWidth: 3,
            height: 17
        },
        modelAlbumList: {
            marginTop: 23,
            alignItems: 'center'
        },
        modelMore: {
            marginTop: 41,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modelMoreText: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        modelMoreMiddle:{
            marginLeft:20,
            marginRight:20
        },
        moreLineView: {
            borderTopWidth: 1
        },
        modelMoreList: {
            marginTop: 38,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            marginLeft: 20,
            marginRight: 20
        },
        modelMoreItem: {
            marginBottom: 25,
            marginLeft: 5,
            marginRight: 5
        },
        modelMoreName: {
            alignItems: 'center',
            marginTop: 17
        },
        modelMoreNameText: {
            fontSize: 13
        }
    }
);

