'use strict';

import webapi from 'services/webapi';

const sleepService = {
    /**
    * 获取今天的睡眠数据统计
    */
    getToday(successback, failback, requestid) {
        webapi.callAPI('getSleepToday', { _request_id: requestid }, data => {
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
    * 获取以结束日期为准的前7天的运动数据统计
    * endtime如果为空，则最后一天是昨天 例如20160727
    */
    getLast7Days(endtime, successback, failback, requestid) {
        webapi.callAPI('getSleepWeek', { week_end: endtime, _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                for(let i = 0; i < data.data.data.length; i++) {
                    const date = new Date(data.data.data[i]['utime']*1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    // const hours = date.getHours();
                    // const minutes = date.getMinutes();
                    // const seconds = date.getSeconds();
                    data.data.data[i]['utime'] = year +"-"+ ('0' + month).substr(-2) +"-"+('0' + day).substr(-2);
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
    * 获取以结束日期为准的前30天的运动数据统计
    * endtime如果为空，则最后一天是昨天 例如20160727
    */
    getLast30Days(endtime, successback, failback, requestid) {
        webapi.callAPI('getSleepMonth', { month_end: endtime, _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                for(let i = 0; i < data.data.data.length; i++) {
                    const date = new Date(data.data.data[i]['utime']*1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    // const hours = date.getHours();
                    // const minutes = date.getMinutes();
                    // const seconds = date.getSeconds();
                    data.data.data[i]['utime'] = year +"-"+ ('0' + month).substr(-2) +"-"+('0' + day).substr(-2);
                }
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    }
};

export default sleepService;
