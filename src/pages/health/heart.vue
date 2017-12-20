<template>
    <div class="health-heart">
        <div class="health-header header-bg">
            <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
            <p class="title">{{$i18n("heart_title")}}</p>
            <p class="data">{{ p_heartrate || $i18n("heart_nodata") }}</p>
            <p class="percent">{{$i18n("heart_unit")}}</p>
            <p class="set_target" @click="testHeartrate">{{$i18n("heart_test")}}</p>
        </div>
        <panel v-ref:list class="test-list" :paneltitle="paneltitle">
            <div class="list-title">
                <span class="time">{{$i18n("heart_list_time")}}</span>
                <span class="rate">{{$i18n("heart_list_data")}}</span>
            </div>
            <ul v-if="p_testList && p_testList.length > 0" class="list">
                <li class="list-item" v-for="test in p_testList">
                    <span class="item-time">{{ test.utime }}</span>
                    <span class="item-rate">{{ test.rate }}</span>
                </li>
            </ul>
            <div v-show="!p_testList.length" class="no-tip">
                <img src="~assets/images/img_band_tips@3x.png">
                <p>{{$i18n("heart_list_nodata")}}</p>
            </div>
        </panel>
        <a href="javascript:;" v-link="{name:'heartclocklist'}" class="heart-clock-info">
            <span class="title">{{$i18n("heart_clock_num")}}</span>
            <span class="number">{{ p_clockNum }}/{{ p_clockTotalNum }}</span>
            <i class="arrow"></i>
        </a>
        <p class="heart-clock-desc">{{$i18n("heart_clock_desc")}}</p>
        <div class="testHeartPop" v-show = "isHeartPop" transition="fadeInOut">
            <p>{{$i18n("heart_test_process")}}</p>
            <p><img src="~assets/images/oval.svg"><span>{{precentheart}}%</span></p>
            <p>{{$i18n("heart_test_tip")}}</p>
        </div>
        <!-- 遮罩层 -->
        <paiband-mask v-ref:mask></paiband-mask>

    </div>
</template>

<script>
    import gaugeRing from 'components/gauge/ring';
    import panel from 'components/common/panel';
    import paibandMask from 'components/mask';

    import jutils from 'jutils';

    import db from 'dbs/hashmap';
    import jsb from  'services/jsb';
    import service from 'services/heartclock';
    import heartService from 'services/heart';

    export default {
        components: { gaugeRing, panel,paibandMask },

        methods: {
            init(width, height) {
                console.log('health-heart init', width, height);

                if(width > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                }

                service.getHeartTestRecord(this.p_updateTestList, this.p_updateTestListError);
                service.getHeartClockList(this.p_updateClockList, this.p_updateClockListError);
                heartService.getToday(this.p_updateTodayData, this.p_updateTodayDataError);

                this.addAppAwakeCallback();
            },

            update(width, height) {
                console.log('health-heart update');

                if(width > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                }

                service.getHeartTestRecord(this.p_updateTestList, this.p_updateTestListError);
                service.getHeartClockList(this.p_updateClockList, this.p_updateClockListError);
                heartService.getToday(this.p_updateTodayData, this.p_updateTodayDataError);

                this.addAppAwakeCallback();
            },

            addAppAwakeCallback() {
                if(db.get('appAwakeCalls') === undefined) {
                    db.set('appAwakeCalls', []);
                }
                const calls = db.get('appAwakeCalls');
                if(calls.indexOf(this.appAwakeCallback) < 0) {
                    calls.push(this.appAwakeCallback);
                }
            },

            appAwakeCallback() {
                //醒来检测心率测试是否超时
                if(this.p_test_timestamp !== null && new Date() - this.p_test_timestamp > 40000) {
                    this.$refs.mask.showMark(false);//关闭遮罩
                    this.isHeartPop = false;//关闭测试中提示框
                    this.precentheart = 0; //初始化百分比为零
                    clearInterval(this.percenttimeid);
                    this.p_test_timestamp = null;
                    this.$dispatch('showalert', {
                        alert_content: '<p>'+this.$i18n("heart_test_tip_back")+'<p>',
                        btns: [
                            { btn_name: this.$i18n("btn_name_cancel") },
                            {
                                 btn_name: this.$i18n("heart_test_again"),
                                 callback: this.testHeartrate.bind(this)
                            }
                        ]
                    });
                }
            },

            getTodday() {
                const date = new Date();
                return [date.getFullYear(), ('0' + (date.getMonth() + 1)).substr(-2), ('0' + (date.getDate())).substr(-2)].join('-');
            },

            procentHeart(){
                this.percenttimeid = setInterval(()=>{
                    if(this.precentheart < 98){
                        this.precentheart++;
                    }
                },300);
            },

            testHeartrate() {

                if(new Date() - this.p_lasttest_timestamp < 5000) {
                    this.$dispatch('showtip', this.$i18n("heart_test_frequent"));
                    return ;
                }

                const cid = db.get('cid');
                const deviceid = db.get('device_id');
                jsb.getBluetoothStatus(deviceid, data => {
                    if(deviceid === data.device_id) {
                        db.set('bluetoothStatus', data.status);
                        if(data.status === 0) {
                            this.$refs.mask.showMark(true);
                            this.isHeartPop = true;//显示测试中提示框
                            this.procentHeart();//百分比显示
                            this.p_test_timestamp = new Date();
                            jsb.determineHeartRate(deviceid, cid, data => {
                                if(deviceid === data.device_id) {
                                    /*this.update();*/
                                    this.$refs.mask.showMark(false);//关闭遮罩
                                    this.isHeartPop = false;//关闭测试中提示框
                                    this.precentheart = 0; //初始化百分比为零
                                    this.p_test_timestamp = null;
                                    this.p_lasttest_timestamp = new Date();
                                    clearInterval(this.percenttimeid);
                                    this.$dispatch('showalert', {
                                        alert_content: '<p>' + this.$i18n("heart_test_result_1") + data.heart_rate + ' ' + this.$i18n("heart_test_result_2")+'<p><p style="font-size:0.8rem;">'+this.$i18n("heart_test_result_3")+'70'+' '+this.$i18n("heart_test_result_2")+'</p>',
                                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                                    });
                                }
                            }, error => {
                                if(deviceid === error.device_id) {
                                    this.$refs.mask.showMark(false);//关闭遮罩
                                    this.isHeartPop = false;//关闭测试中提示框
                                    this.precentheart = 0; //初始化百分比为零
                                    clearInterval(this.percenttimeid);
                                    this.p_test_timestamp = null;
                                    this.p_lasttest_timestamp = new Date();

                                    this.$dispatch('showalert', {
                                        alert_content: '<p>' +this.$i18n("heart_test_uncomplete")+ '<p>',
                                        btns: [
                                            { btn_name: this.$i18n("btn_name_cancel") },
                                            {
                                                 btn_name: this.$i18n("heart_test_again"),
                                                 callback: this.testHeartrate.bind(this)
                                            }
                                        ]
                                    });
                                    jutils.debugAlert('手环心率测定失败');
                                }
                            });
                        } else if(data.status === 1) {
                            //this.$dispatch('closealert');
                            this.$dispatch('showalert', {
                                alert_content: this.$i18n("bluetooth_connecting"),
                                btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                            });
                            jutils.debugAlert('蓝牙正在连接中');
                        } else if(data.status === 2) {
                            //this.$dispatch('closealert');
                            this.$dispatch('showalert', {
                                alert_content: this.$i18n("bluetooth_connect"),
                                btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                            });
                            jutils.debugAlert('未连接到手环');
                        } else if(data.status === 3) {
                            //this.$dispatch('closealert');
                            this.$dispatch('showalert', {
                                alert_content: this.$i18n("bluetooth_open"),
                                btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                            });
                            jutils.debugAlert('手机未开启蓝牙');
                        }
                    }
                }, error => {
                    jutils.debugAlert('获取蓝牙状态失败');
                    this.$dispatch('showtip', this.$i18n("bluetooth_error_state"));
                });
            },
            p_updateTodayData(data) {
                console.log('p_updateTodayData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("heart_error_today_service"),
                        btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                const today = data.data;
                /*this.p_heartrate = today.current_rate || 0;*/
                this.p_heartPercent = today.target_complete || 0;
                this.$refs.dataRing.drawRing(this.p_heartPercent * 0.01);
            },

            p_updateTodayDataError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("heart_error_today_network"),
                    btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                });
            },

            assessInfo(){
                this.$refs.mask.showMark(true);
                this.isAssessCon = true;
            },
            closeAssessCon(){
                this.$refs.mask.showMark(false);
                this.isAssessCon = false;
            },

            p_updateTestList(data) {
                this.p_testList = data.data.list;
                this.p_heartrate = (this.p_testList && this.p_testList[0] && this.p_testList[0].rate) || 0;
            },

            p_updateTestListError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("heart_error_clock_network"),
                    btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                });
                jutils.debugAlert('获取心率测定列表失败');
            },

            p_updateClockList(data) {
                this.p_clockTotalNum = data.data.max_clock_count || 0;
                this.p_clockNum = (data.data.list || []).length;
            },

            p_updateClockListError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("heart_error_clock_service"),
                    btns: [ { btn_name: this.i18n("btn_name_confirm")} ]
                });
                jutils.debugAlert('获取心率定时列表失败');
            }
        },

        data() {
            return {
                p_heartrate: 0,
                p_timeType: 'day',
                p_light_heart: 0,
                p_middle_heart: 0,
                p_high_heart: 0,
                p_heartInfo: '',
                p_heartSuggest: '',
                p_test_timestamp: null,
                p_lasttest_timestamp: null,
                paneltitle:this.$i18n("heart_today"),
                isHeartPop:false,//测试弹出框是否显示
                precentheart:0,
                percenttimeid: 0,
                isAssessCon:false,//评估内容层是否显示
                isBluetoothCon:false,//同步按钮是否显示
                p_testList: [],
                p_clockNum: 0,
                p_clockTotalNum: 0
            };
        }
    };
</script>

<style scoped>
    .health-heart {
        position: relative;
    }
    .health-heart .header-bg {
        position: relative;
        width: 100%;
        height: 15rem;
        background-image: url('~assets/images/status_bg1.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .health-heart .data-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -80px;
    }
    .health-heart .health-header p {
        position: absolute;
        width: 100%;
        height: 2rem;
        top: 50%;
        margin-top: -1rem;
        line-height: 2rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }
    .health-heart .health-header .title {
        margin-top: -5.5rem;
        font-size: .9rem;
    }
    .health-heart .health-header .data {
        font-size: 1.5rem;
        color: #FFF;
        margin-top: -3.5rem;
    }
    .health-heart .health-header .percent {
        margin-top: -1.5rem;
        font-size: .9rem;
    }
    .health-heart .health-header .set_target {
        margin-top: .5rem;
        font-size: .7rem;
        color:#fff;
        text-align: center;
        border:1px solid #fff;
        border-radius:15px;
        width:4rem;
        left:50%;
        margin-left:-2rem;
        height:1.2rem;
        line-height: 1.3rem;

    }
    .health-heart .health-header .testheart {
        position: absolute;
        display: table;
        top: 4.5rem;
        right: 1rem;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        font-size: 0.7rem;
        -webkit-text-size-adjust: none;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
    }
    .health-heart .health-header .testheart i {
        display: table-cell;
        line-height: 0.8rem;
        vertical-align: middle;
    }
    .health-heart .health-header .refresh {
        position: absolute;
        top: 4.5rem;
        left: 1rem;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        font-size: 0.5rem;
        -webkit-text-size-adjust: none;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
    }
    .testHeartPop{display:table; position:fixed; width:82%; height:auto; transition:all .5s; background: #fff; border-radius:5px; left:0; top:0; right:0; padding:7% 0%;  bottom:0; z-index: 300; margin:auto;}
    .testHeartPop p{text-align: center;font-size: 1rem; color:#000; position:relative;}
    .testHeartPop p span{display:inline-block; margin:auto; position:absolute; left:0; right:0; bottom:0; top:0; line-height: 40px; font-size: 10px;}
    .testHeartPop p img{width:40px;}
    .test-list {
        position: relative;
        width: 90%;
        margin: -2.5rem auto 1rem auto;
    }
    .test-list .list-title {
        color: #959595;
        padding: 0.5rem;
        white-space: nowrap;
        font-size: .9rem;
    }
    .test-list .list-title .time {
        display: inline-block;
        width: 60%;
        text-align: left;
    }
    .test-list .list-title .rate {
        display: inline-block;
        width: 38%;
        text-align: right;
    }
    .test-list .list {
        border-top: 1px solid #eee;
        padding: 0 0.5rem;
        height: 16rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .test-list .list .list-item {
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom: 1px solid #e1e1e1;
        color: #646464;
        white-space: nowrap;
        font-size: .9rem;
    }
    .test-list .list .list-item:last-child {
        border-bottom: none;
    }
    .test-list .list .list-item .item-time {
        display: inline-block;
        width: 60%;
        text-align: left;
    }
    .test-list .list .list-item .item-rate {
        display: inline-block;
        width: 40%;
        text-align: center;
    }
    .test-list .no-tip {
        position: relative;
        min-height: 15rem;
        text-align: center;
    }
    .test-list .no-tip img {
        width: 8rem;
        height: 8rem;
        position: absolute;
        top: 50%;
        margin-top: -6rem;
        left: 50%;
        margin-left: -4rem;
    }
    .test-list .no-tip p {
		width: 100%;
		position: absolute;
		top: 50%;
		margin-top: 3rem;
        color: #959595;
        font-size: 0.9rem;
    }
    .heart-clock-info {
        display: block;
        width: 90%;
        margin: 0.5rem auto 0 auto;
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0 0 5px #e2e2e2;
        height: 3rem;
        line-height: 3rem;
        color: #999;
        white-space: nowrap;
    }
    .heart-clock-info .title {
        display: inline-block;
        width: 60%;
        padding-left: 0.5rem;
        color:#959595;
        font-size: 0.9rem;
    }
    .heart-clock-info .number {
        display: inline-block;
        width: 25%;
        text-align: right;
        color:#646464;
    }
    .heart-clock-info .arrow {
        display: inline-block;
        -webkit-transform: rotate(135deg); 
        transform: rotate(45deg);
        transform-origin: 100% 50%;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #9a9a9a;
        border-style: solid;
    }
    .heart-clock-desc {
        margin: 0.5rem auto 0 auto;
        width: 86%;
        font-size: 0.74rem;
    }
</style>
