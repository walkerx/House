'use strict';

import { ActionType } from '../constants/index';

var ElementActions = {
    getList: function (tagName, size, offset) {
        var type = offset === 0 ? 0 : 1;//0 refresh , 1 load more
        return {
            type: ActionType.GET_ELEMENT_LIST,
            promise: (ajax) => ajax.get('/albums',
                {params: {tag: tagName, size: size, offset: offset}}),
            meta: {
                type: type,
                tag: tagName
            }
        };
        
    }
};

module.exports = ElementActions;
