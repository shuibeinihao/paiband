webpackJsonp([6,16],{13:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{paneltitle:{type:String},panelunit:{type:String}},data:function(){return{}}}},14:function(t,e,a){e=t.exports=a(1)(),e.push([t.id,".panel[_v-56362336]{background:#fff;border-radius:5px;box-shadow:0 0 5px #e2e2e2}.panel .title[_v-56362336]{padding:0 2%;height:2rem;line-height:2rem;color:#313131;font-size:.8rem;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:1px solid #e1e1e1;background:-webkit-linear-gradient(top,#fff,#f6f6f6);background:linear-gradient(180deg,#fff 0,#f6f6f6)}.panel .title span[_v-56362336]{display:inline-block;float:right;color:#959595;font-size:.7rem;padding-top:3px}",""])},15:function(t,e){t.exports=' <div class=panel _v-56362336=""> <div class=title _v-56362336="">{{paneltitle}}<span _v-56362336="">{{panelunit}}</span></div> <slot _v-56362336=""></slot> </div> '},16:function(t,e,a){var i,n,A={};a(17),i=a(13),n=a(15),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default);var o="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(o.template=n),o.computed||(o.computed={}),Object.keys(A).forEach(function(t){var e=A[t];o.computed[t]=function(){return e}})},17:function(t,e,a){var i=a(14);"string"==typeof i&&(i=[[t.id,i,""]]);a(2)(i,{});i.locals&&(t.exports=i.locals)},18:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),A=i(n),o={getHeartTestRecord:function(t,e,a){A.default.callAPI("getHeartTestRecord",{_request_id:a},function(e){if(t&&"function"==typeof t){for(var a=0;a<e.data.list.length;a++){var i=new Date(1e3*e.data.list[a].utime),n=i.getFullYear(),A=i.getMonth()+1,o=i.getDate(),r=i.getHours(),s=i.getMinutes(),c=i.getSeconds();e.data.list[a].utime=n+"-"+("0"+A).substr(-2)+"-"+("0"+o).substr(-2)+" "+("0"+r).substr(-2)+":"+("0"+s).substr(-2)+":"+("0"+c).substr(-2)}t(e)}},function(t){e&&"function"==typeof e&&e(t)})},getHeartClockList:function(t,e,a){A.default.callAPI("getHeartClockList",{_request_id:a},function(e){t&&"function"==typeof t&&t(e)},function(t){e&&"function"==typeof e&&e(t)})},addHeartClock:function(t,e,a,i){A.default.callAPI("addHeartClock",{time:t,_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(t){a&&"function"==typeof a&&a(t)})},deleteHeartClock:function(t,e,a,i){A.default.callAPI("deleteHeartClock",{clock_id:t,_request_id:i},function(t){e&&"function"==typeof e&&e(t)},function(t){a&&"function"==typeof a&&a(t)})},modifyHeartClock:function(t,e,a,i,n){A.default.callAPI("modifyHeartClock",{clock_id:t,time:e,_request_id:n},function(t){a&&"function"==typeof a&&a(t)},function(t){i&&"function"==typeof i&&i(t)})}};e.default=o,t.exports=e.default},45:function(t,e){t.exports="data:image/png;base64,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"},49:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),A=i(n);e.default={props:{width:{type:Number,require:!0,default:300},height:{type:Number,require:!0,default:300}},methods:{update:function(t,e){t>0&&e>0&&(this.$el.width=t,this.$el.height=e,A.default.fixCanvasSmooth(this.$el))},drawRing:function(t){if(this.p_clear(),this.p_drawBG(),t>0){var e=this.$el,a=.5*(Math.min(e.width,e.height)-5*(window.devicePixelRatio||1)),i=5*(window.devicePixelRatio||1),n=.5*-Math.PI,A=e.getContext("2d");A.save(),A.strokeStyle="rgba(255, 255, 255, 1)",A.lineWidth=i,A.lineCap="round";var o=[.5*e.width,.5*e.height];A.translate(o[0],o[1]),A.beginPath(),A.arc(0,0,a,n,n+t*Math.PI*2),A.stroke(),A.restore()}},p_drawBG:function(){var t=this.$el,e=.5*Math.min(t.width,t.height),a=5*(window.devicePixelRatio||1),i=1*(window.devicePixelRatio||1),n=200,A=.5*-Math.PI,o=t.getContext("2d");o.save(),o.strokeStyle="rgba(255, 255, 255, 0.6)",o.lineWidth=i;var r=2*Math.PI/n,s=[.5*t.width,.5*t.height];o.translate(s[0],s[1]),o.beginPath();for(var c=0;c<n;c++){var l=Math.cos(A+r*c),h=Math.sin(A+r*c);o.moveTo(e*l,e*h),o.lineTo((e-a)*l,(e-a)*h)}o.stroke(),o.restore()},p_clear:function(){var t=this.$el,e=t.getContext("2d");e.clearRect(0,0,t.width,t.height)}},ready:function(){}}},55:function(t,e,a){e=t.exports=a(1)(),e.push([t.id,"",""])},60:function(t,e){t.exports=' <canvas class=gauge-ring width="{{ width }}" height="{{ height }}" _v-3169814e=""></canvas> '},63:function(t,e,a){var i,n,A={};a(64),i=a(49),n=a(60),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default);var o="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(o.template=n),o.computed||(o.computed={}),Object.keys(A).forEach(function(t){var e=A[t];o.computed[t]=function(){return e}})},64:function(t,e,a){var i=a(55);"string"==typeof i&&(i=[[t.id,i,""]]);a(2)(i,{});i.locals&&(t.exports=i.locals)},119:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),A=i(n),o={getToday:function(t,e,a){A.default.callAPI("getHeartToday",{_request_id:a},function(e){t&&"function"==typeof t&&t(e)},function(t){e&&"function"==typeof e&&e(t)})}};e.default=o,t.exports=e.default},142:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(63),A=i(n),o=a(16),r=i(o),s=a(38),c=i(s),l=a(3),h=i(l),d=a(6),p=i(d),g=a(8),u=i(g),f=a(18),m=i(f),I=a(119),C=i(I);e.default={components:{gaugeRing:A.default,panel:r.default,paibandMask:c.default},methods:{init:function(t,e){if(console.log("health-heart init",t,e),t>0){var a=Math.round(.5*t);this.$refs.dataRing.update(a,a);var i=.5*a;this.$refs.dataRing.$el.style.marginLeft="-"+i+"px",this.$refs.dataRing.$el.style.marginTop="-"+(25+i)+"px"}m.default.getHeartTestRecord(this.p_updateTestList,this.p_updateTestListError),m.default.getHeartClockList(this.p_updateClockList,this.p_updateClockListError),C.default.getToday(this.p_updateTodayData,this.p_updateTodayDataError),this.addAppAwakeCallback()},update:function(t,e){if(console.log("health-heart update"),t>0){var a=Math.round(.5*t);this.$refs.dataRing.update(a,a);var i=.5*a;this.$refs.dataRing.$el.style.marginLeft="-"+i+"px",this.$refs.dataRing.$el.style.marginTop="-"+(25+i)+"px"}m.default.getHeartTestRecord(this.p_updateTestList,this.p_updateTestListError),m.default.getHeartClockList(this.p_updateClockList,this.p_updateClockListError),C.default.getToday(this.p_updateTodayData,this.p_updateTodayDataError),this.addAppAwakeCallback()},addAppAwakeCallback:function(){void 0===p.default.get("appAwakeCalls")&&p.default.set("appAwakeCalls",[]);var t=p.default.get("appAwakeCalls");t.indexOf(this.appAwakeCallback)<0&&t.push(this.appAwakeCallback)},appAwakeCallback:function(){null!==this.p_test_timestamp&&new Date-this.p_test_timestamp>4e4&&(this.$refs.mask.showMark(!1),this.isHeartPop=!1,this.precentheart=0,clearInterval(this.percenttimeid),this.p_test_timestamp=null,this.$dispatch("showalert",{alert_content:"<p>"+this.$i18n("heart_test_tip_back")+"<p>",btns:[{btn_name:this.$i18n("btn_name_cancel")},{btn_name:this.$i18n("heart_test_again"),callback:this.testHeartrate.bind(this)}]}))},getTodday:function(){var t=new Date;return[t.getFullYear(),("0"+(t.getMonth()+1)).substr(-2),("0"+t.getDate()).substr(-2)].join("-")},procentHeart:function(){var t=this;this.percenttimeid=setInterval(function(){t.precentheart<98&&t.precentheart++},300)},testHeartrate:function(){var t=this;if(new Date-this.p_lasttest_timestamp<5e3)return void this.$dispatch("showtip",this.$i18n("heart_test_frequent"));var e=p.default.get("cid"),a=p.default.get("device_id");u.default.getBluetoothStatus(a,function(i){a===i.device_id&&(p.default.set("bluetoothStatus",i.status),0===i.status?(t.$refs.mask.showMark(!0),t.isHeartPop=!0,t.procentHeart(),t.p_test_timestamp=new Date,u.default.determineHeartRate(a,e,function(e){a===e.device_id&&(t.$refs.mask.showMark(!1),t.isHeartPop=!1,t.precentheart=0,t.p_test_timestamp=null,t.p_lasttest_timestamp=new Date,clearInterval(t.percenttimeid),t.$dispatch("showalert",{alert_content:"<p>"+t.$i18n("heart_test_result_1")+e.heart_rate+" "+t.$i18n("heart_test_result_2")+'<p><p style="font-size:0.8rem;">'+t.$i18n("heart_test_result_3")+"70 "+t.$i18n("heart_test_result_2")+"</p>",btns:[{btn_name:t.$i18n("btn_name_confirm")}]}))},function(e){a===e.device_id&&(t.$refs.mask.showMark(!1),t.isHeartPop=!1,t.precentheart=0,clearInterval(t.percenttimeid),t.p_test_timestamp=null,t.p_lasttest_timestamp=new Date,t.$dispatch("showalert",{alert_content:"<p>"+t.$i18n("heart_test_uncomplete")+"<p>",btns:[{btn_name:t.$i18n("btn_name_cancel")},{btn_name:t.$i18n("heart_test_again"),callback:t.testHeartrate.bind(t)}]}),h.default.debugAlert("手环心率测定失败"))})):1===i.status?(t.$dispatch("showalert",{alert_content:t.$i18n("bluetooth_connecting"),btns:[{btn_name:t.i18n("btn_name_confirm")}]}),h.default.debugAlert("蓝牙正在连接中")):2===i.status?(t.$dispatch("showalert",{alert_content:t.$i18n("bluetooth_connect"),btns:[{btn_name:t.i18n("btn_name_confirm")}]}),h.default.debugAlert("未连接到手环")):3===i.status&&(t.$dispatch("showalert",{alert_content:t.$i18n("bluetooth_open"),btns:[{btn_name:t.i18n("btn_name_confirm")}]}),h.default.debugAlert("手机未开启蓝牙")))},function(e){h.default.debugAlert("获取蓝牙状态失败"),t.$dispatch("showtip",t.$i18n("bluetooth_error_state"))})},p_updateTodayData:function(t){if(console.log("p_updateTodayData",t),200!=t.http_code)return void this.$dispatch("showalert",{alert_content:this.$i18n("heart_error_today_service"),btns:[{btn_name:this.i18n("btn_name_confirm")}]});var e=t.data;this.p_heartPercent=e.target_complete||0,this.$refs.dataRing.drawRing(.01*this.p_heartPercent)},p_updateTodayDataError:function(t){this.$dispatch("showalert",{alert_content:this.$i18n("heart_error_today_network"),btns:[{btn_name:this.i18n("btn_name_confirm")}]})},assessInfo:function(){this.$refs.mask.showMark(!0),this.isAssessCon=!0},closeAssessCon:function(){this.$refs.mask.showMark(!1),this.isAssessCon=!1},p_updateTestList:function(t){this.p_testList=t.data.list,this.p_heartrate=this.p_testList&&this.p_testList[0]&&this.p_testList[0].rate||0},p_updateTestListError:function(t){this.$dispatch("showalert",{alert_content:this.$i18n("heart_error_clock_network"),btns:[{btn_name:this.i18n("btn_name_confirm")}]}),h.default.debugAlert("获取心率测定列表失败")},p_updateClockList:function(t){this.p_clockTotalNum=t.data.max_clock_count||0,this.p_clockNum=(t.data.list||[]).length},p_updateClockListError:function(t){this.$dispatch("showalert",{alert_content:this.$i18n("heart_error_clock_service"),btns:[{btn_name:this.i18n("btn_name_confirm")}]}),h.default.debugAlert("获取心率定时列表失败")}},data:function(){return{p_heartrate:0,p_timeType:"day",p_light_heart:0,p_middle_heart:0,p_high_heart:0,p_heartInfo:"",p_heartSuggest:"",p_test_timestamp:null,p_lasttest_timestamp:null,paneltitle:this.$i18n("heart_today"),isHeartPop:!1,precentheart:0,percenttimeid:0,isAssessCon:!1,isBluetoothCon:!1,p_testList:[],p_clockNum:0,p_clockTotalNum:0}}}},202:function(t,e,a){e=t.exports=a(1)(),e.push([t.id,".health-heart[_v-c4471018]{position:relative}.health-heart .header-bg[_v-c4471018]{position:relative;width:100%;height:15rem;background-image:url("+a(45)+");background-size:100% 100%;background-position:50%;background-repeat:no-repeat}.health-heart .data-ring[_v-c4471018]{position:absolute;top:50%;left:50%;margin-top:-100px;margin-left:-80px}.health-heart .health-header p[_v-c4471018]{position:absolute;width:100%;height:2rem;top:50%;margin-top:-1rem;line-height:2rem;text-align:center;color:hsla(0,0%,100%,.8)}.health-heart .health-header .title[_v-c4471018]{margin-top:-5.5rem;font-size:.9rem}.health-heart .health-header .data[_v-c4471018]{font-size:1.5rem;color:#fff;margin-top:-3.5rem}.health-heart .health-header .percent[_v-c4471018]{margin-top:-1.5rem;font-size:.9rem}.health-heart .health-header .set_target[_v-c4471018]{margin-top:.5rem;font-size:.7rem;color:#fff;text-align:center;border:1px solid #fff;border-radius:15px;width:4rem;left:50%;margin-left:-2rem;height:1.2rem;line-height:1.3rem}.health-heart .health-header .testheart[_v-c4471018]{position:absolute;display:table;top:4.5rem;right:1rem;color:#fff;border:1px solid #fff;border-radius:50%;font-size:.7rem;-webkit-text-size-adjust:none;width:3rem;height:3rem;line-height:3rem;text-align:center}.health-heart .health-header .testheart i[_v-c4471018]{display:table-cell;line-height:.8rem;vertical-align:middle}.health-heart .health-header .refresh[_v-c4471018]{position:absolute;top:4.5rem;left:1rem;color:#fff;border:1px solid #fff;border-radius:50%;font-size:.5rem;-webkit-text-size-adjust:none;width:3rem;height:3rem;line-height:3rem;text-align:center}.testHeartPop[_v-c4471018]{display:table;position:fixed;width:82%;height:auto;-webkit-transition:all .5s;transition:all .5s;background:#fff;border-radius:5px;left:0;top:0;right:0;padding:7% 0;bottom:0;z-index:300;margin:auto}.testHeartPop p[_v-c4471018]{text-align:center;font-size:1rem;color:#000;position:relative}.testHeartPop p span[_v-c4471018]{display:inline-block;margin:auto;position:absolute;left:0;right:0;bottom:0;top:0;line-height:40px;font-size:10px}.testHeartPop p img[_v-c4471018]{width:40px}.test-list[_v-c4471018]{position:relative;width:90%;margin:-2.5rem auto 1rem}.test-list .list-title[_v-c4471018]{color:#959595;padding:.5rem;white-space:nowrap;font-size:.9rem}.test-list .list-title .time[_v-c4471018]{display:inline-block;width:60%;text-align:left}.test-list .list-title .rate[_v-c4471018]{display:inline-block;width:38%;text-align:right}.test-list .list[_v-c4471018]{border-top:1px solid #eee;padding:0 .5rem;height:16rem;overflow-x:hidden;overflow-y:scroll}.test-list .list .list-item[_v-c4471018]{height:2.5rem;line-height:2.5rem;border-bottom:1px solid #e1e1e1;color:#646464;white-space:nowrap;font-size:.9rem}.test-list .list .list-item[_v-c4471018]:last-child{border-bottom:none}.test-list .list .list-item .item-time[_v-c4471018]{display:inline-block;width:60%;text-align:left}.test-list .list .list-item .item-rate[_v-c4471018]{display:inline-block;width:40%;text-align:center}.test-list .no-tip[_v-c4471018]{position:relative;min-height:15rem;text-align:center}.test-list .no-tip img[_v-c4471018]{width:8rem;height:8rem;position:absolute;top:50%;margin-top:-6rem;left:50%;margin-left:-4rem}.test-list .no-tip p[_v-c4471018]{width:100%;position:absolute;top:50%;margin-top:3rem;color:#959595;font-size:.9rem}.heart-clock-info[_v-c4471018]{display:block;width:90%;margin:.5rem auto 0;background-color:#fff;border-radius:5px;box-shadow:0 0 5px #e2e2e2;height:3rem;line-height:3rem;color:#999;white-space:nowrap}.heart-clock-info .title[_v-c4471018]{display:inline-block;width:60%;padding-left:.5rem;color:#959595;font-size:.9rem}.heart-clock-info .number[_v-c4471018]{display:inline-block;width:25%;text-align:right;color:#646464}.heart-clock-info .arrow[_v-c4471018]{display:inline-block;-webkit-transform:rotate(135deg);transform:rotate(45deg);-webkit-transform-origin:100% 50%;transform-origin:100% 50%;height:6px;width:6px;border-width:2px 2px 0 0;border-color:#9a9a9a;border-style:solid}.heart-clock-desc[_v-c4471018]{margin:.5rem auto 0;width:86%;font-size:.74rem}",""])},227:function(t,e,a){t.exports=a.p+"static/images/img_band_tips@3x.f6bfdd1.png"},230:function(t,e){t.exports="data:image/svg+xml;base64,PCEtLSBCeSBTYW0gSGVyYmVydCAoQHNoZXJiKSwgZm9yIGV2ZXJ5b25lLiBNb3JlIEAgaHR0cDovL2dvby5nbC83QUp6YkwgLS0+Cjxzdmcgd2lkdGg9IjM4IiBoZWlnaHQ9IjM4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjNjYwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBzdHJva2Utb3BhY2l0eT0iLjUiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPgogICAgICAgICAgICA8cGF0aCBkPSJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMTgiPgogICAgICAgICAgICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0KICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCiAgICAgICAgICAgICAgICAgICAgdHlwZT0icm90YXRlIgogICAgICAgICAgICAgICAgICAgIGZyb209IjAgMTggMTgiCiAgICAgICAgICAgICAgICAgICAgdG89IjM2MCAxOCAxOCIKICAgICAgICAgICAgICAgICAgICBkdXI9IjFzIgogICAgICAgICAgICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICAgICAgICAgIDwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="},262:function(t,e,a){t.exports=' <div class=health-heart _v-c4471018=""> <div class="health-header header-bg" _v-c4471018=""> <gauge-ring v-ref:data-ring="" class=data-ring :width=160 :height=160 _v-c4471018=""></gauge-ring> <p class=title _v-c4471018="">{{$i18n("heart_title")}}</p> <p class=data _v-c4471018="">{{ p_heartrate || $i18n("heart_nodata") }}</p> <p class=percent _v-c4471018="">{{$i18n("heart_unit")}}</p> <p class=set_target @click=testHeartrate _v-c4471018="">{{$i18n("heart_test")}}</p> </div> <panel v-ref:list="" class=test-list :paneltitle=paneltitle _v-c4471018=""> <div class=list-title _v-c4471018=""> <span class=time _v-c4471018="">{{$i18n("heart_list_time")}}</span> <span class=rate _v-c4471018="">{{$i18n("heart_list_data")}}</span> </div> <ul v-if="p_testList &amp;&amp; p_testList.length > 0" class=list _v-c4471018=""> <li class=list-item v-for="test in p_testList" _v-c4471018=""> <span class=item-time _v-c4471018="">{{ test.utime }}</span> <span class=item-rate _v-c4471018="">{{ test.rate }}</span> </li> </ul> <div v-show=!p_testList.length class=no-tip _v-c4471018=""> <img src='+a(227)+' _v-c4471018=""> <p _v-c4471018="">{{$i18n("heart_list_nodata")}}</p> </div> </panel> <a href=javascript:; v-link="{name:\'heartclocklist\'}" class=heart-clock-info _v-c4471018=""> <span class=title _v-c4471018="">{{$i18n("heart_clock_num")}}</span> <span class=number _v-c4471018="">{{ p_clockNum }}/{{ p_clockTotalNum }}</span> <i class=arrow _v-c4471018=""></i> </a> <p class=heart-clock-desc _v-c4471018="">{{$i18n("heart_clock_desc")}}</p> <div class=testHeartPop v-show=isHeartPop transition=fadeInOut _v-c4471018=""> <p _v-c4471018="">{{$i18n("heart_test_process")}}</p> <p _v-c4471018=""><img src='+a(230)+' _v-c4471018=""><span _v-c4471018="">{{precentheart}}%</span></p> <p _v-c4471018="">{{$i18n("heart_test_tip")}}</p> </div> <paiband-mask v-ref:mask="" _v-c4471018=""></paiband-mask> </div> '},286:function(t,e,a){var i,n,A={};a(317),i=a(142),n=a(262),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports.default);var o="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;n&&(o.template=n),o.computed||(o.computed={}),Object.keys(A).forEach(function(t){var e=A[t];o.computed[t]=function(){return e}})},317:function(t,e,a){var i=a(202);"string"==typeof i&&(i=[[t.id,i,""]]);a(2)(i,{});i.locals&&(t.exports=i.locals)}});