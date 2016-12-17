import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';

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
        imageItem:{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height-60-50,
            marginTop: 60
        },
        downloadView:{
            height: 50,
            backgroundColor: '#1f1f1f',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom:0,
            width: Dimensions.get('window').width
        },
        downloadText:{
            fontSize: 17,
            color: '#ffffff'
        }
    }
);

