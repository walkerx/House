import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
import utils from '../lib/utils';

module.exports = StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor:'#ffffff',
            marginLeft: parseInt(utils.getDeviceAndroidLength(25)),
            marginRight: parseInt(utils.getDeviceAndroidLength(25))
        },
        itemImage:{
            borderRadius: 10,
            backgroundColor:'#d2d2d2',
            overflow: 'hidden',
            marginBottom: parseInt(utils.getDeviceAndroidLength(20)),
            width:Dimensions.get('window').width-parseInt(utils.getDeviceAndroidLength(50)),
            height: parseInt(utils.getDeviceAndroidLength(372))
        },
        itemContent:{
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            height: parseInt(utils.getDeviceAndroidLength(372))
        },
        nameText: {
            color: '#ffffff',
            fontSize:  parseInt(utils.getDeviceAndroidLength(36))
        },
        roundBg:{
            marginTop: parseInt(utils.getDeviceAndroidLength(28)),
            height: 18,
            width: 54,
            alignItems: 'center',
            justifyContent: 'center'
        },
        picNumText:{
            fontSize: parseInt(utils.getDeviceAndroidLength(18)),
            color:'#000000'
        }
    }
);

