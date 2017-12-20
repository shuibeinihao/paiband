'use strict';

import webapi from 'services/webapi';

const heartService = {
    /**
    * 获取今天的心率数据统计
    */
    getToday(successback, failback, requestid) {
        webapi.callAPI('getHeartToday', { _request_id: requestid }, data => {
            if(successback && typeof successback === 'function') {
                successback(data);
            }
        }, error => {
            if(failback && typeof failback === 'function') {
                failback(error);
            }
        });
    }
};

export default heartService;
