<template>
    <div class="expert">
      <!-- 数据 -->
        <div class="box_wrapper status_desc">
            <p>
                <a href="javascript:;" class="height">
                <span>{{heightGrowingLast.height||0}}</span><i>CM</i>
                <b>身高<label class="normal">{{heightGrowingText}}</label></b>
                </a>
                <a href="javascript:;" class="height">
                <span>{{weightGrowingLast.weight||0}}</span><i>KG</i>
                <b>体重<label class="unnormal">{{weightGrowingText}}</label></b>
                </a>
                <a href="javascript:;" class="update" v-link="{name:'setting'}">
                更新
                </a>
                <span href="javascript" class="line_info"></span>
            </p>
        </div>
        <!-- 身高成长曲线 -->
        <div class="pop_height">
            <panel :paneltitle="pop_height_title" :panelunit="pop_height_unit">
            <line v-ref:heightgrowingline></line>
            <div class="link_go"><a href="javascript:;" v-link="{name:'expert-growrecord'}">全部身高数据<img src="~assets/images/select_bg.png" alt=""></a></div>
            </panel>
        </div>
        <!-- 体重成长曲线 -->
        <div class="pop_weight">
            <panel :paneltitle="pop_weight_title" :panelunit="pop_weight_unit">
            <line v-ref:weightgrowingline></line>
            <div class="link_go"><a href="javascript:;" v-link="{name:'expert-growrecord'}">全部体重数据<img src="~assets/images/select_bg.png" alt=""></a></div>
            </panel>
        </div>
    </div>
</template>

<script>
import panel from "components/common/panel/index";
import line from "components/common/line/line";
import expert from "services/expert";
export default {
    components: {panel,line},
    data(){
        return{
            pop_height_title:"身高成长曲线",
            pop_weight_title:"体重成长曲线",
            pop_height_unit:"单位:CM",
            pop_weight_unit:"单位:KG",
            heightGrowingLast:[],//身高记录最后一条数据
            heightGrowingText:"",//偏矮，标准，偏高
            weightGrowingLast:[],//体重记录最后一条数据
            weightGrowingText:"",//重度消瘦，轻度消瘦，正常，超重，肥胖
            heightGrowingEndTime:"",//获取身高记录最后时间
            weightGrowingEndTime:"",//获取身高记录最后时间
        }
    },
    methods:{
        init(width,height){
            expert.getHeightGrowing(this.endHTime,this.updateHeightGrowing, this.updateHeightGrowingError);
            expert.getWeightGrowing(this.endWTime,this.updateWeightGrowing, this.updateWeightGrowingError);
        },
        update() {
            expert.getHeightGrowing(this.endHTime,this.updateHeightGrowing, this.updateHeightGrowingError);
            expert.getWeightGrowing(this.endWTime,this.updateWeightGrowing, this.updateWeightGrowingError);
        },
        updateHeightGrowing(data){
            if(data.data.length > 0){
                let heightGrowingLength = data.data.length;
                this.heightGrowingLast = data.data[heightGrowingLength-1];
                let heightGrowingStatus = this.heightGrowingLast.status;
                let heightGrowingTime = this.heightGrowingLast.time;
                let harr = ["偏矮","标准","偏高"];
                this.heightGrowingText =  harr[heightGrowingStatus];
                //身高增长曲线
                const lablesHeightData = [];//计算lables
                for(let i = 0; i < data.data.length; i++) {
                if(i==0){
                  lablesHeightData.push(data.data[0]['time'].split("-")[1]+"月"+data.data[0]['time'].split("-")[2]);
                }else if(i == data.data.length-1){
                  lablesHeightData.push("今日");
                }else{
                lablesHeightData.push(data.data[i]['time'].split("-")[2]);
                }
            }
            lablesHeightData.unshift(null);//让lables第一个数值为空

            const lineHeightData = [];//计算linedata
            for(let i = 0; i < data.data.length; i++) {
                lineHeightData.push(data.data[i]['height']);
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
            this.$refs.heightgrowingline.isShowTarget = false;
            this.$refs.heightgrowingline.drawLine(configheight);
            //copyover
            }else{
                this.$dispatch("showtip","身高数据获取失败");
            }
        },
        updateHeightGrowingError(error){
            this.$dispatch("showtip",error);
        },
        updateWeightGrowing(data){
            if(data.data.length > 0){
              let weightGrowingLength = data.data.length;
              this.weightGrowingLast = data.data[weightGrowingLength-1];
              let weightGrowingStatus = this.weightGrowingLast.status;
              let weightGrowingTime = this.weightGrowingLast.time;
              let harr = ["重度消瘦","轻度消瘦","标准","偏重","肥胖"];
              this.weightGrowingText =  harr[parseInt(weightGrowingStatus)+1];

              //体重增长曲线
              const lablesWeightData = [];//计算lables
              for(let i = 0; i < data.data.length; i++) {
                if(i==0){
                  lablesWeightData.push(data.data[0]['time'].split("-")[1]+"月"+data.data[0]['time'].split("-")[2]);
                }else if(i == data.data.length-1){
                  lablesWeightData.push("今日");
                }else{
                lablesWeightData.push(data.data[i]['time'].split("-")[2]);
                }
              }
              lablesWeightData.unshift(null);//让lables第一个数值为空

              const lineWeightData = [];//计算linedata
                for(let i = 0; i < data.data.length; i++) {
                  lineWeightData.push(data.data[i]['weight']);
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
              this.$dispatch("showtip","体重数据获取失败");
            }
        },
        updateWeightGrowingError(error){
            this.$dispatch("showtip",error);
        },
    },
};
</script>

<style scoped>
/*红色 #ef5361  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
/*公用*/

body{ color:#313131;}

.expert{}
.expert .status_desc{ margin:4% auto; position:relative; z-index: 2;}
.expert .status_desc p{ overflow:hidden; position:relative; padding:5% 0;}
.expert .status_desc p a{ display:inline-block; font-size: .8rem; width:33%; text-align: center; float:left; color:#959595;}
.expert .status_desc p a.height span{font-size: 2.2rem; font-family: AkzidenzGrotesk; color:#000;}
.expert .status_desc p a.height i{font-size: 1.1rem; color:#000; padding-left:2px; font-family: AkzidenzGrotesk;}
.expert .status_desc p a.height b{display:block; position:relative; top:0px;}
.expert .status_desc p a.height b label{border-radius:2px; text-align: center;padding:1px 2px; margin-left:5px;}
.expert .status_desc p a.height b .normal{background:#ddfcf5;  color:#40d0ae; font-size: .5rem; }
.expert .status_desc p a.height b .unnormal{background:#fcdde0;  color:#ef5361; font-size: .5rem; }
.expert .status_desc p a.update{background:url(~assets/images/update_icon.png) no-repeat scroll top center; background-size: 22px; padding-top:8%; margin-top:3.5%; position:relative; right:-4%;}
.expert .status_desc p .line_info{width:1px; height:40%; background:#e1e1e1; position:absolute; right:26%; top:32%;}
.pop_height{padding:0 4%;}
.pop_weight{padding:4% 4%;}
</style>
