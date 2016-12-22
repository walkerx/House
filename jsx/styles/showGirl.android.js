import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
import utils from '../lib/utils';

module.exports = StyleSheet.create(
    {
        containerView:{
            flex: 1,
            backgroundColor: '#000000'
        },
        topBackground:{
            backgroundColor: '#1f1f1f',
        },
        titleText:{
            color:'#ffffff'
        },
        subheadText:{
            color:'#ffffff',
            fontSize: 12
        },
        blurView:{
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height-50
        },
        blurTipView:{
        },
        blurTipViewText:{
            color: '#ffffff',
            fontSize: 30
        },
        blurLockImage:{
            height: 35,
            marginTop: 20
        },
        downloadView:{
            height: 50,
            backgroundColor: '#1f1f1f',
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width
        },
        downloadText:{
            fontSize: 17,
            color: '#ffffff'
        }
    }
);

