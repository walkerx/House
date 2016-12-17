'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    requestError: false,
    modelDetailList: Immutable.List(),
    modelHotList:  Immutable.List(),
    modelAllList: Immutable.List()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.GET_MODEL_DETAIL:
            return {
                ...state,
                modelDetailList: state.modelDetailList.push(Immutable.fromJS(action.payload)),
                requestError: false
            };
        case ActionType.DELETE_MODEL_DETAIL:
            return {
                ...state,
                modelDetailList: state.modelDetailList.pop(),
                requestError: false
            };
        case ActionType.GET_HOT_MODEL_LIST:
            return {
                ...state,
                modelHotList: Immutable.fromJS(action.payload),
                requestError: false
            };
        case ActionType.GET_ALL_MODEL_LIST:
            let result = action.meta.type === 0 ?
                Immutable.fromJS(action.payload) :
                state.modelAllList.concat(Immutable.fromJS(action.payload));
            return {
                ...state,
                modelAllList: result,
                requestError: false
            };
        case ActionType.DELETE_MODEL_ALL:
            return {
                ...state,
                modelAllList: Immutable.List()
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