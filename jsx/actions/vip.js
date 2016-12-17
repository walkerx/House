'use strict';

import { ActionType } from '../constants/index';

var VipActions = {
    getVipList: function () {
        return {
            type: ActionType.GET_VIP_LIST,
            promise: (ajax) => ajax.get('/vip/list'),
            meta: {
            }
        };
    },
    wxPay: function (vipId) {
        return {
            type: ActionType.POST_WX_PAY,
            promise: (ajax) => ajax.post('/vip/order',
                {data:{payType: 1, id: vipId}}),
            meta: {
            }
        };
    },
    aliPay: function (vipId) {
        return {
            type: ActionType.POST_ALI_PAY,
            promise: (ajax) => ajax.post('/vip/order',
                {data:{payType: 2, id: vipId}}),
            meta: {
            }
        };
    }
};

module.exports = VipActions;
