<style>
    .set_menu{margin:1rem 0; text-align: center; font-size: 0;}
    .set_menu a{display:inline-block; text-align: center; width:7rem; height:2rem; line-height: 2rem; font-size: 0.82rem; color:#8B49F6; border:1px solid #8B49F6;}
    .set_menu a:nth-child(1){ margin-right:-1px; border-top-left-radius: 5px; border-bottom-left-radius: 5px;}
    .set_menu a:nth-child(2){ border-top-right-radius: 5px; border-bottom-right-radius: 5px;}
    .set_menu a.act{background:#8B49F6; color:#fff;}
    .brightscreen{margin-top:1rem;}
    .brightscreen .bs_switch{padding:.5rem 1rem; background:#fff; font-size: 1.1rem; position:relative; overflow:hidden; border-top:1px solid #e5e5e5; border-bottom:1px solid #e5e5e5;}
    .brightscreen .bs_switch input{ position:absolute; right:.7rem;}
    .brightscreen .bs_time_wrap{margin-top:1rem; background:#fff; border-top:1px solid #e5e5e5; border-bottom:1px solid #e5e5e5; padding-left:1rem;}
    .brightscreen .bs_time_wrap a{display:block; overflow:hidden; font-size: 1.1rem; padding:.5rem 2.2rem .5rem 0; background:url(~assets/images/right_icon.png) no-repeat scroll 96% center; background-size: .7rem;}
    .brightscreen .bs_time_wrap a:nth-child(2){border-top:1px solid #ebebeb;}
    .brightscreen .bs_time_wrap a span{ display:inline-block; float:right; padding-top:.2rem;}
    .brightscreen .bs_tips{padding:0rem 1rem 1rem 2.4rem; margin-top:1rem; font-size: 0.7rem; background:url(~assets/images/warn.svg) no-repeat scroll 18px top; background-size: 1.1rem; }
    .clock_num_info{color:#a3a3a3; font-size: 1rem; text-align: center;}
</style>

<template>
    <div class="set_menu">
        <a href="javascript:;" :class="{'act':isClockSet}" @click = "clock_set">{{$i18n("clock_set")}}</a>
        <a href="javascript:;" :class="{'act':!isClockSet}" @click = "screen_set">{{$i18n("clock_screen_set")}}</a>
    </div>
    <div class="workday" v-if="isClockSet" transition="fadeIn">
        <div class="clock_num_info">{{$i18n("clock_num")}}：{{crru_clock_count}}/{{max_clock_count}}</div>
    	<!-- 起床 -->
        <div class="getup" v-show="getupShow">

            <p class="set_title"><i></i>{{$i18n("clock_title_getup")}}</p>
            <div class="box_wrapper time_list">
                <p v-for="getup in getup_info">
                    <span class="delect_info" @click="delect_info"  data="{{getup.clock_id}}" v-show="delectInfoShow" transition="fadeIn"></span>
                    <span class="time_info" :class="{ 'ml': delectInfoShow , 'mr': editInfoShow }">
                        <span>{{getup.time}}</span>
                        <span class="repeat">{{getRepeatShow(getup.repeat)}}</span>
                    </span>
                    <span class="edit_info" v-show="editInfoShow" transition="fadeIn" @click="editClockInfo" data="{{getup.clock_id}}" id="1"></span>
                </p>
            </div>
        </div>
        <!-- 学习 -->
        <div class="learn" v-show="learnShow">
            <p class="set_title"><i></i>{{$i18n("clock_title_study")}}</p>
            <div class="box_wrapper time_list">
                <p v-for="learn in learn_info">
                    <span class="delect_info" @click="delect_info"  data="{{learn.clock_id}}" v-show="delectInfoShow"></span>
                    <span class="time_info" :class="{ 'ml': delectInfoShow , 'mr': editInfoShow }">
                        <span>{{learn.time}}</span>
                        <span class="repeat">{{getRepeatShow(learn.repeat)}}</span>
                    </span>
                    <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{learn.clock_id}}" id="2"></span>
                </p>
            </div>
        </div>
        <!-- 运动 -->
        <div class="sport" v-show="sportShow">
            <p class="set_title"><i></i>{{$i18n("clock_title_sport")}}</p>
            <div class="box_wrapper time_list">
                <p v-for="sport in sport_info">
                    <span class="delect_info" @click="delect_info"  data="{{sport.clock_id}}" v-show="delectInfoShow"></span>
                    <span class="time_info" :class="{ 'ml': delectInfoShow , 'mr': editInfoShow }">
                        <span>{{sport.time}}</span>
                        <span class="repeat">{{getRepeatShow(sport.repeat)}}</span>
                    </span>
                    <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{sport.clock_id}}" id="3"></span>
                </p>
            </div>
        </div>
        <!-- 睡觉 -->
        <div class="sleep" v-show="sleepShow">
            <p class="set_title"><i></i>{{$i18n("clock_title_sleep")}}</p>
            <div class="box_wrapper time_list">
                <p v-for="sleep in sleep_info">
                    <span class="delect_info" @click="delect_info" data="{{sleep.clock_id}}" v-show="delectInfoShow"></span>
                    <span class="time_info" :class="{ 'ml': delectInfoShow , 'mr': editInfoShow }">
                        <span>{{sleep.time}}</span>
                        <span class="repeat">{{getRepeatShow(sleep.repeat)}}</span>
                    </span>
                    <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{sleep.clock_id}}" id="4"></span>
                </p>
            </div>
        </div>
        <!-- 其他 -->
        <div class="other" v-show="otherShow">
            <p class="set_title"><i></i>{{$i18n("clock_title_other")}}</p>
            <div class="box_wrapper time_list">
                <p v-for="other in other_info">
                    <span class="delect_info" v-show="delectInfoShow"  data="{{other.clock_id}}" @click="delect_info"></span>
                    <span class="time_info" :class="{ 'ml': delectInfoShow , 'mr': editInfoShow }">
                        <span>{{other.time}}</span>
                        <span class="repeat">{{getRepeatShow(other.repeat)}}</span>
                    </span>
                    <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{other.clock_id}}" id="5"></span>
                </p>
            </div>
        </div>

        <div class="no_clock_tip">
           <img src="~assets/images/img_banf_tips_clock@3x.png" alt="">
        </div>
        <div class="no_clock" v-show="!editingShow">
           <span @click="edit_info" class="edit" :class="{ disable: !editable }"><i></i><span>{{$i18n("clock_edit_edit")}}</span></span>
           <span @click="add_clock" class="add" :class="{ disable: !addable }"><i></i><span>{{$i18n("clock_edit_add")}}</span></span>
       <!--     <span @click="sync_clock" class="sync" :class="{ disable: !syncable }"><i></i><span>同步</span></span> -->
        </div>
        <div class="no_clock editing" v-show="editingShow">
           <span class="cancel" @click="cancel_info"><i></i><span>{{$i18n("btn_name_cancel")}}</span></span>
           <span class="ok_btn" @click="ok_btn_info"><i></i><span>{{$i18n("btn_name_confirm")}}</span></span>
        </div>
        <!-- <div class="edit-mask" v-show="isEditShow"></div> -->
        <paiband-mask v-ref:mask></paiband-mask>
        <div class="edit-clock" v-show="isEditShow" transition="fadeInOut">
            <div class="edit-title">
                <span class="title-btn" @click="editCancel" style="left:0;">{{$i18n("btn_name_cancel")}}</span>
                <span class="title-name">{{ editTitle }}</span>
                <span class="title-btn" @click="editConfirm" style="right:0;">{{$i18n("btn_name_save")}}</span>
            </div>
            <div class="edit-content">
                <div class="clock">
                    <p class="clock-title">{{$i18n("clock_edit_title")}}</p>
                    <div class="clock-content" @click="editClock">
                        <p>{{editTimeShow}}</p>
                        <i></i>
                    </div>
                </div>
                <div class="repeat">
                    <p class="repeat-title">{{$i18n("clock_edit_repeat")}}</p>
                    <div class="repeat-btn">
                        <div v-for="repeat in repeatList" class="ck-button" track-by="$index">
                            <label>
                                <input type="radio" value="{{ repeat.type }}" v-model="repeatType">
                                <i></i>
                                <span>{{ repeat.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="brightscreen" v-else transition="fadeIn">
        <div class="bs_switch">
            {{$i18n("clock_up_screen")}}
            <input class="toggle-switch" type="checkbox" v-model="screenbtnstatus" @click="bs_toggle">
        </div>
        <div class="bs_time_wrap" v-show="isToggle" transition="fadeInOut">
            <a class="bs_start_time" @click="bs_start_time">{{$i18n("clock_begin_time")}} <span>{{screendata.open_time}}</span></a>
            <a class="bs_end_time" @click="bs_end_time">{{$i18n("clock_end_time")}} <span>{{screendata.close_time}}</span></a>
        </div>
        <div class="bs_tips">
            {{$i18n("clock_up_screen_tip")}}
        </div>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import db from 'dbs/hashmap';
    import jsb from "services/jsb";

    import clockService from "services/clock";
    import syncService from 'services/sync';
    import paibandMask from 'components/mask';


    export default {
        components:{paibandMask},
        data() {
            return{
                screenbtnstatus:true,//抬腕亮屏按钮默认是开着的
                screendata:{},//获取抬腕亮屏设置值
                isClockSet:true,//默认闹钟设定显示
                isToggle:true,//默认抬腕亮屏时间设定显示
                delectInfoShow:false,//删除按钮是否显示
                editInfoShow:false,//编辑按钮是否显示
                editingShow:false,//底部编辑框是否显示
                isEditShow: false,//时间编辑框
                editType: 'add',//编辑框种类 'add' 'edit'
                max_clock_count:0,//最大闹钟数量
                crru_clock_count:0,//当前闹钟数
                getupShow:false,//是否显示起床闹钟
                learnShow:false,//是否显示学习闹钟
                sportShow:false,//是否显示运动闹钟
                sleepShow:false,//是否显示睡觉闹钟
                otherShow:false,//是否显示其他闹钟
                getup_info:[],//起床闹钟
                learn_info:[],//学习闹钟
                sport_info:[],//运动闹钟
                sleep_info:[],//睡觉闹钟
                other_info:[],//其他闹钟
                clock_edit_config: {
                    clock_id: 0,
                    data: [this.$i18n("clock_title_getup"), '0', '0']
                },//点击编辑闹钟需要传的参数
                clocklist:[],
                /*repeatList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],*/
                repeatList: [{
                    type: '11111000',
                    name: this.$i18n("clock_repeat_weekday")
                }, {
                    type: '00000110',
                    name: this.$i18n("clock_repeat_weekend")
                }, {
                    type: '11111110',
                    name: this.$i18n("clock_repeat_everyday")
                }],
                /*repeatWeeks: []*/
                repeatType: ''
            }
        },
        computed: {
            editTitle() {
                if(this.editType === 'add') {
                    return this.$i18n("clock_title_add");
                } else if(this.editType === 'eidt') {
                    return this.$i18n("clock_title_edit");
                }
                return '';
            },
            editable() {
                return this.crru_clock_count > 0 && this.crru_clock_count <= this.max_clock_count;
            },
            addable() {
                return this.crru_clock_count < this.max_clock_count;
            },
            syncable() {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].modify != undefined) {
                        return true;
                    }
                }
                return false;
            },
            noClockTipShow() {
                return this.crru_clock_count == 0;
            },
            editTimeShow() {
                const values = this.clock_edit_config.data;
                const timeinfo = ('0' + values[1]).substr(-2) + ':' + ('0' + values[2]).substr(-2);
                return values[0] + ',' + timeinfo;
            },
            getupShow() {
                let num = 0;
                for(let i = 0; i < this.getup_info.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.getup_info[i].modify) < 0) {
                        num += 1;
                    }
                }
                return num > 0;
            },
            learnShow() {
                let num = 0;
                for(let i = 0; i < this.learn_info.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.learn_info[i].modify) < 0) {
                        num += 1;
                    }
                }
                return num > 0;
            },
            sportShow() {
                let num = 0;
                for(let i = 0; i < this.sport_info.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.sport_info[i].modify) < 0) {
                        num += 1;
                    }
                }
                return num > 0;
            },
            sleepShow() {
                let num = 0;
                for(let i = 0; i < this.sleep_info.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.sleep_info[i].modify) < 0) {
                        num += 1;
                    }
                }
                return num > 0;
            },
            otherShow() {
                let num = 0;
                for(let i = 0; i < this.other_info.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.other_info[i].modify) < 0) {
                        num += 1;
                    }
                }
                return num > 0;
            }
        },
        beforeDestroy(){
            this.$dispatch('hide-sync-loading');
        },
        methods:{
            init(width, height) {
                //获取闹钟列表
                clockService.getClock(this.updateClock, this.updateClockError);
                //获取抬腕亮屏设置值
                clockService.getScreen(this.getScreenSuccess,this.getScreenError);
            },

            update() {
                clockService.getClock(this.updateClock, this.updateClockError);
                //获取抬腕亮屏设置值
                clockService.getScreen(this.getScreenSuccess,this.getScreenError);
            },

            updateState() {
                let getup = [], learn = [], sport = [], sleep = [], other = [];
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.clocklist[i].modify) < 0){
                        if(this.clocklist[i].category == 0) {
                            getup.push(this.clocklist[i]);
                        } else if(this.clocklist[i].category == 1) {
                            learn.push(this.clocklist[i]);
                        } else if(this.clocklist[i].category == 2) {
                            sport.push(this.clocklist[i]);
                        } else if(this.clocklist[i].category == 3) {
                            sleep.push(this.clocklist[i]);
                        } else if(this.clocklist[i].category == 4) {
                            other.push(this.clocklist[i]);
                        }
                    }
                }
                this.getup_info = getup;
                this.learn_info = learn;
                this.sport_info = sport;
                this.sleep_info = sleep;
                this.other_info = other;

                this.crru_clock_count = 0;
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.clocklist[i].modify) < 0) {
                        this.crru_clock_count += 1;
                    }
                }
                //const topTextInfo = "闹钟个数："+ this.crru_clock_count + "/" + this.max_clock_count;
                //this.$dispatch("toptextinfo",true,topTextInfo);//顶部显示闹钟个数
            },

            updateClock(data) {
                console.log("updateClock",data);
                if(data.http_code == 200){
                    this.max_clock_count = data.data.max_clock_count || 0;
                    this.clocklist = data.data.list || [];
                    this.crru_clock_count = this.clocklist.length;
                    let getup = [], learn = [], sport = [], sleep = [], other = [];
                    if(this.crru_clock_count > 0) {
                        for(let i = 0; i < this.clocklist.length; i++) {
                            if(this.clocklist[i].category == 0) {
                                getup.push(this.clocklist[i]);
                            } else if(this.clocklist[i].category == 1) {
                                learn.push(this.clocklist[i]);
                            } else if(this.clocklist[i].category == 2) {
                                sport.push(this.clocklist[i]);
                            } else if(this.clocklist[i].category == 3) {
                                sleep.push(this.clocklist[i]);
                            } else if(this.clocklist[i].category == 4) {
                                other.push(this.clocklist[i]);
                            }
                        }
                    }

                    this.getup_info = getup.sort(this.compare('time'));
                    this.learn_info = learn.sort(this.compare('time'));
                    this.sport_info = sport.sort(this.compare('time'));
                    this.sleep_info = sleep.sort(this.compare('time'));
                    this.other_info = other.sort(this.compare('time'));
                    this.getupShow = this.getup_info.length > 0;
                    this.learnShow = this.learn_info.length > 0;
                    this.sportShow = this.sport_info.length > 0;
                    this.sleepShow = this.sleep_info.length > 0;
                    this.otherShow = this.other_info.length > 0;
                } else {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("clock_error_clock_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },

            compare(property){
                return function(a,b){
                    var value1 = parseInt(a[property].split(":")[0]*60) + parseInt(a[property].split(":")[1]);
                    var value2 = parseInt(b[property].split(":")[0]*60) + parseInt(b[property].split(":")[1]);
                    return value1 - value2;
                }
            },

            updateClockError(error) {
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("clock_error_clock_network"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },

            editClock() {
                let values = [[this.$i18n("clock_title_getup"), this.$i18n("clock_title_study"), this.$i18n("clock_title_sport"), this.$i18n("clock_title_sleep"), this.$i18n("clock_title_other")], { from: 0, to: 24, step: 1 }, { from: 0, to: 60, step: 1 }];
                //修改闹钟时select显示当前的数据
                let default_values = [];
                default_values.push(this.editTimeShow.split(',')[0],...this.editTimeShow.split(',')[1].split(":"));
                //jsb调用select接口
                if(this.editType === 'add') {
                    jsb.showSelector(this.$i18n("clock_title_edit"), values, [], data => {
                        this.clock_edit_config.data = data.values;
                    }, this.addClockCancelBack);
                } else if(this.editType === 'edit') {
                    jsb.showSelector(this.$i18n("clock_title_edit"), values, default_values,data => {
                        this.clock_edit_config.data = data.values;
                    }, this.editClockCancelBack);
                }
            },

            editCancel() {
                this.$refs.mask.showMark(false);
                this.isEditShow = false;
                this.repeatType = '';
                this.clock_edit_config.data = [this.$i18n("clock_title_getup"), '0', '0'];
            },

            editConfirm() {
                console.log(this.repeatType);
                if(this.editType === 'add') {
                    this.addClockSuccessBack({ values: this.clock_edit_config.data }, this.repeatType);
                    this.editCancel();
                } else if(this.editType === 'edit') {
                    this.editClockSuccessBack({ values: this.clock_edit_config.data }, this.repeatType);
                    this.editCancel();
                }
            },

            getRepeatShow(repeat) {
                const re = parseInt(repeat, 2);
                if(re === 254) {
                    return this.$i18n("clock_repeat_everyday");
                } else if(re === 248) {
                    return this.$i18n("clock_repeat_weekday");
                } else if(re === 6) {
                    return this.$i18n("clock_repeat_weekend");
                } else if(re === 0) {
                    return this.$i18n("clock_edit_norepeat");
                } else {
                    const rt = repeat.split('');
                    const wl = ['一', '二', '三', '四', '五', '六', '日'];
                    const ret = [];
                    for(let i = 0; i < wl.length; i++) {
                        parseInt(rt[i])  && ret.push(wl[i]);
                    }
                    return '每周' + ret.join('、');
                }
            },

            edit_info() {
                if(this.editable) {
                    this.editType = 'edit';
                    this.delectInfoShow = true;
                    this.editInfoShow = true;
                    this.editingShow = true;
                }
            },

            delect_info(e) {
                let clock_id = $(e.target).attr('data');
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].clock_id == clock_id) {
                        if(this.clocklist[i].modify && this.clocklist[i].modify.indexOf('add') > -1) {
                            this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { modify: 'add-delete' }));
                        } else {
                            this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { modify: 'delete' }));
                        }
                        break;
                    }
                }
                this.updateState();
            },

            deleteClock(data) {
                //删除成功重新获取闹钟列表
                this.update();
            },

            deleteClockError(error) {
                if(error) {
                  this.$dispatch('showtip', this.$i18n("heartclock_error_delete_service"));
                }
            },

            cancel_info() {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].modify === 'add-delete') {
                        this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { modify: 'add' }));
                    } else if(this.clocklist[i].modify === 'delete') {
                        this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { modify: undefined }));
                    } else if(this.clocklist[i].modify === 'add-change') {
                        this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { 
                            modify: 'add',
                            time: this.clocklist[i].oldTime,
                            repeat: this.clocklist[i].oldRepeat
                        }));
                    } else if(this.clocklist[i].modify === 'change') {
                        this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { 
                            modify: undefined,
                            time: this.clocklist[i].oldTime,
                            repeat: this.clocklist[i].oldRepeat
                        }));
                    }
                }
                this.updateState();
                this.delectInfoShow = false;
                this.editInfoShow = false;
                this.editingShow = false;
            },

            ok_btn_info() {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].modify === 'add-delete') {
                        this.clocklist.splice(i, 1);
                        i -= 1;
                    } else if(this.clocklist[i].modify === 'add-change') {
                        this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { modify: 'add' }));
                    }
                }
                this.sync_clock();
                this.updateState();
                this.delectInfoShow = false;
                this.editInfoShow = false;
                this.editingShow = false;
            },

            add_clock() {
                //点击添加闹钟显示select
                if(this.addable) {
                    this.editType = 'add';
                    this.$refs.mask.showMark(true,1,this.closeMask);
                    this.isEditShow = true;
                    this.repeatType = '11111000';
                }
            },

            add_edit_clock () {
                let values = [[this.$i18n("clock_title_getup"), this.$i18n("clock_title_study"), this.$i18n("clock_title_sport"), this.$i18n("clock_title_sleep"), this.$i18n("clock_title_other")], { from: 0, to: 24, step: 1 }, { from: 0, to: 60, step: 1 }];
                //jsb调用select接口
                jsb.showSelector(this.$i18n("clock_title_edit"), values, [], this.addClockSuccessBack, this.addClockCancelBack);
            },

            addClockSuccessBack(data, repeat){
                //点击select确定之后调用添加闹钟接口
                const harr = [this.$i18n("clock_title_getup"), this.$i18n("clock_title_study"), this.$i18n("clock_title_sport"), this.$i18n("clock_title_sleep"), this.$i18n("clock_title_other")];
                const category = harr.indexOf(data.values[0]);
                const timeinfo = ('0' + data.values[1]).substr(-2) + ':' + ('0' + data.values[2]).substr(-2);
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].category === category && this.clocklist[i].time === timeinfo) {
                        this.$dispatch('showtip', this.$i18n("clock_error_add_repeat"));
                        return;
                    }
                }

                this.clocklist.push({
                    'clock_id': 'local' + jutils.makeSimpleGUID(),
                    'time': timeinfo,
                    'category': category,
                    'modify': 'add',
                    'repeat': repeat
                });
                this.sync_clock();
                this.updateState();
            },

            addClockCancelBack(error) {
                console.log("addClockCancelBack",error);
            },

            addClock(data) {
                console.log(data);
                //tianjia成功重新获取闹钟列表
                this.update();
            },

            addClockError(error) {
                if(error){
                    this.$dispatch('showtip', this.$i18n("clock_error_add"));
                }
            },

            editClockInfo(e) {
                //点击编辑修改闹钟调出select
                this.editType = 'edit';
                this.$refs.mask.showMark(true,1,this.closeMask);
                this.isEditShow = true;

                this.clock_edit_config.clock_id = $(e.target).attr('data');
                const harr = [this.$i18n("clock_title_getup"), this.$i18n("clock_title_study"), this.$i18n("clock_title_sport"), this.$i18n("clock_title_sleep"), this.$i18n("clock_title_other")];
                const data = [];
                console.log(this.clock_edit_config.clock_id);
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clock_edit_config.clock_id == this.clocklist[i].clock_id) {
                        data.push(harr[this.clocklist[i].category]);
                        data.push(...this.clocklist[i].time.split(':'));
                        this.clock_edit_config.data = data;
                        this.repeatType =this.clocklist[i].repeat;
                        break;
                    }
                }
            },

            editClockSuccessBack(data, repeat) {
                //点击select确定之后调用修改闹钟接口
                const harr = [this.$i18n("clock_title_getup"), this.$i18n("clock_title_study"), this.$i18n("clock_title_sport"), this.$i18n("clock_title_sleep"), this.$i18n("clock_title_other")];
                const category = harr.indexOf(data.values[0]);
                const timeinfo = ('0' + data.values[1]).substr(-2) + ':' + ('0' + data.values[2]).substr(-2);
                for(let i = 0; i < this.clocklist.length; i++){
                    if(this.clocklist[i].repeat === repeat && this.clocklist[i].category === category && this.clocklist[i].time === timeinfo){
                        this.$dispatch('showtip', this.$i18n("clock_error_existed"));
                        return;
                    }
                }
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].clock_id == this.clock_edit_config.clock_id) {
                        if(this.clocklist[i].modify && this.clocklist[i].modify.indexOf('add') > -1) {
                            this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { 
                                modify: 'add-change',
                                oldCategory: this.clocklist[i].category,
                                category: category,
                                oldTime: this.clocklist[i].time,
                                time: timeinfo,
                                oldRepeat: this.clocklist[i].repeat,
                                repeat: repeat
                            }));
                        } else {
                            this.clocklist.$set(i, Object.assign({}, this.clocklist[i], { 
                                modify: 'change',
                                oldCategory: this.clocklist[i].category,
                                category: category,
                                oldTime: this.clocklist[i].time,
                                time: timeinfo,
                                oldRepeat: this.clocklist[i].repeat,
                                repeat: repeat
                            }));
                        }
                        break;
                    }
                }
                this.updateState();
            },

            editClockCancelBack(error) {
                console.log("editClockCancelBack",error);
            },

            sync_clock() {
                if(this.syncable) {
                    const clock = [];
                    for(let i = 0; i < this.clocklist.length; i++) {
                        if(!this.clocklist[i].modify || ['add', 'change'].indexOf(this.clocklist[i].modify) > -1) {
                            clock.push({
                                type: (() => {
                                    if(this.clocklist[i].category == 0) {
                                        return 'getup';
                                    } else if(this.clocklist[i].category == 1) {
                                        return 'study';
                                    } else if(this.clocklist[i].category == 2) {
                                        return 'motion';
                                    } else if(this.clocklist[i].category == 3) {
                                        return 'sleep';
                                    } else if(this.clocklist[i].category == 4) {
                                        return 'other';
                                    }
                                })(),
                                time: this.clocklist[i].time,
                                repeat: parseInt(this.clocklist[i].repeat, 2)
                            });
                        }
                    }

                    let status = db.get('bluetoothStatus');
                    if(status === 0) {
                        // db.set('isSync', true);
                        this.$dispatch('show-sync-loading', { mode: 'sync' });
                        syncService.syncWriteClock(clock, () => {
                            this.submitSyncResult();
                        }, () => {
                            setTimeout(() => {
                                this.$dispatch('show-sync-loading', { mode: 'fail' });
                                this.$root.$refs.syncLoading.isOther();
                                // db.set('isSync', false);
                            }, 500);
                        });
                    } else if(status === 1) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_connecting"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('蓝牙正在连接中');
                    } else if(status === 2) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_connect"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('未连接到手环');
                    } else if(status === 3) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_open"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('手机未开启蓝牙');
                    }else{
                        this.$dispatch('showtip', this.$i18n("bluetooth_error_state"));
                    }
                }
            },

            submitSyncResult() {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].modify === 'add') {
                        this.clocklist[i].submitID = jutils.makeSimpleGUID();
                        const clock = {
                            time: this.clocklist[i].time,
                            category: this.clocklist[i].category,
                            repeat: this.clocklist[i].repeat
                        };
                        clockService.addClock(clock, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("clock_error_add"));
                            this.submitSyncResultFail(error);
                        }, this.clocklist[i].submitID);
                    } else if(this.clocklist[i].modify === 'change') {
                        this.clocklist[i].submitID = jutils.makeSimpleGUID();
                        const clock = {
                            clock_id: this.clocklist[i].clock_id,
                            time: this.clocklist[i].time,
                            category: this.clocklist[i].category,
                            repeat: this.clocklist[i].repeat
                        };
                        clockService.editClock(clock, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("clock_error_edit"));
                            this.submitSyncResultFail(error);
                        }, this.clocklist[i].submitID);
                    } else if(this.clocklist[i].modify === 'delete') {
                        this.clocklist[i].submitID = jutils.makeSimpleGUID();
                        clockService.deleteClock(this.clocklist[i].clock_id, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("clock_error_delete"));
                            this.submitSyncResultFail(error);
                        }, this.clocklist[i].submitID);
                    }
                }
            },

            submitSyncResultSuccess(data) {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].submitID === data['_request_id']) {
                        this.clocklist[i].submitState = 'success';
                        break;
                    }
                }
                if(this.checkAllSubmited()) {
                    this.update();
                    setTimeout(() => {
                        this.$dispatch('show-sync-loading', { mode: 'ok'});
                        setTimeout(() => {
                            this.$dispatch('hide-sync-loading');
                            db.set('isSync', false);
                        }, 1000);
                    }, 500);
                }
            },

            submitSyncResultFail(error) {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].submitID === error['_request_id']) {
                        this.clocklist[i].submitState = 'fail';
                        break;
                    }
                }
                if(this.checkAllSubmited()) {
                    this.update();
                    setTimeout(() => {
                        this.$dispatch('show-sync-loading', { mode: 'ok'});
                        setTimeout(() => {
                            this.$dispatch('hide-sync-loading');
                            db.set('isSync', false);
                        }, 1000);
                    }, 500);
                }
            },

            checkAllSubmited() {
                for(let i = 0; i < this.clocklist.length; i++) {
                    if(this.clocklist[i].submitID && !this.clocklist[i].submitState) {
                        return false;
                    }
                }
                return true;
            },
            closeMask(){
                this.isEditShow = false;
                this.$refs.mask.showMark(false);
            },

            //设置抬腕亮屏======================================================
            clock_set(){
                this.isClockSet = !this.isClockSet;
            },

            screen_set(){
                this.isClockSet = !this.isClockSet;
            },

            //开启或关闭按钮
            bs_toggle() {
                const device_id = db.get('device_id');
                const statu = db.get("bluetoothStatus");
                if(statu == 0){
                    if(this.screendata.status == 1){   //判断开关是否已经开启
                        console.log("关了");
                        //通知客户端传递参数
                        let time_info_config = {
                            close:true,
                        };
                        jsb.syncWriteScreenTime(time_info_config, device_id,
                            () => {
                                setTimeout(() => {
                                    //关闭时通知服务器传递的参数
                                    let set_screen_config = {
                                        open_time:this.screendata.open_time,
                                        close_time:this.screendata.close_time,
                                        status:0,
                                    };
                                    clockService.setScreen(set_screen_config,this.setScreenSuccess,this.setScreenError);
                                    this.$dispatch('showalert', {
                                        alert_content: this.$i18n("clock_screen_close"),
                                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                                    });
                                }, 500);
                            },

                            () => {
                                this.$dispatch("showtip",this.$i18n("clock_close_lose"));
                            }
                        );
                    }else{
                        console.log("开了");
                        //通知客户端传递的参数
                        let time_info_config = {
                            begin_hour:this.screendata.open_time.split(":")[0],
                            begin_minute:this.screendata.open_time.split(":")[1],
                            end_hour:this.screendata.close_time.split(":")[0],
                            end_minute:this.screendata.close_time.split(":")[1],
                            close:false,
                        };
                        jsb.syncWriteScreenTime(time_info_config, device_id,
                            () => {
                                setTimeout(() => {
                                    console.log("开启成功");
                                    //关闭时通知服务器传递的参数
                                    let set_screen_config = {
                                        open_time:this.screendata.open_time,
                                        close_time:this.screendata.close_time,
                                        status:1,
                                    };
                                   clockService.setScreen(set_screen_config,this.setScreenSuccess,this.setScreenError);
                                   this.$dispatch('showalert', {
                                        alert_content: this.$i18n("clock_screen_turned"),
                                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                                    });
                                }, 500);
                            },

                            () => {
                                this.$dispatch("showtip",this.$i18n("clock_turn_lose"));
                            }
                        );
                    }
                }else{
                    this.$dispatch("showtip",this.$i18n("bluetooth_connect"));
                    this.update();
                }
            },

            getScreenSuccess(data){
                console.log("getScreenSuccess",data);
                if(data.http_code == 200){
                    this.screendata = data.data;
                    if(this.screendata.status == 1){
                        this.screenbtnstatus = true;
                        this.isToggle = true;
                    }else{
                        this.screenbtnstatus = false;
                        this.isToggle = false;
                    }
                }else{
                    console.log("获取抬腕亮屏设置值失败")
                }
            },
            getScreenError(error){
                console.log(error);
            },
            bs_start_time(){
                let default_values=[];
                default_values.push(this.screendata.open_time.split(":")[0],this.screendata.open_time.split(":")[1]);
                console.log(default_values);

                let values = [ {from: 0, to: 24, step: 1},{from: 0, to: 60, step: 1}];
                jsb.showSelector(this.$i18n("clock_screen_set"),values,default_values,this.getSelectorSuccessBegin,this.getSelectorError);//jsb调用select接口
            },
            bs_end_time(){
                let default_values=[];
                default_values.push(this.screendata.close_time.split(":")[0],this.screendata.close_time.split(":")[1]);
                console.log(default_values);

                let values = [ {from: 0, to: 24, step: 1},{from: 0, to: 60, step: 1}];
                jsb.showSelector(this.$i18n("clock_screen_set"),values,default_values,this.getSelectorSuccessEnd,this.getSelectorError);//jsb调用select接口
            },
            getSelectorSuccessBegin(data){
                console.log("getSelectorSuccess",data);

                //同步手环需要的参数
                let time_info_config = {
                    begin_hour:data.values[0],
                    begin_minute:data.values[1],
                    end_hour:this.screendata.close_time.split(":")[0],
                    end_minute:this.screendata.close_time.split(":")[1],
                    close:!this.screenbtnstatus,
                };

                //判断开始时间是否大于结束时间
                let beginminutes = parseInt(time_info_config.begin_hour)*60 + parseInt(time_info_config.begin_minute);
                let endminutes = parseInt(this.screendata.close_time.split(":")[0])*60 + parseInt(this.screendata.close_time.split(":")[1]);
                if(beginminutes >= endminutes){
                    this.$dispatch("showtip",this.$i18n("clock_time"));
                }else{
                    this.syncScreenOpenTime(time_info_config);
                }
            },
            getSelectorSuccessEnd(data){
                console.log("getSelectorSuccess",data);

                //同步手环需要的参数
                let time_info_config = {
                    begin_hour:this.screendata.open_time.split(":")[0],
                    begin_minute:this.screendata.open_time.split(":")[1],
                    end_hour:data.values[0],
                    end_minute:data.values[1],
                    close:!this.screenbtnstatus,
                };

                //判断开始时间是否大于结束时间
                let beginminutes = parseInt(this.screendata.open_time.split(":")[0])*60 + parseInt(this.screendata.open_time.split(":")[1]);
                let endminutes = parseInt(time_info_config.end_hour)*60 + parseInt(time_info_config.end_minute);

                if(beginminutes >= endminutes){
                    this.$dispatch("showtip",this.$i18n("clock_time_2"));
                }else{
                    this.syncScreenEndTime(time_info_config);
                }
            },
            syncScreenOpenTime(time_info_config){
                const device_id = db.get('device_id');
                const status = db.get('bluetoothStatus');
                if(status === 0) {
                    jsb.syncWriteScreenTime(time_info_config, device_id,
                        () => {
                            setTimeout(() => {
                                //设置服务器需要的参数
                                let set_screen_config = {
                                    open_time:time_info_config.begin_hour+":"+time_info_config.begin_minute,
                                    close_time:this.screendata.close_time,
                                    status:this.screenbtnstatus == true?1:0,
                                };
                               clockService.setScreen(set_screen_config,this.setScreenSuccess,this.setScreenError);
                            }, 500);
                        },

                        () => {
                            this.$dispatch("showtip",this.$i18n("clock_set_lose"));
                            setTimeout(() => {
                                this.screendata = Object.assign({}, this.screendata, {open_time: this.screendata.open_time});
                            }, 500);
                    });
                } else if(status === 1) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_connecting"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('蓝牙正在连接中');
                } else if(status === 2) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_connect"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('未连接到手环');
                } else if(status === 3) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_open"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('手机未开启蓝牙');
                }
            },
            syncScreenEndTime(time_info_config){
                const device_id = db.get('device_id');
                const status = db.get('bluetoothStatus');
                if(status === 0) {
                    jsb.syncWriteScreenTime(time_info_config, device_id,
                        () => {
                            setTimeout(() => {
                                //设置服务器需要的参数
                                let set_screen_config = {
                                    open_time:this.screendata.open_time,
                                    close_time:time_info_config.end_hour+":"+time_info_config.end_minute,
                                    status:this.screenbtnstatus == true?1:0,
                                };
                               clockService.setScreen(set_screen_config,this.setScreenSuccess,this.setScreenError);
                            }, 500);
                        },

                        () => {
                            this.$dispatch("showtip",this.$i18n("clock_set_lose"));
                            setTimeout(() => {
                                this.screendata = Object.assign({}, this.screendata, {end_time: this.screendata.end_time});
                            }, 500);
                    });
                } else if(status === 1) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_connecting"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('蓝牙正在连接中');
                } else if(status === 2) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_connect"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('未连接到手环');
                } else if(status === 3) {
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("bluetooth_open"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                    jutils.debugAlert('手机未开启蓝牙');
                }
            },
            setScreenSuccess(data){
                console.log("setScreenSuccess",data);
                if(data.http_code == 200){
                    this.update();
                }
            },
            getSelectorError(error){
                console.log("getSelectorError",error);
                // this.$dispatch("showtip","获取失败");
            },
            setScreenError(error){
                this.$dispatch("showtip",this.$i18n("clock_set_lose"));
            }

        }
  };
</script>

<style scoped>
  /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
  /*公用*/
  body,html{background:#ebebeb; overflow:hidden;}
  .workday{padding-bottom:3.5rem;}
  .workday .set_title{ padding:6% 4% 3% 4%; font-size: 1.1rem; color:#646464;}
  .no_clock_tip {position:fixed; bottom:3.875rem; left:0px; display:none;}
  .no_clock_tip img{width:60%; display:block; float:right; margin-right:20px;}
  .no_clock{
      display: table;
      position: fixed;
      bottom: 0.6rem;
      height: 2.2rem;
      line-height: 2.2rem;
      left: 5%;
      width: 90%;
      background: rgba(44, 40, 60, 0.6);
      border-radius: 4px;
      transform:translate3D(0,0,0);
      -wekit-transform:translate3D(0,0,0);
  }
  .editing{}
  .no_clock>span{
      display: table-cell;
      text-align: center;
      color: #FFF;
  }
  .no_clock i {
      width: 1rem;
      height: 1rem;
      display: inline-block;
      margin-right: 3px;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      vertical-align: middle;
  }
  .no_clock>span>span{
      display: inline-block;
      vertical-align: middle;
      font-size: .9rem;
  }
  .no_clock .edit {
  }
  .no_clock .edit.disable {
      opacity: 0.3;
  }
  .no_clock .edit i {
      background-image: url('~assets/images/icon_16_56@3x.png');
  }
  .no_clock .add {
  }
  .no_clock .add.disable {
      opacity: 0.3;
  }
  .no_clock .add i {
      background-image: url('~assets/images/icon_16_57@3x.png');
  }
  .no_clock .sync {
  }
  .no_clock .sync.disable {
      opacity: 0.3;
  }
  .no_clock .sync i {
      background-image: url('~assets/images/icon_16_58@3x.png');
  }
  .no_clock.editing .cancel {
  }
  .no_clock.editing .cancel i {
      background-image: url('~assets/images/icon_30_09@3.png');
  }
  .no_clock.editing .ok_btn {
  }
  .no_clock.editing .ok_btn i {
      background-image: url('~assets/images/icon_30_11@3.png');
  }
    .no_clock span i{
        position:relative;
        bottom:.14rem;
    }

  .time_list{padding:0 4%; box-sizing:border-box;}
  .time_list p{position:relative;border-bottom:1px solid #e1e1e1; overflow:hidden; padding:2% 0;}
  .time_list p:nth-last-child(1){border-bottom:none;}
  .time_list>span{display:inline-block;}
  .time_list span.time_info>span {
      display: block;
  }
  .time_list span.time_info>span.repeat {
    font-size: 0.8rem;
    color: #999;
  }
  .time_list span.delect_info{
    position: absolute;
    bottom: 0px;
    padding: 0 5px;
    background: url('~assets/images/icon_20_54@3x.png') no-repeat;
    background-size: 20px;
    background-position: center center;
    width: 20px;
    height: 100%;
    display: inline-block;
      }
  .time_list span.time_info.ml {margin-left: 2rem;}
  .time_list span.time_info.mr {margin-right: 2rem;}
  .time_list span.time_info {display: inline-block;font-family: AkzidenzGrotesk; font-size: 2.2rem;}
  .time_list span.edit_info {
    position: absolute;
    bottom: 0;
    right: 0;
    background: url('~assets/images/update_icon.png') no-repeat;
    background-size: 20px;
    background-position: center center;
    width: 20px;
    height: 100%;
    display: inline-block;
      }
    .set_title i {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin-right: 0.3rem;
    }
    .getup .set_title i {
        background-image: url('~assets/images/icon_20_56@3x.png');
    }
    .learn .set_title i {
        background-image: url('~assets/images/icon_20_57@3x.png');
    }
    .sport .set_title i {
        background-image: url('~assets/images/icon_20_58@3x.png');
    }
    .sleep .set_title i {
        background-image: url('~assets/images/icon_20_59@3x.png');
    }
    .other .set_title i {
        background-image: url('~assets/images/icon_20_60@3x.png');
    }
    .edit-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .edit-clock {
        position: fixed;
        bottom: 0rem;
        background-color: #FFF;
        width: 100%;
        z-index: 10;
        transform:translate3D(0,0,0);
        -wekit-transform:translate3D(0,0,0);
    }
    .edit-clock .edit-title {
        height: 2.5rem;
        line-height: 2.5rem;
        width: 100%;
        white-space: nowrap;
        border-bottom: 1px solid #e1e1e1;
    }
    .edit-clock .edit-title .title-btn {
        position: absolute;
        display: inline-block;
        color: #046cff;
        font-size: 1rem;
        width: 3rem;
        text-align: center;
    }
    .edit-clock .edit-title .title-name {
        display: inline-block;
        text-align: center;
        width: 100%;
        font-size: 1.2rem;
    }
    .edit-clock .edit-content {
        background-color: #eee;
        font-size: 0.8rem;
    }
    .edit-clock .edit-content .clock {
        width: 90%;
        margin: 0 auto;
    }
    .edit-clock .edit-content .clock .clock-title {
        width: 100%;
        padding-top: 0.6rem;
        padding-bottom: 0.5rem;
    }
    .edit-clock .edit-content .clock .clock-content {
        background-color: #FFF;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        border-radius: 4px;
    }
    .edit-clock .edit-content .clock .clock-content p {
        margin: 0 0.3rem;
    }
    .edit-clock .edit-content .clock .clock-content i {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        background-image: url('~assets/images/select_bg.png');
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        float: right;
        margin-top: -1.4rem;
        margin-right: 0.3rem;
    }
    .edit-clock .edit-content .repeat {
        width: 90%;
        margin: 0 auto;
        padding-bottom: 1rem;
    }
    .edit-clock .edit-content .repeat .repeat-title {
        padding-top: 0.6rem;
        padding-bottom: 0.5rem;
    }
    .edit-clock .edit-content .repeat .repeat-btn {
        background-color: #FFF;
        border-radius: 4px;
        padding: 0 0.4rem;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button {
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid #e1e1e1;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button:last-child {
        border-bottom: none;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button label span {
        display: block;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button label input {
        display: none;
        position:absolute;
        top:-20px;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button label input + i {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        float: right;
        margin-top: 0.6rem;
        margin-right: 0.4rem;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .edit-clock .edit-content .repeat .repeat-btn .ck-button label input:checked + i {
        background-image:url('~assets/images/icon_20_13@3x.png');
    }
</style>
