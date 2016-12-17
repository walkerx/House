import {
    Dimensions,
    NetInfo,
    PixelRatio
} from 'react-native';

const NOT_NETWORK = "网络不可用，请稍后再试";
const TAG_NETWORK_CHANGE = "NetworkChange";

/***
 * 检查网络链接状态
 * @param callback
 */
const checkNetworkState = (callback) =>{
    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            callback(isConnected);
        }
    );
};

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag,handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
};

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag,handler)=>{
    NetInfo.isConnected.addEventListener(tag, handler);
};


/***
 * 获取设备高度比
 */
const getDeviceRatio = function () {
    var ratio = 0;
    switch (Dimensions.get('window').height) {
        case 480: //iphone4:  480/667
            ratio = 0.71;
            break;
        case 568: //iphone5:  568/667
            ratio = 0.85;
            break;
        case 667: //iphone6: 667/667
            ratio = 1;
            break;
        case 736: //iphone plus:  736/667
            ratio = 1.10;
            break;
        default:
            ratio = 1;
    }
    return ratio;
};

/***
 * 获取Android设备长度  1280*720
 */
const getDeviceAndroidLength = function (length) {
    return (length*Dimensions.get('window').height)/1280;
};

export default{
    checkNetworkState,
    addEventListener,
    removeEventListener,
    getDeviceRatio,
    getDeviceAndroidLength,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE
}