'use strict';

import { ActionType } from '../constants/index';

var AlbumActions = {
    getAlbumDetail: function (id) {
        return {
            type: ActionType.GET_ALBUM_DETAIL,
            promise: (ajax) => ajax.get('/album',
                {params: {_id: id}}),
            meta: {
                id:id
            }
        };
    },
    getAlbumMore: function (id, size, offset) {
        var type = offset === 0 ? 0 : 1;//0 refresh , 1 load more
        return {
            type: ActionType.GET_ALBUM_MORE,
            promise: (ajax) => ajax.get('/album/more',
                {params: {_id: id, size: size, offset: offset}}),
            meta: {
                type: type
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
