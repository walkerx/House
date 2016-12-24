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
           backgroundColor:'#f5f5f5'
        },
        itemsView:{
            backgroundColor:'#FFFFFF',
            marginTop: 10
        },
        lineView:{
            borderBottomWidth:1,
            borderColor:'#d8d8d8'
        },
        vipView:{
            flexDirection:'row',
            justifyContent: 'space-between',
            height: 50,
            alignItems: 'center',
            paddingLeft:10,
            paddingRight:10
        },
        vipRightView:{
            flexDirection:'row',
            alignItems: 'center'
        },
        arrowImage:{
            width:8,
            height:13,
            marginLeft:10
        },
        vipDuration:{
            fontSize: 15,
            color:'#888888'
        },
        loginView:{
            // justifyContent: 'center',
            // height: 40,
            // alignItems: 'center',
            // backgroundColor:'#FFFFFF'
            alignItems:'center',
            justifyContent: 'center',
            marginTop: 20,
            height: 45,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 5,
            backgroundColor: '#ffffff',
            borderWidth:1,
            borderColor:'#dbdbd9'
        },
        buttonText:{
            fontSize: 15,
            color:'#ff6600'
        }
    }
);

