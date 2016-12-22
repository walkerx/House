'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    requestError: false,
    albumDetailList: Immutable.List()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.GET_ALBUM_DETAIL:
            return {
                ...state,
                albumDetailList: state.albumDetailList.push(Immutable.fromJS(action.payload)),
                requestError: false
            };
        case ActionType.DELETE_ALBUM_DETAIL:
            return {
                ...state,
                albumDetailList: state.albumDetailList.pop()
            };
        case ActionType.REQUEST_ERROR:
            return {
                ...state,
                requestError: true
            };
        default:
            return state;
    }
}