'use strict';

import webapi from 'services/webapi';

const heartclockService = {
    /**
    * 获取心率测定记录
    */
    getHeartTestRecord(successback, failback, requestid) {
        webapi.callAPI('getHeartTestRecord', { _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                for(let i = 0; i < data.data.list.length; i++) {
                    const date = new Date(data.data.list[i]['utime']*1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const seconds = date.getSeconds();
                    data.data.list[i]['utime'] = year +"-"+ ('0' + month).substr(-2) +"-"+('0' + day).substr(-2)+" "
                    +('0' + hours).substr(-2)+":"+('0' + minutes).substr(-2)+":"+('0' + seconds).substr(-2);
                }
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 获取心率定时列表
    */
    getHeartClockList(successback, failback, requestid) {
        webapi.callAPI('getHeartClockList', { _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 添加心率定时
    * time: '02:11'
    */
    addHeartClock(time, successback, failback, requestid) {
        webapi.callAPI('addHeartClock', { time , _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 删除心率定时
    * clockid: 定时id
    */
    deleteHeartClock(clockid, successback, failback, requestid) {
        webapi.callAPI('deleteHeartClock', { clock_id: clockid, _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },

    /**
    * 修改心率定时
    * clockid: 定时id
    * time: '02:12'
    */
    modifyHeartClock(clockid, time, successback, failback, requestid) {
        webapi.callAPI('modifyHeartClock', { clock_id: clockid, time, _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    },
};

export default heartclockService;
