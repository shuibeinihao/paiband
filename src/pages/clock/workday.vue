<template>
    <div class="workday">
    	<!-- 起床 -->
      <div class="getup" v-show="getupShow">
        <p class="set_title">起床</p>
        <div class="box_wrapper time_list">
          <p v-for="getup in getup_info">
            <span class="delect_info" @click="delect_info"  data="{{getup.clock_id}}" v-show="delectInfoShow"></span>
            <span class="time_info">{{getup.time}}</span>
            <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" 
            data="{{getup.clock_id}}" id="1"></span>
          </p>
        </div>
      </div>
      <!-- 学习 -->
      <div class="learn" v-show="learnShow">
        <p class="set_title">学习</p>
        <div class="box_wrapper time_list">
          <p v-for="learn in learn_info">
            <span class="delect_info" @click="delect_info"  data="{{learn.clock_id}}" v-show="delectInfoShow"></span>
            <span class="time_info">{{learn.time}}</span>
            <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{learn.clock_id}}" id="2"></span>
          </p>
        </div>
      </div>
       <!-- 运动 -->
      <div class="sport" v-show="sportShow">
        <p class="set_title">运动</p>
        <div class="box_wrapper time_list">
          <p v-for="sport in sport_info">
            <span class="delect_info" @click="delect_info"  data="{{sport.clock_id}}" v-show="delectInfoShow"></span>
            <span class="time_info">{{sport.time}}</span>
            <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{sport.clock_id}}" id="3"></span>
          </p>
        </div>
      </div>
      <!-- 睡觉 -->
      <div class="sleep" v-show="sleepShow">
        <p class="set_title">睡眠</p>
        <div class="box_wrapper time_list">
          <p v-for="sleep in sleep_info">
            <span class="delect_info" @click="delect_info" data="{{sleep.clock_id}}" v-show="delectInfoShow"></span>
            <span class="time_info">{{sleep.time}}</span>
            <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{sleep.clock_id}}" id="4"></span>
          </p>
        </div>
      </div>
      <!-- 其他 -->
      <div class="other" v-show="otherShow">
        <p class="set_title">其他</p>
        <div class="box_wrapper time_list">
          <p v-for="other in other_info">
            <span class="delect_info" v-show="delectInfoShow"  data="{{other.clock_id}}" @click="delect_info"></span>
            <span class="time_info">{{other.time}}</span>
            <span class="edit_info" v-show="editInfoShow" @click="editClockInfo" data="{{other.clock_id}}" id="5"></span>
          </p>
        </div>
      </div>


      <div class="no_clock_tip" v-show="noClockTipShow">
        <img src="~assets/images/img_banf_tips_clock@3x.png" alt="">
      </div>
      <div class="no_clock">
        <span><b>{{crru_clock_count}}/{{workday_clock_count}}</b><i>闹钟个数上线</i></span>
        <span @click="edit_info">编辑</span>
        <span @click="add_clock">添加</span>
      </div>
      <div class="no_clock editing" v-show="editingShow">
        <span><i>闹钟编辑中</i></span>
        <!-- <span class="cancel" @click="cancel_info">取消</span> -->
        <span class="ok_btn" @click="ok_btn_info">确定</span>
      </div>
    </div>
</template>

<script>
  import clock from "services/clock";
  import $ from "zepto";
  import jsb from "services/jsb";
  import db from 'dbs/hashmap';
  import syncService from 'services/sync';
  export default {
    data(){
      return{
        noClockTipShow:true,//没有闹钟的时候提示
        delectInfoShow:false,//删除按钮是否显示
        editInfoShow:false,//编辑按钮是否显示
        editingShow:false,//底部编辑框是否显示
        workday_clock_count:0,//最大闹钟数量
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
        clock_edit_config:{},//点击编辑闹钟需要传的参数
        workday_data:{},
        weekend_data:{}
      }
    },
    methods:{
      init(width,height){
        clock.getClock(this.updateClock, this.updateClockError);//获取闹钟列表
      },
      update(){
        clock.getClock(this.updateClock, this.updateClockError);
      },
      updateClock(data){
        if(data.http_code == 200){
          this.workday_clock_count = data.data.workday_clock_count;
          this.workday_data = data.data.workday;
          this.weekend_data = data.data.weekend;
          this.crru_clock_count = data.data.workday.length;
          let getup = [],
            learn = [],
            sport = [],
            sleep = [],
            other = [];
          if(data.data.workday.length>0){
            this.noClockTipShow = false;
            for(let i = 0; i<data.data.workday.length; i++){
              if(data.data.workday[i].category == 1){
                getup.push(data.data.workday[i]);
              }else if(data.data.workday[i].category == 2){
                learn.push(data.data.workday[i]);
              }else if(data.data.workday[i].category == 3){
                sport.push(data.data.workday[i]);
              }else if(data.data.workday[i].category == 4){
                sleep.push(data.data.workday[i]);
              }else if(data.data.workday[i].category == 5){
                other.push(data.data.workday[i]);
              }
            }
          } else {
            this.noClockTipShow = true;
          }
            this.getup_info = getup;
            this.learn_info = learn;
            this.sport_info = sport;
            this.sleep_info = sleep;
            this.other_info = other;
            this.getupShow = this.getup_info.length > 0;
            this.learnShow = this.learn_info.length > 0;
            this.sportShow = this.sport_info.length > 0;
            this.sleepShow = this.sleep_info.length > 0;
            this.otherShow = this.other_info.length > 0;
        }else{
          this.$dispatch("showtip","数据获取失败");
        }
      },
      updateClockError(error){
        this.$dispatch("showtip",error);
      },
      edit_info(){
          if(db.get('isSync')) {
              this.$dispatch('showtip', '已经在同步数据啦');
              return ;
          }
        this.noClockTipShow = false;
        this.delectInfoShow = true;
        this.editInfoShow = true;
        this.editingShow = true;
      },
      delect_info(e){
        let clock_id = $(e.target).attr("data");
        clock.deleteClock(clock_id,this.deleteClock, this.deleteClockError);//删除闹钟
      },
      deleteClock(data){
        this.update();//删除成功重新获取闹钟列表
      },
      deleteClockError(error){
        if(error){
          this.$dispatch("showtip","删除失败");
        }
      },
      cancel_info(){
        this.delectInfoShow = false;
        this.editInfoShow = false;
        this.editingShow = false;
      },
      ok_btn_info(){
            const cid = db.get('cid');
            const deviceid = db.get('deviceid');
            jsb.getBluetoothStatus(deviceid, data => {
                if(deviceid === data.device_id) {
                    db.set('bluetoothStatus', data.status);
                    if(data.status === 0) {
                        db.set('isSync', true);
                        let timeid;
                        const sync = () => {
                            clearTimeout(timeid);
                            this.$dispatch('show-sync-loading', { mode: 'sync', resyncback: sync });
                            const clock = {};
                            syncService.syncWriteClock(clock, () => {
                                setTimeout(() => {
                                    this.$dispatch('show-sync-loading', { mode: 'sync', resyncback: sync });
                                    timeid = setTimeout(() => {

                                        this.delectInfoShow = false;
                                        this.editInfoShow = false;
                                        this.editingShow = false;

                                        this.$dispatch('hide-sync-loading');
                                        db.set('isSync', false);
                                    }, 2000);
                                }, 500);
                            }, () => {
                                setTimeout(() => {
                                    this.$dispatch('show-sync-loading', { mode: 'fail' });
                                    timeid = setTimeout(() => {
                                        this.$dispatch('hide-sync-loading');
                                        db.set('isSync', false);
                                    }, 4000);
                                }, 500);
                            });
                        };
                        sync();
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
      add_clock(){//点击添加闹钟显示select
        let values = [['起床','学习','运动','睡觉','其他'], {from: 0, to: 24, step: 1}, {from: 0, to: 60, step: 1}];
        jsb.showSelector("闹钟",values,this.addClockSuccessBack,this.addClockCancelBack);//jsb调用select接口
      },
      addClock(data){
        console.log(data);
        this.update();//tianjia成功重新获取闹钟列表
      },
      addClockError(error){
        if(error){
          this.$dispatch("showtip","添加失败");
        }
      },
      addClockSuccessBack(data){//点击select确定之后调用添加闹钟接口
        let clock_add_config={};
        clock_add_config.cycle = 1;
        let harr = ['起床','学习','运动','睡觉','其他'];

        for (var i = 0; i < harr.length; i++) {
            if (harr[i] == data.values[0]) {
                clock_add_config.category = i+1;
            }
        }
        clock_add_config.time = data.values[1]+":"+data.values[2];
        if(this.crru_clock_count == 8){
          this.$dispatch("showtip","闹钟数已达上限");
        }else{
          for(let i = 0; i<this.workday_data.length;i++){
            if(this.workday_data[i].time === clock_add_config.time){
              this.$dispatch("showtip","闹钟不能重复添加");
              return;
            }
          }
          clock.addClock(clock_add_config,this.addClock, this.addClockError);//添加闹钟
        }
      },
      addClockCancelBack(){},
      editClockInfo(e){//点击编辑修改闹钟调出select
        this.clock_edit_config.clock_id = $(e.target).attr("data");
        this.clock_edit_config.cycle = 1;
        this.clock_edit_config.category = $(e.target).attr("id");
        let values = [['起床','学习','运动','睡觉','其他'], {from: 0, to: 24, step: 1}, {from: 0, to: 60, step: 1}];
        jsb.showSelector("闹钟",values,this.editClockSuccessBack,this.editClockCancelBack);//jsb调用select接口
      },
      editClockSuccessBack(data){//点击select确定之后调用修改闹钟接口
        this.clock_edit_config.time = data.values[1]+":"+data.values[2];
        for(let i = 0; i<this.workday_data.length;i++){
            if(this.workday_data[i].time === this.clock_edit_config.time){
              this.$dispatch("showtip","已存在此闹钟");
              return;
            }
        }
        clock.editClock(this.clock_edit_config,this.editClock, this.editClockError);//修改闹钟
      },
      editClockCancelBack(){},
      editClock(data){
        console.log(data);
        this.update();//修改成功重新获取闹钟列表
      },
      editClockError(error){
        if(error){
          this.$dispatch("showtip","修改失败");
        }
      },
    }
  };
</script>

<style scoped>
  /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
  /*公用*/
  body,html{background:#ebebeb; overflow:hidden;}
  .workday{margin-bottom:4rem;}
  .workday .set_title{ padding:6% 4% 3% 4%; font-size: 1.1rem; color:#646464;}
  .no_clock_tip {position:fixed; bottom:6.875rem; left:0px;}
  .no_clock_tip img{width:60%; display:block; float:right; margin-right:20px;}
  .no_clock{position:fixed; bottom:3.3rem; border-bottom:1px solid #e1e1e1;border-top:1px solid #e1e1e1; height:2.875rem; line-height: 2.875rem; left:0px;  width:100%; background:#f5f5f5; text-align: right; font-size: 0;}
  .editing{}
  .no_clock span{display: inline-block;}
  .no_clock span:nth-child(1){float:left; margin-left:10px;}
  .no_clock span:nth-child(1) b{padding:0 5px; font-size: 1rem;}
  .no_clock span:nth-child(1) i{font-size: .8rem; color:#b5b5b5;}
  .no_clock span:nth-child(2){color:#8c3ffa; background:#fff; padding:0 15px; font-size: 1rem;}
  .no_clock span:nth-child(3){background:#8c3ffa; color:#fff; padding:0 15px; font-size: 1rem;}

  .time_list{padding:0 4%; box-sizing:border-box;}
  .time_list p{border-bottom:1px solid #e1e1e1; overflow:hidden; padding:2% 0;}
  .time_list p:nth-last-child(1){border-bottom:none;}
  .time_list span{display:inline-block;}
  .time_list span.delect_info{position:relative; bottom:0px; padding:0 5px; background: url(~assets/images/icon_20_54@3x.png) no-repeat; background-size: 20px; width:20px; height:20px; display:inline-block;}
  .time_list span.time_info {font-family: AkzidenzGrotesk; font-size: 2.2rem;}
  .time_list span.edit_info {float:right; position:relative; top:10px; background: url(~assets/images/update_icon.png) no-repeat; background-size: 20px; width:20px; height:20px; display:inline-block; }
</style>
