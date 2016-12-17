'use strict';

import { ActionType } from '../constants/index';

var LoginActions = {
    login: function (account, passWd) {
        return {
            type: ActionType.POST_LOGIN,
            promise: (ajax) => ajax.post('/user/login',
                {data:{account:account,passWd:passWd}}),
            meta: {
            }
        };
    },
    registerAccount: function (account,passWd) {
        return {
            type: ActionType.POST_REGISTER,
            promise: (ajax) => ajax.post('/user/register',
                {data:{account:account,passWd:passWd}}),
            meta: {
            }
        };
    },
    thirdPartyLogin: function (type, code) {
        console.log("thirdPartyLogin")
        return {
            type: ActionType.POST_THIRD_PARTY_LOGIN,
            promise: (ajax) => ajax.post('/user/thirdPartyLogin',
                {data:{type:type,code:code}}),
            meta: {
            }
        };
    }
};

module.exports = LoginActions;
