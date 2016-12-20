'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    userInfo: Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.POST_LOGIN:
            return {
                ...state,
                userInfo: Immutable.Map(action.payload)
            };
        case ActionType.POST_REGISTER:
            return {
                ...state,
                userInfo: Immutable.Map(action.payload)
            };
        case ActionType.POST_THIRD_PARTY_LOGIN:
            return {
                ...state,
                userInfo: Immutable.Map(action.payload)
            };
        default:
            return state;
    }
}