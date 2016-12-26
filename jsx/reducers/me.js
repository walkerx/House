'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    userInfo: Immutable.Map(),
    localUserInfo: Immutable.Map(),
    systemInfo: Immutable.Map()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.GET_USER_INFO:
            return {
                ...state,
                userInfo: Immutable.Map(action.payload)
            };
        case ActionType.CLEAR_USER_INFO:
            return {
                ...state,
                userInfo: Immutable.Map()
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
        case ActionType.GET_SYSTEM_INFO:
            return {
                ...state,
                systemInfo: Immutable.fromJS(action.payload)
            };
        default:
            return state;
    }
}