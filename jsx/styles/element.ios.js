import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        container:{
            flex: 1,
            marginLeft: 13,
            marginRight: 13
        },
        itemImage:{
            borderRadius: 10,
            marginBottom: 10,
            backgroundColor:'#d2d2d2'
            // overflow: 'visible'
        },
        itemContent:{
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center'
        },
        nameText: {
            color: '#ffffff',
            fontSize: 20
        },
        roundBg:{
            marginTop: 16,
            height: 18,
            width: 54,
            alignItems: 'center',
            justifyContent: 'center'
        },
        picNumText:{
            fontSize: 11,
            color:'#000000'
        }
    }
);

