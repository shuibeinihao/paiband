<template>
    <div class="setting">
        <p class="set_title">{{$i18n('setting_write_title')}}</p>
        <div class="box_wrapper data_entry">
        	<p>
        		<a href="javascript:;" class="en_data">
        			<span><i>{{heightRecordsLast.height||0}}</i><b>CM</b></span>
        			<span>{{$i18n('setting_update_time')}}<i>{{heightRecordsLast.time||0}}</i></span>
        		</a>
        		<a href="javascript:;" class="en_unpdat" @click="update_height">{{$i18n('setting_update')}}</a>
        		<a class="en_line"></a>
        	</p>
        	<p>
        		<a href="javascript:;" class="en_data">
        			<span><i>{{weightRecordsLast.weight||0}}</i><b>KG</b></span>
        			<span>{{$i18n('setting_update_time')}}<i>{{weightRecordsLast.time||0}}</i></span>
        		</a>
        		<a href="javascript:;" class="en_unpdat" @click="update_weight">{{$i18n('setting_update')}}</a>
        		<a class="en_line"></a>
        	</p>
        </div>
        <!-- 步数目标 -->
        <p class="set_title">{{$i18n('setting_goal_step_title')}}</p>
        <div class="box_wrapper target_info">
        	<p class="title">
                <span v-show="isStepInteShow">{{steps.reference||0}}</span>
                <span v-show="isStepSelfShow">{{steps.self||steps.reference*0.5}}</span>{{$i18n('sport_step')}}
            </p>
            <p v-show="$lang != 'en'" class="equivalent"><span>{{$i18n('sport_food_1')}}{{ consume.consumption }} {{ consume.category }}</span></p>
        	<a @click="target_step_info" id="1" :class="{'act':isSetpAct}">
        		<span>{{$i18n('setting_step_recommend_title')}}</span>
        		<i>{{$i18n('setting_step_recommend_tip')}}</i>
        	</a>
        	<a @click="target_step_info" id="2" :class="{'act':isSlefAct, 'no_bottom': !isSlefAct}">
        		<span>{{$i18n('setting_step_custom_title')}}</span>
        		<i>{{$i18n('setting_step_custom_tip')}}</i>
        	</a>
            <p v-show="isSlefAct" class="range_info">
                <input id="range_steps" @change="range_step_info" type="range" min="{{steps_min}}" max="{{steps_max}}" step="1" value="{{steps_value}}">
                <span><i>50%</i><i>175%</i><i>300%</i></span>
            </p>
        </div>
        <!-- 睡眠目标 -->
        <p class="set_title">睡眠目标</p>
        <div class="box_wrapper target_info sleep_target_info">
            <p class="title">
                <span v-show="isSleepInteShow">
                    <span>
                        <b>{{Math.floor(sleeping.reference/60)||0}}</b>
                        <i>{{$i18n('time_unit_hour')}}</i>
                    </span>
                    <span>
                        <b>{{sleeping.reference%60||0}}</b>
                        <i>{{$i18n('time_unit_minute')}}</i>
                    </span>
                </span>
                <span v-show="isSleepSelfShow">
                    <b>{{Math.floor((sleeping.self||sleeping.reference*0.5)/60)}}</b><i>{{$i18n('time_unit_hour')}}</i>
                    <b>{{Math.floor((sleeping.self||sleeping.reference*0.5)%60)||0}}</b><i>{{$i18n('time_unit_minute')}}</i>
                </span>
            </p>
            <a @click="target_sleep_info" id="1" :class="{'act':isSleepInitAct}">
            	<span>{{$i18n('setting_sleep_recommend_title')}}</span>
            	<i>{{$i18n('setting_sleep_recommend_tip')}}</i>
            </a>
            <a @click="target_sleep_info" id="2" :class="{'act':isSleepSlefAct, 'no_bottom': !isSleepSlefAct}">
            	<span>{{$i18n('setting_sleep_custom_title')}}</span>
            	<i>{{$i18n('setting_sleep_custom_tip')}}</i>
            </a>
            <p v-show="isSleepSlefAct" class="range_info">
            	<input id="range_sleep" @change="range_sleep_info" type="range" min="{{sleep_min}}" max="{{sleep_max}}" step="1" value="{{sleep_value}}">
            	<span><i>50%</i><i>100%</i><i>150%</i></span>
            </p>
        </div>
    </div>
</template>

<script>
  import db from 'dbs/hashmap';
  import jutils from 'jutils';
  import jsb from "services/jsb";
  import syncService from 'services/sync';
  import settings from "services/setting";
  import expert from "services/expert";
  import childService from 'services';
  export default {
  	data(){
        return{
            isStepInteShow:true,//步数目标智能推荐是否显示
            isStepSelfShow:false,//步数目标自定义是否显示
            isSetpAct:true,//步数目标智能推荐act是否显示
            isSlefAct:false,//步数目标自定义act是否显示

            isSleepInteShow:true,//睡眠目标智能推荐是否显示
            isSleepSelfShow:false,//睡眠目标自定义是否显示
            isSleepInitAct:true,//睡眠目标智能推荐act是否显示
            isSleepSlefAct:false,//睡眠目标自定义act是否显示

            steps_min:"",
            steps_max:"",
            steps_value:"",
            sleep_min:"",
            sleep_max:"",
            sleep_value:"",

            steps:{},//步数目标
            sleeping:{},//睡眠目标
            defaultheight:0,
            defaultweight:0,

            heightRecordsLast:{},//身高记录最后一条数据
            weightRecordsLast:{},//体重记录最后一条数据
            heightRecordsEndTime:"",//获取身高记录最后时间
            weightRecordsEndTime:"",//获取身高记录最后时间

            consume: {},
            setFlag: 'step' //设置的是步数还是睡眠 'step' 'sleep'
        }
  	},
    methods:{
        init(width, height) {
            settings.getSettings(this.updateSettings, this.updateSettingsError);//获取.目标设定值
            //获取孩子身高记录
            expert.getHeightRecords(this.heightRecordsEndTime,this.updateHeightRecords, this.updateHeightRecordsError);
            //获取孩子体重记录
            expert.getWeightRecords(this.weightRecordsEndTime,this.updateWeightRecords, this.updateWeightRecordsError);

            this.isHeightWeight();

        },
        update(){
            settings.getSettings(this.updateSettings, this.updateSettingsError);//获取.目标设定值
           //获取孩子身高记录
            expert.getHeightRecords(this.heightRecordsEndTime,this.updateHeightRecords, this.updateHeightRecordsError);
            //获取孩子体重记录
            expert.getWeightRecords(this.weightRecordsEndTime,this.updateWeightRecords, this.updateWeightRecordsError);

            //this.isHeightWeight();

        },

        // bluetoothStatusIsBtn(){
        //     if(db.get('bluetoothStatusCalls') === undefined) {
        //         db.set('bluetoothStatusCalls', []);
        //     }
        //     const calls = db.get('bluetoothStatusCalls');
        //     if(calls.indexOf(this.bluetoothStatusChange) < 0) {
        //         calls.push(this.bluetoothStatusChange);
        //     }
        // },

        isHeightWeight(){
            let sta = this.$route.query.sta;
            console.log("params",this.$route.query.sta);
            if(sta == 1){

                this.$dispatch('showalert', { 
                    alert_content: '请先设置身高体重!', 
                    btns: [ { btn_name: '确认'} ]

                });
            }
        },

        updateSettings(data){
            console.log("updateSettings",data);
            if(data.http_code == 200){
                this.special_tips = data.data.growing_expect.special_tips;
                this.expect = data.data.growing_expect.expect;
                if(this.setFlag === 'step') {
                    this.consume = data.data.consume_food;
                }
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
                    alert_content: '获取目标设定值失败,请稍后重试！', 
                    btns: [ { btn_name: '确认'} ]

                });
            }
        },
        updateSettingsError(error){
            console.log("error",error);

            this.$dispatch('showalert', { 
                alert_content: '获取目标设定值失败,请检查网络后重试！', 
                btns: [ { btn_name: '确认'} ]

            });
        },
        setExpect(data){
            settings.getSettings(this.updateSettings, this.updateSettingsError);//设置成功之后重新获取.目标设定值
        },
        target_step_info(e){//步数目标操作
            this.setFlag = 'step';
            let target = "";
            let id = $(e.target).attr("id");
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
            settings.getSettings(this.updateSettings, this.updateSettingsError);//设置成功之后重新获取.目标设定值
        },
        range_step_info(e){
            this.setFlag = 'step';
            $(e.target).attr('value', e.target.value);
            let target = "";
            target = $(e.target).attr('value');
            settings.setTarget(target, this.setTarget, this.setTargetError);
        },
        range_sleep_info(e){
            this.setFlag = 'sleep';
            $(e.target).attr('value', e.target.value);
            let target = "";
            target = $(e.target).attr('value');
            settings.setSleepTarget(target, this.setTarget, this.setTargetError);
        },
        update_height(){
            console.log("cid",db.get("cid"));
            //点击更新调出select显示当前身高数据
            let default_values = [];
            default_values.push(parseInt(this.defaultheight).toString());
             console.log("default_values_height",default_values);
            let values = [{from: 50, to: 200, step: 1}, ['cm']];

            jsb.showSelector("设置身高", default_values , values,this.seHeightSuccessBack,this.seHeightCancelBack);//jsb调用select接口

        },
        seHeightSuccessBack(data){
            console.log("seHeightSuccessBack",data);
            //this.update();
            let value_info = data.values[0];
            this.heightGrowingLast = Object.assign({}, this.heightGrowingLast, {height: value_info});
            console.log(this.heightGrowingLast.height);
            this.syncGrowHeight(this.heightGrowingLast.height || 0);
        },
        seHeightCancelBack(error){
            console.log(error);
        },
        update_weight(){
            //点击更新调出select显示当前身高数据
            let default_values = [];
                default_values.push(('0' + parseInt(this.defaultweight).toString()).substr(-2));
                console.log("default_values_weight",default_values);

            let values = [ {from: 1, to: 100, step: 1}, ['kg']];

            jsb.showSelector("设置体重",default_values,values,this.seWeightSuccessBack,this.seWeightCancelBack);//jsb调用select接口

        },
        seWeightSuccessBack(data){
            console.log("seWeightSuccessBack",data);
            //this.update();
            let value_info = data.values[0];
            this.weightGrowingLast = Object.assign({}, this.weightGrowingLast, {weight: value_info});

            this.syncGrowWeight(this.weightGrowingLast.weight || 0);
        },
        seWeightCancelBack(error){
            console.log(error);
        },
        updateHeightRecords(data){
            console.log("getHeightRecords",data);
            if(data.http_code == 200){
                if(data.data.length == 0){
                    return;
                }
                let heightRecordsLength = data.data.length;
                this.heightRecordsLast = data.data[heightRecordsLength-1];
                this.defaultheight = this.heightRecordsLast.height;
            }else{
                console.log("获取身高数据失败,请稍后重试！");
                // this.$dispatch('showalert', { 
                //     alert_content: '获取身高数据失败,请稍后重试！', 
                //     btns: [ { btn_name: '确认'} ]
                // });
            }
        },
        updateHeightRecordsError(error){

            this.$dispatch('showalert', { 
                alert_content: '获取身高数据失败,请检查网络后重试！', 
                btns: [ { btn_name: '确认'} ]

            });
        },
        updateWeightRecords(data){
            console.log("getWeightRecords",data);
            if(data.http_code == 200){
                if(data.data.length == 0){
                    return;
                }
                let weightRecordsLength = data.data.length;
                this.weightRecordsLast = data.data[weightRecordsLength-1];
                this.defaultweight = this.weightRecordsLast.weight;
            }else{
                console.log("获取体重数据失败,请稍后重试！");
                // this.$dispatch('showalert', { 
                //     alert_content: '获取体重数据失败,请稍后重试！', 
                //     btns: [ { btn_name: '确认'} ]
                // });
            }
        },
        updateWeightRecordsError(error){

            this.$dispatch('showalert', { 
                alert_content: '获取体重数据失败,请检查网络后重试！', 
                btns: [ { btn_name: '确认'} ]

            });
        },
        syncGrowHeight(height) {
            // if(!db.get('isSync')) {
            const cid = db.get('cid');
            const deviceid = db.get('device_id');
            const status = db.get('bluetoothStatus');
            if(status === 0) {
                // db.set('isSync', true);
                // this.$dispatch('show-sync-loading', { mode: 'sync' });

                jsb.syncWriteHeight(height, cid,
                    () => { 
                        setTimeout(() => {
                            // this.$dispatch('show-sync-loading', { mode: 'ok'});
                            setTimeout(() => {
                                this.update();
                                // this.$dispatch('hide-sync-loading');
                                // db.set('isSync', false);
                            }, 1000);
                        }, 500);
                    },

                    () => { 
                        setTimeout(() => {
                            this.heightGrowingLast = Object.assign({}, this.heightGrowingLast, {height: this.defaultheight});
                            // this.$dispatch('show-sync-loading', { mode: 'fail'});
                            // setTimeout(() => {
                            //     this.$dispatch('hide-sync-loading');
                            //     db.set('isSync', false);
                            // }, 1000);
                        }, 500);
                });
            } else if(status === 1) {
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n('bluetooth_connecting'), 
                    btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                });
                jutils.debugAlert('蓝牙正在连接中');
            } else if(status === 2) {
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n('bluetooth_connect'), 
                    btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                });
                jutils.debugAlert('未连接到手环');
            } else if(status === 3) {
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n('bluetooth_open'), 
                    btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                });
                jutils.debugAlert('手机未开启蓝牙');
            }
            // } else {
            //     this.$dispatch('showtip', '已经在同步数据啦');
            // }
        },
        syncGrowWeight(weight) {
            // if(!db.get('isSync')) {
                const cid = db.get('cid');
                const deviceid = db.get('device_id');
                const status = db.get('bluetoothStatus');
                if(status === 0) {
                    // db.set('isSync', true);
                    // this.$dispatch('show-sync-loading', { mode: 'sync' });
                    jsb.syncWriteWeight(weight, cid,
                        () => { 
                            setTimeout(() => {
                                // this.$dispatch('show-sync-loading', { mode: 'ok'});
                                setTimeout(() => {
                                    this.update();
                                    // this.$dispatch('hide-sync-loading');
                                    // db.set('isSync', false);
                                }, 1000);
                            }, 500);
                        },

                        () => { 
                            setTimeout(() => {
                                this.weightGrowingLast = Object.assign({}, this.weightGrowingLast, {weight: this.defaultweight});
                                // this.$dispatch('show-sync-loading', { mode: 'fail'});
                                // setTimeout(() => {
                                //     this.$dispatch('hide-sync-loading');
                                //     db.set('isSync', false);
                                // }, 1000);
                            }, 500);
                    });
                } else if(status === 1) {
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n('bluetooth_connecting'), 
                        btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                    });
                    jutils.debugAlert('蓝牙正在连接中');
                } else if(status === 2) {
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n('bluetooth_connect'), 
                        btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                    });
                    jutils.debugAlert('未连接到手环');
                } else if(status === 3) {
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n('bluetooth_open'), 
                        btns: [ { btn_name: this.$i18n('btn_name_ok')} ]
                    });
                    jutils.debugAlert('手机未开启蓝牙');
                }
            // } else {
            //     this.$dispatch('showtip', '已经在同步数据啦');
            // }
        },
        // submitGrow(height, weight) {
        //     const appid = db.get('appid');
        //     const token = db.get('token');
        //     const uid = db.get('uid');
        //     const cid = db.get('cid');
        //     const encryptObj = Object.assign({height, weight}, {
        //         appid: appid,
        //         token: token,
        //         parent_uid: uid,
        //         child_uid: cid,
        //         hash: '',
        //         ext: '',
        //         gender: '',
        //         relation_ship: '',
        //         birthday: '',
        //         nick_name: '',
        //         nickname: ''
        //     });
        //     jsb.encryptParam(encryptObj, data => {
        //         childService.setChildGrow(Object.assign(encryptObj, { sign: data.sign }), data => {
        //             this.update();
        //             setTimeout(() => {
        //                 this.$dispatch('show-sync-loading', { mode: 'ok'});
        //                 setTimeout(() => {
        //                     this.$dispatch('hide-sync-loading');
        //                     db.set('isSync', false);
        //                 }, 1000);
        //             }, 500);
        //         }, error => {
        //             setTimeout(() => {
        //                 this.$dispatch('show-sync-loading', { mode: 'fail', showResyncBtn: false });
        //                 setTimeout(() => {
        //                     this.$dispatch('hide-sync-loading');
        //                     db.set('isSync', false);
        //                 }, 1000);
        //             }, 500);
        //         })
        //     });
        // }
    },
};
</script>

<style scoped>
    /*红色 #ef5361  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#959595*/
    /*公用*/
    body{ color:#313131;}
    .setting{}
    .setting .set_title{ padding:6% 4% 3% 4%; font-size: 1rem; color:#646464;}
    .setting .data_entry{}
    .setting .data_entry p{border-top:1px solid #e1e1e1; margin:0 4%; overflow:hidden; padding:8px 0; position:relative;}
    .setting .data_entry p:nth-child(1){border-top:none;}
    .setting .data_entry p:nth-child(1) .en_data{ background: url(~assets/images/icon_24_08@3x.png) no-repeat scroll left center; background-size: 20px;}
    .setting .data_entry p:nth-child(2) .en_data{ background: url(~assets/images/icon_24_09@3x.png) no-repeat scroll left center; background-size: 20px;}
    .setting .data_entry p a{display:inline-block; float:left;}
    .setting .data_entry p .en_data{padding-left:10%;}
    .setting .data_entry p .en_data span:nth-child(1) {color:#000; display:block;}
    .setting .data_entry p .en_data span:nth-child(1) i{font-family: AkzidenzGrotesk; font-size: 2.2rem; }
    .setting .data_entry p .en_data span:nth-child(1) b{font-family: AkzidenzGrotesk; font-size: 1.1rem; }
    .setting .data_entry p .en_data span:nth-child(2){ margin-top:-3px; color:#959595; font-size: .8rem; display:block;}
    .setting .data_entry p .en_unpdat{ float:right; font-size: .7rem; color:#959595; padding-top:20px; background: url(~assets/images/update_icon.png) no-repeat scroll top center; background-size: 20px; margin-top:10px; padding-right:.2rem;}
    .setting .data_entry p .en_line{width:1px; height:50%; position:absolute; right:15%; top:25%; background:#e1e1e1;}

    .setting .hope_info{ padding:1% 0% 2% 0;}
    .setting .hope_info .titl{font-size: .9rem; color:#959595; padding:4% 4% 0 4%;}
    .setting .hope_info .con{ font-size: 1rem; margin:0 4%; padding:5px 0;}
    .setting .hope_info .con span{display:inline-block; padding-right:10px;}
    .setting .vision{padding:1% 0% 2% 0; margin-top:4%;}
    .setting .vision .title{font-size: .9rem; color:#959595; padding:2% 4% 2% 4%;}
    .setting .vision .vi_btn{ background:#f5f5f5 url(~assets/images/vi_btn.png) no-repeat scroll 2% 58%; background-size: 15px; border-radius:5px; font-size: .6rem; margin:0 4%; padding:3% 2% 2% 8%; color:#646464;}
    .setting .vision .check_mul{padding:0 4% 2% 4%;}
    .setting .vision .check_mul a{display:inline-block; border:1px solid #e1e1e1; border-radius: 2px; color:#959595; font-size: 1rem; padding:2px 8px; margin-right:5px; margin-top:10px;}
    .setting .vision .check_mul a.act{background:url(~assets/images/check_mul_bg.png) no-repeat scroll right bottom; background-size: 12px; border:1px solid #8b49f6; color:#8b49f6;}
    .target_info{}
    .target_info .equivalent{background:#f5f5f5; text-align: center; padding:.5rem 0; border-radius: 4px; width:94%; margin:0 auto;}
    .target_info .equivalent span{display:inline-block; background:url(~assets/images/icon_16_53@3x.png) no-repeat scroll left center; padding-left:25px; background-size: 20px;white-space: nowrap; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block;}
    .target_info .title{padding-top:8px; text-align: center; font-size: .8rem; color:#000;}
    .target_info .title span{font-family: AkzidenzGrotesk; font-size: 2rem; padding:0 5px;}
    .target_info a{display:block; border-bottom:1px solid #e1e1e1; margin:0 4%; padding:2% 3% 2% 10%; background: url(~assets/images/radio_icon.png)no-repeat scroll left center; background-size: 20px;}
    .target_info a.no_bottom{border-bottom:none;}
    .target_info a.act{background: url(~assets/images/radio_icon_act.png)no-repeat scroll left center; background-size: 20px;}
    .target_info a:nth-last-child(1){border-bottom:none;}
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
</style>
