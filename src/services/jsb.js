'use strict';

import jutils from 'jutils';

import db from 'dbs/hashmap';

import jsbridge from 'services/jsbridge';

const busi_map = {
    //busi_name: {
        //requestid: {
            //success: () => {},
            //fail: () => {}
        //}
    //}
};

const jsbService = {
    //获取系统信息
    'getSystemInfo': (deviceid, callback, requestid) => {
        console.log("deviceid",deviceid);

        if(db.get('isLocalTest')) {
            callback({
                'device_id': db.get('device_id'),
                'version': 'v1.2.1',
                'battery': 50
            });
            return;
        }

        const name = 'system-info';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                busi.success && typeof busi.success === 'function' && busi.success(data);
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid }, { _request_id: requestid }));
    },


    /**
    * 获取ip地址
    */
    'getIp': (successback, failback, requestid) => {
        const name = 'get-ip';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, { _request_id: requestid });
    },

     /**
     * 写入手环身高的同步
     */
    'syncWriteHeight': (height, cid, successback,failback, requestid) => {

        const name = 'update-height';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({height: height, cid: cid }, { _request_id: requestid }));
    },
    /**
     * 写入手环体重的同步
     */
    'syncWriteWeight': (weight, cid, successback,failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                failback({
                    'status': 1
                });
            }, 1000);
            return;
        }

        const name = 'update-weight';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({weight: weight, cid: cid}, { _request_id: requestid }));
    },

    /**
     * 写入手环抬腕亮屏开始时间
     */
    'syncWriteScreenTime': (time_info_config, device_id, successback,failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                failback({
                    'status': 1
                });
            }, 1000);
            return;
        }

        const name = 'bright_screen';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign(time_info_config,{ device_id: device_id}, { _request_id: requestid }));
    },

    /**
     * 写入手环抬腕小红花
     */
    'syncWriteFlowers': (flowers_info_config, device_id, successback,failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                failback({
                    'status': 1
                });
            }, 1000);
            return;
        }

        const name = 'flowers';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign(flowers_info_config,{ device_id: device_id}, { _request_id: requestid }));
    },

    /**
     * 安全距离监听蓝牙状态
     */
    'syncBlueSecurity': (btnstatus, failback, requestid) => {
        // failback({
        //     'status': false
        // });
        // return;
  
        const name = 'out-safeDistance';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, btnstatus, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status == false) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            //jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({btnstatus:btnstatus}, { _request_id: requestid }));
    },

    //ota更新
    'otaUpdate': (deviceid, version, url, progressback, resultback, requestid) => {
        //if(db.get('isLocalTest')) {
            //let s = 0;
            //setInterval(() => {
                //progressback({
                    //'device_id': db.get('deviceid'),
                    //'status': 1,
                    //'update_state': 'load_pack',
                    //update_progress: s,
                    //version: '1.0.0'
                //});
                //s += 10;
            //}, 1000);
            //return;
        //}

        const name = 'ota-update';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, resultback, progressback, requestid);

            //添加消息侦听
            const func = data => {
                if(jsbService._hasRegistedBusi(name, requestid)) {
                    //获取并处理注册的业务回调
                    const busi = jsbService._getRegistedBusi(name, requestid);
                    if(data.status === -1) {
                        busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                    } else if(data.status === 0) {
                        busi.success && typeof busi.success === 'function' && busi.success(data);
                        jsbService._unregistBusi(name, requestid);
                        jsbridge.removeListen(name, func);
                    } else if(data.status === 1) {
                        busi.success && typeof busi.success === 'function' && busi.success(data);
                        jsbService._unregistBusi(name, requestid);
                        jsbridge.removeListen(name, func);
                    }
                }
            };
            jsbridge.listen(name, func);
        }
        
        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid, ota_version: version, ota_pack_urls: url }, { _request_id: requestid }));
    },

    'encryptParam': (params, callback, requestid) => {
        if(db.get('isLocalTest')) {
            callback({
                'device_id': db.get('deviceid'),
                'sign': 'xxxxxxxxxx'
            });
            return;
        }

        const name = 'encrypt-sign';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                busi.success && typeof busi.success === 'function' && busi.success(data);
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ encrypt_data: params }, { _request_id: requestid }));
    },

    //关闭当前webview
    'closeWeb': () => {
        jsbridge.dispatch('close');
    },

    //历史记录回调
    'listenHistoryBack': (callback, requestid) => {
        const name = 'history-back';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);

            //添加消息侦听
            const func = data => {
                //通过_request_id识别是否为listen的回调
                if(jsbService._hasRegistedBusi(name, requestid)) {
                    //获取并处理注册的业务回调
                    const busi = jsbService._getRegistedBusi(name, requestid);
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                }
            };
            jsbridge.listen(name, func);
        }
    },

    //app唤醒
    'listenAppAwake': (callback, requestid) => {
        //if(db.get('isLocalTest')) {
            //setTimeout(callback, 2000);
            //return;
        //}

        const name = 're-awaken';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);

            //添加消息侦听
            const func = data => {
                //通过_request_id识别是否为getBluetoothStatus的回调
                if(jsbService._hasRegistedBusi(name, requestid)) {
                    const busi = jsbService._getRegistedBusi(name, requestid);
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                }
            };
            jsbridge.listen(name, func);
        }
    },

    //手机保存二维码
    'savePic': (callback, requestid) => {
        
        const name = 'save-pic';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                const busi = jsbService._getRegistedBusi(name, requestid);
                busi.success && typeof busi.success === 'function' && busi.success(data);
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name);
    },

    /**
    * 监测蓝牙状态
    * callback 状态回调
    */
    'listenBluetoothStatus': (callback, requestid) => {
        if(db.get('isLocalTest')) {
            callback({
                'device_id': db.get('deviceid'),
                'status': 0
            });
            return;
        }

        const name = 'bluetooth-status';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        console.log("蓝牙监听",requestid);
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, callback, undefined, requestid);

            //添加消息侦听
            const func = data => {
                //通过_request_id识别是否为getBluetoothStatus的回调
                if(!jsbService._hasRegistedBusi(name, data['_request_id'] || '')) {
                    console.log("转换前",data.status);
                    //获取并处理注册的业务回调
                    if(data.status === 0) {
                        data.status = 3;
                    } else if(data.status === 1) {
                        data.status = 0;
                    } else if(data.status === 2) {
                        data.status = 1;
                    } else if(data.status === 3) {
                        data.status = 2;
                    }
                    const busi = jsbService._getRegistedBusi(name, requestid);
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                }
            };
            jsbridge.listen(name, func);
        }
    },

    /**
    * 获取蓝牙状态
    * deviceid 蓝牙设备号
    */
    'getBluetoothStatus': (deviceid, successback, failback, requestid) => {
        if(db.get('isLocalTest')) {
            successback({
                'device_id': db.get('deviceid'),
                'status': 0
            });
            return;
        }

        const name = 'bluetooth-status';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, data['_request_id'])) {
                //获取并处理注册的业务回调
                if(data.status === 0) {
                    data.status = 3;
                } else if(data.status === 1) {
                    data.status = 0;
                } else if(data.status === 2) {
                    data.status = 1;
                } else if(data.status === 3) {
                    data.status = 2;
                }
                const busi = jsbService._getRegistedBusi(name, requestid);
                busi.success && typeof busi.success === 'function' && busi.success(data);
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid }, { _request_id: requestid }));
    },

    /**
    * 打开手机蓝牙
    */
    'openBluetooth': (successback, failback, requestid) => {
        const name = 'bluetooth-open';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, { _request_id: requestid });
    },

    /**
    * 连接手环蓝牙
    * deviceid  设备号
    */
    'connectBluetooth': (deviceid, requestid) => {
        const name = 'bluetooth-connect';
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid }, { _request_id: requestid }));
    },

    /**
    * 断开手环蓝牙
    * deviceid  设备号
    */

    'disconnectBluetooth': (deviceid, successback, failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                failback({
                    'device_id': db.get('deviceid'),
                    'status':1
                });
            }, 2000);
            return;
        }

        const name = 'bluetooth-disconnect';
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid }, { _request_id: requestid }));
    },

    /**
    * 同步手环数据
    * deviceid 设备号
    * cid 孩子id
    * synctype 同步类型 write写数据 read读数据
    * datatype 数据类型 
    *     read------motion运动数据  sleep睡眠数据  heart心率数据
    *     write-----grow成长数据  clock闹钟 heart_clock定时心率
    */
    'syncBluetooth': (deviceid, cid, synctype, datatype, data, successback, failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                successback({
                    'device_id': db.get('deviceid'),
                    'cid': cid,
                    'sync_type': synctype,
                    'data_type': datatype,
                    'status': 0
                });
            }, 2000);
            return;
        }

        const name = 'bluetooth-sync';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            //移除侦听
            jsbridge.removeListen(name, func);

            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid, cid: cid }, { _request_id: requestid, sync_type: synctype, data_type: datatype, data: data }));
    },

    /**
    * 测试心率
    * deviceid 设备号
    * cid 孩子id
    */
    'determineHeartRate': (deviceid, cid, successback, failback, requestid) => {
        if(db.get('isLocalTest')) {
            setTimeout(() => {
                failback({
                    'device_id': db.get('deviceid'),
                    'cid': cid,
                    'heart_rate': 79,
                    'status': 1
                });
            }, 2000);
            return;
        }

        const name = 'heartrate-determine';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status === 0) {
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                } else if(data.status === 1) {
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ device_id: deviceid }, { _request_id: requestid }));
    },

    /**
    * 显示选择器
    * title 选择器title
    * values 选择器数据[['a', 'b', 'c'], { from: 1, to: 20, step: 1}]
    * return {
    *   values: ['b', 10]
    *   status 0确认  1取消
    * }
    */
    'showSelector': (title, values, default_values, selectback, cancelback, requestid) => {
        if(db.get('isLocalTest')) {
            //假数据跟新身高体重winter
            // selectback({
            //             values:['159','.1'],
            //             status:0,
            //         });
            //假数据跟新身高体重winter
            const ret = [];
            for(let i = 0; i < values.length; i++) {
                if(values[i] instanceof Array) {
                    ret.push(values[i][Math.floor(Math.random() * values[i].length)]);
                } else {
                    ret.push(Math.floor(Math.random() * (values[i].to + 1 - values[i].from)) + values[i].from);
                }
            }
            selectback({
                values: ret,
                status: 0,
            });
            return;
        }

        const name = 'selector';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, selectback, cancelback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status == 0){
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                }else if(data.status == 1){
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({ title,values, default_values}, { _request_id: requestid }));
    },

    /**
    * 获取App通知设置状态
    * return {
    *   lock_screen: true //锁屏通知开启状态
    *   main_screen: true //锁屏通知开启状态
    *   sound: false //声音通知开启状态
    * }
    */
    'getNotificationStatus': (successback, failback, requestid) => {
        // successback({
        //     lock_screen: true, //锁屏通知开启状态
        //     main_screen: true, //锁屏通知开启状态
        //     sound: false //声音通知开启状态
        // })
        // return;
        const name = 'notification-status';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);

                busi.success && typeof busi.success === 'function' && busi.success(data);
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, { _request_id: requestid });
    },

    /**
    * 开启App通知
    * notificationtype: 'lock_screen' 'main_screen' 'sound'
    */
    'openNotificationStatus': (successback, failback, requestid) => {

        // successback({
        //     'status': 0
        // });
        // return;

        const name = 'notification-open';
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());
        //注册业务回调
        if(!jsbService._hasRegistedBusi(name, requestid)) {
            jsbService._registBusi(name, successback, failback, requestid);
        }
        //添加消息侦听
        const func = data => {
            if(jsbService._hasRegistedBusi(name, requestid)) {
                //获取并处理注册的业务回调
                const busi = jsbService._getRegistedBusi(name, requestid);
                if(data.status == 0){
                    busi.success && typeof busi.success === 'function' && busi.success(data);
                }else if(data.status == 1){
                    busi.fail && typeof busi.fail === 'function' && busi.fail(data);
                }
                //删除注册的业务回调
                jsbService._unregistBusi(name, requestid);
            }
            //移除侦听
            jsbridge.removeListen(name, func);
        };
        jsbridge.listen(name, func);

        //发送消息请求
        jsbridge.dispatch(name, Object.assign({}, { _request_id: requestid }));
    },

    '_hasRegistedBusi': (name, requestid) => {
        if(typeof name === 'string' && ['string', 'number'].indexOf(typeof requestid) > -1) {
            return !!(busi_map[name] && busi_map[name][requestid.toString()]);
        }

        if(typeof name === 'string' && requestid === undefined) {
            return !!(busi_map[name]);
        }

        return false;
    },

    '_registBusi': (name, successback, failback, requestid) => {
        if(typeof name === 'string' && ['string', 'number'].indexOf(typeof requestid) > -1) {
            busi_map[name] = busi_map[name] || {};
            busi_map[name][requestid.toString()] = Object.assign({}, { 
                'success': typeof successback === 'function' ? successback : undefined,
                'fail': typeof failback === 'function' ? failback : undefined
            });
            return true;
        }
        return false;
    },

    '_getRegistedBusi': (name, requestid) => {
        if(jsbService._hasRegistedBusi(name, requestid)) {
            if(typeof name === 'string' && ['string', 'number'].indexOf(typeof requestid) > -1) {
                return busi_map[name][requestid.toString()];
            } else if(typeof name === 'string' && requestid === undefined) {
                return busi_map[name];
            }
            return null;
        }
        return null;
    },

    '_unregistBusi': (name, requestid) => {
        if(jsbService._hasRegistedBusi(name, requestid)) {
            if(typeof name === 'string' && ['string', 'number'].indexOf(typeof requestid) > -1) {
                delete busi_map[name][requestid.toString()];
                return true;
            } else if(typeof name === 'string' && requestid === undefined) {
                delete busi_map[name];
                return true;
            }
            return false;
        }
        return false;
    }
};

export default jsbService;
