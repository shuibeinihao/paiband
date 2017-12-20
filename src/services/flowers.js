'use strict';

import webapi from 'services/webapi';

const flowersService = {
    /**
    * 获得孩子当前小红花数据
    */
    getFlowers(successback, failback, requestid) {
        webapi.callAPI('getFlowersData', { _request_id: requestid }, data => {
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
    * 小红花奖励/兑换记录列表
    */
    getFlowersList(page,pagesize,successback, failback, requestid) {
        webapi.callAPI('getFlowersDataList', { _request_id: requestid,page:page,pagesize:pagesize, }, data => {
            if(successback && typeof successback === 'function') {
                for(let i = 0; i < data.data.data.length; i++) {
                    const date = new Date(data.data.data[i]['create_time']*1000);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const seconds = date.getSeconds();
                    data.data.data[i]['create_time'] = [('0' + day).substr(-2)+"/" + ('0' + month).substr(-2)+"/"+ year] + ' ' + [('0' + hours).substr(-2),('0' + minutes).
                    substr(-2),('0' + seconds).substr(-2)].join(':');
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
    * 奖励/兑换小红花
    */
    settingsFlowers(settings_flowers_config,successback, failback, requestid) {
        let params = Object.assign({ _request_id: requestid },settings_flowers_config);
        webapi.callAPI('settingsFlowers', params , data => {
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

export default flowersService;
