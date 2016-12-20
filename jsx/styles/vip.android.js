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
        vipDesc:{
            marginTop: 20,
            paddingLeft: 37,
            paddingRight: 37,
            marginBottom: 20
        },
        descItem:{
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        descItemView:{
            alignItems: 'center'
        },
        descItemImage:{
            height:80,
            width: 80,
            borderRadius: 40
        },
        descItemText1:{
            paddingTop: 10,
            fontSize: 16
        },
        descItemText2:{
            paddingTop: 5,
            fontSize: 13,
            color: '#878787'
        },
        descLine:{
            borderBottomWidth:1
        },
        vipPay:{
            backgroundColor: '#ffffff',
            paddingLeft: 15
        },
        payItem:{
            flexDirection:'row',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        payLine:{
            borderBottomWidth:1
        },
        payItemLeft:{
        },
        payItemLeftTop:{
            flexDirection:'row'
        },
        payItemLeftPrice:{
            paddingLeft:10,
            color: '#ff6600',
            fontSize: 13
        },
        payItemLeftBottomText:{
            fontSize: 13,
            color:'#878787',
            marginTop: 4
        },
        payItemRight:{
            flexDirection: 'row',
            height: 30
        },
        payItemRightRecommend:{
            alignItems: 'center',
            justifyContent: 'center',
        },
        payItemRightRecommendText:{
            color:'#EE2C2C'
        },
        payItemRightRecommendOpen:{
            marginLeft: 10,
            marginRight: 10,
            width: 80,
            height:30,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fedb00'
        },
        payItemRightOpen:{
            marginRight: 10,
            width: 80,
            height: 30,
            borderRadius: 6,
            borderColor: '#000000',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff'
        },
        payItemRightOpenText:{
            fontSize: 13
        },
        modalView:{
            backgroundColor:'#ffffff',
            marginLeft: 15,
            marginRight: 15,
            marginTop: Dimensions.get('window').height- 158 ,
            borderWidth: 1,
            borderColor: '#d8d8d8',
            borderRadius: 10
        },
        modalItem:{
            alignItems:'center',
            justifyContent:'center',
            height:55
        },
        modalItemText:{
            fontSize:18
        },
        modalLine:{
            width:Dimensions.get('window').width,
            borderTopWidth:1,
            borderColor: '#d8d8d8'
        }
        
    }
);

