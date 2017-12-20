<template>
    <div class="health-heart">
        <div class="health-header header-bg">
            <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
            <p class="title">心率</p>
            <p class="data">{{ p_heartrate || '无数据' }}</p>
            <p class="percent">次/分钟 BPM</p>
            <a class="refresh" v-show="isBluetoothCon" href="javascript:;" @click="syncData">同步数据</a>
        </div>
        <div class="data-total">
            <span>
                <p class="special-font">{{ p_light_heart }}<i>分钟</i></p>
                <p>轻度运动</p>
            </span>
            <span>
                <p class="special-font">{{ p_middle_heart }}<i>分钟</i></p>
                <p>中度运动</p>
            </span>
            <span>
                <p class="special-font">{{ p_high_heart }}<i>分钟</i></p>
                <p>重度运动</p>
            </span>
            <div class="link_go">
                <a href="javascript:;" @click="assessInfo">心率有什么用<img src="~assets/images/select_bg.png" alt=""></a>
            </div>
        </div>
        <panel class="data-statis" :paneltitle="getTodday()" panelunit="单位:次/分钟">
            <line v-ref:data-heart></line>
        </panel>
        <div class="btn_group">
            <a class="update" @click="testHeartrate">测一次心率</a>
            <a class="set" v-link="{name:'heartclock'}">定时心率</a>
        </div>
        <panel class="tips" :paneltitle="paneltitle">
            <p class="tip-info">{{ p_heartInfo || '' }}</p>
            <p class="tip-suggest">{{ p_heartSuggest || ''}}</p>
        </panel>
        <div class="assess_con" v-show="isAssessCon">
            <p>心率数据有什么用？</p>
            <span>监测心率数据可以知道运动的强度。</span>
            <span>
                <b>轻度运动：最快心率60%-70%区间</b>
                <b>中度运动：最快心率70%-90%区间</b>
                <b>重度运动：最快心率90%-100%区间</b>
            </span>
            <a href="javascript:;" @click="closeAssessCon"></a>
        </div>
        <div class="testHeartPop" v-show = "isHeartPop">
            <p>测试中</p>
            <p><img src="~assets/images/oval.svg"><span>{{precentheart}}%</span></p>
            <p>请保持手环不要远离手机</p>
        </div>
        <!-- 遮罩层 -->
        <div class="sleep_mark" v-show="sleepMark"></div>

    </div>
</template>

<script>
    import gaugeRing from 'components/gauge/ring';
    import panel from 'components/common/panel';
    import bar from "components/common/bar/bar";
    import line from "components/common/line/line";

    import jutils from 'jutils';

    import db from 'dbs/hashmap';
    import jsb from  'services/jsb';
    import service from 'services/heart';

    export default {
        components: { gaugeRing, bar, line, panel },

        methods: {
            init(width, height) {
                console.log('health-heart init', width, height);

                if(width > 0 && height > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                }

                service.getToday(this.p_updateTodayData, this.p_updateTodayDataError);
                
                //判断蓝牙是否链接如果链接显示同步按钮
                this.bluetoothStatusIsBtn();
                this.bluetoothStatusChange();
                
                this.addAppAwakeCallback();
            },

            update(width, height) {
                console.log('health-heart update');

                if(width > 0 && height > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                }

                service.getToday(this.p_updateTodayData, this.p_updateTodayDataError);

                //判断蓝牙是否链接如果链接显示同步按钮
                this.bluetoothStatusIsBtn();
                this.bluetoothStatusChange();

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
                if(this.p_test_timestamp !== null && new Date() - this.p_test_timestamp > 30000) {
                    this.sleepMark = false;//关闭遮罩
                    this.isHeartPop = false;//关闭测试中提示框
                    this.precentheart = 0; //初始化百分比为零
                    clearInterval(this.percenttimeid);
                    this.p_test_timestamp = null;
                    this.$dispatch('showalert', { 
                        alert_content: '<p>实时心率未完成，测试中请不要置于后台。<p>', 
                        btns: [ 
                            { btn_name: '取消' }, 
                            {
                                 btn_name: '再测一次',
                                 callback: this.testHeartrate.bind(this)
                            }
                        ]
                    });
                }
            },

            bluetoothStatusIsBtn(){
                if(db.get('bluetoothStatusCalls') === undefined) {
                    db.set('bluetoothStatusCalls', []);
                }
                const calls = db.get('bluetoothStatusCalls');
                if(calls.indexOf(this.bluetoothStatusChange) < 0) {
                    calls.push(this.bluetoothStatusChange);
                }
            },

            bluetoothStatusChange(){
                if(db.get('bluetoothStatus') == 0) {
                    this.isBluetoothCon = true;
                }else{
                    this.isBluetoothCon = false;
                }
            },

            getTodday() {
                const date = new Date();
                return [date.getFullYear(), ('0' + (date.getMonth() + 1)).substr(-2), ('0' + (date.getDate())).substr(-2)].join('-');
            },

            syncData() {
                const cid = db.get('cid');
                const deviceid = db.get('device_id');
                jsb.getBluetoothStatus(deviceid, data => {
                    if(deviceid === data.device_id) {
                        db.set('bluetoothStatus', data.status);
                        if(data.status === 0) {
                            this.$dispatch('sync-all-data', (success => {
                                if(success) {
                                    this.update();
                                }
                            }).bind(this));
                        } else if(data.status === 1) {
                            this.$dispatch('showalert', { 
                                alert_content: '手环正在连接中，请稍后再试', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('蓝牙正在连接中');
                        } else if(data.status === 2) {
                            this.$dispatch('showalert', { 
                                alert_content: '请先连接手环', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('未连接到手环');
                        } else if(data.status === 3) {
                            this.$dispatch('showalert', { 
                                alert_content: '请打开手机蓝牙并连接手环', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('手机未开启蓝牙');
                        }
                    }
                }, error => {
                    jutils.debugAlert('获取蓝牙状态失败');
                    this.$dispatch('showtip', '获取蓝牙状态失败');
                });
            },

            procentHeart(){
                this.percenttimeid = setInterval(()=>{
                    if(this.precentheart < 98){
                        this.precentheart++;
                    }
                },200);
            },

            testHeartrate() {
                if(db.get('isSync')) {
                    this.$dispatch('showtip', '手环正在同步数据中，请稍后操作');
                    return ;
                }

                const cid = db.get('cid');
                const deviceid = db.get('deviceid');
                jsb.getBluetoothStatus(deviceid, data => {
                    if(deviceid === data.device_id) {
                        db.set('bluetoothStatus', data.status);
                        if(data.status === 0) {
                            this.sleepMark = true;//显示遮罩
                            this.isHeartPop = true;//显示测试中提示框
                            this.procentHeart();//百分比显示
                            this.p_test_timestamp = new Date();
                            jsb.determineHeartRate(deviceid, cid, data => {
                                if(deviceid === data.device_id) {
                                    /*this.update();*/
                                    this.sleepMark = false;//关闭遮罩
                                    this.isHeartPop = false;//关闭测试中提示框
                                    this.precentheart = 0; //初始化百分比为零
                                    this.p_test_timestamp = null;
                                    clearInterval(this.percenttimeid);
                                    this.$dispatch('showalert', { 
                                        alert_content: '<p>实时心率：' + data.heart_rate + '次/分钟<p><p style="font-size:0.8rem;">参考静息心率：70次/分钟</p>',
                                        btns: [ { btn_name: '确认'} ]
                                    });
                                }
                            }, error => {
                                if(deviceid === error.device_id) {
                                    this.sleepMark = false;//关闭遮罩
                                    this.isHeartPop = false;//关闭测试中提示框
                                    this.precentheart = 0; //初始化百分比为零
                                    clearInterval(this.percenttimeid);
                                    this.p_test_timestamp = null;
                                    this.$dispatch('showalert', { 
                                        alert_content: '<p>实时心率未完成<p>', 
                                        btns: [ 
                                            { btn_name: '取消' }, 
                                            {
                                                 btn_name: '再测一次',
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
                                alert_content: '手环正在连接中，请稍后再试', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('蓝牙正在连接中');
                        } else if(data.status === 2) {
                            //this.$dispatch('closealert');
                            this.$dispatch('showalert', { 
                                alert_content: '请先连接手环', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('未连接到手环');
                        } else if(data.status === 3) {
                            //this.$dispatch('closealert');
                            this.$dispatch('showalert', { 
                                alert_content: '请打开手机蓝牙并连接手环', 
                                btns: [ { btn_name: '确认'} ]
                            });
                            jutils.debugAlert('手机未开启蓝牙');
                        }
                    }
                }, error => {
                    jutils.debugAlert('获取蓝牙状态失败');
                    this.$dispatch('showtip', '获取蓝牙状态失败');
                });
            },

            p_updateTodayData(data) {
                console.log('p_updateTodayData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', { 
                        alert_content: '获取心率数据失败,请稍后重试！', 
                        btns: [ { btn_name: '确认'} ]
                    });
                    return ;
                }

                const today = data.data;
                this.p_heartrate = today.current_rate || 0;
                this.p_heartPercent = today.target_complete || 0;
                this.p_light_heart = today.light_motion_minutes || 0;
                this.p_middle_heart = today.middle_motion_minutes || 0;
                this.p_high_heart = today.severe_motion_time || 0;
                this.$refs.dataRing.drawRing(this.p_heartPercent * 0.01);

                const todayTip = today.today_summary;
                this.p_heartInfo = todayTip.active_tips;
                this.p_heartSuggest = todayTip.addition_tips;

                const todayData = data.data.data;
                const lineData = [];
                for(let i = 0; i < todayData.length; i++) {
                    lineData.push(todayData[i]['rate']);
                }
                //最快心率,最慢心率,轻度、中度、重度运动
                const age = db.get("age");
                const fastHeart = 220 -age;
                const slowestHeart = 60;
                const mild_exercise = [];
                      mild_exercise.push(fastHeart*0.6);
                      mild_exercise.push(fastHeart*0.7);
                const moderate_exercise = [];
                      moderate_exercise.push(fastHeart*0.7);
                      moderate_exercise.push(fastHeart*0.9);
                const severe_exercise = [];
                      severe_exercise.push(fastHeart*0.9);
                      severe_exercise.push(fastHeart*1);

                lineData.unshift(null);
                console.log("lineData",lineData);
                const config = {
                    // 设置热力图背景参数,不设置则默认不显示，每个纵向刻度都要设置对应的颜色
                    backColor:{
                        showText:[{},{},{color:'#ffd505',text:'轻度运动'},{color:'#ff9b2b',text:'中度运动'},{color:'#ed5564',text:'重度运动'}],//文字描述
                        choseColor:['#fff','#fff','#fffbe5','#fff5e8','#fdeeef']
                    },
                    heatBlocks: [{
                        values: severe_exercise,
                        text: '重度运动',
                        color: '#fdeeef',
                        textColor: '#ef5361'
                    }, {
                        values: moderate_exercise,
                        text: '中度运动',
                        color: '#fff5e8',
                        textColor: '#ff9c0c'
                    }, {
                        values: mild_exercise,
                        text: '轻度运动',
                        color: '#fffbe5',
                        textColor: '#ffd700'
                    }],
                    goalLines: [{
                        value: fastHeart,
                        text: '最快',
                        textColor: '#FFF',
                        color: '#f698a1'
                    }, {
                        value: 100,
                        text: '静息',
                        textColor: '#FFF',
                        color: '#b7e494'
                    }, {
                        value: slowestHeart,
                        text: '最慢',
                        textColor: '#FFF',
                        color: '#93daf3'
                    }],
                    labels: (() => {
                        const arr = [];
                        for(let i = 0; i < 24; i++) {
                            arr.push(i);
                        }
                        return arr;
                    })(),//x轴坐标数据
                    data: lineData,//bar的对应x轴坐标
                    lineTension: 0.5,//line弯曲平滑程度
                    borderColor: "#ff9c0c",//边框颜色
                    pointBackgroundColor: "#ff9c0c",//point点bg颜色
                    min: 0,//y轴刻度最小值
                    max: 220,//y轴刻度最大值
                    stepSize: (() => {
                        const max = 220;
                        const min = 0;
                        return (max - min) / 5;
                    })(),//y轴刻度间隔
                    xCallBack(value) {
                        if(value == 0){
                            return '';
                        } else if (value % 4 == 0) {
                            return value.toString().substr(-2) + ':00';
                        }
                        return '';
                    },
                    yCallBack:function(value,index){
                        if(value == 0){
                         return "";
                       }
                       return value;
                     },
                };
                this.$refs.dataHeart.drawLine(config);
                this.$refs.dataHeart.isShowTarget = false;
            },

            p_updateTodayDataError(error) {
                this.$dispatch('showalert', { 
                    alert_content: '获取心率数据失败,请检查网络后重试！', 
                    btns: [ { btn_name: '确认'} ]
                });
            },
            assessInfo(){
                this.sleepMark = true;
                this.isAssessCon = true;
            },
            closeAssessCon(){
                this.sleepMark = false;
                this.isAssessCon = false;
            },
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
                paneltitle:"今日成长总结.心率",
                sleepMark:false,//遮罩层是否显示
                isHeartPop:false,//测试弹出框是否显示
                precentheart:0,
                percenttimeid: 0,
                isAssessCon:false,//评估内容层是否显示
                isBluetoothCon:false,//同步按钮是否显示
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
        margin-top: -4rem;
        font-size: .9rem;
    }
    .health-heart .health-header .data {
        font-size: 1.5rem;
        color: #FFF;
        margin-top: -2rem;
    }
    .health-heart .health-header .percent {
        margin-top: 0.2rem;
        font-size: .9rem;
    }
    .health-heart .health-header .refresh {
        position: absolute;
        top: 4.5rem;
        left: 1rem;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        font-size: 0.5rem;
        -webkit-text-size-adjust:none;
        width:3rem;
        height:3rem;
        line-height: 3rem;
        text-align: center;
    }
    .health-heart .health-header .refresh i {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-image: url('~assets/images/icon_16_44@3x.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        vertical-align: -23%;
    }
    .health-heart .data-total {
        position: relative;
        margin: -3rem 0.5rem 0 0.5rem;
        background: #FFF;
        border-radius: 4px;
        white-space: nowrap;
    }
    .health-heart .data-total .unit {
        position: absolute;
        top: 0rem;
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        color: #fff;
        text-align: right;
        font-size: .9rem;
    }
    .health-heart .data-total span {
        display: inline-block;
        width: 33.3%;
        height: 100%;
        text-align: center;
        padding-bottom:.5rem;
    }
    .health-heart .data-total span .special-font {
        font-family: 'AkzidenzGrotesk';
        color: #ef5361;
        font-style: normal;
        font-size: 2.5rem;
        height: 3.5rem;
        line-height: 4rem;
    }
    .health-heart .data-total span .special-font i {
        font-style: normal;
        font-size: .8rem;
        color:#646464;
    }
    .health-heart .data-total span p:nth-child(2){
        font-size: .8rem;
        color:#959595;
    }
    .health-heart .data-statis {
        margin: 1rem 0.5rem 0 0.5rem;
    }
    .health-heart .data-statis .time-type {
        text-align: center;
        font-size: 0;
        color: #ef5361;
    }
    .health-heart .data-statis .time-type li {
        display: inline-block;
        border: 1px solid #ef5361;
        width: 3rem;
        margin-bottom: 1rem;
        font-size: .9rem;
        padding:.1rem .4rem;
    }
    .health-heart .data-statis .time-type li.select {
        background-color: #ef5361;
        color: #fff;
    }
    .health-heart .data-statis .time-type li:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin-right: -1px;
    }
    .health-heart .data-statis .time-type li:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-left: -1px;
    }
    .health-heart .tips {
        margin: 1rem 0.5rem 0rem 0.5rem;
        padding-bottom: 0.5rem;
    }
    .health-heart .tips .tip-info {
        padding: .5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }
    .health-heart .tips .tip-suggest {
        padding: 0 0.5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }
    .health-heart .update {
        border-right:1px solid #e1e1e1;
        margin-left:-1px;
        background:url(~assets/images/icon_16_54@3x.png)no-repeat scroll 10% center;
        background-size: 20px;

    }
    .health-heart .set {
        background:url(~assets/images/icon_16_55@3x.png)no-repeat scroll 10% center;
        background-size: 20px;
    }
    .health-heart .btn_group{
        overflow:hidden;
        background:#fff;
        border-radius: 4px;
        margin:0 auto;
        margin-top:1rem;
        width:95%;
        box-shadow: 0 0 5px #e2e2e2;
    }
    .health-heart .btn_group a{
        display:inline-block;
        width:50%;
        padding:.5rem 0;
        text-align: center;
        font-size: .9rem;
        float:left;
        color:#ef5361;
    }
    .testHeartPop{display:table; position:fixed; width:82%; height:auto; transition:all .5s; background: #fff; border-radius:5px; left:0; top:0; right:0; padding:7% 0%;  bottom:0; z-index: 300; margin:auto;}
    .testHeartPop p{text-align: center;font-size: 1rem; color:#000; position:relative;}
    .testHeartPop p span{display:inline-block; margin:auto; position:absolute; left:0; right:0; bottom:0; top:0; line-height: 40px; font-size: 10px;}
    .testHeartPop p img{width:40px;}
</style>
