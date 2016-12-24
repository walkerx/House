'use strict';

import { ActionType } from '../constants/index';

var ModelActions = {
    getUserInfo: function () {
        return {
            type: ActionType.GET_USER_INFO,
            promise: (ajax) => ajax.get('/user/me',
                {}),
            meta: {
            }
        };
    },
    clearUserInfo: function () {
        return {
            type: ActionType.CLEAR_USER_INFO,
            meta: {
            }
        };
    },
    setLocalUserInfo: function (userInfo) {
        return {
            type: ActionType.SET_LOCAL_USER_INFO,
            meta: {
                userInfo:userInfo
            }
        };
    },
    getLocalUserInfo: function () {
        return {
            type: ActionType.GET_LOCAL_USER_INFO,
            meta: {
            }
        };
    },
    logout: function () {
        return {
            type: ActionType.GET_LOGOUT,
            promise: (ajax) => ajax.get('/user/logout',
                {params: {}}),
            meta: {
            }
        };
    },
    getSystemInfo: function () {
        return {
            type: ActionType.GET_SYSTEM_INFO,
            promise: (ajax) => ajax.get('/system/info',
                {}),
            meta: {
            }
        };
    }
};

module.exports = ModelActions;
