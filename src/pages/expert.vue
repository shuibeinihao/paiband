<template>
    <div class="expert">
        <!-- 消瘦程度 -->
        <div class="expert_status">
          	<div class="status_bg">
          		<img :src="status_bg_info" alt="">
          	</div>
          	<div class="status_con">
                <gauge-name-ring v-ref:data-name-ring class="data-ring" :width="200" :height="200"></gauge-name-ring>
                <div class="status_text">
                    <p class="data">BMI {{weightRecordsBMI || 0}}</p>
                    <p class="percent">{{weightRecordsText || $i18n("grow_nodata")}}</p>
                </div>
          	</div>
          	<span class="age" :class="{'man':isMan,'woman':isWoman}">{{age||0}}{{$i18n("age_unit")}}</span>
        </div>
        <!-- 数据 -->
    	<div class="status_desc">
    		<p class="box_wrapper ">
    			<a href="javascript:;" class="height">
    				<span>{{heightRecordsLast.height || 0}}</span><i>IN</i>
                    <i class="status_info" :class="{'colorRed':isRedH,'colorGreen':isGreenH}">{{heightRecordsText}}</i>
                    <b>{{$i18n("setting_update_time")}}{{heightRecordsLast.time}}</b>
    			</a>
    			<a href="javascript:;" class="update" @click="update_height">
    				{{$i18n("setting_update")}}
    			</a>
    			<span href="javascript" class="line_info"></span>
    		</p>
            <p class="box_wrapper ">
                <a href="javascript:;" class="height weight"  @click = "showVersion">
                    <span>{{weightRecordsLast.weight || 0}}</span><i>IBS</i>
                    <i class="status_info" :class="{'colorRed':isRedW,'colorGreen':isGreenW,'colorYellow':isYellowW}">{{weightRecordsText}}</i>
                    <b>{{$i18n("setting_update_time")}}{{weightRecordsLast.time}}</b>
                </a>
                <a href="javascript:;" class="update" @click="update_weight">
                   {{$i18n("setting_update")}}
                </a>
                <span href="javascript" class="line_info"></span>
            </p>
    		<div class="link_go box_wrapper expert_link_go">
                <a href="javascript:;" @click="assessInfo">
                    {{$i18n("grow_what_title")}}
                    <img src="~assets/images/select_bg.png" alt="">
                </a>
            </div>
    	</div>
        <!-- tips -->
        <div class="box_wrapper tip_info warn" v-if="isShow">
            <p>{{warning_tips.tips || $i18n("grow_tip_nodate")}}</p>
            <a href="javascript:;" @click="iKnow">{{$i18n("grow_tip_know")}}</a>
        </div>
        <!-- 成长曲线 -->
        <div class="pop_wrap">
            <!-- 身高成长曲线 -->
            <div class="pop_height">
                <panel :paneltitle="pop_height_title" :panelunit="pop_height_unit">
                    <line v-ref:heightgrowingline></line>
                    <div class="link_go">
                        <a href="javascript:;" @click="allHeightDataPop">
                            {{$i18n("grow_title_allheight")}}
                            <img src="~assets/images/select_bg.png" alt="">
                        </a>
                    </div>
                </panel>
            </div>
            <!-- 体重成长曲线 -->
            <div class="pop_weight">
                <panel :paneltitle="pop_weight_title" :panelunit="pop_weight_unit">
                <line v-ref:weightgrowingline></line>
                <div class="link_go">
                    <a href="javascript:;" @click="allWeightDataPop">
                        {{$i18n("grow_title_allweight")}}
                        <img src="~assets/images/select_bg.png" alt="">
                    </a>
                </div>
                </panel>
            </div>
        </div>
        <!-- 营养专家策略 -->
        <div v-show="$lang != 'en'" class="expert_strategy hide">
          	<div class="strategy_list">
          		<p class="per">
          			 <img :src="pabulum_tips.expert_avatar" />
          			 <span>{{pabulum_tips.expert_name || $i18n("grow_tip_nodate")}}</span>
          			 <i>{{$i18n("expert_n_e")}}</i>
          		</p>
          		<p class="desc">{{pabulum_choice.content || $i18n("grow_tip_nodate")}}</p>
          	</div>
          	<!-- 控制摄入 -->
    	    <div class="control_intake">
    	      	<div class="con">
    	      		<!-- <div class="select_info">
                        <a href="javascript:;" @click="tabInfo" :class="{'isOne':isOne,'isTwo':isTwo}" id="{{$index}}" v-for="sect in pabulum_choice">{{sect.title}}</a>
    	      		</div>
    	      		<div class="con_desc">
                        <p v-for="se in selected" track-by="$index">{{$index + 1}}.&nbsp;{{se}}</p>
    	      		</div> -->
    	      		<div class="recomm_list">
                        <p class="con_title">
                            {{$i18n("expert_day_j")}}
                        <!--    <span>注:食物吸收率因人而异，仅供参考</span> -->
                        </p>
    	      			<a href="javascript:;" v-for="recom in recommend_food">
    	      				<p class="product_img">
    	      					<img :src="recom.icon" />
                                <span></span>
    	      				</p>
    	      				<p class="product_name">{{recom.name}}</p>
    	      				<p class="product_star">
    	      					<span v-for="star in recom.stars">★</span>
    	      					<span class="text">{{recom.category}}</span>
    	      				</p>
    	      				<p class="product_desc">
    	      					<span>
    	      						<i>{{$i18n("expert_day_y")}}:</i><b></b>
    	      					</span>
    	      					<span>
    	      						<i>{{$i18n("expert_hot")}}</i><b>{{recom.calorie}}{{$i18n("expert_k")}}</b>
    	      					</span>
                                <span>
                                    <i>{{recom.target}}</i><b>{{recom.content}}</b>
                                </span>
                                <span>
                                    <i>{{$i18n("expert_t")}}</i>
                                </span>
    	      					<!-- <span>
    	      						<i>{{recom.target}}</i><b></b>
    	      					</span> -->
    	      				</p>
    	      			</a>
    	      		</div>
    	      	</div>
    	    </div>
	    </div>
        <!-- 身高体重数据 -->
        <div class="growrecord">
            <div class="panel_wrapper">
                <div class="panel pop_height_data" v-show="isShowAllHeightData" transition="fadeInOut">
                    <div class="title">{{$i18n("grow_title_allheight")}}<a @click="closeAllDate">{{$i18n("btn_name_close")}}</a></div>
                    <div class="thead">
                        <span>{{$i18n("grow_height")}}(IN)</span>
                        <span>{{$i18n("grow_status")}}</span>
                        <span>{{$i18n("grow_recordtime")}}</span>
                    </div>
                    <div class="content_info">
                        <p v-for="height_records in heightRecords">
                            <span>{{height_records.height}}</span>
                            <span>{{height_records.status_text}}</span>
                            <span>{{height_records.time}}</span>
                        </p>
                    </div>
                </div>
                <div class="panel pop_weight_data" v-show="isShowAllWeightData" transition="fadeInOut">
                    <div class="title">{{$i18n("grow_title_allweight")}}<a @click="closeAllDate">{{$i18n("btn_name_close")}}</a></div>
                    <div class="thead">
                        <span>{{$i18n("grow_weight")}}(IBS)</span>
                        <span>{{$i18n("grow_status")}}</span>
                        <span>{{$i18n("grow_recordtime")}}</span>
                      </div>
                    <div class="content_info">
                        <p v-for="weight_records in weightRecords">
                            <span>{{weight_records.weight}}</span>
                            <span>{{weight_records.status_text}}</span>
                            <span>{{weight_records.time}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="assess_con" v-show="isAssessCon" transition="fadeInOut">
            <p>{{$i18n("grow_what_title")}}</p>
            <span>{{$i18n("grow_what_desc_1")}}</span>
            <span style="text-align:center">{{$i18n("grow_what_desc_2")}}</span>
            <span>{{$i18n("grow_what_desc_3")}}</span>
            <a href="javascript:;" @click="closeAssessCon"></a>
        </div>

        <!-- 遮罩层 -->
        <paiband-mask v-ref:mask></paiband-mask>
    </div>
</template>

<script>
    import gaugeNameRing from 'components/gauge/namering';
    import gaugeHalfRing from 'components/gauge/halfring';
    import panel from "components/common/panel/index";
    import expert from "services/expert";
    import jsb from "services/jsb";
    import paibandAlert from 'components/alert';
    import db from 'dbs/hashmap';
    import line from "components/common/line/line";
    import paibandMask from 'components/mask';
    import config from 'src/config';
    import jutils from 'jutils';

    export default {
      	components: {panel, gaugeNameRing, gaugeHalfRing ,paibandAlert,line,paibandMask},
      	data(){
      		return{
                status_bg_info:require('assets/images/status_bg2.png'),//背景图片
                isShow:false,//内容提示是否显示
                isAct:false,
                warning_tips:{},//预警提示内容
                pabulum_tips:{},// 营养专家策略 提示内容
                pabulum_choice:[],//营养建议选择
                selected:"",//select第一个选项对应的数据
                recommend_food:[],//推荐食品
                forbidden_food:[],//禁止吃的食物
                stratips:"",//打开营养精
                heightRecordsLast:[],//身高记录最后一条数据
                heightRecordsText:"",//偏矮，标准，偏高
                weightRecordsLast:[],//体重记录最后一条数据
                weightRecordsText:"",//"重度消瘦","轻度消瘦","标准","偏重","肥胖"
                endHTime:"",//获取身高记录最后时间
                endWTime:"",//获取体重记录最后时间
                gender:"",//当前孩子性别
                age:"",//当前孩子年龄
                isWoman:false,
                isMan:true,
                pop_height_title:this.$i18n("grow_title_height"),
                pop_weight_title:this.$i18n("grow_title_weight"),
                pop_height_unit:"IN",
                pop_weight_unit:"IBS",
                heightRecords:[],
                weightRecords:[],
                isShowAllHeightData:false,//全部数据身高数据是否显示
                isShowAllWeightData:false,//全部数据体重数据是否显示
                sleepMark:false,//遮罩层是否显示
                isAssessCon:false,//评估内容层是否显示
                weightRecordsBMI:"",
                defaultheight:"100.00",
                defaultweight:"20.0",
                count:0,


      		}
      	},
        methods:{
            init(width, height) {
                const size = Math.round(width * 0.5);
                this.$refs.dataNameRing.update(size, size);
                const ml = size * 0.5;
                this.$el.querySelector('.status_con').style.width = size + 'px';
                this.$el.querySelector('.status_con').style.height = size + 'px';
                this.$el.querySelector('.status_con').style.marginLeft = '-' + ml + 'px';

                expert.getStrategy(this.updateStrategy, this.updateStrategyError);//获取孩子信息及专家策略信息
                expert.getHeightGrowing(this.endHTime,this.updateHeightGrowing, this.updateHeightGrowingError);
                //获取孩子身高7天数据
                expert.getWeightGrowing(this.endWTime,this.updateWeightGrowing, this.updateWeightGrowingError);
                //获取孩子体重7天数据
                expert.getHeightRecords(this.endHTime,this.updateHeightRecords, this.updateHeightRecordsError);
                expert.getWeightRecords(this.endWTime,this.updateWeightRecords, this.updateWeightRecordsError);//获取孩子身高体重半年天记录
                //初始化canvas
                setTimeout(() => {
                    this.$refs.dataNameRing.drawRing();
                }, 0);
                this.dbdate();//获取当前孩子的性别年龄

                this.isHeightWeight();
            },
            update(width, height) {
                const size = Math.round(width * 0.5);
                this.$refs.dataNameRing.update(size, size);
                const ml = size * 0.5;
                this.$el.querySelector('.status_con').style.width = size + 'px';
                this.$el.querySelector('.status_con').style.height = size + 'px';
                this.$el.querySelector('.status_con').style.marginLeft = '-' + ml + 'px';

                expert.getStrategy(this.updateStrategy, this.updateStrategyError);//获取孩子信息及专家策略信息
                expert.getHeightGrowing(this.endHTime,this.updateHeightGrowing, this.updateHeightGrowingError);
                //获取孩子身高7天数据
                expert.getWeightGrowing(this.endWTime,this.updateWeightGrowing, this.updateWeightGrowingError);
                //获取孩子体重7天数据
                expert.getHeightRecords(this.endHTime,this.updateHeightRecords, this.updateHeightRecordsError);
                expert.getWeightRecords(this.endWTime,this.updateWeightRecords, this.updateWeightRecordsError);//获取孩子身高体重半年天记录
                //初始化canvas
                setTimeout(() => {
                    this.$refs.dataNameRing.drawRing();
                }, 0);
                this.dbdate();//获取当前孩子的性别年龄
            },
            dbdate(){
                this.gender = db.get("gender");
                if(this.gender === 1){
                    this.isMan = true;
                    this.isWoman = false;
                }else{
                    this.isMan = false;
                    this.isWoman = true;
                }
                this.age = db.get("age");
            },
            showVersion(){
                //点击五次显示版本号
                this.count++;
                console.log(this.count);
                if(this.count >= 10){
                    this.$dispatch('showtip', "最新版本:"+config.version);
                    this.count = 0;
                }
            },
            tabInfo(e){
                let id = $(e.target).attr("id");
                if(id == 0){
                    $(e.target).removeClass('normal').addClass('act').siblings().removeClass('act').addClass('normal');
                    this.selected = this.pabulum_choice[0].content.split(/\(\d+\)/g).slice(1);
                    this.isAct = true;
                }else if(id == 1){
                    $(e.target).removeClass('normal').addClass('act').siblings().removeClass('act').addClass('normal');

                this.selected = this.pabulum_choice[1].content.split(/\(\d+\)/g).slice(1);
                }
            },
            updateStrategy(data){
                console.log("updateStrategy",data);
                if(data.http_code == 200){
                    this.warning_tips = data.data.tips.warning_tips;
                    this.pabulum_tips = data.data.tips.pabulum_tips;
                    this.motion_index = data.data.motion_index;
                    this.pabulum_choice = data.data.recommend.pabulum_choice[0];
                    //this.selected = this.pabulum_choice[0].content.split(/\(\d+\)/g).slice(1);

                    this.recommend_food = data.data.recommend.daily_cookbook.recommend_food;
                    this.forbidden_food = data.data.recommend.daily_cookbook.forbidden_food;
                    //是否显示警告
                    // console.log("warning_tips",this.warning_tips);
                    // if(this.warning_tips.tips && this.warning_tips.status == 1){
                    //     this.isShow = true;
                    // }else{
                    //     this.isShow = false;
                    // }
                }else{
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("expert_data_lose"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateStrategyError(error){
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("expert_data_lose"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            updateHeightGrowing(data){
                console.log("updateHeightGrowing",data);
                if(data.http_code == 200){
                    if(data.data.length == 0){
                        return;
                    }

                    //一天只取最后一条数据
                    // let datainfo = [];
                    // let timeinfo = [];
                    // for(var i = data.data.length-1; i>=0; i--){
                    //     if(timeinfo.indexOf(data.data[i].time)==-1){
                    //         timeinfo.push(data.data[i]['time']);
                    //         datainfo.unshift(data.data[i]);
                    //     }
                    // }
                    //身高增长曲线
                    const lablesHeightData = [];//计算lables
                    for(let i = 0; i < data.data.length; i++) {
                        if(i==0){
                            lablesHeightData.push(data.data[0]['time'].split("-")[2]+"/"+data.data[0]['time'].split("-")[1]);
                        }else if(i == data.data.length-1){
                            lablesHeightData.push(this.$i18n("grow_today"));
                        }else{
                            lablesHeightData.push(data.data[i]['time'].split("-")[2]);
                        }
                    }
                    lablesHeightData.unshift(null);//让lables第一个数值为空
                    const lineHeightData = [];//计算linedata
                    for(let i = 0; i < data.data.length; i++) {
                        lineHeightData.push(data.data[i]['height']/2.54);
                    }
                    lineHeightData.unshift(null);
                    const configheight = {
                        ctx: this.$refs.heightgrowingline.$el.querySelector('#lineChart'),
                        labels:lablesHeightData,//x轴坐标数据
                        data: lineHeightData,//line的对应x轴坐标
                        lineTension: 0.5,//line弯曲平滑程度
                        borderColor: "#8c3ffa",//边框颜色
                        pointBackgroundColor: "#8c3ffa",//point点bg颜色
                        min: 0,//y轴刻度最小值
                        max: Math.ceil(Math.max(...lineHeightData) * 0.01) * 100 || 500,//y轴刻度最大值
                        stepSize: (() => {
                            const max = Math.ceil(Math.max(...lineHeightData) * 0.01) * 100 || 500;
                            if(max >= 2000) {
                                return 1000;
                            }
                            return 20;
                        })(),//y轴刻度间隔
                        yCallBack: value => {
                            if(value === 0) {
                                return '';
                            }
                            return value;
                        }
                    };
                    this.$refs.heightgrowingline.drawLine(configheight);
                    //copyover
                }else{
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("grow_error_height_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateHeightGrowingError(error){
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("grow_error_weight_service"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            updateWeightGrowing(data){
                console.log("updateWeightGrowing",data);
                if(data.http_code == 200){
                    if(data.data.length == 0){
                        return;
                    }

                    //一天只取最后一条数据
                    // let datainfo = [];
                    // let timeinfo = [];
                    // for(var i = data.data.length-1; i>=0; i--){
                    //     if(timeinfo.indexOf(data.data[i].time)==-1){
                    //         timeinfo.push(data.data[i]['time']);
                    //         datainfo.unshift(data.data[i]);
                    //     }
                    // }
                    //体重增长曲线
                    const lablesWeightData = [];//计算lables
                    for(let i = 0; i < data.data.length; i++) {
                        if(i==0){
                            // 时间采用英试的格式 日/月/年
                            lablesWeightData.push(data.data[0]['time'].split("-")[2]+"/"+data.data[0]['time'].split("-")[1]);
                        }else if(i == data.data.length-1){
                            lablesWeightData.push(this.$i18n("grow_today"));
                        }else{
                            lablesWeightData.push(data.data[i]['time'].split("-")[2]);
                        }
                    }
                    lablesWeightData.unshift(null);//让lables第一个数值为空

                    const lineWeightData = [];//计算linedata
                        for(let i = 0; i < data.data.length; i++) {
                            lineWeightData.push(data.data[i]['weight']/0.454);
                        }
                    lineWeightData.unshift(null);
                    const configweight = {
                        ctx: this.$refs.weightgrowingline.$el.querySelector('#lineChart'),
                        labels:lablesWeightData,//x轴坐标数据
                        data: lineWeightData,//line的对应x轴坐标
                        lineTension: 0.5,//line弯曲平滑程度
                        borderColor: "#8c3ffa",//边框颜色
                        pointBackgroundColor: "#8c3ffa",//point点bg颜色
                        min: 0,//y轴刻度最小值
                        max: Math.ceil(Math.max(...lineWeightData) * 0.01) * 100 || 500,//y轴刻度最大值
                        stepSize: (() => {
                            const max = Math.ceil(Math.max(...lineWeightData) * 0.01) * 100 || 500;
                            if(max >= 2000) {
                              return 1000;
                            }
                            return 20;
                        })(),//y轴刻度间隔
                        yCallBack: value => {
                            if(value === 0) {
                                return '';
                            }
                            return value;
                        }
                    };
                    this.$refs.weightgrowingline.isShowTarget = false;
                    this.$refs.weightgrowingline.drawLine(configweight);
                    //copyover
                }else{
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n("grow_error_height_network"), 
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateWeightGrowingError(error){
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n("grow_error_weight_network"), 
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            iKnow(){
                this.isShow = false;
            },

            isHeightWeight(){
                let sta = this.$route.query.sta;
                console.log("params",this.$route.query.sta);
                if(sta == 1){
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("expert_set_height_weight"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }else if(sta == 2){
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("expert_two_month"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            update_height(){
                //点击更新调出select显示当前身高数据
                let default_values = [];
                if(this.defaultheight <= 10){
                    default_values.push('0' + this.defaultheight,'IN');
                }else{
                    default_values.push(this.defaultheight,'IN');
                }

                console.log("default_values",default_values);


                let values = [{from: 19, to: 79, step: 1}, ['IN']];
                jsb.showSelector(this.$i18n("setting_title_setheight"), values, default_values ,this.setHeightSuccessBack,this.setHeightCancelBack);//jsb调用select接口
            },
            setHeightSuccessBack(data){
                console.log("seHeightSuccessBack",data);
                //this.update();
                let value_info = data.values[0]*2.54;
                this.heightGrowingLast = Object.assign({}, this.heightGrowingLast, {height: value_info});
                console.log(this.heightGrowingLast.height);
                this.syncGrowHeight(this.heightGrowingLast.height || 0);
            },
            setHeightCancelBack(error){
                console.log(error);
            },
            update_weight(){
                console.log("defaultweight",this.defaultweight);
                //点击更新调出select显示当前身高数据
                let default_values = [];
                    let valuesDefault = null;
                    let valuesIs = this.defaultweight;
                    if(valuesIs < 10){
                        valuesDefault = ('0' + valuesIs);
                    }else{
                        valuesDefault = valuesIs;
                    }
                    default_values.push(valuesDefault,'IBS');
                    console.log("default_values_weight",default_values);

                let values = [ {from: 3, to: 221, step: 1}, ['IBS']];
                jsb.showSelector(this.$i18n("setting_title_setweight"),values,default_values,this.setWeightSuccessBack,this.setWeightCancelBack);//jsb调用select接口
            },
            setWeightSuccessBack(data){
                console.log("seWeightSuccessBack",data);
                //this.update();
                let value_info = data.values[0]*0.454;
                this.weightGrowingLast = Object.assign({}, this.weightGrowingLast, {weight: value_info});

                this.syncGrowWeight(this.weightGrowingLast.weight || 0);
            },
            setWeightCancelBack(error){
                console.log(error);
            },
            updateHeightRecords(data){
                console.log("updateHeightRecords",data);
                if(data.http_code == 200){
                    if(data.data.length == 0){
                        return;
                    }

                    //排序 按日期最新数据在最后
                    let dateInfo = jutils.mergeSortArray(data.data,function(a,b){
                        return (new Date(a.time)) - (new Date(b.time))
                    })

                    let harr = [this.$i18n("grow_level_height_lower"),this.$i18n("grow_level_height_standard"),this.$i18n("grow_level_height_higher")];

                    for(let i = 0; i<dateInfo.length; i++){
                        dateInfo[i].status_text =  harr[dateInfo.status];
                    dateInfo[i].height = Math.round(dateInfo[i].height/2.54).toFixed(0);
                    }
                    this.heightRecords = dateInfo;
                    let heightRecordsLength = dateInfo.length;
                    this.heightRecordsLast = dateInfo[heightRecordsLength-1];
                    this.defaultheight = this.heightRecordsLast.height;
                    let heightRecordsStatus = this.heightRecordsLast.status;
                    let heightRecordsTime = this.heightRecordsLast.time;
                    this.heightRecordsText =  harr[heightRecordsStatus];
                }else{
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("grow_error_heightrecords_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateHeightRecordsError(error){
                this.$dispatch('showalert', { 
                    alert_content: this.$i18n("grow_error_heightrecords_network"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            updateWeightRecords(data){
                console.log("updateWeightRecords",data);
                if(data.http_code == 200){
                    if(data.data.length == 0){
                        return;
                    }

                    //排序 按日期最新数据在最后
                    let dateInfo = jutils.mergeSortArray(data.data,function(a,b){
                        return (new Date(a.time)) - (new Date(b.time))
                    })

                    let harr = [this.$i18n("grow_level_weight_lower"),this.$i18n("grow_level_weight_lightlower"),this.$i18n("grow_level_weight_standard"),this.$i18n("grow_level_weight_lighthigher"),this.$i18n("grow_level_weight_higher")];

                    for(let i = 0; i<dateInfo.length; i++){
                        dateInfo[i].status_text =  harr[parseInt(dateInfo[i].status)+1];
                        dateInfo[i].weight = Math.round(dateInfo[i].weight/0.454).toFixed(0);
                    }

                    this.weightRecords = dateInfo;

                    let weightRecordsLength = dateInfo.length;
                    this.weightRecordsLast = dateInfo[weightRecordsLength-1];
                    this.defaultweight = this.weightRecordsLast.weight;
                    console.log("weightRecordsLast",this.weightRecordsLast);
                    this.weightRecordsBMI = this.weightRecordsLast.bmi;
                    console.log("this.weightRecordsBMI",this.weightRecordsBMI);
                    let weightRecordsStatus = this.weightRecordsLast.status;
                    let weightRecordsTime = this.weightRecordsLast.time;
                    this.weightRecordsText =  harr[parseInt(weightRecordsStatus)+1];
                    //根据体重状态动态显示背景图片
                    let url_info = [require('assets/images/status_bg1.png'),require('assets/images/status_bg2.png'),require('assets/images/status_bg3.png'),require('assets/images/status_bg2.png'),require('assets/images/status_bg1.png')];
                    this.status_bg_info = url_info[parseInt(weightRecordsStatus)+1];
                    let precent = parseInt(weightRecordsStatus)+1;
                    this.$refs.dataNameRing.drawRing(precent,1,[this.$i18n("grow_level_weight_lower"),this.$i18n("grow_level_weight_lightlower"),this.$i18n("grow_level_weight_standard"),this.$i18n("grow_level_weight_lighthigher"),this.$i18n("grow_level_weight_higher")]);//圆环
                    // let harr = ["重度消瘦","轻度消瘦","标准","偏重","肥胖"];
                }else{
                    this.$dispatch('showalert', {
                        alert_content: this.$i18n("grow_error_weightrecords_service"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
            },
            updateWeightRecordsError(error){
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("grow_error_weightrecords_network"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            },
            syncGrowHeight(height) {
                // if(!db.get('isSync')) {
                const cid = db.get('cid');
                const deviceid = db.get('device_id');
                jsb.syncWriteHeight(height, cid,
                    () => {
                        setTimeout(() => {
                            this.update();
                        }, 1000);
                    },

                    () => {
                        setTimeout(() => {
                            this.heightRecordsLast = Object.assign({}, this.heightRecordsLast, {height: this.defaultheight});
                        }, 500);
                });
            },
            syncGrowWeight(weight) {
                const cid = db.get('cid');
                const deviceid = db.get('device_id');
                jsb.syncWriteWeight(weight, cid,
                    () => {
                        setTimeout(() => {
                            this.update();
                        }, 1000);
                    },

                    () => {
                        setTimeout(() => {
                            this.weightRecordsLast = Object.assign({}, this.weightRecordsLast, {weight: this.defaultweight});
                    }, 500);
                });
            },
            allHeightDataPop(){
                this.$refs.mask.showMark(true, 1, this.closeMask);
                this.isShowAllHeightData = true;
            },
            allWeightDataPop(){
                this.$refs.mask.showMark(true, 1, this.closeMask);
                this.isShowAllWeightData = true;
            },
            closeAllDate(){
                this.isShowAllHeightData = false;
                this.isShowAllWeightData = false;
                this.$refs.mask.showMark(false);
            },
            assessInfo(){
                this.$refs.mask.showMark(true);
                this.isAssessCon = true;
            },
            closeAssessCon(){
                this.$refs.mask.showMark(false);
                this.isAssessCon = false;
            },
            closeMask(){
                this.isShowAllHeightData = false;
                this.isShowAllWeightData = false;
                this.$refs.mask.showMark(false);
            },
        },
        computed:{
            isOne(){
                if(this.pabulum_choice.length == 1){
                    return true;
                }
            },
            isTwo(){
                if(this.pabulum_choice.length == 2){
                    return true;
                };
            },
            isRedH(){
                if(this.heightRecordsText == this.$i18n("grow_level_height_lower") || this.heightRecordsText == this.$i18n("grow_level_height_higher")){
                    return true;
                }
            },
            isGreenH(){
                if(this.heightRecordsText == this.$i18n("grow_level_height_standard")){
                    return true;
                }
            },
            isRedW(){
                if(this.weightRecordsText == this.$i18n("grow_level_weight_lower") || this.weightRecordsText == this.$i18n("grow_level_weight_higher")){
                    return true;
                }
            },
            isYellowW(){
                if(this.weightRecordsText == this.$i18n("grow_level_weight_lightlower") || this.weightRecordsText == this.$i18n("grow_level_weight_lighthigher")){
                    return true;
                }
            },
            isGreenW(){
                if(this.weightRecordsText == this.$i18n("grow_level_weight_standard")){
                    return true;
                }
            },
        },
    };
</script>

<style scoped>
    /*红色 #ef5361  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#959595*/
    /*公用*/
    body{ color:#313131;}
    .expert{ padding-bottom:.8rem;}
    .expert .expert_status{ position: relative;}
    .expert .expert_status .status_bg img{ width:100%; display: block;}
    .expert .expert_status .status_con{ position:absolute; left:50%; margin-left:-80px; top:10%; width:160px; text-align: center; height:160px; }
    .expert .expert_status .status_con .status_text{position:absolute; left:0; top:40%; width:100%;}
    .expert .expert_status .status_con .status_text p{text-align: center; display:block; color:#fff;}
    .expert .expert_status .status_con .status_text p:nth-child(1){font-size: .7rem;}
    .expert .expert_status .status_con .status_text p:nth-child(2){font-size: 1rem; font-family:AkzidenzGrotesk;}
    .expert .expert_status .age{ font-size: .6rem; position:absolute; top:10%; right:5%;  border-radius: 15px; color:#fff; padding:0.5% 2% 0.5% 8%; }
    .expert .expert_status .woman{ background:rgba(255,255,255,0.3) url(~assets/images/woman_icon.png) no-repeat scroll 15% center; background-size: 20%;}
    .expert .expert_status .man{ background:rgba(255,255,255,0.3) url(~assets/images/man_icon.png) no-repeat scroll 15% center; background-size: 20%;}
    .expert .status_desc{ margin:-15% auto 0 auto; position:relative; z-index: 2;}
    .expert .status_desc .expert_link_go{ border-top:none; overflow:hidden; }
    .expert .status_desc .expert_link_go a{text-align: left; padding:4% 6%;}
    .expert .status_desc .expert_link_go img{float:right; top:.5rem; margin-right:0rem;}
    .expert .status_desc p{ overflow:hidden; position:relative; padding:5% 0; margin-bottom:1rem;}
    .expert .status_desc p a{ display:inline-block; font-size: .8rem; text-align: left; float:left; color:#959595;}
    .expert .status_desc p a.height{padding-left:5rem; width:50%; background:url(~assets/images/ic_shengao.png) no-repeat scroll .9rem center; background-size:3rem;}
    .expert .status_desc p a.weight{background:url(~assets/images/ic_tizhong.png) no-repeat scroll .9rem center; background-size:3rem;}
    .expert .status_desc p a.height span{font-size: 2.2rem; font-family: AkzidenzGrotesk; color:#000;}
    .expert .status_desc p a.height i{font-size: 1.1rem; color:#000; padding-left:2px; font-family: AkzidenzGrotesk;}
    .expert .status_desc p a.height i.status_info{font-size: .9rem;}
    .expert .status_desc p a.height b{display:block; position:relative; top:0px; font-size: .7rem;}
    .expert .status_desc p a.height b label{border-radius:2px; text-align: center;padding:1px 2px; margin-left:5px;}
    .expert .status_desc p a.height  .normal{background:#ddfcf5;  color:#40d0ae; font-size: .5rem; }
    .expert .status_desc p a.height  .unnormal{background:#fcdde0;  color:#ef5361; font-size: .5rem; }
    .expert .status_desc p a.height  i.colorRed{background:#fcdde0; position:relative; bottom:.2rem; font-size: .8rem;  color:#ef5361;}
    .expert .status_desc p a.height  i.colorGreen{background:#ddfcf5; position:relative; bottom:.2rem; font-size: .8rem; color:#40d0ae;}
    .expert .status_desc p a.height  i.colorYellow{background:#fae9b3; position:relative; bottom:.2rem; font-size: .8rem;  color:#e1ad0e;}

    .expert .status_desc p a.update{background:url(~assets/images/update_icon.png) no-repeat scroll top center; background-size: 22px; width:10%; padding-top:8%; margin-top:3.5%; position:relative; right:-6%;}
    .expert .status_desc p .line_info{width:1px; height:40%; background:#e1e1e1; position:absolute; right:23%; top:32%;}
    .expert .tip_info{background:#fff; margin-top:1rem;}
    .expert .tip_info p{ font-size: 1rem; color:#313131; padding:10px 10px 0px 35px;}
    .expert .tip_info a{ display:block; text-align: right; font-size: 1rem; color:#ef5361; padding:5px 20px 5px 0;}
    .expert div.warn{ background:#fff url(~assets/images/tip_bg_info.png) no-repeat scroll left top; background-size: 25%;}
    /*营养专家策略*/
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
    .control_intake .con .recomm_list .product_star span{ display:inline-block; font-size: .75rem; color:#ffd700;}
    .control_intake .con .recomm_list .product_star span.text{ color:#959595;}
    .control_intake .con .recomm_list .product_desc{border-top:1px dashed #e1e1e1; margin:4% 4%; padding-top:4%; font-size: .75rem; color:#959595;}
    .control_intake .con .recomm_list .product_desc span{ color:#959595; font-size: .6rem; display:block; overflow:hidden;}
    .control_intake .con .recomm_list .product_desc span b{float:right;}
    .control_intake .foot_btn{ margin-top:6%;}
    .pop_wrap{ overflow:hidden;}
    .pop_height{ margin-top:1rem;}
    .pop_weight{}

    /*身高体重数据*/
    .growrecord{position:fixed; left:0; top:3rem; z-index: 10; width:100%;}
    .panel{ background: #fff; margin:4%; border-radius: 5px; box-shadow: 0 0 5px #e2e2e2; }
    .panel .title{ padding:2%; color:#313131; font-size: 1rem; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom:1px solid #e1e1e1; background:linear-gradient(to bottom, #fff 0%,#f6f6f6 100%); overflow:hidden;}
    .panel .title a{display:inline-block; float:right; font-size: .9rem; color:#8c3ffa; padding:3px 5px 3px 23px;}
    .item_icon{text-align:center;}
    .item_icon span{display: inline-block; width:8px; height:8px; margin:0 2px; background: #fff; border-radius: 50%;}
    .panel .thead{ border-bottom:1px solid #e1e1e1; box-shadow: 0 4px 10px #f5f5f5; padding:2%; overflow:hidden;}
    .panel .thead span{display:inline-block; color:#959595; font-size: .9rem;}
    .panel .thead span:nth-child(2){margin:0 auto; text-align: center; width:4rem; position: absolute; left:50%; margin-left:-2rem;}
    .panel .thead span:nth-child(3){float:right;}
    .panel .content_info{height:20rem; overflow:scroll; padding:0 4%;}
    .panel .content_info p{border-bottom:1px solid #e1e1e1; padding:4% 0; position:relative;}
    .panel .content_info p:nth-last-child(1){border-bottom:none;}
    .panel .content_info p span{display:inline-block; color:#646464; font-size: .9rem;}
    .panel .content_info p span:nth-child(2){margin:0 auto; font-size: .8rem; text-align: center; width:8rem; position: absolute; left:50%; margin-left:-5rem;}
    .panel .content_info p span:nth-child(3){float:right;}
    .expert_mark{position:fixed; left:0; top:0; z-index: 9; width:100%; height:100%; background:rgba(0,0,0,0.5);}

</style>




