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
    }
};

module.exports = ModelActions;
