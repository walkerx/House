'use strict';

import { ActionType } from '../constants/index';

var AlbumActions = {
    getAlbumDetail: function (id) {
        return {
            type: ActionType.GET_ALBUM_DETAIL,
            promise: (ajax) => ajax.get('/album',
                {params: {_id: id}}),
            meta: {
            }
        };
    },
    deleteAlbumDetail: function () {
        return {
            type: ActionType.DELETE_ALBUM_DETAIL,
            meta: {
            }
        };
    }
};

module.exports = AlbumActions;
