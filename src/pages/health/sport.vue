<template>
    <div class="health-sport">
        <div class="health-header header-bg">
            <gauge-ring v-ref:data-ring class="data-ring" :width="p_ring_width" :height="p_ring_height"></gauge-ring>
            <p class="title">{{$i18n("sport_title")}}</p>
            <p class="data">{{ p_calorie || $i18n("sport_nodata") }}</p>
            <p class="percent">{{$i18n("sleep_complete_l")}}{{ p_targetPercent }}%</p>
            <p class="set_target" @click="set_target">{{$i18n("sleep_set")}}</p>
        </div>
        <div class="data-total">
            <div class="special_tip">
                <p v-if="p_consumeFood"><i>{{$i18n("sport_food_1")}}{{ p_consumeFood.consumption }}{{$i18n("sport_food_2")}}{{ p_consumeFood.category }}</i></p>
                <p v-else><i>{{$i18n("sport_food_0")}}</i></p>
            </div>
            <div class="details_info">
                <div class="details_info_con">
                    <span>
                        {{ p_walkSteps || 0 }}<i>{{$i18n("sport_walk")}}·{{$i18n("sport_step")}}</i>
                    </span>
                    <span class="add">
                        +
                    </span>
                    <span>
                        {{ p_runSteps || 0 }}<i>{{$i18n("sport_run")}}·{{$i18n("sport_step")}}</i>
                    </span>
                    <span class="equal">
                        =
                    </span>
                    <span>
                        {{ p_steps || 0 }}<i>{{$i18n("sport_steps")}}·{{$i18n("sport_step")}}</i>
                    </span>
                </div>
                <div class="meilage_icon">
                    {{$i18n("sport_total_mileage")}}:<i>{{ p_distance || 0 }}km</i>
                </div>
            </div>
        </div>
        <panel class="data-statis" :paneltitle="paneltitle" :panelunit="panelunit">
            <bar v-ref:data-day v-show="p_timeType === 'day'" transition="fadeIn" height="15rem"></bar>
            <line v-ref:data-week v-show="p_timeType === 'week'" transition="fadeIn" height="15rem"></line>
            <line v-ref:data-month v-show="p_timeType === 'month'" transition="fadeIn" height="15rem"></line>
            <ul class="time-type">
                <li @click.self="p_selectTimeType('month')" :class="p_timeType === 'month' ? 'select' : ''">{{$i18n("time_unit_month")}}</li>
                <li @click.self="p_selectTimeType('week')" :class="p_timeType === 'week' ? 'select' : ''">{{$i18n("time_unit_week")}}</li>
                <li @click.self="p_selectTimeType('day')" :class="p_timeType === 'day' ? 'select' : ''">{{$i18n("time_unit_day")}}</li>
            </ul>
        </panel>
        <panel class="tips hide" :paneltitle="paneltitle">
            <p class="tip-info">{{ p_sportInfo || '' }}</p>
            <p class="tip-suggest">{{ p_sportSuggest || ''}}</p>
        </panel>
        <!-- 运动专家策略 -->
        <div v-show="$lang == 'cn'" class="expert_strategy hide">
            <div class="strategy_list">
              <p class="per">
                 <img :src="motion_tips.expert_avatar" />
                 <span>{{motion_tips.expert_name || $i18n("grow_tip_nodate")}}</span>
                 <i>{{$i18n("sport_run_1")}}</i>
              </p>
              <p class="desc">{{motion_choice.content || $i18n("grow_tip_nodate")}}</p>
            </div>
            <!-- 加强锻炼 -->
            <div class="control_intake">
                <div class="con">
                    <!-- <p class="con_title">
                        {{motion_choice.title||"运动建议"}}
                    </p> -->
                   <!--  <div class="con_desc">
                        <p v-for="mo in motion_choice.content" track-by="$index">
                            {{$index + 1}}.&nbsp;{{mo}}
                        </p>
                    </div> -->
                    <div class="recomm_list">
                        <p class="con_title">
                            {{motion_tips.sport_title}}
                        </p>
                        <a href="javascript:;" v-for="dail in daily_motion">
                            <p class="product_img">
                                <img :src="dail.icon || 'http://gamecenter.file.putaocdn.com/file/0776c2ac3c7e4f1908734473036dd08a6e12dde4.jpg'" />
                                <span></span>
                            </p>
                            <p class="product_name">{{dail.name}}</p>
                            <p class="product_star">
                                <span class="text">{{motion_tips.sport_weather}}</span>
                                <span class="text">{{motion_tips.sport_time}}</span>
                            </p>
                            <p class="product_desc">
                                {{motion_tips.sport_tips}}
                                <!-- <span>
                                    <i>每60分钟消耗</i><b></b>
                                </span>
                                <span>
                                    <i>热量</i><b>{{dail.calorie}}千卡</b>
                                </span> -->
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 步数目标设定 -->
        <paiband-mask v-ref:mask></paiband-mask>
        <div class="set_wrap" v-show="isSetPop" transition="fadeInOut">
            <div class="target_info">
                <p class="set_title">{{$i18n("setting_goal_step_title")}}</p>
                <p class="title">
                    <span v-show="isStepInteShow">{{steps.reference||0}}</span>
                    <span v-show="isStepSelfShow">{{steps.self||steps.reference*0.5}}</span>{{$i18n("sport_step")}}
                </p>
                <p class="equivalent"><span>{{$i18n("sport_food_1")}}{{ consume.consumption || '0' }}{{ consume.category || $i18n("sport_chicken")}}</span></p>
                <a @click="target_step_info" id="1" :class="{'act':isSetpAct}">
                    <span>{{$i18n("setting_sleep_recommend_title")}}</span>
                    <i>{{$i18n("setting_sleep_recommend_tip")}}</i>
                </a>
                <a @click="target_step_info" id="2" class="slef_info" :class="{'act':isSlefAct, 'no_bottom': !isSlefAct}">
                    <span>{{$i18n("setting_sleep_custom_title")}}</span>
                    <i>{{$i18n("setting_sleep_custom_tip")}}</i>
                </a>
                <p v-show="isSlefAct" class="range_info">
                    <input id="range_steps" @change="range_step_info" type="range" min="{{steps_min}}" max="{{steps_max}}" step="1" value="{{steps_value}}">
                    <span><i>50%</i><i>175%</i><i>300%</i></span>
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
    import paibandMask from 'components/mask';

    import service from 'services/sport';
    import settings from "services/setting";

    import jutils from 'jutils';

    import db from 'dbs/hashmap';
    import jsb from  'services/jsb';

    export default {
        components: { gaugeRing, bar, line, panel ,paibandMask},

        methods: {
            init(width, height) {
                if(width > 0) {
                    const size = Math.round(width * 0.5);
                    this.$refs.dataRing.update(size, size);
                    const ml = size * 0.5;
                    this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
                    this.$refs.dataRing.$el.style.marginTop = '-' + (25 + ml) + 'px';
                    this.$refs.dataRing.drawRing(0);
                }

                service.getToday("124.74.57.53",this.p_updateTodayData, this.p_updateTodayDataError);

                jsb.getIp((data)=>{
                    console.log("data",data);
                    db.set("cityip",data.cityip);
                    service.getToday(data.cityip,this.p_updateTodayData, this.p_updateTodayDataError);
                },(error)=>{
                    console.log("error",error);
                });
                //侦听蓝牙状态变更
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

                service.getToday("124.74.57.53",this.p_updateTodayData, this.p_updateTodayDataError);

                let cityip = db.get("cityip");
                if(cityip){
                    service.getToday(cityip,this.p_updateTodayData, this.p_updateTodayDataError);
                }else{
                    jsb.getIp((data)=>{
                        console.log("data",data);
                        db.set("cityip",cityip);
                        service.getToday(data.cityip,this.p_updateTodayData, this.p_updateTodayDataError);
                    },(error)=>{
                        console.log("error",error);
                    });
                }

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
                        alert_content: this.$i18n("sport_error_service"), 
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                this.panelunit = data.data.last_update_text;
                const today = data.data.today;
                this.p_calorie = today.calorie;
                this.p_targetPercent = today.target_complete;
                this.p_distance = parseFloat((today.distance * 0.001).toFixed(1));
                this.p_steps = today.steps;
                this.p_walkSteps = today.walk_steps;
                this.p_runSteps = today.run_steps;
                this.p_consumeFood = today.consume_food;
                this.motion_tips = data.data.motion_tips;
                this.daily_motion = this.motion_tips.tomorrow_motion;
                this.motion_choice = this.motion_tips.recommend_motion;
                //this.motion_choice.content = this.motion_choice.content.split(/\(\d+\)/g).slice(1);
                this.$refs.dataRing.drawRing(this.p_targetPercent * 0.01);

                const todayTip = data.data.today_summary;

                if(this.p_timeType == "day"){
                    this.p_sportInfo = todayTip.active_tips;
                    this.p_sportSuggest = todayTip.addition_tips;
                    this.paneltitle = this.$i18n("sport_title_day");
                };

                const todayData = data.data.data;
                const barData = [];
                const highlight = [];
                for(let i = 0; i < todayData.length; i++) {
                    let hour = todayData[i]['hour'];
                    let offset = new Date().getTimezoneOffset();
                    if(parseInt(hour) - parseInt(offset/60) <= 24){
                        hour = parseInt(hour) - parseInt(offset/60);
                    }else if(parseInt(hour) - parseInt(offset/60) > 24){
                        hour = (parseInt(hour) - parseInt(offset/60) -24);
                    };
                    barData[hour] = todayData[i]['steps'];
                    if(todayData[i]['top'] < 3) {
                        highlight.push(hour);
                    }
                }
                for(let i = 0; i < 24; i++) {
                    if(barData[i] === undefined) {
                        barData[i] = 0;
                    }
                }
                const vMax = (() => {
                    const max = Math.max(...barData);
                    if(max > 2000) {
                        return (Math.ceil(max * 0.001)* 1000 + 1000);//y轴刻度最大值
                    }
                    if(max < 100) {
                        return 500;
                    }
                    return Math.ceil(max * 0.01) * 100 + 100;
                })();
                const vMin = (() => {
                    const min = Math.min(...barData);
                    if(min > 2000) {
                        return Math.floor(min * 0.001) * 1000;//y轴刻度最大值
                    }
                    if(min < 100) {
                        return 0;
                    }
                    return Math.floor(min * 0.01) * 100;
                })();
                const config = {
                    ctx: this.$el.querySelector('#barChart'),
                    labels: (() => { 
                        const arr = [];
                        for(let i = 0; i < 24; i++) {
                            arr.push(i);
                        }
                        return arr;
                    })(),//x轴坐标数据
                    data: barData,//bar的对应x轴坐标
                    backgroundColor: (() => {
                        const arr = [];
                        for(let i = 0; i < barData.length; i++) {
                            if(highlight.indexOf(i) > -1) {
                                arr.push('rgba(255, 155, 43, 0.5)');
                            } else {
                                arr.push('rgba(255, 230, 105, 0.5)');
                            }
                        }
                        return arr;
                    })(),
                    min: vMin,//y轴刻度最小值
                    max: vMax,//y轴刻度最大值
                    stepSize: (() => {
                        const max = vMax;
                        if(max >= 2000) {
                            return 1000;
                        }
                        return 100;
                    })(),
                    categoryPercentage: 1,//控制每个柱状图无间隙显示
                    barPercentage: 0.8,//控制每个柱状图无间隙显示
                    xCallBack(value) {
                        if(value == 0){
                            return '';
                        } else if (value % 4 == 0) {
                            return value.toString().substr(-2) + ':00';
                        }
                        return '';
                    },
                    yCallBack(value) {
                        if(value === 0) {
                            return '';
                        }
                        return value;
                    }
                };
                this.$refs.dataDay.drawBar(config);
            },

            p_updateTodayDataError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("sport_error_network"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            p_updateLast7DaysData(data) {
                console.log('p_updateLast7DaysData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("sport_error_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                const weekTip = data.data.summary;

                if(this.p_timeType == "week"){
                    this.p_sportInfo = weekTip.active_tips;
                    this.p_sportSuggest = weekTip.addition_tips;
                    this.paneltitle = this.$i18n("sport_title_week");
                }

                const weekData = (data.data.data || []).sort((a, b) => {
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
                            lineData[i] = weekData[j]['steps'];
                            break;
                        }
                    }
                }
                lineData.length && lineData.unshift(null);
                const vMax = (() => {
                    const lines = lineData.slice(1);
                    lines.push(data.data.target_steps || 0);
                    return (Math.ceil(Math.max(...lines) * 0.001) * 1000) || 500;//y轴刻度最大值
                })();
                const vMin = (() => {
                    const lines = lineData.slice(1);
                    lines.push(data.data.target_steps || 0);
                    const min = Math.floor(Math.min(...lines) * 0.001) * 1000 || 0;
                    if(min - 1000 > 0) {
                        return min - 1000;
                    }
                    return min;
                })();
                const config = {
                    //ctx: this.$refs.dataWeek.$el.querySelector('#lineChart'),
                    goalLines: !isNaN(data.data.target_steps) ? [{
                        value: parseInt(data.data.target_steps) || 0,
                        text: this.$i18n("sport_goal"),
                        textColor: '#fff',
                        color: '#ff9c0c'
                    }] : [],
                    labels: (() => {
                        const arr = [''];
                        for(let i = 0; i < line7days.length; i++) {
                            const date = line7days[i].split('-');
                            if(i === 0) {
                                /*英试的写法  日/月/年*/
                                arr.push(parseInt(date[2]) + "/" + parseInt(date[1]));
                            /*} else if(i === line7days.length - 1) {*/
                                /*arr.push('今日');*/
                            } else {
                                if(parseInt(date[2]) === 1) {
                                    arr.push('1' + "/" + parseInt(date[1]));
                                } else {
                                    arr.push(parseInt(date[2]) + '');
                                }
                            }
                        }
                        return arr;
                    })(),//x轴坐标数据
                    data: lineData,//bar的对应x轴坐标
                    //目标线的位置用数据表示
                    //data_line: Array(lineData.length || 7).fill(data.data.target_steps || 0),
                    lineTension: 0.6,//line弯曲平滑程度
                    borderColor: "#ff9c0c",//边框颜色
                    pointBackgroundColor: "#ff9c0c",//point点bg颜色
                    min: vMin,
                    max: vMax,
                    stepSize: (() => {
                        const max = vMax;
                        if(max >= 2000) {
                            return 1000;
                        }
                        return 100;
                    })(),
                    yCallBack: value => {
                        if(value === 0) {
                            return '';
                        }
                        if(value > 999) {
                            return Math.ceil(value * 0.001) + 'K';
                        }
                        return value;
                    }
                };
                this.$refs.dataWeek.drawLine(config);
                weekData.length && (this.p_weekend = weekData[0]['utime']);
            },

            p_updateLast7DaysDataError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("sport_error_service"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            p_updateLast30DaysData(data) {
                console.log('p_updateLast30DaysData', data);

                if(data['http_code'] != 200) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("sport_error_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    return ;
                }

                const monthTip = data.data.summary;
                if (this.p_timeType == "month") {
                    this.p_sportInfo = monthTip.active_tips;
                    this.p_sportSuggest = monthTip.addition_tips;
                    this.paneltitle = this.$i18n("sport_title_month");
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
                            lineData[i] = monthData[j]['steps'];
                            break;
                        }
                    }
                }
                lineData.length && lineData.unshift(null);
                const vMax = (() => {
                    const lines = lineData.slice(1);
                    lines.push(data.data.target_steps || 0);
                    return (Math.ceil(Math.max(...lines) * 0.001) * 1000 + 1000) || 500;//y轴刻度最大值
                })();
                const vMin = (() => {
                    const lines = lineData.slice(1);
                    lines.push(data.data.target_steps || 0);
                    const min = Math.floor(Math.min(...lines) * 0.001) * 1000 || 0;
                    if(min - 1000 > 0) {
                        return min - 1000;
                    }
                    return min;
                })();
                const config = {
                    ctx: this.$refs.dataMonth.$el.querySelector('#lineChart'),
                    goalLines: !isNaN(data.data.target_steps) ? [{
                        value: parseInt(data.data.target_steps) || 0,
                        text: this.$i18n("sport_goal"),
                        textColor: '#fff',
                        color: '#ff9c0c'
                    }] : [],
                    labels: (() => {
                        const arr = [''];
                        for(let i = 0; i < line30days.length; i++) {
                            const date = line30days[i].split('-');
                            if(i === 0) {
                                arr.push(parseInt(date[2]) + "/" + parseInt(date[1]));
                            /*} else if(i === monthData.length - 1) {*/
                                /*arr.push('今日');*/
                            } else if(i == 3){
                                arr.push("");
                            }else {
                                if(parseInt(date[2]) === 1 && i !== 1) {
                                    arr.push('1' + "/" + parseInt(date[1]));
                                } else {
                                    if(parseInt(date[2]) % 3 === 0 && i !== 1) {
                                        if(i - 1 >= 0 && i + 1 < line30days.length) {
                                            if(parseInt(line30days[i - 1].split('-')[2]) !== 1 && parseInt(line30days[i + 1].split('-')[2]) !== 1&&parseInt(line30days[i].split('-')[2]) !== 3 &&
                                            parseInt(line30days[i].split('-')[2]) !== 30  ) {
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
                    //data_line: Array(lineData.length || 30).fill(data.data.target_steps || 0),
                    lineTension: 0.6,//line弯曲平滑程度
                    borderColor: "#ff9c0c",//边框颜色
                    pointBackgroundColor: "#ff9c0c",//point点bg颜色
                    min: vMin,
                    max: vMax,
                    stepSize: (() => {
                        const max = vMax;
                        if(max >= 2000) {
                            return 1000;
                        }
                        return 100;
                    })(),
                    //y轴刻度间隔
                    yCallBack: value => {
                        if(value === 0) {
                            return '';
                        }
                        if(value > 999) {
                            return Math.ceil(value * 0.001) + 'K';
                        }
                        return value;
                    }
                };
                this.$refs.dataMonth.drawLine(config);
                // this.$refs.dataMonth.computeTarget(config);
                //this.$refs.dataMonth.isShowTarget = !!config.data_line.length;

                this.p_monthend = monthData[monthData.length - 1]['utime'];
            },

            p_updateLast30DaysDataError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("sport_error_network"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            //步数目标设定
            set_target(){
                this.isSetPop = !this.isSetPop;
                this.$refs.mask.showMark(this.isSetPop, 1, this.closeMask);
            },

            closeMask(){
                this.isSetPop = !this.isSetPop;
                this.$refs.mask.showMark(this.isSetPop);
            },

            set_ok(){
                this.isSetPop = !this.isSetPop;
                this.$refs.mask.showMark(this.isSetPop);
            },

            updateSettings(data){
                console.log("updateSettings",data);
                if(data.http_code == 200){
                    this.special_tips = data.data.growing_expect.special_tips;
                    this.expect = data.data.growing_expect.expect;
                    this.consume = data.data.consume_food;

                    //步数目标设定
                    this.steps = data.data.targets.steps;
                    this.steps_min = (this.steps.reference*50)/100;
                    this.steps_max = (this.steps.reference*300)/100;
                    this.steps_value = this.steps.self;
                    if(this.steps_value){//当self有值时 默认选中自定义 否则选中智能推荐
                        this.isStepSelfShow = true;
                        this.isSlefAct = true;
                        this.isStepInteShow = false;
                        this.isSetpAct = false;
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
            target_step_info(e){//步数目标操作
                //e.preventDefault();
                let target = "";
                let id = $(e.target).attr("id");
                console.log("id",id);
                if(id == 1){
                    this.isStepInteShow = true;
                    this.isStepSelfShow = false;
                    target = "0";//当点击智能推荐时给steps传0 当self有值时 默认选中自定义 否则选中智能推荐
                    this.isSetpAct = true;
                    this.isSlefAct = false;
                    settings.setTarget(target, this.setTarget, this.setTargetError);
                }else if(id == 2){
                    this.isStepInteShow = false;
                    this.isStepSelfShow = true;
                    this.isSetpAct = false;
                    this.isSlefAct = true;
                    //this.$el.querySelector("#range_steps").value = this.steps_value;//初始化滑块位置
                    this.$el.querySelector("#range_steps").value = 0;//初始化滑块位置
                    target = this.steps.reference * 0.5;
                    settings.setTarget(target, this.setTarget, this.setTargetError);
                }
            },
            setTarget(data){
                this.update();//设置成功之后重新获取.目标设定值
            },
            range_step_info(e){
                $(e.target).attr('value', e.target.value);
                let target = "";
                target = $(e.target).attr('value');
                settings.setTarget(target, this.setTarget, this.setTargetError);
            },
        },

        data() {
            return {
                panelunit:"",//更新多久
                p_timeType: 'day',
                p_calorie: 0,
                p_targetPercent: 0,
                p_distance: 0,
                p_steps: 0,
                p_walkSteps: 0,
                p_runSteps: 0,
                p_consumeFood: null,
                p_sportInfo: '',
                p_sportSuggest: '',
                p_weekend: '2016-08-08',
                p_monthend: '2016-08-08',
                motion_tips:{},// 运动专家策略 提示内容
                daily_motion:[],//每日运动推荐
                motion_choice:"",//运动建议
                paneltitle:this.$i18n("sport_title_week"),
                // isBluetoothCon:false,//同步按钮默认影藏
                isSetPop:false,//步数目标设定弹出看是否显示

                isStepInteShow:true,//步数目标智能推荐是否显示
                isStepSelfShow:false,//步数目标自定义是否显示
                isSetpAct:true,//步数目标智能推荐act是否显示
                isSlefAct:false,//步数目标自定义act是否显示
                steps_min:"",
                steps_max:"",
                steps_value:"",

                steps:{},//步数目标
                consume: {},//消耗了多少食物
            };
        },
    };
</script>

<style scoped>
    .health-sport {
        position: relative;
    }
    .health-sport .header-bg {
        position: relative;
        width: 100%;
        height: 15rem;
        background-image: url('~assets/images/status_bg2.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .health-sport .data-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -80px;
    }
    .health-sport .health-header p {
        position: absolute;
        width: 100%;
        height: 2rem;
        top: 50%;
        line-height: 2rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }
    .health-sport .health-header .title {
        margin-top: -5rem;
        font-size: .7rem;
    }
    .health-sport .health-header .data {
        font-size: 1.5rem;
        color: #FFF;
        margin-top: -3rem;
    }
    .health-sport .health-header .percent {
        margin-top: -1rem;
        font-size: .8rem;
    }
    .health-sport .health-header .set_target {
        border-radius:15px;
        border:1px solid #fff;
        color:#fff;
        font-size: .75rem;
        height:1.2rem;
        left:50%;
        line-height: 1.3rem;
        margin-left:-2rem;
        margin-top: 1rem;
        text-align: center;
        width:4rem;

    }
    .health-sport .health-header .refresh {
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
    .health-sport .health-header .refresh i {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-image: url('~assets/images/icon_16_44@3x.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        vertical-align: -23%;
    }
    .health-sport .health-header .gosetting {
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
    .health-sport .data-total {
        position: relative;
        margin: -2rem 0.5rem 0 0.5rem;
        background: #FFF;
        border-radius: 4px;
        overflow: hidden;
    }
    .health-sport .data-total .special_tip p{
        width:100%;
        border-bottom:1px solid #e1e1e1;
        overflow:hidden;
        text-align: center;
    }
    .health-sport .data-total .special_tip p i{
        display:inline-block;
        font-size: .8rem;
        text-align: left;
        margin:0 auto;
        padding:.5rem 0 .5rem 1.4rem;
        background:url(~assets/images/icon_16_53@3x.png) no-repeat scroll left center;
        background-size: 20px;
    }
    .health-sport .data-total .details_info{
        padding:.5rem 0 0 0;
    }
    .health-sport .data-total .details_info_con{
        overflow:hidden;
        padding:.5rem 0;
    }
    .health-sport .data-total .details_info_con span{
        display:inline-block;
        float:left; width:20%;
        text-align: center;
        font-size: 2rem;
        font-family: AkzidenzGrotesk;
        color:#ff9b2b;
    }
    .health-sport .data-total .details_info_con span i{
        display:block;
        font-size: .75rem;
        color:#959595;
    }
    .health-sport .data-total .details_info_con span.add,
    .health-sport .data-total .details_info_con span.equal{
        font-size: 2rem;
        color:#959595;
        padding:.4rem 0;
    }
    .health-sport .data-total .details_info .meilage_icon{
        text-align:center;
        padding:.5rem 0;
        border-top:1px solid #e1e1e1;
        font-size: .875rem;
    }
    .health-sport .data-total .details_info .meilage_icon i{
        font-size: 1rem;
        color:#ff9b2b;
        padding-left:.2rem;
    }



    .health-sport .data-statis {
        margin: 1rem 0.5rem 0 0.5rem;
    }
    .health-sport .data-statis .time-type {
        text-align: center;
        font-size: 0;
        color: #ff9c0c;
    }
    .health-sport .data-statis .time-type li {
        display: inline-block;
        border: 1px solid #ff9c0c;
        width: 3rem;
        margin-bottom: 1rem;
        padding:.1rem .2rem;
        font-size: .9rem;
    }
    .health-sport .data-statis .time-type li.select {
        background-color: #ff9c0c;
        color: #fff;
    }
    .health-sport .data-statis .time-type li:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        margin-right: -1px;
    }
    .health-sport .data-statis .time-type li:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-left: -1px;
    }
    .health-sport .tips {
        margin: 1rem 0.5rem 1rem 0.5rem;
        padding-bottom: 0.5rem;
    }
    .health-sport .tips .tip-info {
        padding:0.5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }
    .health-sport .tips .tip-suggest {
        padding: 0 0.5rem;
        word-wrap: break-word;
        font-size: 0.9rem;
        color: #666;
    }
    /*运动专家*/
    .expert_strategy{box-shadow: 0 0 5px #e2e2e2; width:94%; margin:0 auto;}
    .expert_strategy .strategy_list{overflow:hidden; background:#fff; border-top-left-radius: 5px; border-top-right-radius: 5px;  clear: both; padding:5% 0% 0% 0%; margin-top:4%;}
    .expert_strategy .strategy_list .per{ padding:0 4%;}
    .expert_strategy .strategy_list .per img{width:40px; height:42px; float:left; margin-right:8px; border-radius:50%;}
    .expert_strategy .strategy_list .per span{ display:block; font-size: 0.9rem; color:#000;}
    .expert_strategy .strategy_list .per i{ display:block; font-size: .7rem; color:#bdbdbd;}
    .expert_strategy .strategy_list .desc{margin:2% 4%; padding-bottom:4%; padding-top:2%; border-bottom:1px dashed #e1e1e1;  font-size: 0.9rem; color:#000;}
    .expert_strategy .strategy_list .stra_btn{padding:10px 0; margin:0 4%; color:#ed5564; display:block; text-align: center; border-radius:5px; background:#fbdde0; font-size: .9rem;}
    .expert_strategy .strategy_list .stra_btn img{ width:20px; position:relative; top:4px; right:5px;}
    /*运动推荐*/
    .control_intake{width:100%; background:#fff; border-radius: 5px; margin:0 auto;}
    .control_intake .con{ padding:0% 4%;}
    .control_intake .con .select_info { margin-top:4%; position: relative;}
    .control_intake .con .select_info select{ width:100%; border:1px solid #e1e1e1; border-radius: 2px; background:#fff; padding:2% 2%; font-size: 1.1rem; position: relative; background:url(~assets/images/select_bg.png) no-repeat scroll 96% center; background-size: 12px;}
    .control_intake .con .con_desc{font-size: 0.9rem; display:none; color:#666; margin-top:2%;}
    .control_intake .con .con_desc p{padding:2px 0;}
    .control_intake .con .recomm_list{ overflow:hidden; position:relative; padding-top:2%; padding-bottom:.6rem;}
    .control_intake .con .recomm_list a{display:block; width:100%; float:left; border:1px solid #e1e1e1; border-radius:2px;}
    .control_intake .con .recomm_list .con_title{padding:.2rem; position:absolute; left:.5rem; top:1rem; z-index: 10; background:rgba(0,0,0,0.5); font-size: .75rem; color:#fff;}
    .control_intake .con .recomm_list .con_title span{ display:block; font-size: .8rem; color:#bdbdbd;}
    .control_intake .con .recomm_list a:nth-child(2n+1){}
    .control_intake .con .recomm_list .product_img img{ width:100%; display:block; border-top-left-radius: 2px;border-top-right-radius: 2px;}
    .control_intake .con .recomm_list .uneat{ position: relative;}
    .control_intake .con .recomm_list .uneat img{filter: grayscale(1);}
    .control_intake .con .recomm_list .uneat:before{
    content:"";
    background:url(~assets/images/uneat_icon.png) no-repeat scroll center center;
    background-size: 100%;
    position: absolute;
    z-index: 3;
    left:50%;
    margin-left:-20px;
    top:20%;
    width:40px;
    height:40px;
    }
    .control_intake .con .recomm_list .product_name{font-size: 1rem; position: relative; z-index: 2; text-align: left; color:#313131; padding:0 4%; margin-top:-10%; text-overflow:ellipsis; white-space: nowrap; overflow:hidden;}
    .control_intake .con .recomm_list .product_img{display:block; min-height: 90px; position:relative; overflow:hidden;}
    .control_intake .con .recomm_list .product_img span{display:block; width: 0;
    height: 0;
    border-bottom: 3rem solid #fff;
    border-right: 18rem solid transparent; margin-top:-3rem; position:relative;}
    .control_intake .con .recomm_list .product_star{ font-size: 0; position:relative; z-index: 3; text-align: left; padding:0 4%;}
    .control_intake .con .recomm_list .product_star span{ display:inline-block; font-size: .75rem; color:#ffd700; margin-right:.4rem;}
    .control_intake .con .recomm_list .product_star span.text{ color:#959595;}
    .control_intake .con .recomm_list .product_desc{border-top:1px dashed #e1e1e1; margin:4% 4%; padding-top:4%; font-size: .75rem; color:#959595;}
    .control_intake .con .recomm_list .product_desc span{ color:#959595; font-size: .6rem; display:block; overflow:hidden;}
    .control_intake .con .recomm_list .product_desc span b{float:right;}
    .control_intake .foot_btn{ margin-top:6%;}




/*睡眠目标设定，步数目标设定*/
.set_wrap{position:fixed; width:90%; left:5%; top:15%; background:#fff; border-radius:5px; z-index: 10;}

.target_info .set_title{ padding:6% 4% 3% 4%; text-align: center; font-size: 1.2rem; color:#000; font-weight: bold;}
.target_info .equivalent{ text-align: center; padding:.5rem 0; font-size: 1rem; color:#a3a3a3; width:100%; margin:0 auto;}
.target_info .equivalent span{display:block;}
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
