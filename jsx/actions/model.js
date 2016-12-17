'use strict';

import { ActionType } from '../constants/index';

var ModelActions = {
    getModelDetail: function (id) {
        return {
            type: ActionType.GET_MODEL_DETAIL,
            promise: (ajax) => ajax.get('/model/detail',
                {params: {id: id}}),
            meta: {
            }
        };
    },
    deleteModelDetail: function () {
        return {
            type: ActionType.DELETE_MODEL_DETAIL,
            meta: {
            }
        };
    },
    getHotModel: function () {
        return {
            type: ActionType.GET_HOT_MODEL_LIST,
            promise: (ajax) => ajax.get('/model/hot',
                {}),
            meta: {
            }
        };
    },
    getAllModel: function (size, offset) {
        var type = offset === 0 ? 0 : 1;//0 refresh , 1 load more
        return {
            type: ActionType.GET_ALL_MODEL_LIST,
            promise: (ajax) => ajax.get('/model/all',
                {params: {size: size, offset: offset}}),
            meta: {
                type: type
            }
        };
    },
    deleteModelAll: function () {
        return {
            type: ActionType.DELETE_MODEL_ALL,
            meta: {
            }
        };
    },
};

module.exports = ModelActions;
