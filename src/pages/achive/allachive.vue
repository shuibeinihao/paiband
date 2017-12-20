<template>
    <div class="allachive">
      <div class="achive_status">
      	<div class="status_bg">
      		<img src="~assets/images/status_bg4.png" alt="">
            <div class="health-header header-bg">
                <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
                <rank-detail class="rank_detail" v-ref:star-detail v-show="inner_distance"  @transmit-rankdetail = 'getRankdetail'></rank-detail>
                <div v-if="!inner_distance"> 
                   <p class="data">无数据</p>
                  <p class="tip">孩子超出距离</p>
                </div>
            </div>
      	</div>
      	<span class="age man">单位:★</span>
      </div>
    	<div class="box_wrapper status_desc">
    		<p>
    			<a href="javascript:;" class="height">
    				<span>{{today_stars}}</span><i>/100</i>
            <b>今日获得</b>
    			</a>
    			<a href="javascript:;" class="height">
    				<span>{{totalstar}}</span>
            <b>总计获得</b>
    			</a>
    		</p>
    	</div>
    	<div class="today_achive">
    		<panel :paneltitle="paneltitle">
    			<ul class="achive_info">
            <li v-for="item in achive_list "  :class="{'finish':item.status == 3,'status_one':item.status==1,'status_two':item.status==2}" >
              <span>{{item.current_value}}/{{item.require_value}}</span>
              <span>
                <b>{{item.title}} </b>
                <i>{{item.content}}</i>
              </span>
              <span @click="achiveStar(item.achieve_id,item.section)"><i v-if='item.status == 3'>已达成</i></span>
            </li>
          </ul>
    		</panel>
    	</div>
    </div>
</template>

<script>
  import panel from "components/common/panel/index";
  import gaugeRing from 'components/gauge/starring';
  import rankDetail from "components/achive/rankdetail";
  import service from 'services/achive';
  import db from 'dbs/hashmap';
  
  export default {
  	components: {panel, gaugeRing, rankDetail},
    methods: {
        init(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';

            this.$refs.starDetail.getData();
            service.getListData( 'forever',this.updateListData , this.updateError );
            this.initTodayStars();
        },

        update(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';

            this.$refs.starDetail.getData();
            service.getListData( 'forever', this.updateListData , this.updateError );
            this.initTodayStars();
        },

        getRankdetail(allstars,completed){
            this.totalstar = allstars;
            this.completerate = completed;
            this.completerate = this.completerate >= 1?0:this.completerate;
            this.$refs.dataRing.drawRing(this.completerate);
        },

        updateListData(data) {
            console.log(data);         
            //判断数据状态返回200时请求的为有效数据
            if (data.http_code == 200) {
              this.achive_list = data.data.long_term_list;
              for (var i = 0; i < this.achive_list.length; i++) {
                //数据大于1000则取k值
                this.achive_list[i].current_value = this.achive_list[i].current_value>999?parseInt(this.achive_list[i].current_value/1000)+'k':this.achive_list[i].current_value;
                this.achive_list[i].require_value = this.achive_list[i].require_value>999?parseInt(this.achive_list[i].require_value/1000)+'k':this.achive_list[i].require_value;
              }
            }
        },

        updateError(error){
          console.log('updataListData',error);
        },

        achiveStar(num,section){
            //点击完成按钮，提交数据，将数据渲染
            service.getAchiveLongTime(num,section,this.achiveStarSuccess , this.achiveStarError);
        },

        achiveStarSuccess(data){
          console.log(data)
            this.initTodayStars();
            //判断数据状态返回200时请求的为有效数据
            if(data.http_code == 200){
              //重新发送ajax渲染数据
              this.$refs.starDetail.getData();
              service.getListData( 'forever',this.updateListData , this.updateError );
              this.today_stars += data.data.get_stars;
              db.set('todaystars',this.today_stars);
            };
        },

        achiveStarError(error){
            console.log(error)
        },

        initTodayStars(){
            //判断是否时当天，如果到达第二天则初始化数据
            let nowData = new Date();
            let todayTime = nowData.getFullYear()+''+(nowData.getMonth()+1)+nowData.getDate();
            let oldDay = db.get('checkToday')&&db.get('checkToday');
            //在初始化或者时间到达第二天时保存时间，同时数据重置
            if (todayTime != oldDay) {
              db.set('checkToday',todayTime);
              db.set('todaystars',0);
            };
            this.today_stars = parseInt(db.get('todaystars'));
        },
    },
  	data(){
  		return{
  			paneltitle:"长期成就",
        achive_list:[] ,  //今日成就列表
        today_stars:0,  //今日获得的星数
        completerate:0 ,  //完成率
        totalstar:0,      //总共获取的多星数
        check_data:true,  //检验是否有数据
        inner_distance:true, //检测孩子是否超出距离
  		}
  	},
  };
</script>

<style scoped>
 /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
  /*公用*/

  body{ color:#313131;}
  .achive_status{ position: relative;}
  .achive_status .status_bg img{ width:100%; display: block;}
  .achive_status .status_con{ position:absolute; left:25%; top:10%; width:50%; height: 60%; }
  .achive_status .data-ring { position: absolute; top: 50%; left: 50%; margin-top: -100px; margin-left: -80px; }
  .achive_status .health-header p { position: absolute; width: 100%; height: 2rem; top: 50%; text-align: center; color: rgba(255, 255, 255, 0.8); }
  .achive_status .health-header .rank_detail{position: absolute;top: 50%; left: 50%; margin-top: -92px; margin-left: -80px;width: 160px;height: 160px;}
  .achive_status .health-header .data { font-size: 1.5rem; color: #FFF; margin-top: -2.8rem; }
  .achive_status .health-header .tip { font-size: .8rem; margin-top:-0.6rem; }
  .achive_status .age{ font-size: .6rem; position:absolute; top:71%; right:8%;  color:#fff;}
  .status_desc{ margin:-15% auto 0 auto; position:relative; z-index: 2;}
  .status_desc p{ overflow:hidden; position:relative; padding:5% 0;}
  .status_desc p a{ display:inline-block; text-align: center; font-size: .8rem; padding:0 0% 0 20%; float:left; color:#959595;}
  .status_desc p a:nth-child(2){float:right; padding:0 20% 0 0;}
  .status_desc p a.height span{font-size: 2.2rem; font-family: AkzidenzGrotesk; color:#8c3ffa;}
  .status_desc p a.height i{font-size: 1.1rem; color:#8c3ffa; padding-left:2px; font-family: AkzidenzGrotesk;}
  .status_desc p a.height b{display:block; position:relative; top:0px;}

  .today_achive{padding:4%;}
  .today_achive .achive_info{padding:1% 3%;min-height: 8.6666666667rem;}
  .today_achive .achive_info li{border-bottom:1px solid #e1e1e1; overflow:hidden; padding:2% 0;}
  .today_achive .achive_info li:nth-last-child(1){border-bottom:none;}


  .today_achive .achive_info li span{display:inline-block;}
  .today_achive .achive_info li span:nth-child(1){font-family:AkzidenzGrotesk;  font-size: 1.4rem; color:#8c3ffa; border-right:1px solid #e1e1e1; position:relative; bottom:6px;  min-width:24%; text-align: center;}
  .today_achive .achive_info li span:nth-child(2){ width:55%; position:relative; top:2px; left:3px;}
  .today_achive .achive_info li span:nth-child(2) b{display:block; color:#8c3ffa; text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
  .today_achive .achive_info li span:nth-child(2) i{display:block; color:#b5b5b5; font-size: .8rem; margin-top:-4px; text-overflow:ellipsis;overflow:hidden;white-space:nowrap;}
  .today_achive .achive_info li span:nth-child(3){ background:#ebebeb url(~assets/images/btn_20_band_award_dis@3x.png) no-repeat; background-size: 45px 20px; border-radius:15px; text-align: center; font-size: .1rem; color:#8c3ffa; float:right; position:relative; top:12px; width:45px; height:20px;}
  .today_achive .achive_info li.finish span:nth-child(1),
  .today_achive .achive_info li.finish span:nth-child(2) b{color:#b5b5b5;}
  .today_achive .achive_info li.finish span:nth-child(3){background:#ebebeb;}

  .today_achive .achive_info li.status_one span:nth-child(3){}
  .today_achive .achive_info li.status_two span:nth-child(3){background: url(~assets/images/btn_20_band_award_nor@3x.png) no-repeat; background-size: 45px 20px;}
</style>
















