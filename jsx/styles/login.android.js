import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

module.exports = StyleSheet.create(
    {
        container:{
            flex: 1,
            marginTop: 58,
            backgroundColor:"#f5f5f5"
        },
        registerView:{
            paddingLeft:15,
            paddingBottom: 5,
            backgroundColor:"#ffffff"
        },
        registerItemView:{
            flexDirection: 'row',
            alignItems:'center',
            height: 40
        },
        leftView:{
            width:40
        },
        itemText:{
            fontSize: 15
        },
        textInput:{
            paddingLeft:6,
            height: 40,
            width:Dimensions.get('window').width-80,
            fontSize:14
        },
        registerLine:{
            borderBottomWidth:1,
            borderColor:'#dbdbd9'
        },
        registerButton:{
            alignItems:'center',
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor:"#fedb00",
            height: 45,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 5
        },
        buttonText:{
            fontSize:14
        },
        tipsView:{
            marginTop:15,
            alignItems:'center',
            justifyContent: 'center',
        },
        tipsText:{
            fontSize: 12,
            color: '#888888'
        },
        thirdPartyView:{
            alignItems:'center',
            justifyContent: 'center',
            marginTop: Dimensions.get('window').height - 300 - 125
        },
        wxIconImage:{
            width: 60,
            height: 60
        },
        thirdPartyItem:{
            marginTop: 10
        },
        thirdPartyItemText:{
            fontSize:15,
            color: '#d8d8d9'
        }
    }
);

