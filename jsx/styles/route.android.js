import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
import utils from '../lib/utils';

module.exports = StyleSheet.create(
    {
        navBarStyle:{
            backgroundColor: '#feda00',
            height: 58,
            borderBottomWidth: 0
        },
        mainNavBarRightText:{
            color: "#000000",
            fontSize: 14
        },
        albumTitleStyle:{
            fontSize: parseInt(utils.getDeviceAndroidLength(34)) 
        },
        showGirlNavBarStyle:{
            backgroundColor: 'rgba(31,31,31,1)',
            height: 60,
            borderBottomWidth: 0
        },
        showGirlTitle:{
            alignItems:'center',
            marginTop:10
        },
        showGirlTitleText:{
            fontSize:15,
            color:"#ffffff"
        },
        showGirlTitleSubheader:{
            fontSize:12,
            color:"#ffffff",
            paddingTop:3
        },
        backButton: {
            width: 130,
            height: 35
        },
        backButtonImage: {
            width: 10,
            height: 18
        }
        
    }
);

