import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        scrollView:{
            marginTop:58,
            marginLeft:10,
            paddingTop:5
        },
        footer:{
            paddingLeft: 3,
            paddingRight:13
        },
        moreView:{
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 30,
            marginTop: 30
        },
        moreViewMiddle:{
            width:80,
            alignItems: 'center'
        },
        moreViewText:{
            fontSize: 14
        },
        lineView:{
            borderTopWidth:1
        }
    }
);

