'use strict';

import {
    AsyncStorage
} from 'react-native';
import {UserStorage}  from '../asyncStorage/index';
import {ActionType} from '../constants/index';

export default function asyncStorage() {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }
            if (action.error) {
                return next(action);
            }
            switch (action.type) {
                //存储用户信息
                case ActionType.SET_LOCAL_USER_INFO:
                    UserStorage.setUserInfo('userInfo',action,function(result){
                        return next(result);
                    });
                    break;
                //获取用户信息
                case ActionType.GET_LOCAL_USER_INFO:
                    UserStorage.getUserInfo('userInfo',action,function(result){
                        return next(result);
                    });
                    break;
                default:
                    return next(action);
            }
        }
    }
}
