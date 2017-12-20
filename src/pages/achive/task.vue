<template>
    <div class="rank">
        <div class="achive_status">
          	<div class="status_bg">
          		<img src="~assets/images/tesk_bg.png" alt="">
                <div class="health-header header-bg">
                    <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
                    <rank-detail class="rank_detail" v-ref:star-detail v-show="inner_distance" @transmit-rankdetail = 'getRankdetail'>
                    </rank-detail>
                </div>
          	</div>
        </div>
    	<div class="box_wrapper rank_desc">
    		<p>
                <span>
                    <b v-if="check_slef_data">{{self_rank}}</b><b v-else>1</b><i>{{self_name}}</i>
                </span>
                <span>
                    <b class="star_b"><img src="~assets/images/icon_12_07@3x.png" alt=""></b><i v-if="check_slef_data">{{self_stars}}</i>
                    <i v-else>0</i>
                </span>
            </p>
    		<p v-if="check_overstep">{{$i18n("task_overtop_l")}}<span>{{overstep}}</span>{{$i18n("task_overtop_r")}}</p>
            <p v-else>{{$i18n("task_overtop_default")}}</p>
    	</div>
    	<div class="rank_list">
            <div class="progress_info" v-for="lon_list in longTermList" :class="{'progress_finish':lon_list.status == 3,'progress_get':lon_list.status == 2, 'progress_percent':lon_list.status == 1}" >
                <div class="progress_slide_left">
                    <p>{{lon_list.title}}</p>
                    <span>{{lon_list.content}}</span>
                </div>
                <div class="progress_slide_right">
                    <span @click.self="getAchive" data-achieveid="{{lon_list.achieve_id}}"  data-section="{{lon_list.section}}" data-status = "{{lon_list.status}}">
                        <b @click.self="getAchive" data-achieveid="{{lon_list.achieve_id}}"  data-section="{{lon_list.section}}" data-status = "{{lon_list.status}}">{{getStatusText(lon_list.status)}}</b>
                        <canvas class="canvas" width="{{ progress_width }}" height="{{ progress_height }}" data-cur="{{ lon_list.current_value }}" data-req="{{ lon_list.require_value }}"></canvas>
                    </span>
                    <p>{{lon_list.current_value || 0}}/{{lon_list.require_value || 0}}</p>
                </div>
            </div>
    	</div>
    </div>
</template>

<script>
  import panel from "components/common/panel/index";
  import gaugeRing from 'components/gauge/starring';
  import rankDetail from 'components/achive/rankdetail';
  import service from 'services/achive';


  export default {
  	components: {panel, gaugeRing, rankDetail },
    methods: {
        init(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';
            this.$refs.starDetail.$el.style.width = size + 'px';
            this.$refs.starDetail.$el.style.height = size + 'px';
            this.$refs.starDetail.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.starDetail.$el.style.marginTop = '-' + (10 + ml) + 'px';
            this.$refs.dataRing.drawRing(0);

            service.getRankData(1,this.updateRankData , this.updatedataError);
            //星级还差多少星星
            this.$refs.starDetail.getData();

            setTimeout(()=>{
                service.getListData("forever",this.updateAchiveList,this.updateAchiveListError);
            },100);
        },

        update(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';
            this.$refs.starDetail.$el.style.width = size + 'px';
            this.$refs.starDetail.$el.style.height = size + 'px';
            this.$refs.starDetail.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.starDetail.$el.style.marginTop = '-' + (10 + ml) + 'px';

            service.getRankData(1,this.updateRankData , this.updatedataError);
            this.$refs.starDetail.getData();

            setTimeout(()=>{
                service.getListData("forever",this.updateAchiveList,this.updateAchiveListError);
            },100);
        },

        updateAchiveList(data){
            console.log("updateAchiveList",data);
            if(data.http_code == 200){
                this.longTermList = data.data.long_term_list;
                //圆环精度条
                setTimeout(() => {
                    this.progress_width = $(".progress_percent .progress_slide_right span").width() * 4;
                    this.progress_height = $(".progress_percent .progress_slide_right span").height() * 4;

                    setTimeout(()=>{
                        const circles = this.$el.querySelectorAll('.progress_info.progress_percent canvas');

                        for(let i = 0; i < circles.length; i++){
                            const percent = circles[i].dataset.cur / circles[i].dataset.req;
                            this.circle(circles[i], percent || 0);
                        }

                    },0);
                }, 0);
            }else{
                this.$dispatch('showalert', {
                    alert_content: this.$i18n("task_error_task_service"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            }
        },

        updateAchiveListError(error){
            console.log("error",error);
            this.$dispatch('showalert', {
                alert_content: this.$i18n("task_error_task_network"),
                btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
            });
        },

        getAchive(e){
            const status =  $(e.target).attr("data-status");
            if(status == 1){
                this.$dispatch("showtip",this.$i18n("task_tip_collection_process"))
            }else if(status == 2){
                const idnum =  $(e.target).attr("data-achieveid");
                const sectionlevel =  $(e.target).attr("data-section");
                service.getAchiveLongTime(idnum,sectionlevel,this.getAchiveLongTimeInfo, this.getAchiveLongTimeError);
            }else if(status == 3){
                this.$dispatch("showtip",this.$i18n("task_tip_collection_received"))
            }
        },

        getAchiveLongTimeInfo(data) {
            if(data.http_code == 200){
                this.$dispatch("showtip",this.$i18n("task_tip_collection_success"));
                this.update();
            }
        },

        getAchiveLongTimeError(error){
            this.$dispatch("showtip",this.$i18n("task_tip_collection_fail"))
        },

        getRankdetail(allstars,completed){
            this.completerate = completed;
            this.completerate = this.completerate >= 1?0:this.completerate;
            this.$refs.dataRing.drawRing(this.completerate);
        },

        circle(canvas,percent){
            const cxt=canvas.getContext("2d");
            const progress_width = canvas.width;
            const progress_height = canvas.height;
            //cxt.scale(4,4);
            cxt.beginPath();

            //先画一个圆
            cxt.moveTo(progress_width, progress_height/2);
            cxt.arc(progress_width/2,progress_height/2, progress_width/2 - 4, 0, Math.PI*2,false);
            //cxt.fillStyle="#f5f5f5";
            //cxt.fill();
            cxt.lineWidth = 8;
            cxt.strokeStyle="#d7d7d7";
            cxt.stroke();
            cxt.closePath();

            //生成扇形
            cxt.beginPath();
            cxt.moveTo(progress_width/2, 0);
            if(percent==1){
                cxt.arc(progress_width/2,progress_height/2,progress_width/2 - 4,-Math.PI/2,Math.PI*2,false);
            }else if(percent==0){
                cxt.arc(progress_width/2,progress_height/2,progress_width/2 - 4,-Math.PI/2,-Math.PI/2,false);
            }else{
                cxt.arc(progress_width/2,progress_height/2,progress_width/2 - 4,-Math.PI/2, Math.PI*2*percent - Math.PI/2,false);
            }
            cxt.lineWidth = 8;
            cxt.lineCap = "round";
            cxt.strokeStyle="#8c3ffa";
            cxt.stroke();
        },

        updateRankData(data){
            console.log("updateRankData",data)
            if (data.http_code == 200) {
                this.self_rank = data.data.self.rank || 0;
                this.self_stars = data.data.self.stars || 0;
                this.self_name = data.data.self.child_name || null;
                this.overstep = data.data.overstep || 0;
                //将每次请求的数据放入列表数据中
                // this.rank_list = this.rank_list.concat(data.data.ranks);
                // this.loadStatus = true; //防止分页加载时多次发送请求，只有为true才能再次请求。
                //如果数据为0，显示添加好友提示
                if (this.rank_list.length == 0) {
                    this.check_data = false;
                }
            }else{
                 this.$dispatch('showalert', {
                    alert_content: this.$i18n("task_error_star_service"),
                    btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                });
            }
        },

        updatedataError(error){
            this.$dispatch('showalert', {
                alert_content: this.$i18n("task_error_star_network"),
                btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
            });
            //数据获取失败时，显示一些提示
            // this.loadStatus = true;
            this.check_slef_data = false;
            this.check_overstep = false;
        },
        getStatusText(status){
            if(status == 1){
                return this.$i18n("task_state_process")
            }else if(status == 2){
                return this.$i18n("task_state_achive")
            }else if(status == 3){
                return ""
            }
        },
    },

    data(){
        return{
            self_rank:0,   //自身排名
            self_name:null,//孩子的昵称
            overstep:0,    //超过全国其他人百分比
            self_stars:0,  //自身所获得的星数
            rank_list:[],  //排行榜数据
            completerate:0, //完成率
            check_data:true, //检验是否获得排名数据
            check_slef_data:true, //检测是否获得自身数据
            check_overstep:true, //检测是否获得全国排名数据
            inner_distance:true, //检测孩子是否超出距离
            // loadStatus:true, //检测数据是否返回，防止连续触发请求
            // moveSpeed:0,     //touchmove结束后的惯性缓冲速度
            // oldOffsetTop:0,    //记录上一个offsetTop的值
            // nowOffsetTop:0,    //当前offsetTop的值
            // timer:null,     //定时器
            progress_width:"",
            progress_height:"",
            longTermList:[],
            headerStyle: '',
        }
    },
};
</script>

<style scoped>
    /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
    /*公用*/
    body{ color:#313131;}
    .rank{}
    .achive_status{ position: relative;}
    .achive_status .status_bg img{ width:100%; display: block;}
    .achive_status .status_con{ position:absolute; left:25%; top:10%; width:50%; height: 60%; }
    .achive_status .data-ring { position: absolute; top: 50%; left: 50%; margin-top: -100px; margin-left: -80px; }
    .achive_status .health-header p { position: absolute; width: 100%; height: 2rem; top: 50%; text-align: center; color: rgba(255, 255, 255, 0.8); }
    .achive_status .health-header .rank_detail{position: absolute;top: 50%; left: 50%; margin-top: -92px; margin-left: -80px;width: 160px;height: 160px;}
    .achive_status .health-header .data { font-size: 1.5rem; color: #FFF; margin-top: -2.8rem; }
    .achive_status .health-header .tip { font-size: .8rem; margin-top:-0.6rem;}
    .rank_desc{ margin:-15% auto 0 auto; padding:0 4%; box-sizing:border-box; position:relative; z-index: 2;}
    .rank_desc p{ border-bottom:1px solid #e1e1e1; overflow:hidden; padding:10px 0;}
    .rank_desc p:nth-last-child(1){border-bottom:none;}
    .rank_desc p span{ display:inline-block;}
    .rank_desc p span:nth-child(1) b{ font-family: AkzidenzGrotesk; font-size: 1.2rem; color:#646464; padding:0 15px 0 10px; position:relative; top:3px;}
    .rank_desc p span:nth-child(1) i{color:#646464; position:relative; top:1.5px;}
    .rank_desc p span:nth-child(2){display:inline-block; float:right;}
    .rank_desc p span .star_b{color:#ffd700; position:relative; bottom:-2px;margin-right: 3px;}
    .rank_desc p span .star_b img{width:1.2rem;}
    .rank_desc p span:nth-child(2) i{font-size: 1.4rem; color:#646464; font-family:AkzidenzGrotesk; }
    .rank_desc p:nth-child(2){text-align: center; color:#b5b5b5; font-size: .8rem;}
    .rank_desc p:nth-child(2) span{color:#8c3ffa;}

    .rank_list{padding:4% 4% 0% 4%; margin-top:1rem; background:linear-gradient(to bottom, #e2e2e2 0%,#F5F5F5 100%);}
    .progress_info{background: #fff; border-radius:5px; padding:6% 4%; margin-bottom:1rem; overflow:hidden;}
    .progress_info .progress_slide_left{width:70%;float:left;}
    .progress_info .progress_slide_left p{font-size: 0.9rem; color:#8c3ffa;}
    .progress_info .progress_slide_left span{display:block; color:#646464; font-size: .6rem; padding-top:5px; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden;}

    .progress_info .progress_slide_right{width:30%;float:right;}
    .progress_info .progress_slide_right span{display:block; width:3rem; height:3rem; text-align: center; line-height: 3rem; font-size: .8rem; color:#646464; border-radius: 50%; margin:0 auto; position:relative; background: #f5f5f5;}
    .progress_info .progress_slide_right span canvas{position:absolute; left:0; top:0; z-index: 1; zoom:0.25;}
    .progress_info .progress_slide_right span b{position:relative; z-index: 2; font-size: .5rem;}
    .progress_info .progress_slide_right p{text-align: center; font-size: .7rem; color:#8c3ffa; padding-top:.5rem;}

    /*已完成*/
    .progress_finish .progress_slide_left p{color:#646464;}
    .progress_finish .progress_slide_right p{color:#646464;}
    .progress_finish .progress_slide_right span{background:url(~assets/images/img_band_complete@3x.png) no-repeat; background-size: 100%; border:2px solid #d7d7d7; }
    .progress_finish .progress_slide_right span canvas,
    .progress_finish .progress_slide_right span b{display:none;}

    /*带领取*/
    .progress_get .progress_slide_right span canvas{display:none;}
    .progress_get .progress_slide_right span b{color:#fff; font-size: .8rem; bottom:15%;}
    .progress_get .progress_slide_right span{border-color:#8c3ffa; background:#8c3ffa url(~assets/images/icon_12_07@3x.png) no-repeat scroll center 70%; background-size:1.2rem;}
    .progress_get .progress_slide_right span{border:0.4rem solid #fff8cd;}
    .progress_get .progress_slide_right span:after{
        content: "";
        position:absolute;
        left:-0.7rem;
        top:-0.7rem;
        width:3.7rem;
        height:3.7rem;
        border:0.4rem solid rgba(255,248,205,0.5);
        border-radius:50%;
    }
</style>
