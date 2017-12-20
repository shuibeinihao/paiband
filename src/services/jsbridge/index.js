'use strict';

import jutils from 'jutils';

//存储请求的回调
const listenHandlers_map = {};

const jsbridge = {
    'dispatch': (type, data) => {
        jsbridge._call(Object.assign({ data }, { type }));
    },

    'hasListen': (type, func) => {
        if(typeof type === 'string' && typeof func === 'function') {
            if(listenHandlers_map[type]) {
                const idx = listenHandlers_map[type].indexOf(func);
                if(idx > 0) {
                    return true;
                }
                return false;
            }
            return false;
        }

        if(typeof type === 'string' && func === undefined) {
            if(listenHandlers_map[type]) {
                return listenHandlers_map[type].length > 0;
            }
            return false;
        }

        return false;
    },

    'listen': (type, func) => {
        if(typeof type === 'string' && typeof func === 'function') {
            if(!window.ptjssdk.events[type]) {
                jsbridge._on(type, data => {
                    console.log('native=>js:', JSON.stringify(data));
                    const funcs = listenHandlers_map[type];
                    for(let i = 0; i < funcs.length; i++) {
                        funcs[i](data);
                    }
                });
            }
            if(listenHandlers_map[type] === undefined) {
                listenHandlers_map[type] = [];
            }
            if(listenHandlers_map[type].indexOf(func) < 0) {
                listenHandlers_map[type].push(func);
            }
            return true;
        }

        return false;
    },

    'removeListen': (type, func) => {
        if(typeof type === 'string' && typeof func === 'function') {
            if(listenHandlers_map[type]) {
                const idx = listenHandlers_map[type].indexOf(func);
                if(idx > 0) {
                    listenHandlers_map[type].splice(idx, 1);
                    return true;
                }
                return false;
            }
            return false;
        }

        if(typeof type === 'string' && func === undefined) {
            if(listenHandlers_map[type]) {
                listenHandlers_map[type] = [];
            }
            return false;
        }
    },

    '_call': data => {
        if(typeof data['type'] === 'string') {
            console.log('js=>native:', JSON.stringify(data));
            if(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.paiband) {
                window.webkit.messageHandlers.paiband.postMessage(data);
            } else {
                const type = 'paiband/' + data['type'] + '/';
                window.ptjssdk.connecting(type, JSON.stringify(window.ptjssdk.fliterCallback(data['data'])));
            }
        }
    },

    '_on': (type, func) => {
        if(typeof type === 'string') {
            window.ptjssdk.on(type, func);
        }
    }
};

//蓝牙状态回调
//jsbridge._on('bluetooth-status', status => {
    //_request_id: xxxx  //如果之前传入，则原样返回
    //device_id: xxx //设备id
    //status: 0 //0未打开手机蓝牙 1已经连接 2连接中  3未找到指定设备（断开）
//});

export default jsbridge;
