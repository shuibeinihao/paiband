'use strict';

import jutils from 'jutils';

import db from 'dbs/hashmap';

import jsb from 'services/jsb';
import expertService from 'services/expert';
import clockService from 'services/clock';
import heartclockService from 'services/heartclock';

const sync = {
    /**
    * 同步所有数据
    */
    sync(successback, failback) {
        sync.syncWrite(() => {
            setTimeout(() => {
                //同步写入数据成功回调
                sync.syncRead(() => {
                    //同步读取数据成功回调
                    successback && typeof successback === 'function' && successback();
                }, () => {
                    //同步读取数据失败回调
                    failback && typeof failback === 'function' && failback();
                });
            }, 0);
        }, () => {
            //同步写入数据失败
            failback && typeof failback === 'function' && failback();
        });
    },
    /**
     * 写入手环身高的同步
     */
    syncWriteHeight(height, successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        const nickname = db.get('nickname');
        jsb.syncBluetooth(deviceid, cid, 'write', 'grow', { nickname, height }, data => {
            if(deviceid === data.device_id && data.sync_type === 'write') {
                successback && typeof successback === 'function' && successback();
            }
        }, error => {
            if(deviceid === error.device_id && error.sync_type === 'write') {
                //jutils.debugAlert('syncWrite bluetoothSync\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            }
        });
    },
    /**
     * 写入手环体重的同步
     */
    syncWriteWeight(weight, successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        const nickname = db.get('nickname');
        jsb.syncBluetooth(deviceid, cid, 'write', 'grow', { nickname, weight }, data => {
            if(deviceid === data.device_id && data.sync_type === 'write') {
                successback && typeof successback === 'function' && successback();
            }
        }, error => {
            if(deviceid === error.device_id && error.sync_type === 'write') {
                //jutils.debugAlert('syncWrite bluetoothSync\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            }
        });
    },
    /**
     * 操作手环闹钟的同步
     */
    syncWriteClock(clock, successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        jsb.syncBluetooth(deviceid, cid, 'write', 'clock', { clock: clock }, data => {
            if(deviceid === data.device_id && data.sync_type === 'write' && data.data_type === 'clock') {
                successback && typeof successback === 'function' && successback();
            }
        }, error => {
            if(deviceid === error.device_id && error.sync_type === 'write') {
                //jutils.debugAlert('syncWriteClock Error\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            }
        });
    },
    /**
     * 操作手环定时心率的同步
     */
    syncWriteHeartClock(heartclock, successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        jsb.syncBluetooth(deviceid, cid, 'write', 'heart_clock', { clock_list: heartclock }, data => {
            if(deviceid === data.device_id && data.sync_type === 'write' && data.data_type === 'heart_clock') {
                successback && typeof successback === 'function' && successback();
            }
        }, error => {
            if(deviceid === error.device_id && error.sync_type === 'write') {
                //jutils.debugAlert('syncWriteClock Error\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            }
        });
    },
    /**
     * 写入手环数据的同步
     * 包含身高、体重、闹钟、定时心率
     */
    syncWrite(successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        const nickname = db.get('nickname');

        let height, weight, clock, heartClock;
        //获取身高数据
        const getHeight = (next) => {
            expertService.getHeightGrowing(undefined, data => {
                if(data.error_code == 0) {
                    if(data.data.length > 0) {
                        let date = 0;
                        for(let i = 0; i < data.data.length; i++) {
                            if(new Date(data.data[i]['time']) > new Date(date)) {
                                date = data.data[i]['time'];
                                height = parseInt(data.data[i]['height']);
                            }
                        }
                    } else {
                        height = 0;
                    }
                    next && typeof next === 'function' && next();
                } else {
                    //jutils.debugAlert('sync getHeightGrowing\n' + JSON.stringify(data));
                    failback && typeof failback === 'function' && failback();
                }
            }, error => {
                //jutils.debugAlert('sync getHeightGrowing\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            });
        };
        const getWeight = (next) => {
            expertService.getWeightGrowing(undefined, data => {
                if(data.error_code == 0) {
                    if(data.data.length > 0) {
                        let date = 0;
                        for(let i = 0; i < data.data.length; i++) {
                            if(new Date(data.data[i]['time']) > new Date(date)) {
                                date = data.data[i]['time'];
                                weight = parseInt(data.data[i]['weight']);
                            }
                        }
                    } else {
                        weight = 0;
                    }
                    next && typeof next === 'function' && next();
                } else {
                    //jutils.debugAlert('sync getWeightGrowing\n' + JSON.stringify(data));
                    failback && typeof failback === 'function' && failback();
                }
            }, error => {
                //jutils.debugAlert('sync getWeightGrowing\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            });
        };
        const getClock = (next) => {
            clockService.getClock(data => {
                if(data.http_code == 200) {
                    clock = [];
                    if(data.data.list && data.data.list.length > 0) {
                        const types = ['getup', 'study', 'motion', 'sleep', 'other'];
                        for(let i = 0; i < data.data.list.length; i++) {
                            const ck = data.data.list[i];
                            clock.push({ 
                                time: ck.time, 
                                type: types[ck.category],
                                repeat: parseInt(ck.repeat, 2) 
                            });
                        }
                    } 
                    next && typeof next === 'function' && next();
                } else {
                    //jutils.debugAlert('sync getClock\n' + JSON.stringify(data));
                    failback && typeof failback === 'function' && failback();
                }
            }, error => {
                //jutils.debugAlert('sync getClock\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            });
        };
        const getHeartClock = (next) => {
            heartclockService.getHeartClockList(data => {
                if(data.http_code == 200) {
                    if(data.data.list && data.data.list.length > 0) {
                        heartClock = [];
                        for(let i = 0; i < data.data.list.length; i++) {
                            heartClock.push(data.data.list[i]['time']);
                        }
                    }
                    next && typeof next === 'function' && next();
                } else {
                    //jutils.debugAlert('sync getClock\n' + JSON.stringify(data));
                    failback && typeof failback === 'function' && failback();
                }
            }, error => {
                //jutils.debugAlert('sync getClock\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            });
        };
        const bluetoothSync = (writedata) => {
            jsb.syncBluetooth(deviceid, cid, 'write', undefined, writedata, data => {
                if(deviceid === data.device_id && data.sync_type === 'write') {
                    successback && typeof successback === 'function' && successback();
                }
            }, error => {
                if(deviceid === error.device_id && error.sync_type === 'write') {
                    //jutils.debugAlert('syncWrite bluetoothSync\n' + JSON.stringify(error));
                    failback && typeof failback === 'function' && failback();
                }
            });
        };
        getHeight(() => {
            getWeight(() => {
                getClock(() => {
                    getHeartClock(() => {
                        const data = Object.assign({}, {
                            nickname: nickname,
                            height: height,
                            weight: weight,
                            clock: clock,
                            clock_list: heartClock
                        });
                        bluetoothSync(data);
                    });
                });
            });
        });
    },
    /**
     * 读取手环数据的同步
     * 包含运动、睡眠、心率
     */
    syncRead(successback, failback) {
        const cid = db.get('cid');
        const deviceid = db.get('device_id');
        jsb.syncBluetooth(deviceid, cid, 'read', undefined, undefined, data => {
            if(deviceid === data.device_id && data.sync_type === 'read') {
                successback && typeof successback === 'function' && successback();
            }
        }, error => {
            if(deviceid === error.device_id && error.sync_type === 'read') {
                //jutils.debugAlert('syncRead bluetoothSync\n' + JSON.stringify(error));
                failback && typeof failback === 'function' && failback();
            }
        });
    }
};

export default sync;
