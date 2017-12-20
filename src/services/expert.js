'use strict';

import db from 'dbs/hashmap';

import jutils from 'jutils';

import webapi from 'services/webapi';

const expertService = {
    /**
    * 获取孩子信息及专家策略信息
    */
    getStrategy(successback, failback, requestid) {
        webapi.callAPI('getExpertStrategy', { _request_id: requestid }, data => {
            if(data['http_code'] === 200) {
                if(successback && typeof successback === 'function') {
                    successback(data);
                }
            } else {
                if(successback && typeof successback === 'function') {
                    successback(data);
                }
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 获取身高增长曲线
    */
    getHeightGrowing(endtime, successback, failback, requestid) {
        if(db.get('isLocalTest')) {
            successback({
                http_code: 200,
                data:[
                    {
                        height:"20",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        height:"30",
                        status:"0",
                        time:"2016-08-12"
                    },
                    {
                        height:"50",
                        status:"0",
                        time:"2016-08-13"
                    },
                    {
                        height:"50",
                        status:"0",
                        time:"2016-08-14"
                    },
                    {
                        height:"10",
                        status:"0",
                        time:"2016-08-15"
                    },
                ]
            });
            return;
        }
        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        endtime = endtime ? endtime.toString() : '';
        const end = endtime ? +(new Date(endtime.substr(0, 4), endtime.substr(4, 2) - 1, 
            endtime.substr(6, 2), 23, 59, 59)) * 0.001 : Math.floor(+(new Date()) * 0.001);
        const start = +(new Date(end * 1000 - 7 * 24 * 60 * 60 * 1000)) * 0.001;
        const params = Object.assign({ _request_id: requestid }, {
            time_start: start,
            time_end: end
        });
        //console.log('getHeightGrowing',params);
        webapi.callAPI('getExpertHeightGrowing', params, data => {
            //console.log("getHeightGrowing",data);
            if(data['error_code'] === 0) {
                if(successback && typeof successback === 'function') {
                    for(let i = 0; i < data.data.length; i++) {
                        const date = new Date(data.data[i]['time'] * 1000);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        data.data[i]['time'] = [year, ('0' + month).substr(-2), ('0' + day).substr(-2)].join('-');
                    }
                    data.http_code = 200;
                    successback(data);
                }
            } else {
                if(successback && typeof successback === 'function') {
                    data.http_code = 201;
                    successback(data);
                }
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 获取体重增长曲线
    */
    getWeightGrowing(endtime, successback, failback, requestid) {
        if(db.get('isLocalTest')) {
            successback({
                error_code: 0,
                data:[
                    {
                        weight:"40",
                        status:"0",
                        bmi:"12",
                        time:"2016-08-11"
                    },
                    {
                        weight:"30",
                        status:"0",
                        bmi:"12",
                        time:"2016-08-12"
                    },
                    {
                        weight:"10",
                        status:"0",
                        bmi:"12",
                        time:"2016-08-13"
                    },
                    {
                        weight:"50",
                        status:"0",
                        bmi:"12",
                        time:"2016-08-14"
                    },
                    {
                        weight:"20",
                        status:"0",
                        bmi:"12",
                        time:"2016-08-15"
                    },
                ]
            });
            return;
        }

        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        endtime = endtime ? endtime.toString() : '';
        const end = endtime ? +(new Date(endtime.substr(0, 4), endtime.substr(4, 2) - 1, endtime.substr(6, 2), 23, 59, 59)) * 0.001 : Math.floor(+(new Date()) * 0.001);
        const start = +(new Date(end * 1000 - 7 * 24 * 60 * 60 * 1000)) * 0.001;
        const params = Object.assign({ _request_id: requestid }, {
            time_start: start,
            time_end: end
        });
        console.log("params",params);
        webapi.callAPI('getExpertWeightGrowing', params, data => {
            console.log("data",data);
            if(data['error_code'] === 0) {
                if(successback && typeof successback === 'function') {
                    for(let i = 0; i < data.data.length; i++) {
                        const date = new Date(data.data[i]['time'] * 1000);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        data.data[i]['time'] = [year, ('0' + month).substr(-2), ('0' + day).substr(-2)].join('-');
                    }
                    data.http_code = 200;
                    successback(data);
                }
            } else {
                if(successback && typeof successback === 'function') {
                    data.http_code = 201;
                    successback(data);
                }
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 获取身高记录
    */
    getHeightRecords(endtime, successback, failback, requestid) {
        if(db.get('isLocalTest')) {
            successback({
                data:[
                    {
                        height:"40",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        height:"30",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        height:"10",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        height:"50",
                        status:"0",
                        time:"2016-08-14"
                    },
                    {
                        height:"20",
                        status:"0",
                        time:"2016-08-15"
                    },
                    {
                        height:"20",
                        status:"0",
                        time:"2016-06-15"
                    },
                ]
            });
            return;
        }


        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        endtime = endtime ? endtime.toString() : '';
        const end = endtime ? +(new Date(endtime.substr(0, 4), endtime.substr(4, 2) - 1, endtime.substr(6, 2), 23, 59, 59)) * 0.001 : Math.floor(+(new Date()) * 0.001);
        const start = +(new Date(end * 1000 - 180 * 24 * 60 * 60 * 1000)) * 0.001;
        const params = Object.assign({ _request_id: requestid }, {
            time_start: start,
            time_end: end
        });
        //console.log('getHeightRecords',params);
        webapi.callAPI('getExpertHeightRecords', params, data => {
            if(data['error_code'] === 0) {
                if(successback && typeof successback === 'function') {
                    for(let i = 0; i < data.data.length; i++) {
                        const date = new Date(data.data[i]['time'] * 1000);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        data.data[i]['time'] = [year, ('0' + month).substr(-2), ('0' + day).substr(-2)].join('-');
                    }
                    data.http_code = 200;
                    successback(data);
                }
            } else {
                if(successback && typeof successback === 'function') {
                    data.http_code = 201;
                    successback(data);
                }
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 获取体重记录
    */
    getWeightRecords(endtime, successback, failback, requestid) {
        if(db.get('isLocalTest')) {
            successback({
                data:[
                    {
                        weight:"40",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        weight:"30",
                        status:"0",
                        time:"2016-08-11"
                    },
                    {
                        weight:"10",
                        status:"0",
                        time:"2016-08-13"
                    },
                    {
                        weight:"50",
                        status:"0",
                        time:"2016-08-13"
                    },
                    {
                        weight:"20",
                        status:"0",
                        time:"2016-08-15"
                    },
                ]
            });
            return;
        }

        //需要创建一个requestid标记
        requestid === undefined && (requestid = jutils.makeSimpleGUID());

        endtime = endtime ? endtime.toString() : '';
        const end = endtime ? +(new Date(endtime.substr(0, 4), endtime.substr(4, 2) - 1, endtime.substr(6, 2), 23, 59, 59)) * 0.001 : Math.floor(+(new Date()) * 0.001);
        const start = +(new Date(end * 1000 - 180 * 24 * 60 * 60 * 1000)) * 0.001;
        const params = Object.assign({ _request_id: requestid }, {
            time_start: start, 
            time_end: end
        });
        webapi.callAPI('getExpertWeightRecords', params, data => {
            if(data['error_code'] === 0) {
                if(successback && typeof successback === 'function') {
                    for(let i = 0; i < data.data.length; i++) {
                        const date = new Date(data.data[i]['time'] * 1000);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        data.data[i]['time'] = [year, ('0' + month).substr(-2), ('0' + day).substr(-2)].join('-');
                    }
                    data.http_code = 200;
                    successback(data);
                }
            } else {
                if(successback && typeof successback === 'function') {
                    data.http_code = 201;
                    successback(data);
                }
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    }
};

export default expertService;
