'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    userInfo: Immutable.Map(),
    localUserInfo: Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.GET_USER_INFO:
            return {
                ...state,
                userInfo: Immutable.Map(action.payload)
            };
        case ActionType.SET_LOCAL_USER_INFO:
            return {
                ...state,
                localUserInfo: Immutable.Map(action.payload)
            };
        case ActionType.GET_LOCAL_USER_INFO:
            return {
                ...state,
                localUserInfo: Immutable.Map(action.payload)
            };
        case ActionType.GET_LOGOUT:
            return {
                ...state
            };
        default:
            return state;
    }
}