webpackJsonp([8,16],{18:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(7),s=n(a),o={getHeartTestRecord:function(e,t,i){s.default.callAPI("getHeartTestRecord",{_request_id:i},function(t){if(e&&"function"==typeof e){for(var i=0;i<t.data.list.length;i++){var n=new Date(1e3*t.data.list[i].utime),a=n.getFullYear(),s=n.getMonth()+1,o=n.getDate(),l=n.getHours(),p=n.getMinutes(),c=n.getSeconds();t.data.list[i].utime=a+"-"+("0"+s).substr(-2)+"-"+("0"+o).substr(-2)+" "+("0"+l).substr(-2)+":"+("0"+p).substr(-2)+":"+("0"+c).substr(-2)}e(t)}},function(e){t&&"function"==typeof t&&t(e)})},getHeartClockList:function(e,t,i){s.default.callAPI("getHeartClockList",{_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(e){t&&"function"==typeof t&&t(e)})},addHeartClock:function(e,t,i,n){s.default.callAPI("addHeartClock",{time:e,_request_id:n},function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},deleteHeartClock:function(e,t,i,n){s.default.callAPI("deleteHeartClock",{clock_id:e,_request_id:n},function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},modifyHeartClock:function(e,t,i,n,a){s.default.callAPI("modifyHeartClock",{clock_id:e,time:t,_request_id:a},function(e){i&&"function"==typeof i&&i(e)},function(e){n&&"function"==typeof n&&n(e)})}};t.default=o,e.exports=t.default},37:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAAL1QTFRFlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVAAAAlZWVAN1nXAAAAD50Uk5T72k+amO2JGI/uMdBgCZ8LVMJbGsvMctF7SwMvL70GwLoBEOKW9sRJVR3OTjz5A16/vvDNPE1Njw78vB4hwD51B0tAAABCklEQVRIx+3WyVLCQBAG4IgCIu4sgoiguJEASVjDSPf7P5YmKYHUbD3xwIH5j13zTVX36XfgH3EsPjLsFtfIZ5N5Pet3HkX4K0TU4RlDnE54/OGgFsc2o//wG+L7p3rDBUv/e+LwN+KAZrHVE+ANzY5WYIq3dr0CUyy0RCy2NLwUWxKWWQqWWgLe2QhMscJqscrqsNLq8FRldfgsSOw8AlNcKgCcBnKrwh5DH+Ak2LfecHhOwTfxrX51+cLdDbPP5LiWbOtnh1T8mt65mgs/d5M7X+XC8DDm70zG8NK+r0NeLIjFFh8ID3JjQq2Ic4l4LSg0DIm5pVcpLuM7UYmLKiM9DZsN23otNskPPytRDoXHyNsAAAAASUVORK5CYII="},39:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(4),s=n(a),o=i(7),l=n(o),p={getClock:function(e,t,i){l.default.callAPI("getClockData",{_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(e){t&&"function"==typeof t&&t(e)})},deleteClock:function(e,t,i,n){var a=(0,s.default)({_request_id:n},{clock_id:e});l.default.callAPI("deleteClock",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},addClock:function(e,t,i,n){var a=(0,s.default)({_request_id:n},e);l.default.callAPI("addClock",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},editClock:function(e,t,i,n){var a=(0,s.default)({_request_id:n},e);l.default.callAPI("editClock",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},getScreen:function(e,t,i){l.default.callAPI("getScreenData",{_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(e){t&&"function"==typeof t&&t(e)})},setScreen:function(e,t,i,n){var a=(0,s.default)({_request_id:n},e);l.default.callAPI("setScreenData",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})}};t.default=p,e.exports=t.default},46:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(4),s=n(a),o=i(7),l=n(o),p={getSettings:function(e,t,i){l.default.callAPI("getSettingsData",{_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(e){t&&"function"==typeof t&&t(e)})},setExpect:function(e,t,i,n){var a=(0,s.default)({_request_id:n},{expect_id:e});l.default.callAPI("setExpect",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},setTarget:function(e,t,i,n){var a=(0,s.default)({_request_id:n},{steps:e});l.default.callAPI("setTarget",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},setSleepTarget:function(e,t,i,n){var a=(0,s.default)({_request_id:n},{sleeping:e});l.default.callAPI("setSleepTarget",a,function(e){t&&"function"==typeof t&&t(e)},function(e){i&&"function"==typeof i&&i(e)})},setUnBind:function(e,t,i){l.default.callAPI("setUnBind",{_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(e){t&&"function"==typeof t&&t(e)})}};t.default=p,e.exports=t.default},47:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(4),s=n(a),o=i(3),l=(n(o),i(6)),p=n(l),c=i(8),d=n(c),r=i(40),u=n(r),f=i(39),g=n(f),A=i(18),h=n(A),_={sync:function(e,t){_.syncWrite(function(){setTimeout(function(){_.syncRead(function(){e&&"function"==typeof e&&e()},function(){t&&"function"==typeof t&&t()})},0)},function(){t&&"function"==typeof t&&t()})},syncWriteHeight:function(e,t,i){var n=p.default.get("cid"),a=p.default.get("device_id"),s=p.default.get("nickname");d.default.syncBluetooth(a,n,"write","grow",{nickname:s,height:e},function(e){a===e.device_id&&"write"===e.sync_type&&t&&"function"==typeof t&&t()},function(e){a===e.device_id&&"write"===e.sync_type&&i&&"function"==typeof i&&i()})},syncWriteWeight:function(e,t,i){var n=p.default.get("cid"),a=p.default.get("device_id"),s=p.default.get("nickname");d.default.syncBluetooth(a,n,"write","grow",{nickname:s,weight:e},function(e){a===e.device_id&&"write"===e.sync_type&&t&&"function"==typeof t&&t()},function(e){a===e.device_id&&"write"===e.sync_type&&i&&"function"==typeof i&&i()})},syncWriteClock:function(e,t,i){var n=p.default.get("cid"),a=p.default.get("device_id");d.default.syncBluetooth(a,n,"write","clock",{clock:e},function(e){a===e.device_id&&"write"===e.sync_type&&"clock"===e.data_type&&t&&"function"==typeof t&&t()},function(e){a===e.device_id&&"write"===e.sync_type&&i&&"function"==typeof i&&i()})},syncWriteHeartClock:function(e,t,i){var n=p.default.get("cid"),a=p.default.get("device_id");d.default.syncBluetooth(a,n,"write","heart_clock",{clock_list:e},function(e){a===e.device_id&&"write"===e.sync_type&&"heart_clock"===e.data_type&&t&&"function"==typeof t&&t()},function(e){a===e.device_id&&"write"===e.sync_type&&i&&"function"==typeof i&&i()})},syncWrite:function(e,t){var i=p.default.get("cid"),n=p.default.get("device_id"),a=p.default.get("nickname"),o=void 0,l=void 0,c=void 0,r=void 0,f=function(e){u.default.getHeightGrowing(void 0,function(i){if(0==i.error_code){if(i.data.length>0)for(var n=0,a=0;a<i.data.length;a++)new Date(i.data[a].time)>new Date(n)&&(n=i.data[a].time,o=parseInt(i.data[a].height));else o=0;e&&"function"==typeof e&&e()}else t&&"function"==typeof t&&t()},function(e){t&&"function"==typeof t&&t()})},A=function(e){u.default.getWeightGrowing(void 0,function(i){if(0==i.error_code){if(i.data.length>0)for(var n=0,a=0;a<i.data.length;a++)new Date(i.data[a].time)>new Date(n)&&(n=i.data[a].time,l=parseInt(i.data[a].weight));else l=0;e&&"function"==typeof e&&e()}else t&&"function"==typeof t&&t()},function(e){t&&"function"==typeof t&&t()})},_=function(e){g.default.getClock(function(i){if(200==i.http_code){if(c=[],i.data.list&&i.data.list.length>0)for(var n=["getup","study","motion","sleep","other"],a=0;a<i.data.list.length;a++){var s=i.data.list[a];c.push({time:s.time,type:n[s.category],repeat:parseInt(s.repeat,2)})}e&&"function"==typeof e&&e()}else t&&"function"==typeof t&&t()},function(e){t&&"function"==typeof t&&t()})},v=function(e){h.default.getHeartClockList(function(i){if(200==i.http_code){if(i.data.list&&i.data.list.length>0){r=[];for(var n=0;n<i.data.list.length;n++)r.push(i.data.list[n].time)}e&&"function"==typeof e&&e()}else t&&"function"==typeof t&&t()},function(e){t&&"function"==typeof t&&t()})},w=function(a){d.default.syncBluetooth(n,i,"write",void 0,a,function(t){n===t.device_id&&"write"===t.sync_type&&e&&"function"==typeof e&&e()},function(e){n===e.device_id&&"write"===e.sync_type&&t&&"function"==typeof t&&t()})};f(function(){A(function(){_(function(){v(function(){var e=(0,s.default)({},{nickname:a,height:o,weight:l,clock:c,clock_list:r});w(e)})})})})},syncRead:function(e,t){var i=p.default.get("cid"),n=p.default.get("device_id");d.default.syncBluetooth(n,i,"read",void 0,void 0,function(t){n===t.device_id&&"read"===t.sync_type&&e&&"function"==typeof e&&e()},function(e){n===e.device_id&&"read"===e.sync_type&&t&&"function"==typeof t&&t()})}};t.default=_,e.exports=t.default},57:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAATtQTFRFwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCAAAAxcXF19fXzMzM4+PjxMTEzc3Nzs7Oz8/PyMjIxsbGy8vL5OTk3d3d3t7e4uLi2dnZ5+fn6enp6urq6Ojo0NDQycnJ5ubm1tbWwsLC6+vrmTw96gAAAE90Uk5T4BDt5Mh7+fLO0LzNzA2/vg7PlPEbpsSlRMqpxn3edO76/afFc70VwRITk5ZDpEEe0geVP1bC8EBISahw4/vzs7Qc7xmufMkGPlUWD8P8ABEauJwAAAI3SURBVEjHrZd3d9owFMXVvZPuNkmz92SFTMIIYRrckkVYwTa2r77/J6gdSlsTG8tS7p86/h3pPEvv3UtkV0kHuYWniSSQTOQXcgeS+1fEZS2ztFiFQ9XFpRATXEzZ5KXZ6hgKpYrRaZmXNp+K+cL7cevDXlulDqntnrUc3x8JZ7cB3dSoizRTB7az3nBpDxcm9ZR5gb2SB1zYsA5s0BEyrMNvRNzgd6+BW+qjW2B17T688hb1c+qrcx2vVoZh6Q0aBmVQt4GXkhMuLKPRpZSRXi444CjqBmWUUUf0f7gENCmzmsDuP/jzqX+dnTU/zfyFz9CjgdTD2QDewY0WDNZusPUHrsCkAWWi0oeL0Glg6SjewangG9tbp2y4fAItOKzhpGzBx7imHLrGsQVX0OaB21bJiFSFygOrqErkEFeUS1c4JM94at2v9w9yhBYf3MIRyaPDB3eQJwkYfHAXT0gSCh+s4AUBKKcAfljFc/5ja3jMXzADROxXCV2SnMj1FHoYAk/ykVgzEGtDVgNUeG72XQOU03ytNy3e9HnGza/BuJG3eAbd94cYsXJGZLjLuwK2QpY3oXeZO5+OTaeVGkON1UrVsOq0UvJ6mNXE1RBeH7aP5Q9M9rGpI1y+b1zfj7MZ1/iam2WOfGSxzNEIp1n/iU+lETHhmx0TXF+oYseEL9nRAaXiHVC+7vhGo1h6fhCNNFXVBtFoPh1jCmWhmanhUDY1E2JMdP04ODkxPTs3Nzs9MekZB38DKjFA38DRIWMAAAAASUVORK5CYII="},58:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAaRQTFRFjEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2jEP2AAAA5dX9xJ76k0730rb8kEr2k0/3mFb3qHH4uIv56Nr9kUz2yqj7omf4u5D6qXP41738m1v3zq/7+vf/yaf77N/9nF730bX70LL7wJn6yKT7jkb27+T+3sn88ef+lFD3/v7/+/j/toj55tb91778jUT269791rz8o2n44s/92sP8za37v5f628X89e7+kUv2lVL3mln37uT+7OD+qnT4soH5rnr5+vj/rHj549H98ej+kk32kUr2qXL4+fX///7/jET238v8sH75nV73/Pv/l1X3+/n/4M39/v3/jUX2j0f2////jEP2EbPN6AAAAEB0Uk5TjltyXBuNHBmT7HpR+QQmz3tPuLb19JRXE9nY7u36KikG+FB2F3DLlRbx0CVYcbfb8nVOac5mzAUU9hqP/vzzAHXxCbwAAAIDSURBVEjHnZZnW9swFIXFLBvK3qshhJAJIcuJDWW00MHee++99ywQ609ji+SxZcuK3fPF9vV7HtlX0r0CnFKWEsZRXllXV1nuYEosqtcAfyy1m0NQppDZXkoxfEkpgioVpgU1DNluFhLFun0kQ7MHaiq3Wm342gQpYuuVhrYwpCrchhtaYVy1yg0t4fiGcItkqGGhDrE1MYPPCnXJ6osa3FCnvn0agqxeAxtEhmKoW42iwR/Qbwj4BUMDNKAGweA1YjBzwBKKw0w+yvdHENjo+P0W/3wue04ADJV/H+N5/uxGCjDAQeXXeFGvUqQAOCl8ZBPxF1dSyAlc2nzXDOIfrmUxF8CZ0XXpvm8D8TsRjMANL9O3f2P33e2I75/CiCzsk76v8vy/aNr3exHf+Y5/Qjr2068i8vYTjXWE+MF7xX85sbT+uBWhuwkIDw4RP6xKRAE+cb93Effr6RJdO9SZYxRL42kWkQtopG1CqpOACV98PSN8VPN/CLyw+JTLe27pk39bJM2ll7CB9h5E/vmEOPmJpC0aWRZm41R7i3KNyvDK+NAxpQiQyswAtcwYLmScz6OP98RKJdfcpId35fx/uTfeUIy3LI6rpzfFTGNt11pNauy1GRp1PJBXq3F0SAako0NxKuVw4rd78cOJ1+6nnmYEmWxMfllFVVVFWT5jM6lefwBXRhZfl3cpFAAAAABJRU5ErkJggg=="},89:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAt1JREFUeNpi/P//PwNWMJeXgUqAB4hzgDgTynYE4kskm5L8GaswCwNtQTgQ9wOxJJKYH1kewAFo5QFOIJ4ExClY5B5R0yJaeIAPiDcBsT0O+WfUtIyJyo5nBeL1eBwPAm8HsweagNiJgJo/g9UDLkBcRoS6QekBNiCeQaR5HIPRA6DSRplItQKDzQOM0IqKWCCDR04XiCOghQHdPGABxJokqJfHEQhVQHweiJcDcSE964EQEtUbYhFrBuJqJL4iPWPAgUT1Vlj0V5EbsJR6gBuI9UnUIwHEakj8TmgSQgaq9PKAChAzU5Ds9IDYDIu8KRBzUdMDJqAGNhBbookrkenxJKjdXjjkQY73oZYHQC3LjVBLl6LJiZLpAWVoU9sCj5pCankgGYilkEoHfTTPkQtAJY8OgeLZk1IPgDJXPppYMBKbmQIPKBNRe3cQsoOQB1ygGRUZxCLp+07jHp0eNKmR7YFYLGIKSKXIawbag2JyPcAOxP445BqgLdBndPCAEb68gs8DltDuITYAavu0A/FVBvoAD3LaQoR6VkVA/AnaSZejQ14g2QMGRBgMSkr/6BADmuQkIa0B6ldjA2LkWC7GMHgAFzke4B1EHmAlxwPfBpEHfpLjgQ+DyAPvyPHA3UHkgTvkeODKIPLAFXI8cGgQeeAAOR7YgS/z0BF8INcDII1bB4EHVpBbCoFAzwA7HjQQ3EtJM+A4NCkNFFiArwQith2TC8RfBsDxoL5GOTUaYqAQyKSz438xQAZ531GrJbkEOopAD/CXATKEc5jaTeE6aPufluAHEEczYI4/Ua0t3wiN2o80ai6AJgdXkqKJnM4IyALQRARoHP8/FRwOGppphfYAT5Gqmdze1GMgjmKAjNLNB+LPZJgB6kuDZjVB46s1QPyVHIcwUmmtBGiI0RmaBPSgjhIGYn5oiQJy3BNoMjkJxAeB+DRJMYhjrQRuDwwRwMQwxMGQ9wBAgAEAtH9y2qqSqeQAAAAASUVORK5CYII="},149:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i(4),s=n(a),o=i(6),l=n(o),p=i(3),c=n(p),d=i(8),r=n(d),u=i(47),f=(n(u),i(46)),g=n(f),A=i(40),h=n(A),_=i(105);n(_);t.default={data:function(){return{isStepInteShow:!0,isStepSelfShow:!1,isSetpAct:!0,isSlefAct:!1,isSleepInteShow:!0,isSleepSelfShow:!1,isSleepInitAct:!0,isSleepSlefAct:!1,steps_min:"",steps_max:"",steps_value:"",sleep_min:"",sleep_max:"",sleep_value:"",steps:{},sleeping:{},defaultheight:0,defaultweight:0,heightRecordsLast:{},weightRecordsLast:{},heightRecordsEndTime:"",weightRecordsEndTime:"",consume:{},setFlag:"step"}},methods:{init:function(e,t){g.default.getSettings(this.updateSettings,this.updateSettingsError),h.default.getHeightRecords(this.heightRecordsEndTime,this.updateHeightRecords,this.updateHeightRecordsError),h.default.getWeightRecords(this.weightRecordsEndTime,this.updateWeightRecords,this.updateWeightRecordsError),this.isHeightWeight()},update:function(){g.default.getSettings(this.updateSettings,this.updateSettingsError),h.default.getHeightRecords(this.heightRecordsEndTime,this.updateHeightRecords,this.updateHeightRecordsError),h.default.getWeightRecords(this.weightRecordsEndTime,this.updateWeightRecords,this.updateWeightRecordsError)},isHeightWeight:function(){var e=this.$route.query.sta;console.log("params",this.$route.query.sta),1==e&&this.$dispatch("showalert",{alert_content:"请先设置身高体重!",btns:[{btn_name:"确认"}]})},updateSettings:function(e){console.log("updateSettings",e),200==e.http_code?(this.special_tips=e.data.growing_expect.special_tips,this.expect=e.data.growing_expect.expect,"step"===this.setFlag&&(this.consume=e.data.consume_food),this.steps=e.data.targets.steps,this.steps_min=50*this.steps.reference/100,this.steps_max=300*this.steps.reference/100,this.steps_value=this.steps.self,this.steps_value&&(this.isStepSelfShow=!0,this.isSlefAct=!0,this.isStepInteShow=!1,this.isSetpAct=!1),this.sleeping=e.data.targets.sleeping,this.sleep_min=50*this.sleeping.reference/100,this.sleep_max=150*this.sleeping.reference/100,this.sleep_value=this.sleeping.self,this.sleep_value&&(this.isSleepSelfShow=!0,this.isSleepSlefAct=!0,this.isSleepInteShow=!1,this.isSleepInitAct=!1)):this.$dispatch("showalert",{alert_content:"获取目标设定值失败,请稍后重试！",btns:[{btn_name:"确认"}]})},updateSettingsError:function(e){console.log("error",e),this.$dispatch("showalert",{alert_content:"获取目标设定值失败,请检查网络后重试！",btns:[{btn_name:"确认"}]})},setExpect:function(e){g.default.getSettings(this.updateSettings,this.updateSettingsError)},target_step_info:function(e){this.setFlag="step";var t="",i=$(e.target).attr("id");1==i?(this.isStepInteShow=!0,this.isStepSelfShow=!1,t="0",this.isSetpAct=!0,this.isSlefAct=!1,g.default.setTarget(t,this.setTarget,this.setTargetError)):2==i&&(this.isStepInteShow=!1,this.isStepSelfShow=!0,this.isSetpAct=!1,this.isSlefAct=!0,this.$el.querySelector("#range_steps").value=0,t=.5*this.steps.reference,g.default.setTarget(t,this.setTarget,this.setTargetError))},target_sleep_info:function(e){this.setFlag="sleep";var t="",i=$(e.target).attr("id");1==i?(this.isSleepInteShow=!0,this.isSleepSelfShow=!1,t="0",this.isSleepInitAct=!0,this.isSleepSlefAct=!1,g.default.setSleepTarget(t,this.setTarget,this.setTargetError)):2==i&&(this.isSleepInteShow=!1,this.isSleepSelfShow=!0,this.isSleepInitAct=!1,this.isSleepSlefAct=!0,this.$el.querySelector("#range_sleep").value=this.sleep_value,t=.5*this.sleeping.reference,g.default.setSleepTarget(t,this.setTarget,this.setTargetError))},setTarget:function(e){g.default.getSettings(this.updateSettings,this.updateSettingsError)},range_step_info:function(e){this.setFlag="step",$(e.target).attr("value",e.target.value);var t="";t=$(e.target).attr("value"),g.default.setTarget(t,this.setTarget,this.setTargetError)},range_sleep_info:function(e){this.setFlag="sleep",$(e.target).attr("value",e.target.value);var t="";t=$(e.target).attr("value"),g.default.setSleepTarget(t,this.setTarget,this.setTargetError)},update_height:function(){console.log("cid",l.default.get("cid"));var e=[];e.push(parseInt(this.defaultheight).toString()),console.log("default_values_height",e);var t=[{from:50,to:200,step:1},["cm"]];r.default.showSelector("设置身高",e,t,this.seHeightSuccessBack,this.seHeightCancelBack)},seHeightSuccessBack:function(e){console.log("seHeightSuccessBack",e);var t=e.values[0];this.heightGrowingLast=(0,s.default)({},this.heightGrowingLast,{height:t}),console.log(this.heightGrowingLast.height),this.syncGrowHeight(this.heightGrowingLast.height||0)},seHeightCancelBack:function(e){console.log(e)},update_weight:function(){var e=[];e.push(("0"+parseInt(this.defaultweight).toString()).substr(-2)),console.log("default_values_weight",e);var t=[{from:1,to:100,step:1},["kg"]];r.default.showSelector("设置体重",e,t,this.seWeightSuccessBack,this.seWeightCancelBack)},seWeightSuccessBack:function(e){console.log("seWeightSuccessBack",e);var t=e.values[0];this.weightGrowingLast=(0,s.default)({},this.weightGrowingLast,{weight:t}),this.syncGrowWeight(this.weightGrowingLast.weight||0)},seWeightCancelBack:function(e){console.log(e)},updateHeightRecords:function(e){if(console.log("getHeightRecords",e),200==e.http_code){if(0==e.data.length)return;var t=e.data.length;this.heightRecordsLast=e.data[t-1],this.defaultheight=this.heightRecordsLast.height}else console.log("获取身高数据失败,请稍后重试！")},updateHeightRecordsError:function(e){this.$dispatch("showalert",{alert_content:"获取身高数据失败,请检查网络后重试！",btns:[{btn_name:"确认"}]})},updateWeightRecords:function(e){if(console.log("getWeightRecords",e),200==e.http_code){if(0==e.data.length)return;var t=e.data.length;this.weightRecordsLast=e.data[t-1],this.defaultweight=this.weightRecordsLast.weight}else console.log("获取体重数据失败,请稍后重试！")},updateWeightRecordsError:function(e){this.$dispatch("showalert",{alert_content:"获取体重数据失败,请检查网络后重试！",btns:[{btn_name:"确认"}]})},syncGrowHeight:function(e){var t=this,i=l.default.get("cid"),n=(l.default.get("device_id"),l.default.get("bluetoothStatus"));0===n?r.default.syncWriteHeight(e,i,function(){setTimeout(function(){setTimeout(function(){t.update()},1e3)},500)},function(){setTimeout(function(){t.heightGrowingLast=(0,s.default)({},t.heightGrowingLast,{height:t.defaultheight})},500)}):1===n?(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_connecting"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("蓝牙正在连接中")):2===n?(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_connect"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("未连接到手环")):3===n&&(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_open"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("手机未开启蓝牙"))},syncGrowWeight:function(e){var t=this,i=l.default.get("cid"),n=(l.default.get("device_id"),l.default.get("bluetoothStatus"));0===n?r.default.syncWriteWeight(e,i,function(){setTimeout(function(){setTimeout(function(){t.update()},1e3)},500)},function(){setTimeout(function(){t.weightGrowingLast=(0,s.default)({},t.weightGrowingLast,{weight:t.defaultweight})},500)}):1===n?(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_connecting"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("蓝牙正在连接中")):2===n?(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_connect"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("未连接到手环")):3===n&&(this.$dispatch("showalert",{alert_content:this.$i18n("bluetooth_open"),btns:[{btn_name:this.$i18n("btn_name_ok")}]}),c.default.debugAlert("手机未开启蓝牙"))}}}},196:function(e,t,i){t=e.exports=i(1)(),t.push([e.id,"body[_v-6e57d982]{color:#313131}.setting .set_title[_v-6e57d982]{padding:6% 4% 3%;font-size:1rem;color:#646464}.setting .data_entry p[_v-6e57d982]{border-top:1px solid #e1e1e1;margin:0 4%;overflow:hidden;padding:8px 0;position:relative}.setting .data_entry p[_v-6e57d982]:nth-child(1){border-top:none}.setting .data_entry p:nth-child(1) .en_data[_v-6e57d982]{background:url("+i(224)+") no-repeat scroll 0;background-size:20px}.setting .data_entry p:nth-child(2) .en_data[_v-6e57d982]{background:url("+i(225)+") no-repeat scroll 0;background-size:20px}.setting .data_entry p a[_v-6e57d982]{display:inline-block;float:left}.setting .data_entry p .en_data[_v-6e57d982]{padding-left:10%}.setting .data_entry p .en_data span[_v-6e57d982]:nth-child(1){color:#000;display:block}.setting .data_entry p .en_data span:nth-child(1) i[_v-6e57d982]{font-family:AkzidenzGrotesk;font-size:2.2rem}.setting .data_entry p .en_data span:nth-child(1) b[_v-6e57d982]{font-family:AkzidenzGrotesk;font-size:1.1rem}.setting .data_entry p .en_data span[_v-6e57d982]:nth-child(2){margin-top:-3px;color:#959595;font-size:.8rem;display:block}.setting .data_entry p .en_unpdat[_v-6e57d982]{float:right;font-size:.7rem;color:#959595;padding-top:20px;background:url("+i(37)+") no-repeat scroll top;background-size:20px;margin-top:10px;padding-right:.2rem}.setting .data_entry p .en_line[_v-6e57d982]{width:1px;height:50%;position:absolute;right:15%;top:25%;background:#e1e1e1}.setting .hope_info[_v-6e57d982]{padding:1% 0 2%}.setting .hope_info .titl[_v-6e57d982]{font-size:.9rem;color:#959595;padding:4% 4% 0}.setting .hope_info .con[_v-6e57d982]{font-size:1rem;margin:0 4%;padding:5px 0}.setting .hope_info .con span[_v-6e57d982]{display:inline-block;padding-right:10px}.setting .vision[_v-6e57d982]{padding:1% 0 2%;margin-top:4%}.setting .vision .title[_v-6e57d982]{font-size:.9rem;color:#959595;padding:2% 4%}.setting .vision .vi_btn[_v-6e57d982]{background:#f5f5f5 url("+i(238)+") no-repeat scroll 2% 58%;background-size:15px;border-radius:5px;font-size:.6rem;margin:0 4%;padding:3% 2% 2% 8%;color:#646464}.setting .vision .check_mul[_v-6e57d982]{padding:0 4% 2%}.setting .vision .check_mul a[_v-6e57d982]{display:inline-block;border:1px solid #e1e1e1;border-radius:2px;color:#959595;font-size:1rem;padding:2px 8px;margin-right:5px;margin-top:10px}.setting .vision .check_mul a.act[_v-6e57d982]{background:url("+i(213)+") no-repeat scroll 100% 100%;background-size:12px;border:1px solid #8b49f6;color:#8b49f6}.target_info .equivalent[_v-6e57d982]{background:#f5f5f5;text-align:center;padding:.5rem 0;border-radius:4px;width:94%;margin:0 auto}.target_info .equivalent span[_v-6e57d982]{display:inline-block;background:url("+i(89)+") no-repeat scroll 0;padding-left:25px;background-size:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}.target_info .title[_v-6e57d982]{padding-top:8px;text-align:center;font-size:.8rem;color:#000}.target_info .title span[_v-6e57d982]{font-family:AkzidenzGrotesk;font-size:2rem;padding:0 5px}.target_info a[_v-6e57d982]{display:block;border-bottom:1px solid #e1e1e1;margin:0 4%;padding:2% 3% 2% 10%;background:url("+i(57)+")no-repeat scroll 0;background-size:20px}.target_info a.no_bottom[_v-6e57d982]{border-bottom:none}.target_info a.act[_v-6e57d982]{background:url("+i(58)+")no-repeat scroll 0;background-size:20px}.target_info a[_v-6e57d982]:nth-last-child(1){border-bottom:none}.target_info a span[_v-6e57d982]{display:block;font-size:1rem}.target_info a i[_v-6e57d982]{display:block;font-size:.8rem;color:#959595}.sleep_target_info .title span b[_v-6e57d982]{font-family:AkzidenzGrotesk;font-size:2rem}.sleep_target_info .title span i[_v-6e57d982]{font-size:.8rem}.range_info[_v-6e57d982]{padding:5% 4% 12%}.range_info span[_v-6e57d982]{display:block;position:relative;top:8px}.range_info span i[_v-6e57d982]{position:absolute;top:0;font-size:.7rem;color:#959595}.range_info span i[_v-6e57d982]:nth-child(1){left:0}.range_info span i[_v-6e57d982]:nth-child(2){left:45%}.range_info span i[_v-6e57d982]:nth-child(3){right:0}.range_info input[type=range][_v-6e57d982]{-webkit-appearance:none;width:100%;-webkit-user-select:none}.range_info input[type=range][_v-6e57d982]:focus{outline:none}.range_info input[type=range][_v-6e57d982]::-webkit-slider-thumb{border:1px solid #e0e0e0;height:30px;width:30px;border-radius:50px;background:#fff;box-shadow:0 0 5px #ccc;cursor:pointer;-webkit-appearance:none;margin-top:-14px}.range_info input[type=range][_v-6e57d982]::-webkit-slider-runnable-track{width:100%;height:5px;cursor:pointer;background:#ebebeb;border-radius:5px}",""])},213:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAABGdBTUEAALGPC/xhBQAAAEJQTFRFjD/6AAAAomP707b93sf+tYT8yKT9y6j9lU767+T+m1j78+v+8ej+j0T6+vf/p2z79Oz/rHT7+vb/nlz7////jD/6QS4negAAAAJ0Uk5TfwDeNKgBAAAAq0lEQVQ4y43RyQLDIAhFUTuPNk3V///VakzMQ1BkfRbANQd9jBkwwQwYHUWjomQ0tBgFZdNHq+mizfRQMR20mzYC00RoWoiYBqJGRpURUW0kxIyAuOEIzdHKCM30O1sJUeP9SUDZ3Iv5Oo6yub2f1BCUzdX7qNAgWveZP1Fd0AAqOyfl0ewI7lrUy/Fnkj9HhWZDVYv54XgW1svydkJThjSTkGoi0k0wAyb8AWOFNKzpKsP5AAAAAElFTkSuQmCC"},224:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQtJREFUeNrsnN+LG1UUx889M0ms2V3XdKnSXaUgrZSKikV9LNgi6KsgCiIIIvi8f4JPIpbii1JfBBHqsy2KfRAffJFK3Zb2waK73QV3zXbbJtnN77nXc+/MnUzjzGRId9OZ8Z7kbDKZm53cz5zzPfdOuGFCCDAWbbb888G1z1P54TjQyVN3utGJ5IL7j+o5wAlk7CVqivJ13U4/6vdKc1+/15h+ZMzbZnRM3mr1O9/T8xv0v11AabZgp/1tEDYinitZpTeQsV0/5rTgn25tby063PkMU07nnucKlOuLewVHpRVDu1J+9IzD+XHMihaIwA0ZvrVXcLQV0GYWWm9iVuDogFLawlhlEsdFZPOZiiDQWjShyiu4YKkFxAPVxw0dT5LEZD9DZlJMDCnRRI5LJydRmT977MNUAXvn99PpApR2qxSm4SEshO5r8i7c7W2PHbuZBDSs0YfLj8OB4mxo27/bt+G3MQHJw2A2Y0ZM7DgIxmLPQy406MbOBqy1tiI16L5n81m3273G3o2mTR4ZQAaQAWQApddyUcVm7DKUMLwrbSrzjX7r/w3o6NTB+KlG/U+TYkaDjAaNb8vNTdjo1EL3bTttA6javWtSzGiQAWQAGUCmzJuphplqmBQzGmQ0yEw1zFTDaJABZMwAMoAMIAPIAMreSFouDHmb/CAM1no8kMUuHPxlB2rhiiMXsHAHHHILrbkHAWiR/JMgGGODFDtC/rGBEx1Br5FbcQ1nC1NwtDzvb//RXIetbj1R2+VWlSaTdzINaN+ohvKK3Vxxxt9ebd9K3HY9o3BMFRujiuXGuBis7lAdZQh9qoQA7tJLFR0J1pzZeQSjoSyU9sPrB47DM+UnYZ9VhB2nDVcaN+F89RJUezUaOggFKw6UnUc4cuz04iNPwXsLJylyLG9cxRWkl2cPw/Mzh+Ds6o9wdXtV1W0uoqMJ8whnvlSBd+dfUdHheIPMoEto7z9xCiqFsr9gmEcs0kscQS2nA6utTX97h7aTtm3c53XhRKPuwNLxV+eeUyrjeJoTZhZBOrn/Wfh2/ReKEvSXho8NqN5vwVJjZdfb7ooJHUXuevqnywu+IMfZEWon20s4bhT9N9Vyo0E6VYoUGUUah/EEgKaskgtIMJWOYVGUC0AikGJN3oFavwll6vwou9VtKEAoEATT1Y/lU6QDPzoAS/W/QsV52K9Qu7CfrMj1SFp29oeNS9B0urFwpE5e3Lys6Uau0csdIJkg/3Rr8OXKBbVWzKGeD7uE88Xyeaj3mt6bWOR1jNyItBRY7bISXWuswUfXv4ZTj70Ax6YPwXThYaj1GnC1vgIXq5dVhBWsgvueGNp2liIjet+gCiHNuZAqmY0c7lCknFv7mYT4JyXAalqBcp90m8ZCqNq7kBiEobIzmUMhHVFwvGpkIXpdc6EJwQeACIjlQZKPGIAUdjA7iyoz3BeZUmriKSHRTY6SpbrqiaiuVEyBRBU5Co4HSEfP8CCRZS2CVCqI6DSTdwlIwaHBH2feGCcwzxqkIY6IHretnfJY8VNjoA8Rs27qDPfCRM2ttCZJQLqUe4KsIek2UZc86PW2BnQ9bXBQ/Z6YGDARnhgzADYCktIdCjUZRUKHXGCQHAQTd+GM0nFJj4MukP+a1rQKBg4b8cULemVeC7LvOJRWXtTEXCy7Scf+SgNywP1m4xvyTlrTzS/HCS6V6s5bWpQDPgKMZPEd+QlqUf9XgAEALI91CZVVO18AAAAASUVORK5CYII="},225:function(e,t){e.exports="data:image/png;base64,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"},238:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAbBQTFRFpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlAAAApaWlaK9/1gAAAI90Uk5T7Fxbjo0bGRx6e9PRcy8xTzXam5ieDtQIp1ZgGCxT5iiMl+U7pM2oOArqQJBKISKvhINGOrjZtsDu+lftgGRnEGP1SAdMdinKN8kuJg1l/QzwEfSVlHQlavHSyDCT+wJYtyvLFnAP2HJ19zJOZlFxF/IESwNp3H/B+VD2zwHQFdsUEhMqBo8azAX8/s7z+AAteOcnAAAC1ElEQVRIx5VW518aQRC99N57770nGlssUWONhYgSBUVFEVG6ioJKhxO4nX85s3cY2XL8kvl2M/v2dmZn3luF8OZqzs26WzStxT2ba3YJYYX9TPvni1BlxXl/ugbg+NFfINh3R94EEPKU6YLN6IZvLtWVTc35NqKb1FP2qDLARIkGd2yp6v1SazvUG8+IgAu/MVDq3uaT3O4+TX+yxQNW9wCWlyJEYqHxZYC9VRawhrusnyMmNpDA8Fo1YAX3LwSIqbkK+I+VA0APlqd/kdSwxSnMo2cfoGIl1ndJTdtdxwqqFYAHQPOycfuHgsPCeLwawA8DkMcDLbHr349ilvMzjM+Ph8rrACteDFfPj3pTfGF8kTjAGAUkYwCd3Inf6IDPrLMTIJZEwAJeMJ/ia9qyr0Y4L/bOAgKwxK1CUWyj4H7BO1sxL6K4iqC1i2VU05LL0KCYV5wAUfKPFgU4rOQAvsmCqYEZwbcBkFNmAbb4wM/ww2fD8FwAbAF8VbARM5z/0bRe1WkBkAFIKEEALr/ByjC7BUAaIKhgJMu6Rx4D3Ec2eCoAsrhYAiB37j2IlOklSQCbkiNRu4v7PJEdSZEljXYbJ+ylPGlZWQlxAEwSeVnlF9cPcJXIL07aGioSi03aGoeUgKz5vJjzRZPmo+3dwYeGsH5dAqADucgYoDhPkJdpSCDNOJ19Y0TD4mxdIfk+tl/DlRElY1jCEBO6gd23cwngJkOxZyokoNPMOAPoq7RfsNp59i/NiEQ2ZKwf/lTlO39AZEQtcVSZwfpdt94KcFRZ2qdKMoFiMnWtKvzubZKbQSTj4CBL97016Hi3l6V7Q1ASdrP1dkFQDMnS/kOysHV1UQyLohiepKLoM5PdeBsru22GGGdkwp49GdOFvQGF3aKqFhT2Bl3YY6eyJk+HY0dkTwfriRqPk6S/wD5OCv5kzdcMWsCZq6tvbGpqrK/LOUUp/gP1iLfjLWgXlgAAAABJRU5ErkJggg==";
},256:function(e,t){e.exports=' <div class=setting _v-6e57d982=""> <p class=set_title _v-6e57d982="">{{$i18n(\'setting_write_title\')}}</p> <div class="box_wrapper data_entry" _v-6e57d982=""> <p _v-6e57d982=""> <a href=javascript:; class=en_data _v-6e57d982=""> <span _v-6e57d982=""><i _v-6e57d982="">{{heightRecordsLast.height||0}}</i><b _v-6e57d982="">CM</b></span> <span _v-6e57d982="">{{$i18n(\'setting_update_time\')}}<i _v-6e57d982="">{{heightRecordsLast.time||0}}</i></span> </a> <a href=javascript:; class=en_unpdat @click=update_height _v-6e57d982="">{{$i18n(\'setting_update\')}}</a> <a class=en_line _v-6e57d982=""></a> </p> <p _v-6e57d982=""> <a href=javascript:; class=en_data _v-6e57d982=""> <span _v-6e57d982=""><i _v-6e57d982="">{{weightRecordsLast.weight||0}}</i><b _v-6e57d982="">KG</b></span> <span _v-6e57d982="">{{$i18n(\'setting_update_time\')}}<i _v-6e57d982="">{{weightRecordsLast.time||0}}</i></span> </a> <a href=javascript:; class=en_unpdat @click=update_weight _v-6e57d982="">{{$i18n(\'setting_update\')}}</a> <a class=en_line _v-6e57d982=""></a> </p> </div> <p class=set_title _v-6e57d982="">{{$i18n(\'setting_goal_step_title\')}}</p> <div class="box_wrapper target_info" _v-6e57d982=""> <p class=title _v-6e57d982=""> <span v-show=isStepInteShow _v-6e57d982="">{{steps.reference||0}}</span> <span v-show=isStepSelfShow _v-6e57d982="">{{steps.self||steps.reference*0.5}}</span>{{$i18n(\'sport_step\')}} </p> <p v-show="$lang != \'en\'" class=equivalent _v-6e57d982=""><span _v-6e57d982="">{{$i18n(\'sport_food_1\')}}{{ consume.consumption }} {{ consume.category }}</span></p> <a @click=target_step_info id=1 :class="{\'act\':isSetpAct}" _v-6e57d982=""> <span _v-6e57d982="">{{$i18n(\'setting_step_recommend_title\')}}</span> <i _v-6e57d982="">{{$i18n(\'setting_step_recommend_tip\')}}</i> </a> <a @click=target_step_info id=2 :class="{\'act\':isSlefAct, \'no_bottom\': !isSlefAct}" _v-6e57d982=""> <span _v-6e57d982="">{{$i18n(\'setting_step_custom_title\')}}</span> <i _v-6e57d982="">{{$i18n(\'setting_step_custom_tip\')}}</i> </a> <p v-show=isSlefAct class=range_info _v-6e57d982=""> <input id=range_steps @change=range_step_info type=range min={{steps_min}} max={{steps_max}} step=1 value={{steps_value}} _v-6e57d982=""> <span _v-6e57d982=""><i _v-6e57d982="">50%</i><i _v-6e57d982="">175%</i><i _v-6e57d982="">300%</i></span> </p> </div> <p class=set_title _v-6e57d982="">睡眠目标</p> <div class="box_wrapper target_info sleep_target_info" _v-6e57d982=""> <p class=title _v-6e57d982=""> <span v-show=isSleepInteShow _v-6e57d982=""> <span _v-6e57d982=""> <b _v-6e57d982="">{{Math.floor(sleeping.reference/60)||0}}</b> <i _v-6e57d982="">{{$i18n(\'time_unit_hour\')}}</i> </span> <span _v-6e57d982=""> <b _v-6e57d982="">{{sleeping.reference%60||0}}</b> <i _v-6e57d982="">{{$i18n(\'time_unit_minute\')}}</i> </span> </span> <span v-show=isSleepSelfShow _v-6e57d982=""> <b _v-6e57d982="">{{Math.floor((sleeping.self||sleeping.reference*0.5)/60)}}</b><i _v-6e57d982="">{{$i18n(\'time_unit_hour\')}}</i> <b _v-6e57d982="">{{Math.floor((sleeping.self||sleeping.reference*0.5)%60)||0}}</b><i _v-6e57d982="">{{$i18n(\'time_unit_minute\')}}</i> </span> </p> <a @click=target_sleep_info id=1 :class="{\'act\':isSleepInitAct}" _v-6e57d982=""> <span _v-6e57d982="">{{$i18n(\'setting_sleep_recommend_title\')}}</span> <i _v-6e57d982="">{{$i18n(\'setting_sleep_recommend_tip\')}}</i> </a> <a @click=target_sleep_info id=2 :class="{\'act\':isSleepSlefAct, \'no_bottom\': !isSleepSlefAct}" _v-6e57d982=""> <span _v-6e57d982="">{{$i18n(\'setting_sleep_custom_title\')}}</span> <i _v-6e57d982="">{{$i18n(\'setting_sleep_custom_tip\')}}</i> </a> <p v-show=isSleepSlefAct class=range_info _v-6e57d982=""> <input id=range_sleep @change=range_sleep_info type=range min={{sleep_min}} max={{sleep_max}} step=1 value={{sleep_value}} _v-6e57d982=""> <span _v-6e57d982=""><i _v-6e57d982="">50%</i><i _v-6e57d982="">100%</i><i _v-6e57d982="">150%</i></span> </p> </div> </div> '},293:function(e,t,i){var n,a,s={};i(311),n=i(149),a=i(256),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(o.template=a),o.computed||(o.computed={}),Object.keys(s).forEach(function(e){var t=s[e];o.computed[e]=function(){return t}})},311:function(e,t,i){var n=i(196);"string"==typeof n&&(n=[[e.id,n,""]]);i(2)(n,{});n.locals&&(e.exports=n.locals)}});