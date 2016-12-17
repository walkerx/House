'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    errResult: Immutable.Map(),
    resultId: 0,
    errAuth:  Immutable.Map(),
    authId: 0
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.RESULT_ERROR:
            return {
                ...state,
                resultId: state.resultId + 1,
                errResult:  Immutable.Map({id: state.resultId + 1,msg:action.payload})
            };
        case ActionType.AUTH_FAIL:
            return {
                ...state,
                authId: state.authId + 1,
                errAuth: Immutable.Map({id: state.authId + 1,msg: action.payload})
            };
        default:
            return state;
    }
}