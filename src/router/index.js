import Vue from 'vue';
import VueRouter from 'vue-router';

//import health from 'pages/health';
//import healthSport from 'pages/health/sport';
//import healthSleep from 'pages/health/sleep';
//import healthHeart from 'pages/health/heart';
//import expert from 'pages/expert';
//import expertGrowLine from 'pages/expert/growline.vue';
//import expertGrowRecord from 'pages/expert/growrecord.vue';
//import setting from 'pages/setting';
//import security from 'pages/security';
//import heartClock from 'pages/heartclock.vue';
//import heartClockList from 'pages/heartclocklist.vue';
//import clock from 'pages/clock';
//import clockWorkday from 'pages/clock/workday';
//import clockWeekend from 'pages/clock/weekend';
//import clockAll from 'pages/clock/all';
//import apps from 'pages/apps';
//import achive from 'pages/achive';
//import nowAchive from 'pages/achive/nowachive';
//import allAchive from 'pages/achive/allachive';
//import rank from 'pages/achive/rank';
//import task from 'pages/achive/task';
//import paibandfaq from 'pages/paibandfaq';
//import mypaiband from 'pages/mypaiband';
//import flowers from 'pages/flowers';
//import flowersrecord from 'pages/flowersrecord';
const health = r => { require.ensure([], () => { r(require('pages/health')) }, 'health') };
const healthSport = r => { require.ensure([], () => { r(require('pages/health/sport')) }, 'health_sport') };
const healthSleep = r => { require.ensure([], () => { r(require('pages/health/sleep')) }, 'health_sleep') };
const healthHeart = r => { require.ensure([], () => { r(require('pages/health/heart')) }, 'health_heart') };
const expert = r => { require.ensure([], () => { r(require('pages/expert')) }, 'expert') };
const setting = r => { require.ensure([], () => { r(require('pages/setting')) }, 'setting') };
const security = r => { require.ensure([], () => { r(require('pages/security')) }, 'security') };
const heartClockList = r => { require.ensure([], () => { r(require('pages/heartclocklist')) }, 'heartclocklist') };
const clock = r => { require.ensure([], () => { r(require('pages/clock')) }, 'clock') };
const clockAll = r => { require.ensure([], () => { r(require('pages/clock/all')) }, 'clock_all') };
const achive = r => { require.ensure([], () => { r(require('pages/achive')) }, 'achive') };
const task = r => { require.ensure([], () => { r(require('pages/achive/task')) }, 'achive_task') };
const paibandfaq = r => { require.ensure([], () => { r(require('pages/paibandfaq')) }, 'paibandfaq') };
const mypaiband = r => { require.ensure([], () => { r(require('pages/mypaiband')) }, 'mypaiband') };
const flowers = r => { require.ensure([], () => { r(require('pages/flowers')) }, 'flowers') };
const flowersrecord = r => { require.ensure([], () => { r(require('pages/flowersrecord')) }, 'flowersrecord') };

Vue.use(VueRouter);

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: false
});

router.map({
    '/health': {
        name: 'health',
        component: health,
        subRoutes: {
            '/sport': {
                name: 'health-sport',
                component: healthSport
            },
            '/sleep': {
                name: 'health-sleep',
                component: healthSleep
            },
            '/heart': {
                name: 'health-heart',
                component: healthHeart
            }
        }
    },
    '/expert': {
        name: 'expert',
        component: expert
    },
    '/paibandfaq': {
        name: 'paibandfaq',
        component: paibandfaq
    },
    '/flowers': {
        name: 'flowers',
        component: flowers
    },
    '/flowersrecord': {
        name: 'flowersrecord',
        component: flowersrecord
    },
    '/mypaiband': {
        name: 'mypaiband',
        component: mypaiband
    },
    //'/growline': {
        //name: 'expert-growline',
        //component: expertGrowLine
    //},
    //'/growrecord': {
        //name: 'expert-growrecord',
        //component: expertGrowRecord
    //},
    '/setting': {
        name: 'setting',
        component: setting
    },
    '/security': {
        name: 'security',
        component: security
    },
    //'/heartclock': {
        //name: 'heartclock',
        //component: heartClock
    //},
    '/heartclocklist': {
        name: 'heartclocklist',
        component: heartClockList
    },
    '/clock': {
        name: 'clock',
        component: clock,
        subRoutes: {
            //'/workday': {
                //name: 'clock-workday',
                //component: clockWorkday
            //},
            //'/weekend': {
                //name: 'clock-weekend',
                //component: clockWeekend
            //},
            '/all': {
                name: 'clock-all',
                component: clockAll
            }
        }
    },
    //'/apps': {
        //name: 'apps',
        //component: apps
    //},
    '/achive': {
        name: 'achive',
        component: achive,
        subRoutes: {
            //'/nowachive': {
                //name: 'achive-nowachive',
                //component: nowAchive
            //},
            //'/allachive': {
                //name: 'achive-allachive',
                //component: allAchive
            //},
            //'/rank': {
                //name: 'achive-rank',
                //component: rank
            //},
            '/task': {
                name: 'achive-task',
                component: task
            }
        }
    }
});

export default router;
