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
            fontSize: 16
        },
        albumTitleStyle:{
            fontSize: parseInt(utils.getDeviceRatio() * 17)
        },
        showGirlNavBarStyle:{
            backgroundColor: 'rgba(31,31,31,1)',
            height: 60,
            borderBottomWidth: 0
        },
        showGirlTitle:{
            alignItems:'center',
            marginTop:20
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
            height: 35,
            position: 'absolute',
            left: -10,
            top: -5,
            paddingLeft: 10,
            paddingTop:5
        },
        backButtonImage: {
            width: 10,
            height: 18
        }
        
    }
);

