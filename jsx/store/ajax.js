'use strict';

import config from '../config';
import qs from 'query-string';
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, params) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    let url = 'http://' + config.we.api + adjustedPath;
    if (params) {
        url += '?' + qs.stringify(params);
    }
    return url;
}

export default class Ajax {
    constructor() {
        methods.forEach((method) =>
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = fetch(formatUrl(path, params), {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                request
                    .then((res) => {
                        return resolve(res);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error)
                    });
            }));
    }
}
