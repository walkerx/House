'use strict';

import {ActionType} from '../constants/index';
import Immutable from 'immutable';

const initialState = {
    requestError: false,
    albumDetailList: Immutable.List(),
    albumMoreList: Immutable.List()
};

export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case ActionType.GET_ALBUM_DETAIL:
            return {
                ...state,
                albumDetailList: state.albumDetailList.push(Immutable.fromJS(action.payload)),
                requestError: false
            };
        case ActionType.GET_ALBUM_MORE:
            let albumMoreList = state.albumMoreList;
            if(action.meta.type === 0){
                albumMoreList = state.albumMoreList.push(Immutable.fromJS(action.payload))
            }else{
                if(state.albumMoreList.last()){
                    let value = state.albumMoreList.last().get('albums').concat(Immutable.fromJS(action.payload.albums));
                    albumMoreList =  state.albumMoreList.pop().push(Immutable.fromJS({albums:value.toJS()}));
                }
            }
            return {
                ...state,
                albumMoreList: albumMoreList,
                requestError: false
            };
        case ActionType.DELETE_ALBUM_DETAIL:
            return {
                ...state,
                albumDetailList: state.albumDetailList.pop(),
                albumMoreList: state.albumMoreList.pop()
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