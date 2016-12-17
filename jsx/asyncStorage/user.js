'use strict';

import {
    AsyncStorage
} from 'react-native';
import lodash from 'lodash';

var UserStorage = {
    setUserInfo: function(key, action, callback) {
        const {...rest} = action;
        let payload = JSON.stringify(action.meta.userInfo.toJS());
        AsyncStorage.setItem(key, payload, (err)=> {
            if (err) {
                return callback({...rest, error: true, payload: err});
            }
            return callback({...rest, payload: JSON.parse(payload)});
        })
    },
    getUserInfo: function(key, action, callback) {
        const {...rest} = action;
        AsyncStorage.getItem(key, (err, userInfo)=> {
            if (err) {
                return callback({...rest, error: true, payload: err});
            }
            let payload = userInfo?JSON.parse(userInfo):{};
            return callback({...rest, payload: payload});
        })
    }
};


module.exports = UserStorage;