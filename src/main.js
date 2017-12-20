'use strict';

import Vue from 'vue';
import jutils from 'jutils';

import chartPlugin from 'plugin/chartline';
import i18n from 'plugin/i18n';

import app from './app';
import router from 'router';
import db from 'dbs/hashmap';

import config from 'src/config';

//const lang = (jutils.getQueryString('lang') || []).pop();
const lang = 'en';
if(lang) {
    Vue.use(i18n, { lang });
} else {
    Vue.use(i18n);
}
db.set('lang', lang || 'cn');
/**
 * 使用方法:
 * 在script中可以使用this.$i18n('key') this.$lang
 * 在template中可以使用{{$i18n('key')}} {{$lang == 'en'}}
*/

Chart.defaults.global.tooltips.enabled = false;

const handleParam = (key, value, warning) => {
    if(value) {
        db.set(key, value);
    } else {
        alert(warning);
    }
};
const uid = (jutils.getQueryString('uid') || []).pop() || 6083543;
handleParam('uid', uid, 'no uid');
const token = (jutils.getQueryString('token') || []).pop() || '0b67517120414d4cb9ad21376d33431f';
handleParam('token', token, 'no token');
const appid = (jutils.getQueryString('appid') || []).pop() || 1101;
handleParam('appid', appid, 'no appid');
const openid = (jutils.getQueryString('openid') || []).pop() || 'openid';
handleParam('openid', openid, 'no openid');
const cid = (jutils.getQueryString('cid') || []).pop() || "60003426";
handleParam('cid', cid, 'no cid');

db.set('isSync', false);
db.set('isLocalTest', config.isLocalTest);
//启用debug模式
jutils.useDebug(config.isDebug);

if(db.get('isLocalTest')) {
    db.set('cid', 6083543);
}

router.start(app, '#app');

const resize = () => {
    const ratiox = document.body.clientWidth / 320;
    document.documentElement.style.fontSize = 16 * ratiox + 'px';

    db.set('ratio', ratiox);
    db.set('screenWidth', document.body.clientWidth);
    db.set('screenHeight', document.body.clientHeight);
};
window.addEventListener('resize', resize);
resize();

window.onerror = error => {
    jutils.debugAlert('捕获异常：\n' + JSON.stringify(error));
};
