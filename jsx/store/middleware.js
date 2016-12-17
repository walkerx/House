import {ActionType} from '../constants/index';

export default function asyncMiddleware(ajax) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {promise, type, loading, ...rest} = action;
            if (!promise) return next(action);
            const SUCCESS = type;
            const PENDING = type + '_PENDING';
            const FAILURE = type + '_FAILURE';
            //next({...rest, type: PENDING});//占时统一处理loading
            next({...rest, type: PENDING});
            const actionPromise = promise(ajax);
            actionPromise
                .then((res) => {
                    if(res.status === 200){
                        return res.json();
                    }else if(res.status === 401){
                        return next({...rest, error: true, payload: '登录凭证过期,请重启登录', type: ActionType.AUTH_FAIL})
                    }else{
                        return next({...rest, error: true, payload: 'Internal Server Error', type: ActionType.REQUEST_ERROR})
                    }
                })
                .then((resJson) => {
                    if (resJson.result === 1) {
                        return next({...rest, payload: resJson.data, type: SUCCESS});
                    } else {
                        return next({...rest, error: true, payload: resJson.data, type: ActionType.RESULT_ERROR});
                    }
                }).catch((error)=> {
                    console.log(error)
                    next({...rest, error: true, payload: error, type: ActionType.REQUEST_ERROR});
                });
            return actionPromise;
        };
    };
}
