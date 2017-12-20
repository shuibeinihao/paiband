<template>
    <div class="health-sleep">
        <div class="health-header header-bg">
            <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
            <p class="title">{{$i18n("sleep_title")}}</p>
            <p class="data">{{{ this.p_sleepTimeHour || '' }}}</p>
            <!-- <p class="percent">完成目标{{ p_targetPercent }}%</p> -->
            <p class="set_target" @click="set_target">{{$i18n("sleep_complete_l")}}</p>
        </div>
        <div class="data-total">
            <span>
                <p class="special-font p_sleep_quality">{{ p_sleep_quality || $i18n("sleep_complete_r") }}</p>
                <p>{{$i18n("sleep_how")}}</p>
            </span>
            <span>
                <p class="special-font">{{ p_deepSleepPercent }}<i>%</i></p>
                <p>{{$i18n("sleep_deep")}}</p>
            </span>
            <div class="link_go">
                <a @click="assessInfo">{{$i18n("sleep_how_title")}}<img src="~assets/images/select_bg.png"></a>
            </div>
        </div>
        <panel class="data-statis" :paneltitle="paneltitle" :panelunit="panelunit">
            <div v-show="p_timeType === 'day'" transition="fadeIn">
                <bar v-ref:data-day height="12.53rem"></bar>
                <div class="legend">
                    <span><i class="light"></i>{{$i18n("sleep_level_light")}}</span>
                    <span><i class="deep"></i>{{$i18n("sleep_level_deep")}}</span>
                    <span><i class="awake"></i>{{$i18n("sleep_level_awake")}}</span>
                </div>
            </div>
            <line v-ref:data-week v-show="p_timeType === 'week'" transition="fadeIn" height="15rem"></line>
            <line v-ref:data-month v-show="p_timeType === 'month'" transition="fadeIn" height="15rem"></line>
            <ul class="time-type">
                <li @click.self="p_selectTimeType('month')" :class="p_timeType === 'month' ? 'select' : ''">{{this.$i18n("time_unit_month")}}</li>
                <li @click.self="p_selectTimeType('week')" :class="p_timeType === 'week' ? 'select' : ''">{{this.$i18n("time_unit_week")}}</li>
                <li @click.self="p_selectTimeType('day')" :class="p_timeType === 'day' ? 'select' : ''">{{this.$i18n("time_unit_day")}}</li>
            </ul>
            <div class="period">{{this.$i18n("sleep_time_d")}}:20:00-08:00</div>
        </panel>
        <panel class="tips hide" :paneltitle="paneltitle">
            <div class="tip-info">
                <!-- <p>
                    <span>lajdflajflasdjfalsjfa<b>11小时</b>jf</span>
                    <i>深度睡眠：<b>3小时11分钟</b></i>
                    <i>浅度睡眠：<b>3小时11分钟</b></i>
                    <i>辗转反侧：<b>11次</b></i>
                </p> -->
                {{{ p_sleepInfo || $i18n("sport_nodata") }}}
                <!-- <span v-for="item in p_sleep_match">{{item}}</span> -->
            </div>
            <p class="tip-suggest">{{ p_sleepSuggest || '' }}</p>
        </panel>
        <div class="assess_con" v-show="isAssessCon" transition="fadeInOut">
            <p>{{$i18n("sleep_how_title")}}</p>
            <span>{{$i18n("sleep_how_desc_1")}}</span>
            <span>{{$i18n("sleep_how_desc_2")}}</span>
            <span>{{$i18n("sleep_how_desc_3")}}</span>
            <a href="javascript:;" @click="closeAssessCon"></a>
        </div>
        <!-- 遮罩层 -->
        <paiband-mask v-ref:mask></paiband-mask>
        <!-- 睡眠目标设定 -->
        <div class="set_wrap" v-show="isSetPop" transition="fadeInOut">
            <div class="target_info sleep_target_info">
                <p class="set_title">{{$i18n("setting_goal_sleep_title")}}</p>
                <p class="title">
                    <span v-show="isSleepInteShow">
                        <b>{{Math.floor(sleeping.reference/60)||0}}</b>
                        <i>{{$i18n("time_unit_hour")}}</i><b>{{sleeping.reference%60||0}}</b><i>{{$i18n("time_unit_minute")}}</i>
                    </span>
                    <span v-show="isSleepSelfShow">
                        <b>{{Math.floor((sleeping.self||sleeping.reference*0.5)/60)}}</b><i>{{$i18n("time_unit_hour")}}</i>
                        <b>{{Math.floor((sleeping.self||sleeping.reference*0.5)%60)||0}}</b><i>{{$i18n("time_unit_minute")}}</i>
                    </span>
                </p>
                <a @click="target_sleep_info"  id="1" :class="{'act':isSleepInitAct}">
                    <span>{{$i18n("setting_step_recommend_title")}}</span>
                    <i>{{$i18n("setting_step_recommend_tip")}}</i>
                </a>
                <a @click="target_sleep_info" class="slef_info" id="2" :class="{'act':isSleepSlefAct, 'no_bottom': !isSleepSlefAct}">
                    <span>{{$i18n("setting_step_custom_title")}}</span>
                    <i>{{$i18n("setting_step_custom_tip")}}</i>
                </a>
                <p v-show="isSleepSlefAct" class="range_info">
                    <input id="range_sleep" @change="range_sleep_info" type="range" min="{{sleep_min}}" max="{{sleep_max}}" step="1" value="{{sleep_value}}">
                    <span><i>50%</i><i>100%</i><i>150%</i></span>
                </p>
            </div>
            <p class="set_ok"><a href="javascript:;" @click="set_ok">{{$i18n("btn_name_confirm")}}</a></p>
        </div>
    </div>
</template>

<script>
    import gaugeRing from 'components/gauge/ring';
    import panel from 'components/common/panel';
    import bar from "components/common/bar/bar";
    import line from "components/common/line/line";

    import service from 'services/sleep';
    import jutils from 'jutils';
    import settings from "services/setting";
    import paibandMask from 'components/mask';


    import db from 'dbs/hashmap';
    import jsb from  'services/jsb';
    export default {
        components: { gaugeRing, bar, line, panel ,paibandMask},

        methods: {
            init(width, height) {
                console.log('health-sleep init', width, height);
                if(width > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                    this.$refs.dataRing.drawRing(0);
                }

                service.getToday(this.p_updateTodayData, this.p_updateTodayDataError);
                settings.getSettings(this.updateSettings, this.updateSettingsError);//获取.目标设定值
            },

            update(width, height) {

                if(width > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                }

                service.getToday(this.p_updateTodayData, this.p_updateTodayDataError);
                if(this.p_timeType === 'week') {
                    this.p_weekend = this.getDateString(undefined, '-');
                    service.getLast7Days(this.p_weekend.replace(/-/g, ''), this.p_updateLast7DaysData, this.p_updateLast7DaysDataError);
                } else if(this.p_timeType === 'month') {
                    this.p_monthend = this.getDateString(undefined, '-');
                    service.getLast30Days(this.p_monthend.replace(/-/g, ''), this.p_updateLast30DaysData, this.p_updateLast30DaysDataError);
                }
                settings.getSettings(this.updateSettings, this.updateSettingsError);//获取.目标设定值
            },

            getDateString(date, split = '') {
                const theDate = date || new Date();
                const dateStr = [theDate.getFullYear(), ('0' + (theDate.getMonth() + 1)).substr(-2), ('0' + theDate.getDate()).substr(-2)].join(split);
                return dateStr;
            },

            //获取从from之前的days天数日期数据列表，不包括from那天
            getForeDays(from, days = 0) {
                const ret = [];
                const start = new Date(from);
                for(let i = 0; i < days; i++) {
                    ret.push(this.getDateString(new Date(start.getFullYear(), start.getMonth(), start.getDate() - i - 1), '-'));
                }
                return ret.reverse();
            },

            p_selectTimeType(type) {
                this.p_timeType = type;

                this.update();
            },

            p_updateTodayData(data) {
                console.log('p_updateTodayData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("sleep_error_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                this.panelunit = data.data.last_update_text;
                const today = data.data.today;
                this.p_sleepTime = today.sleep_minutes;
                this.p_targetPercent = today.target_complete;
                this.p_wakeCount = today.awake_count;
                this.p_sleep_quality = today.sleep_quality;
                this.p_deepSleepPercent = Math.round(today.deep_sleep_time * 100 / this.p_sleepTime) || 0;
                this.p_targetSleepTime = today.target_sleep_time;
                this.$refs.dataRing.drawRing(this.p_sleepTime / this.p_targetSleepTime);

                const todayTip = data.data.today_summary;
                if(this.p_timeType == "day"){
                    // this.p_sleep_match = todayTip.active_tips.match(/(深度睡眠\s*[:：]?\s*(?:\d+\s*小时)?\s*(?:\d+\s*分钟)?)[\s\S]*(浅度睡眠\s*[:：]?\s*(?:\d+\s*小时)?\s*(?:\d+\s*分钟)?)[\s\S]*(辗转反侧\s*[:：]?\s*\d+\s*次)/) || [];
                    // if(this.p_sleep_match){
                    //     this.p_sleepInfo = todayTip.active_tips.replace(this.p_sleep_match[0],"");
                    //     this.p_sleep_match.shift();
                    // }else{
                    //     this.p_sleepInfo = todayTip.active_tips;
                    // }
                    this.p_sleepInfo = todayTip.active_tips;
                    this.p_sleepSuggest = todayTip.addition_tips;
                    this.paneltitle = this.$i18n("sleep_summary_title_day");
                }

                const todayData = data.data.data;
                const barData = [];
                const START = '20:00';
                const END = '08:00';
                const TIME = (() => {
                    let start = START.split(':');
                    start = parseInt(start[0]) * 60 + parseInt(start[1]);
                    let end = END.split(':');
                    end = parseInt(end[0]) * 60 + parseInt(end[1]);
                    return 24 * 60 - start + end;
                })();
                const labels = [];
                const showLabels = [];
                const _gap = 3;
                for(let i = 0; i < TIME; i += _gap) {
                    barData[parseInt(i / _gap)] = 3;
                    labels[parseInt(i / _gap)] = parseInt(i / _gap);
                }
                labels.push(parseInt(TIME / _gap));
                for(let i = 0; i < todayData.length; i++) {
                    const status = this.p_calcTodayStatus(todayData[i].status);
                    const s = this.p_calcTodayTime(todayData[i].start, START, END) / _gap;
                    const e = this.p_calcTodayTime(todayData[i].end, START, END) / _gap;
                    showLabels[s] = todayData[i].start;
                    for(let j = s; j < e; j++) {
                        barData[j] = status;
                    }
                }
                const config = {
                    maintainAspectRatio: false,
                    ctx: this.$el.querySelector('#barChart'),
                    labels: labels,//x轴坐标数据
                    data: barData,//bar的对应x轴坐标
                    backgroundColor: (() => {
                        const arr = [];
                        for(let i = 0; i < barData.length; i++) {
                            if(barData[i] > 4) {
                                arr.push('rgba(139,73,246,0.5)');
                            } else if(barData[i] > 3) {
                                arr.push('rgba(196,165,246,0.5)');
                            } else if(barData[i] > 0) {
                                arr.push('rgba(255,208,223,0.5)');
                            } else {
                                arr.push('#fff');
                            }
                        }
                        return arr;
                    })(),
                    min: 0,//y轴刻度最小值
                    max: 4,//y轴刻度最大值
                    stepSize: 1,//y轴刻度间隔
                    categoryPercentage: 1,//控制每个柱状图无间隙显示
                    barPercentage: 1,//控制每个柱状图无间隙显示
                    xCallBack(value) {
                        if(Number(value * _gap / 60) % 2 === 0) {
                            const t = Number(value * _gap / 60);
                            if(t + 20 < 24) {
                                return t + 20 + ':00';
                            }
                            return ('0' + (t + 20 - 24)).slice(-2) + ':00';
                        }
                        return '';
                    },
                    yCallBack(value) {
                        /*if(value > 2) {*/
                            /*return '深度';*/
                        /*} else if(value > 1) {*/
                            /*return '浅度';*/
                        /*} else if(value > 0) {*/
                            /*return '醒来';*/
                        /*}*/
                        return '';
                    }
                };
                this.$refs.dataDay.drawBar(config);
            },

            p_updateTodayDataError(error) {
                console.log('p_updateTodayDataError', error);
            },

            p_calcTodayStatus(status) {
                if(status === 0) {
                    //深睡
                    return 4.0001;
                } else if(status === 1) {
                    //浅睡
                    return 4;
                } else if(status === 2) {
                    //醒着
                    return 3;
                }
                return 0;
            },

            //把时间转换成距离起点的分钟数，以6分钟为间隔，时间靠近分钟刻度
            p_calcTodayTime(time, start, end, gap = 3) {
                start = start.split(':');
                start = parseInt(start[0]) * 60 + parseInt(start[1]);
                end = end.split(':');
                end = parseInt(end[0]) * 60 + parseInt(end[1]);
                const long = 24 * 60 - start + end;
                time = time.split(':');
                // let offset = new Date().getTimezoneOffset();
                // if(parseInt(time[0]) - parseInt(offset/60) <= 24){
                //     time = parseInt(time[0])*60 - parseInt(offset) + parseInt(time[1]);
                // }else if(parseInt(time[0]) - parseInt(offset/60) > 24){
                //     time = (parseInt(time[0]) - parseInt(offset/60) -24)*60 + parseInt(time[1]);
                // };
                time = parseInt(time[0] * 60 + parseInt(time[1]));
                if(time <= start)  {
                    time = 24 * 60 - start + time;
                    if(time > long) {
                        time = long;
                    }
                } else {
                    time = time - start;
                }
                if(time % gap < gap / 2) {
                    return gap * parseInt(time / gap);
                } else {
                    return gap * parseInt(time / gap) + gap;
                }
                return time;
            },

            p_updateLast7DaysData(data) {
                console.log('p_updateLast7DaysData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("sleep_error_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                const weekTip = data.data.summary;
                if(this.p_timeType == "week"){
                    this.p_sleepInfo = weekTip.active_tips;
                    this.p_sleepSuggest = weekTip.addition_tips;
                    this.paneltitle = this.$i18n("sleep_summary_title_week");
                };

                const weekData = data.data.data.sort((a, b) => {
                    if(parseInt(a.utime.replace(/-/g, '')) > parseInt(b.utime.replace(/-/g, ''))) {
                        return 1;
                    }
                    return -1;
                });
                const lineData = [];
                const line7days = this.getForeDays(this.p_weekend, 7);
                for(let i = 0; i < line7days.length; i++) {
                    lineData.push(0);
                    for(let j = 0; j < weekData.length; j++) {
                        if(weekData[j]['utime'] == line7days[i]) {
                            lineData[i] = Number((weekData[j]['sleep_minutes']/60).toFixed(2));
                            break;
                        }
                    }
                }
                lineData.length && lineData.unshift(null);
                const vMin = 0;
                const vMax = (() => {
                    const lines = lineData.slice(1);
                    lines.push(Number(((data.data.target_sleep_time || 0) / 60).toFixed(2)));
                    const max = Math.ceil(Math.max(...lines)) + 1;
                    if(max < 6) {
                        return 6;
                    }
                    return max;
                })();
                const config = {
                    maintainAspectRatio: false,
                    //ctx: this.$refs.dataWeek.$el.querySelector('#lineChart'),
                    goalLines: !isNaN(data.data.target_sleep_time) ? [{
                        value: Number(((data.data.target_sleep_time || 0)/60).toFixed(2)),
                        text: this.$i18n("sleep_goal"),
                        textColor: '#fff',
                        color: '#8b49f6'
                    }] : [],
                    labels: (() => {
                        const arr = [''];
                        for(let i = 0; i < line7days.length; i++) {
                            const date = line7days[i].split('-');
                            if(i === 0) {
                                arr.push(parseInt(date[2]) + "/" + parseInt(date[1]));
                            /*} else if(i === weekData.length - 1) {*/
                                /*arr.push('今日');*/
                            } else {
                                if(parseInt(date[2]) === 1) {
                                    arr.push('1' + "/"+parseInt(date[1]));
                                } else {
                                    arr.push(parseInt(date[2]) + '');
                                }
                            }
                        }
                        return arr;
                    })(),//x轴坐标数据
                    data: lineData,//bar的对应x轴坐标
                    //目标线的位置用数据表示
                    //data_line: Array(lineData.length || 7).fill(data.data.target_sleep_time || 0),
                    lineTension: 0.6,//line弯曲平滑程度
                    borderColor: "#8b49f6",//边框颜色
                    pointBackgroundColor: "#8b49f6",//point点bg颜色
                    min: vMin,//y轴刻度最小值
                    max: vMax,//y轴刻度最大值
                    stepSize: (() => {
                        const max = vMax;
                        if(max >= 12) {
                            return 2;
                        }
                        return 1;
                    })(),//y轴刻度间隔
                    yCallBack: value => {
                        if(value === 0) {
                            return '';
                        }
                        return value+"h";
                    }
                };
                this.$refs.dataWeek.drawLine(config);
                weekData.length && (this.p_weekend = weekData[weekData.length - 1]['utime']);
            },

            p_updateLast7DaysDataError(error) {
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n("sleep_error_network"), 
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            p_updateLast30DaysData(data) {
                console.log('p_updateLast30DaysData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n("sleep_error_network"), 
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                const monthTip = data.data.summary;
                if(this.p_timeType == "month"){
                    this.p_sleepInfo = monthTip.active_tips;
                    this.p_sleepSuggest = monthTip.addition_tips;
                    this.paneltitle = this.$i18n("sleep_summary_title_month");
                };

                const monthData = data.data.data.sort((a, b) => {
                    if(parseInt(a.utime.replace(/-/g, '')) > parseInt(b.utime.replace(/-/g, ''))) {
                        return 1;
                    }
                    return -1;
                });
                const lineData = [];
                const line30days = this.getForeDays(this.p_monthend, 30);
                for(let i = 0; i < line30days.length; i++) {
                    lineData.push(0);
                    for(let j = 0; j < monthData.length; j++) {
                        if(monthData[j]['utime'] == line30days[i]) {
                            lineData[i] = Number((monthData[j]['sleep_minutes']/60).toFixed(2));
                            break;
                        }
                    }
                }
                lineData.length && lineData.unshift(null);
                const vMin = 0;
                const vMax = (() => {
                    const lines = lineData.slice(1);
                    lines.push(Number(((data.data.target_sleep_time || 0) / 60).toFixed(2)));
                    const max = Math.ceil(Math.max(...lines)) + 1;
                    if(max < 6) {
                        return 6;
                    }
                    return max;
                })();
                const config = {
                    maintainAspectRatio: false,
                    //ctx: this.$refs.dataMonth.$el.querySelector('#lineChart'),
                    goalLines: !isNaN(data.data.target_sleep_time) ? [{
                        value: Number(((data.data.target_sleep_time || 0)/60).toFixed(2)),
                        text: this.$i18n("sleep_goal"),
                        textColor: '#fff',
                        color: '#8b49f6'
                    }] : [],
                    labels: (() => {
                        const arr = [''];
                        for(let i = 0; i < line30days.length; i++) {
                            const date = line30days[i].split('-');
                            if(i === 0) {
                                arr.push(parseInt(date[2]) + "/" + parseInt(date[1]));
                            /*} else if(i === monthData.length - 1) {*/
                                /*arr.push('今日');*/
                            }else if(i == 3){
                                arr.push("");
                            }else {
                                if(parseInt(date[2]) === 1 && i !== 1) {
                                    arr.push('1' + "/" +parseInt(date[1]));
                                } else {
                                    if(parseInt(date[2]) % 3 === 0 && i !== 1) {
                                        if(i - 1 >= 0 && i + 1 < line30days.length) {
                                            if(parseInt(line30days[i - 1].split('-')[2]) !== 1 && parseInt(line30days[i + 1].split('-')[2]) !== 1&&parseInt(line30days[i].split('-')[2]) !== 30&&parseInt(line30days[i].split('-')[2]) !== 3) {
                                                arr.push(parseInt(date[2]) + '');
                                            } else {
                                                arr.push('');
                                            }
                                        } else {
                                            arr.push('');
                                        }
                                    } else {
                                        arr.push('');
                                    }
                                }
                            }
                        }
                        return arr;

                    })(),//x轴坐标数据
                    data: lineData,//bar的对应x轴坐标
                    //目标线的位置用数据表示
                    //data_line: Array(lineData.length || 30).fill(data.data.target_sleep_time || 0),
                    lineTension: 0.6,//line弯曲平滑程度
                    borderColor: "#8b49f6",//边框颜色
                    pointBackgroundColor: "#8b49f6",//point点bg颜色
                    min: 0,//y轴刻度最小值
                    max: vMax,//y轴刻度最大值
                    stepSize: (() => {
                        const max = vMax;
                        if(max >= 12) {
                            return 2;
                        }
                        return 1;
                    })(),//y轴刻度间隔
                    yCallBack: value => {
                        if(value === 0) {
                            return '';
                        }
                        return value+"h";
                    }
                };
                this.$refs.dataMonth.drawLine(config);
                monthData.length && (this.p_monthend = monthData[monthData.length - 1]['utime']);
            },

            p_updateLast30DaysDataError(error) {
               this.$dispatch('showalert', { 
                    alert_content: this.$i18n("sleep_error_network"), 
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            assessInfo(){
                this.isAssessCon = true;
                this.$refs.mask.showMark(true);
            },
            closeAssessCon(){
                this.$refs.mask.showMark(false);
                this.isAssessCon = false;
            },

            //睡眠目标设定
            set_target(){
                this.isSetPop = true;
                this.$refs.mask.showMark(true, 1, this.closeMask);
            },

            set_ok(){
                this.isSetPop = false;
                this.$refs.mask.showMark(false);
            },

            closeMask(){
                this.isSetPop = false;
                this.$refs.mask.showMark(false);
            },

            updateSettings(data){
                console.log("updateSettings",data);
                if(data.http_code == 200){
                    this.special_tips = data.data.growing_expect.special_tips;
                    this.expect = data.data.growing_expect.expect;
                    //睡眠目标设定
                    this.sleeping = data.data.targets.sleeping;
                    this.sleep_min = (this.sleeping.reference*50)/100;
                    this.sleep_max = (this.sleeping.reference*150)/100;
                    this.sleep_value = this.sleeping.self;
                    if(this.sleep_value){//当self有值时 默认选中自定义 否则选中智能推荐
                        this.isSleepSelfShow = true;
                        this.isSleepSlefAct = true;
                        this.isSleepInteShow = false;
                        this.isSleepInitAct = false;
                    }
                }else{
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n("sleep_set_lose"), 
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateSettingsError(error){
                console.log("error",error);
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n("sleep_set_lose"), 
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            target_sleep_info(e){//睡眠目标操作
                this.setFlag = 'sleep';
                let target = "";
                let id = $(e.target).attr("id");
                if(id == 1){
                    this.isSleepInteShow = true;
                    this.isSleepSelfShow = false;
                    target = "0";//当点击智能推荐时给steps传0 当self有值时 默认选中自定义 否则选中智能推荐
                    this.isSleepInitAct = true;
                    this.isSleepSlefAct = false;
                    settings.setSleepTarget(target, this.setTarget, this.setTargetError);
                }else if(id == 2){
                    this.isSleepInteShow = false;
                    this.isSleepSelfShow = true;
                    this.isSleepInitAct = false;
                    this.isSleepSlefAct = true;
                    this.$el.querySelector("#range_sleep").value = this.sleep_value;//初始化滑块位置
                    target = this.sleeping.reference * 0.5;
                    settings.setSleepTarget(target, this.setTarget, this.setTargetError);
                }
            },
            setTarget(data){
                this.update();//设置成功之后重新获取.目标设定值
            },
            range_sleep_info(e){
                this.setFlag = 'sleep';
                $(e.target).attr('value', e.target.value);
                let target = "";
                target = $(e.target).attr('value');
                settings.setSleepTarget(target, this.setTarget, this.setTargetError);
            },
        },

        computed: {
            p_sleepTimeHour() {
                if(this.p_sleepTime < 0) {
                    return '<span style="font-size:1.5rem;">'+this.$i18n("sport_nodata")+'</span>';
                }
                if(this.p_sleepTime === 0) {
                    return '0<span style="font-size:.8rem;">'+this.$i18n("time_unit_hour")+'</span>';
                }
                const hour = Math.floor(this.p_sleepTime / 60);
                const min = this.p_sleepTime % 60;
                return  hour + '<span style="font-size:.8rem;">'+this.$i18n("time_unit_hour")+'</span>' + min + '<span style="font-size:.8rem;">'+this.$i18n("time_unit_minute")+'</span>';
            }
        },

        data() {
            return {
                p_sleep_match:[],//深度，浅度，睡眠
                p_sleep_quality:"",//睡眠质量
                p_timeType: 'day',
                p_sleepTime: -1,
                p_targetPercent: 0,
                p_wakeCount: 0,
                p_deepSleepPercent: 0,
                p_targetSleepTime: 0,
                p_sleepInfo: '',
                p_sleepSuggest: '',
                p_weekend: '2016-08-08',
                p_monthend: '2016-08-08',
                paneltitle:this.$i18n("sleep_summary_title_day"),
                panelunit:"",//更新多久
                isAssessCon:false,//评估内容层是否显示
                isBluetoothCon:false,//同步按钮是否显示

                isSleepInteShow:true,//睡眠目标智能推荐是否显示
                isSleepSelfShow:false,//睡眠目标自定义是否显示
                isSleepInitAct:true,//睡眠目标智能推荐act是否显示
                isSleepSlefAct:false,//睡眠目标自定义act是否显示

                sleep_min:"",
                sleep_max:"",
                sleep_value:"",
                isSetPop:false,//睡眠目标设定弹出看是否显示

                sleeping:{},//睡眠目标
            };
        }
    };
</script>

<style scoped>
    .health-sleep {
        position: relative;
    }

    .health-sleep .header-bg {
        position: relative;
        width: 100%;
        height: 15rem;
        background-image: url('~assets/images/status_bg4.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .health-sleep .data-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -80px;
    }
    .health-sleep .health-header p {
        position: absolute;
        width: 100%;
        height: 2rem;
        top: 50%;
        margin-top: -1rem;
        line-height: 2rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }
    .health-sleep .health-header .title {
        margin-top: -4.3rem;
        font-size: .7rem;
    }
    .health-sleep .health-header .data {
        font-family:AkzidenzGrotesk;
        font-size: 3rem;
        color: #FFF;
        margin-top: -2rem;
    }
    .health-sleep .health-header .percent {
        margin-top: 0;
        font-size: .8rem;
    }
    .health-sleep .health-header .set_target {
        margin-top: 1rem;
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
        display:none;

    }
    .health-sleep .health-header .refresh {
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
    .health-sleep .health-header .refresh i {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-image: url('~assets/images/icon_16_44@3x.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        vertical-align: -23%;
    }
    .health-sleep .health-header .gosetting {
        position: absolute;
        top: 4.5rem;
        right: 1rem;
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
    .health-sleep .data-total {
        position: relative;
        margin: -3rem 0.5rem 0 0.5rem;
        background: #FFF;
        border-radius: 4px;
    }
    .health-sleep .data-total span {
        display: inline-block;
        width: 49%;
        height: 100%;
        text-align: center;
        padding-bottom:.5rem;
    }
    .health-sleep .data-total span .special-font {
        font-family: 'AkzidenzGrotesk';
        color: #8c3ffa;
        font-style: normal;
        font-size: 2.5rem;
        height: 3.5rem;
        line-height: 4rem;
    }
    .health-sleep .data-total span .p_sleep_quality {
        color: #8c3ffa;
        font-style: normal;
        font-size: 1.5rem;
        height: 3.5rem;
        line-height: 4rem;
    }
    .health-sleep .data-total span .special-font i {
        font-style: normal;
        font-size: .9rem;
    }
     .health-sleep .data-total span p:nth-child(2){
        font-size: .8rem;
        color:#959595;
    }
    .health-sleep .data-statis {
        margin: 1rem 0.5rem 0 0.5rem;
    }
    .health-sleep .data-statis .period{
        text-align: center;
        color:#959595;
        padding:.5rem 0;
        font-size: 1rem;
        border-top:1px solid #e1e1e1;
    }
    .health-sleep .data-statis .legend {
        text-align: center;
        font-size: 0.8rem;
        color: #959595;
        margin-bottom: 1.25rem;
    }
    .health-sleep .data-statis .legend span {
        margin: 0.625rem;
    }
    .health-sleep .data-statis .legend i {
        width: 0.625rem;
        height: 0.625rem;
        display: inline-block;
        margin-right: 0.3rem;
        border-radius: 100%;
    }
    .health-sleep .data-statis .legend i.light {
        background-color: rgba(196,165,246,0.5);
    }
    .health-sleep .data-statis .legend i.deep {
        background-color: rgba(139,73,246,0.5);
    }
    .health-sleep .data-statis .legend i.awake {
        background-color: rgba(255,208,223,0.5);
    }
    .health-sleep .data-statis .time-type {
        text-align: center;
        font-size: 0;
        color: #8c3ffa;
    }
    .health-sleep .data-statis .time-type li {
        display: inline-block;
        border: 1px solid #8c3ffa;
        width: 3rem;
        margin-bottom: 1rem;
        padding:.1rem .2rem;
        font-size: .9rem;
        color:#313131;
    }
    .health-sleep .data-statis .time-type li.select {
        background-color: #8c3ffa;
        color: #fff;
    }
    .health-sleep .data-statis .time-type li:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin-right: -1px;
    }
    .health-sleep .data-statis .time-type li:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-left: -1px;
    }
    .health-sleep .tips {
        margin: 1rem 0.5rem 0rem 0.5rem;
        padding-bottom: 0.5rem;
    }
    .health-sleep .tips .tip-info {
        padding:0.5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }
    /*.health-sleep .tips .tip-info p{ font-size: .8rem;}
    .health-sleep .tips .tip-info p span{ color:#959595; display:block; padding-bottom:.5rem; border-bottom:1px solid #e1e1e1;}
    .health-sleep .tips .tip-info p span b{color:#8b49f6;}
    .health-sleep .tips .tip-info p i{display:block; color:#959595;}
    .health-sleep .tips .tip-info p i:nth-child(2){margin-top:.5rem;}
    .health-sleep .tips .tip-info p i b{color:#8b49f6;}已放到全局样式表里面*/
    .health-sleep .tips .tip-info span{
        display:block;
        font-size: 1rem;
        color:#8d723c;
    }
    .health-sleep .tips .tip-suggest {
        padding: 0 0.5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }

    /*睡眠目标设定，步数目标设定*/
.set_wrap{position:fixed; width:90%; left:5%; top:15%; background:#fff; border-radius:5px; z-index: 10;}

.target_info .set_title{ padding:6% 4% 3% 4%; text-align: center; font-size: 1.2rem; color:#000; font-weight: bold;}
.target_info .equivalent{ text-align: center; padding:.5rem 0; font-size: 1rem; color:#a3a3a3; width:100%; margin:0 auto;}
.target_info .equivalent span{ white-space: nowrap; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block;}
.target_info .title{padding-top:8px; text-align: center; font-size: .8rem; color:#B758D7;}
.target_info .title span{font-family: AkzidenzGrotesk;  font-size: 2rem; padding:0 5px;}
.target_info a{display:block; border-bottom:1px solid #e1e1e1; margin:0 4%; padding:2% 3% 2% 10%; background: url(~assets/images/radio_icon.png)no-repeat scroll left center; background-size: 20px;}
.target_info .slef_info{border-bottom:none;}
.target_info a.no_bottom{border-bottom:none;}
.target_info a.act{background: url(~assets/images/radio_icon_act.png)no-repeat scroll left center; background-size: 20px;}
.target_info a span{display:block; font-size: 1rem;}
.target_info a i{display:block; font-size: .8rem; color:#959595;}
.sleep_target_info .title span b{font-family:AkzidenzGrotesk; font-size: 2rem; }
.sleep_target_info .title span i{font-size: 0.8rem;}

/*滑块*/
.range_info{ padding:5% 4% 12% 4%;}
.range_info span{ display:block; position:relative; top:8px;}
.range_info span i{ position:absolute; top:0px; font-size: .7rem; color:#959595;}
.range_info span i:nth-child(1){left:0%;}
.range_info span i:nth-child(2){left:45%;}
.range_info span i:nth-child(3){right:0%;}
.range_info input[type=range] {
    -webkit-appearance: none; /* 隐藏滑块，以便自定义滑块样式 */
    width: 100%; /* Firefox下所需 */
    -webkit-user-select: none;
}
.range_info input[type=range]:focus {
    outline: none; /* 去掉默认蓝色边框 */
}
.range_info input[type=range]::-webkit-slider-thumb {
    border: 1px solid #e0e0e0;
    height: 30px;
    width: 30px;
    border-radius: 50px;
    background: #ffffff;
    box-shadow: 0 0 5px #ccc;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
}
.range_info input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #ebebeb;
    border-radius: 5px;
}

.set_ok{ border-top:1px solid #e1e1e1;}
.set_ok a{display:block; width:10rem; height:2.5rem; line-height:2.5rem; text-align: center; font-size: .9rem; margin:1rem auto;  background:#B758D7; border-radius:5px;  color:#fff;}
</style>
