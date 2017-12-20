'use strict';

const config = {
    //版本号相关

    version: '1.3.11 build-20170328v02',
    showVersion: false,

    //使用debug模式，jutils.debugAlert生效
    isDebug: false,
    //使用本地测试模式，部分数据为本地数据
    isLocalTest: false,
    /*
     * 测试webpai获取数据时间消耗
     * 记录服务http://webpai.fe.ptdev.cn/paiband/webapi
     * 记录文件/data/logs/paiband_webapi.txt
     */
    isWebapiTest: false,

    //业务相关
    //remoteURL: 'http://api-paiband.ptdev.cn',

    //测试
     remoteURL: {
         'cn': 'http://api-paiband-test.ptdev.cn',
         'en': 'http://api-paiband-en-test.ptdev.cn'
     },

    //产线
    //remoteURL: {
        //'cn': 'http://api-paiband.putao.com',
        //'en': 'http://api-paiband-en.putao.com'
    //},

    //帐号相关
    //remoteAccountURL: 'http://children-account-dev.ptdev.cn', //开发
    remoteAccountURL: 'http://children-account.ptdev.cn', //测试
    //remoteAccountURL: 'https://children-account.putao.com', //产线

    //remoteAvaterURL: 'http://weidu.file.dev.putaocloud.com/file/', //开发
    remoteAvaterURL: 'http://weidu.file.dev.putaocloud.com/file/', //测试
    //remoteAvaterURL: 'http://weidu-file.putaocloud.com/file/', //产线
};

export default config;
