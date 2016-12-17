'use strict';

import { ActionType } from '../constants/index';

var MainActions = {
    getTagList: function () {
        return {
            type: ActionType.GET_TAG_LIST,
            promise: (ajax) => ajax.get('/tags',
                {}),
            meta: {
            }
        };
    }
};

module.exports = MainActions;
