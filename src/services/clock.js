'use strict';

import webapi from 'services/webapi';

const clockService = {
    /**
    * 获取时钟设定
    */
    getClock(successback, failback, requestid) {
        webapi.callAPI('getClockData', { _request_id: requestid }, data => {
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
    * 删除闹钟
    */
    deleteClock(clock_id, successback, failback, requestid) {
        const params = Object.assign({ _request_id: requestid }, {
            clock_id: clock_id,
        });
        webapi.callAPI('deleteClock', params, data => {
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
    * 添加闹钟
    */
    addClock(clock_add_config, successback, failback, requestid) {
        const params = Object.assign({ _request_id: requestid }, clock_add_config);
        webapi.callAPI('addClock', params, data => {
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
    * 修改闹钟
    */
    editClock(clock_edit_config, successback, failback, requestid) {
        const params = Object.assign({ _request_id: requestid }, clock_edit_config);
        webapi.callAPI('editClock', params, data => {
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
    * 获取抬腕亮屏设置值
    */
    getScreen(successback, failback, requestid) {
        webapi.callAPI('getScreenData', { _request_id: requestid }, data => {
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
    * 设置腕亮屏时间
    */
    setScreen(set_screen_config,successback, failback, requestid) {
        const params = Object.assign({ _request_id: requestid }, set_screen_config);
        webapi.callAPI('setScreenData', params, data => {
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

export default clockService;
