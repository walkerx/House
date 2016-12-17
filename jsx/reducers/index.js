'use strict';

import { combineReducers } from 'redux';

import main from './main';
import element from './element';
import album from './album';
import model from './model';
import me from './me';
import login from './login';
import errorInfo from './errorInfo';
import vip from './vip';

export default combineReducers({
    main,
    element,
    album,
    model,
    me,
    login,
    errorInfo,
    vip
});