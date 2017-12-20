<template>
    <div class="rank" v-on:touchstart="loadMoreStart" v-on:touchmove="loadMoreMove" v-on:touchend="loadMoreEnd">
      <div class="achive_status">
      	<div class="status_bg">
      		<img src="~assets/images/status_bg4.png" alt="">
          <div class="health-header header-bg">
                <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
                <rank-detail class="rank_detail" v-ref:star-detail v-show="inner_distance" @transmit-rankdetail = 'getRankdetail'></rank-detail>
                <div v-if="!inner_distance">
                    <p class="data">无数据</p>
                    <p class="tip">孩子超出距离</p>
                </div>
            </div>
      	</div>
      </div>
    	<div class="box_wrapper rank_desc">
    		<p>
            <span>
                <b v-if="check_slef_data">{{self_rank}}</b><b v-else>1</b><i>{{self_name}}</i>
            </span>
            <span>
                <b>★</b><i v-if="check_slef_data">{{self_stars}}</i>
                <i v-else>0</i>
            </span>
        </p>
    		<p v-if="check_overstep">已经超过了全国<span>{{overstep}}</span>的孩子</p>
        <p v-else>您还需要再接再厉哦</p>
    	</div>
    	<div class="rank_list">
    		<panel :paneltitle="paneltitle">
    			<ul v-if="rank_list && rank_list.length > 0" class="list_container" v-if="check_data" >
                    <li v-for="item in rank_list" track-by="$index">
                        <p class="rank_list_p">
                            <span><b>{{item.rank}}</b><i>{{item.child_name}}</i></span>
                            <span><b>★</b><i>{{item.stars}}</i></span>
                        </p>
                    </li>
    			</ul>
                <div v-else class="hasno_firend">还没有添加过好友</div>
    		</panel>
    	</div>
    </div>
</template>

<script>
  import panel from "components/common/panel/index";
  import gaugeRing from 'components/gauge/starring';
  import rankDetail from "components/achive/rankdetail";
  import service from 'services/achive';


  export default {
  	components: {panel, gaugeRing, rankDetail},
    methods: {
        
        init(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';

            this.initialize();
        },

        update(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';

            this.initialize();
        },

        getRankdetail(allstars,completed){
            this.completerate = completed;
            this.completerate = this.completerate >= 1?0:this.completerate;
            this.$refs.dataRing.drawRing(this.completerate);
        },

        initialize(){
            this.rankDom = $('.rank');
            this.windowHeight = $(window).height();//记录初始化高度
            this.footerDomInitHeight = $('.footer').height();//记录底部提示高度
            this.$refs.starDetail.getData();
            service.getRankData(1,this.updateRankData , this.updatedataError);
        },

        updateRankData(data){
            console.log(data)
            if (data.http_code == 200) {
              this.self_rank = data.data.self.rank || 0;
              this.self_stars = data.data.self.stars || 0;
              this.self_name = data.data.self.child_name || null;
              this.overstep = data.data.overstep || 0;
              //将每次请求的数据放入列表数据中
              this.rank_list = this.rank_list.concat(data.data.ranks);
              this.loadStatus = true; //防止分页加载时多次发送请求，只有为true才能再次请求。
              //如果数据为0，显示添加好友提示
              if (this.rank_list.length == 0) {
                this.check_data = false;
              }
            }
        },

        updatedataError(error){
            console.log('updataCommonError',error);
            //数据获取失败时，显示一些提示
            this.loadStatus = true;
            this.check_slef_data = false;
            this.check_overstep = false; 
        },
        loadMoreStart(){
          clearInterval(this.timer);
        },
        loadMoreMove(){
            //判断是否到达底部，如果到达底部则发送ajax
            if (this.windowHeight + 4 >= (this.rankDom.offset().top + this.rankDom.height() + this.footerDomInitHeight)) {
                //loadStatus用来防止多次触发ajax请求，只有在请求结束后才能发送第二次
                if (!this.loadStatus) {
                    return
                }
                this.loadStatus = false;
                console.log('达到底部，再次加载')
                service.getRankData(1,this.updateRankData , this.updatedataError);
            }
        },
        loadMoreEnd(){
            //当touch事件结束时，会有一个惯性缓冲，用offsetTop来判断缓冲是否结束
            const listenMoveEnd = () => {
              this.nowOffsetTop = this.rankDom.offset().top
              this.moveSpeed = this.nowOffsetTop - this.oldOffsetTop;
              this.oldOffsetTop = this.nowOffsetTop;
              if (this.moveSpeed == 0) {
                window.cancelAnimationFrame(this.timer);
                //当惯性运动结束后清空定时器，并判断是否到达底部，如果到达底部则发送ajax
                if (this.windowHeight + 4 >= (this.rankDom.offset().top + this.rankDom.height() + this.footerDomInitHeight)) {
                    if (!this.loadStatus) {
                        return
                    }
                    this.loadStatus = false;
                    console.log('达到底部，再次加载')
                    service.getRankData(1,this.updateRankData , this.updatedataError);
                }
                return
              }
              this.timer = window.requestAnimationFrame(listenMoveEnd);
            }
            listenMoveEnd();
        }
    },

    data(){
        return{

          paneltitle:"好友排行",
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
          loadStatus:true, //检测数据是否返回，防止连续触发请求
          moveSpeed:0,     //touchmove结束后的惯性缓冲速度
          oldOffsetTop:0,    //记录上一个offsetTop的值
          nowOffsetTop:0,    //当前offsetTop的值
          timer:null,     //定时器
        }
      }
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
  .achive_status .health-header .tip { font-size: .8rem; margin-top:-0.6rem;}
  .rank_desc{ margin:-15% auto 0 auto; padding:0 4%; box-sizing:border-box; position:relative; z-index: 2;}
  .rank_desc p{ border-bottom:1px solid #e1e1e1; overflow:hidden; padding:10px 0;}
  .rank_desc p:nth-last-child(1){border-bottom:none;}
  .rank_desc p span{ display:inline-block;}
  .rank_desc p span:nth-child(1) b{ font-family: AkzidenzGrotesk; font-size: 1.2rem; color:#646464; padding:0 15px 0 10px; position:relative; top:3px;}
  .rank_desc p span:nth-child(1) i{color:#646464; position:relative; top:1.5px;}
  .rank_desc p span:nth-child(2){display:inline-block; float:right;}
  .rank_desc p span:nth-child(2) b{color:#ffd700; position:relative; bottom:2px;margin-right: 3px;}
  .rank_desc p span:nth-child(2) i{font-size: 1.4rem; color:#646464; font-family:AkzidenzGrotesk; }
  .rank_desc p:nth-child(2){text-align: center; color:#b5b5b5; font-size: .8rem;}
  .rank_desc p:nth-child(2) span{color:#8c3ffa;}

  .rank_list{padding:4%;min-height: 8.6666666667rem;}
  .rank_list .hasno_firend{font-size: 0.9066666667rem;color: #959595;text-align: center;line-height: 8.6666666667rem;}
  .rank_list .list_container{text-align: center; color:#b5b5b5; min-height: 6.4rem;}
  .rank_list li{ border-bottom:1px solid #e1e1e1;  margin:0 20px;height: 2.56rem;line-height: 2.56rem;}
  .rank_list li:nth-last-child(1){border-bottom:none;}
  .rank_list .rank_list_p{overflow: hidden;}
  .rank_list .rank_list_p span:nth-child(1){float: left;}
  .rank_list .rank_list_p span:nth-child(2){float: right;}
  .rank_list p span:nth-child(1) b{ font-family: AkzidenzGrotesk; font-size: 1.2rem; color:#646464; padding:0 15px 0 10px; }
  .rank_list p span:nth-child(1) i{color:#646464; }
  .rank_list p span:nth-child(2) b{color:#ffd700; display: inline-block;vertical-align: top;margin-right: 3px;}
  .rank_list p span:nth-child(2) i{font-size: 1.4rem; color:#646464; font-family:AkzidenzGrotesk; }
</style>
