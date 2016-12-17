import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        cache:{
            marginTop:58
        },
        item:{
            marginTop: 60,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            paddingLeft: 17,
            paddingRight: 17
        },
        itemText:{
            fontSize: 14
        },
        itemTextValue:{
            fontSize: 12
        },
        showImageBt:{
            width: 18,
            resizeMode:'contain'
        },
        statement:{
            marginTop: 120
        },
        showView:{
            backgroundColor: '#ffffff',
            paddingLeft: 17,
            paddingRight: 17

        },
        lineView:{
            borderTopWidth: 1
        },
        content:{
            paddingTop: 38,
            paddingBottom: 20
        },
        contentText:{
            fontSize: 12,
            lineHeight: 18
        }
    }
);

