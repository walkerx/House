'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    requestError: 0,
    tagList: Immutable.List()
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.GET_TAG_LIST:
            return {
                ...state,
                tagList: Immutable.fromJS(action.payload),
                requestError: 0
            };
        case ActionType.REQUEST_ERROR:
            return {
                ...state,
                requestError: state.requestError + 1
            };
        default:
            return state;
    }
}