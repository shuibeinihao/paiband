'use strict';

import Vue from 'vue';
import jutils from 'jutils';

import config from 'src/config';
import db from 'dbs/hashmap';

const addUserInfo = params => {
    const appid = db.get('appid');
    const token = db.get('token');
    const uid = db.get('uid');
    const cid = db.get('cid');
    return Object.assign(params, { appid, uid, token, cid });
};

const webapi = {
    /**
    * @param {String} name: api名称
    * @param {Function} successback: 成功回调
    *                   {
    *                       _request_id: xxxx-xxx-xxx-xxx 请求id
    *                   }
    * @param {Function} failback: 失败回调
    *                   {
    *                       type: xxxx ['no-api-name', 'error-api-name', 'api-fail']
    *                       message: xxxxx
    *                   }
    */ 
    'callAPI': (name, params = {}, successback = () => {}, failback = () => {}) => {
        if(name) {
            if(webapi._apis[name]) {
                (() => {
                    const requestid = params['_request_id'];
                    delete params['_request_id'];
                    webapi._apis[name](params, data => {
                        typeof successback === 'function' && successback(Object.assign(data, { _request_id: requestid}));
                    }, err => {
                        typeof failback === 'function' && failback({
                            type: 'api-fail',
                            status: err.status,
                            message: err.statusText
                        });
                    });
                })();
            } else {
                typeof failback === 'function' && failback({
                    type: 'error-api-name'
                });
            }
        } else {
            failback && typeof failback === 'function' && failback({
                type: 'no-api-name'
            });
        }
    },

    '_apis': {
        /**
        * 发送get请求
        * name 为api名称或者一个完整的url
        */
        '_startGetResource': (name, params, successback, failback) => {
            let url;
            if((/^https?:\/\//g).test(name)) {
                url = name;
            } else {
                if(typeof config.remoteURL === 'string') {
                    url = config.remoteURL + name;

                } else {
                    url = config.remoteURL[db.get('lang')] + name;
                }
            }
            jutils.ajax({
                method: 'get',
                url: url,
                dataType: 'json',
                data: params,
                success: result => {
                    successback(result);
                },
                fail: err => {
                    failback(err);
                }
            });
        },
        /**
        * 发送post请求
        * name 为api名称或者一个完整的url
        */
        '_startPostResource': (name, params, successback, failback) => {
            let url;
            if((/^https?:\/\//g).test(name)) {
                url = name;
            } else {
                if(typeof config.remoteURL === 'string') {
                    url = config.remoteURL + name;
                } else {
                    url = config.remoteURL[db.get('lang')] + name;
                }
            }
            jutils.ajax({
                method: 'post',
                url: url,
                dataType: 'json',
                header: {
                    contentType: 'form'
                },
                data: params,
                success: result => {
                    successback(result);
                },
                fail: err => {
                    failback(err);
                }
            });
        },
        //获取ota更新列表
        'getOtaVersionList': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/versions/upgrade', addUserInfo(params), successback, failback);
        },
        /**
        * 获取手环设备信息
        */
        'getChildrenDevices': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/paiband/childrenDevice', addUserInfo(params), successback, failback);
        },
        /**
        * 获取孩子个人信息
        */
        'getChildInfo': (params, successback, failback) => {
            const appid = db.get('appid');
            const token = db.get('token');
            const uid = db.get('uid');
            const cid = db.get('cid');
            Object.assign(params, {
                appid: appid,
                token: token,
                parent_uid: uid,
                child_uid: cid
            });
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/getChildrenInfoByParent', params, successback, failback);
        },
        /**
        * 获取今天的运动数据
        */
        'getSportToday': (params, successback, failback) => {
            //webapi._apis._startGetResource('/paiband/motion/index', addUserInfo(params), successback, failback);
            webapi._apis._startGetResource('/paiband/motion/daily', addUserInfo(params), successback, failback);
        },
        /**
        * 获取7天的运动数据
        */
        'getSportWeek': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/motion/week', addUserInfo(params), successback, failback);
        },
        /**
        * 获取30天的运动数据
        */
        'getSportMonth': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/motion/month', addUserInfo(params), successback, failback);
        },
        /**
        * 获取当天的睡眠数据
        */
        'getSleepToday': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/sleeping/index', addUserInfo(params), successback, failback);
        },
        /**
        * 获取7天的睡眠数据
        */
        'getSleepWeek': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/sleeping/week', addUserInfo(params), successback, failback);
        },
        /**
        * 获取30天的睡眠数据
        */
        'getSleepMonth': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/sleeping/month', addUserInfo(params), successback, failback);
        },
        /**
        * 获取当天的心率数据
        */
        'getHeartToday': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/heart/index', addUserInfo(params), successback, failback);
        },
        /**
        * 获取专家策略数据
        */
        'getExpertStrategy': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/strategy/index', addUserInfo(params), successback, failback);
        },
        /**
        * 获取身高增长曲线数据
        */
        'getExpertHeightGrowing': (params, successback, failback) => {
            const appid = db.get('appid');
            const token = db.get('token');
            const uid = db.get('uid');
            const cid = db.get('cid');
            Object.assign(params, {
                appid: appid,
                token: token,
                record_type: 'HEIGHT',
                parent_uid: uid,
                child_uid: cid
            });
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/grow', params, successback, failback);
        },
        /**
        * 获取体重增长曲线数据
        */
        'getExpertWeightGrowing': (params, successback, failback) => {
            const appid = db.get('appid');
            const token = db.get('token');
            const uid = db.get('uid');
            const cid = db.get('cid');
            Object.assign(params, {
                appid: appid,
                token: token,
                record_type: 'WEIGHT',
                parent_uid: uid,
                child_uid: cid
            });
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/grow', params, successback, failback);
        },
        /**
        * 获取身高增长记录数据
        */
        'getExpertHeightRecords': (params, successback, failback) => {
            const uid = db.get('uid');
            const appid = db.get('appid');
            const token = db.get('token');
            const cid = db.get('cid');
            Object.assign(params, {
                appid: appid,
                token: token,
                record_type: 'HEIGHT',
                parent_uid: uid,
                child_uid: cid,
            });
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/grow', params, successback, failback);
        },
        /**
        * 获取体重增长记录数据
        */
        'getExpertWeightRecords': (params, successback, failback) => {
            const appid = db.get('appid');
            const token = db.get('token');
            const uid = db.get('uid');
            const cid = db.get('cid');
            Object.assign(params, {
                appid: appid,
                token: token,
                record_type: 'WEIGHT',
                parent_uid: uid,
                child_uid: cid
            });
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/grow', params, successback, failback);
        },
        /**
        * 获取专家预警信息
        */
        'getExpertWarning': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/strategy/readWarningTips', addUserInfo(params), successback, failback);
        },
        'getClockData': (params, successback, failback) => {

            webapi._apis._startGetResource('/paiband/clock/settings', addUserInfo(params), successback, failback);
        },
        /**
        * 获取成绩单公共成绩
        */
        'getAchiveCommon': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/achievement/common', addUserInfo(params), successback, failback);
        },
         /**
        * 获取成绩单成就列表
        */
        'getAchiveList': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/achievement/list', addUserInfo(params), successback, failback);
        },
        /**
        * 获取成绩单总星星数排行榜
        */
        'getAchiveRank': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/achievement/rank', addUserInfo(params), successback, failback);
        },
        /**
        * 获取成绩单-成就列表-领取每日成就
        */
        'getRewardToday': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/achievement/rewardToday', addUserInfo(params), successback, failback);
        },
        /**
        * 获取成绩单-成就列表-领取长期成就
        */
        'getrewardLongTerm': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/achievement/rewardLongTerm', addUserInfo(params), successback, failback);
        },
        //获取闹钟信息，删除闹钟，添加闹钟，修改闹钟
        'deleteClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/clock/delete', addUserInfo(params), successback, failback);
        },
        'addClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/clock/add', addUserInfo(params), successback, failback);
        },
        'editClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/clock/modify', addUserInfo(params), successback, failback);
        },
        'getSettingsData': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/child/settings', addUserInfo(params), successback, failback);
        },
        'setExpect': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/child/expectSetting', addUserInfo(params), successback, failback);
        },
        'setTarget': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/child/targetSetting', addUserInfo(params), successback, failback);
        },
        'setSleepTarget': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/child/targetSetting', addUserInfo(params), successback, failback);
        },
        'setUnBind': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/paiband/unbind', addUserInfo(params), successback, failback);
        },
        /**
        * 获取心率定时测定记录
        */
        'getHeartTestRecord': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/timer/heartLog', addUserInfo(params), successback, failback);
        },
        /**
        * 获取心率定时列表
        */
        'getHeartClockList': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/timer/settings', addUserInfo(params), successback, failback);
        },
        /**
        * 添加心率时钟
        */
        'addHeartClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/timer/add', addUserInfo(params), successback, failback);
        },
        /**
        * 修改心率时钟
        */
        'modifyHeartClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/timer/modify', addUserInfo(params), successback, failback);
        },
        /**
        * 删除心率时钟
        */
        'deleteHeartClock': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/timer/delete', addUserInfo(params), successback, failback);
        },
        /**
        * 获取应用列表
        */
        'getAppList': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/paiband/appList', addUserInfo(params), successback, failback);
        },
        /**
        * 设置孩子信息
        * params: {
        *   height: xxx
        *   weight: xxx
        *   sign: xxx
        * }
        */
        'setChildInfo': (params, successback, failback) => {
            webapi._apis._startPostResource(config.remoteAccountURL + '/child/updateUserInfoByParent', params, successback, failback);
        },
        /**
        * 获取抬腕亮屏设置值
        */
        'getScreenData': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/screens/index', addUserInfo(params), successback, failback);
        },
        /**
        * 设置抬腕亮屏时间
        */
        'setScreenData': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/screens/settings', addUserInfo(params), successback, failback);
        },
         /**
        * 获得孩子当前小红花数据
        */
        'getFlowersData': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/flowers/index', addUserInfo(params), successback, failback);
        },
         /**
        * 小红花奖励/兑换记录列表
        */
        'getFlowersDataList': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/flowers/lists', addUserInfo(params), successback, failback);
        },
         /**
        * 小红花奖励/兑换
        */
        'settingsFlowers': (params, successback, failback) => {
            webapi._apis._startGetResource('/paiband/flowers/settings', addUserInfo(params), successback, failback);
        },
    }
};

let proxy_webapi;
if(config.isWebapiTest) {
    proxy_webapi = new Proxy(webapi, {
        get: (target, name) => {
            if(name === 'callAPI') {
                const ret = (name, params = {}, successback = () => {}, failback = () => {}) => {
                    const start = Date.now();
                    const sb = result => {
                        const time = Date.now() - start;
                        console.log('apiname: %s, time: %dms, param: %s', name, time, JSON.stringify(params));
                        const txt = `apiname: ${name}, time: ${time}ms, param: ${JSON.stringify(params)}`
                        jutils.ajax({
                            method: 'post',
                            url: 'http://webapi.fe.ptdev.cn/paiband/webapi',
                            data: txt
                        });
                        successback(result);
                    };
                    const fb = err => {
                        const time = Date.now() - start;
                        console.log('apiname: %s, time: %dms, param: %s', name, time, JSON.stringify(params));
                        const txt = `apiname: ${name}, time: ${time}ms, param: ${JSON.stringify(params)}`
                        jutils.ajax({
                            method: 'post',
                            url: 'http://webapi.fe.ptdev.cn/paiband/webapi',
                            data: txt
                        });
                        failback(err);
                    };
                    webapi.callAPI(name, params, sb, fb);
                };
                return ret;
            }
            return target[name];
        }
    });
}

export default proxy_webapi || webapi;
