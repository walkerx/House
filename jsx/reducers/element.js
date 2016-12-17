'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    requestError: false,
    elements: Immutable.Map()   // {tag:[elements]}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ActionType.GET_ELEMENT_LIST:
            var elements = action.meta.type === 0 ?
                Immutable.fromJS(action.payload.albums) :
                state.elements.get(action.meta.tag).concat(Immutable.fromJS(action.payload.albums));
            return {
                ...state,
                elements: state.elements.set(action.meta.tag,elements),
                requestError: false
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