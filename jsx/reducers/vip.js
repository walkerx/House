'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    vipList: Immutable.List(),
    wxPayResult: Immutable.Map(),
    aliPayResult: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.GET_VIP_LIST:
            return {
                ...state,
                vipList: Immutable.fromJS(action.payload)
            };
        case ActionType.POST_WX_PAY:
            return {
                ...state,
                wxPayResult: Immutable.fromJS(action.payload)
            };
        case ActionType.POST_ALI_PAY:
            return {
                ...state,
                aliPayResult: action.payload
            };
        default:
            return state;
    }
}