/**
 * http请求
 */

import assign from 'object-assign';

export default (url, req, method) => {
    if (!method || (method.toUpperCase() != 'GET' && method.toUpperCase() != 'POST')) {
        method = 'GET';
    }

    let request = {
        method: method.toUpperCase(),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    var merge = assign({}, request, req);

    if (__DEV__) {
        // console.log(url, merge);
    }

    return new Promise((resolve, reject) => {
        fetch(url, merge)
            .then((res) => res.json())
            .then((res) => {
                if (__DEV__) {
                    // console.log(JSON.stringify(res, null, 2));
                }
                resolve(res);
            })
            .catch((err) => {
                if (__DEV__) {
                    console.log(err);
                }
                reject(err);
            })
            .done();
    });
};
