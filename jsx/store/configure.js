'use strict';

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import asyncMiddleware from './middleware';
import Ajax from './ajax';
import asyncStorage from './asyncStorage';

const ajax = new Ajax();

export default function configure() {
    let middlewares = [
        asyncMiddleware(ajax),
        asyncStorage()
    ];
    return applyMiddleware(...middlewares)(createStore)(reducers);
};
