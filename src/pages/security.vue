
<style scoped>
/*红色 #ef5361*/
body{ color:#313131;}
.security{}

.security .security_status_bg{ position: relative;}
.security .security_status_bg img{ width:100%; display: block;}
.security .data-ring { position: absolute; top: 50%; left: 50%; margin-top: -100px; margin-left: -80px; }
.security .health-header p { position: absolute; width: 100%; height: 2rem; top: 50%;  text-align: center; color: rgba(255, 255, 255, 0.8); }
.security .health-header .data { font-size: 1.5rem; color: #FFF; margin-top: -3.5rem; }
.security .health-header .tip {font-size: .8rem; }

.security .security_status_btn{ position:relative; margin-top:-25px; overflow:hidden; padding:3% 3%; box-sizing:border-box;}
.security .security_status_btn input{ float: right;}
.security .sec_title{ padding:5% 4% 2% 5%; font-size: 1rem; color:#646464;}
.security .warning_settings{}
.security .warning_settings .go_seting a{ text-align: left; padding:.7rem; overflow:hidden;}
.security .warning_settings .go_seting a img{ float:right; margin-top:.5rem; width:13px;}
.security .warning_settings p{ display:inline-block; width:32%; text-align: center; padding:6% 0;}
.security .warning_settings p img{display:block; width:80%; margin:0 auto;}
.security .warning_settings p span{display:block; text-align: center; color:#646464; padding: 6px 0;}
.security .warning_settings p i{display:inline-block; margin:0 auto; font-size: .8rem; color:#fff; background: #86d349; border-radius:10px; padding:0px 8px;}
.security .warning_settings p i.act{background:#ef5361;}
.security .warning_settings .link_go{border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;}

.security .sec_tip{ background: #fff; margin:4% 4% 18% 4%; border-radius: 5px; box-shadow: 0 0 5px #e2e2e2;position: relative;z-index: 2;}
.security .sec_tip .title{ padding:2% 4%; color:red; font-size: .9rem; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom:1px solid #e1e1e1; background:linear-gradient(to bottom, #fff 0%,#f6f6f6 100%);}
.security .sec_tip .tip_con{}
.security .sec_tip .tip_con p{ text-align: center; background:url(~assets/images/img_band_title_line@3x.png) no-repeat scroll center center; background-size: 50%; font-size: 1.1rem; margin-top:5%;}

.security .sec_tip .tip_con span{display:block; padding:2% 3%; color:#646464; font-size:.8rem;}

.security .sec_tip .tip_head{margin-top:-50px;}
.security .sec_tip .tip_head img{width:70px; height:70px; display:block; margin:0 auto;}

</style>


<template>
  <div class="security">
    <div class="security_status_bg">
  		<img src="~assets/images/status_bg3.png" alt="" v-show="connectBluetooth">
        <img src="~assets/images/status_bg5.png" alt="" v-show="!securitybtnstatus">
        <img src="~assets/images/status_bg1.png" alt="" v-show="outOfDistance">
        <div class="health-header header-bg">
            <gauge-ring v-ref:data-ring class="data-ring" :width="160" :height="160"></gauge-ring>
            <p class="data" v-show="!securitybtnstatus">{{{$i18n("security_status_unopen")}}}</p>
            <p class="data" v-show="connectBluetooth">{{{$i18n("security_status_in")}}}</p>
            <p class="data" v-show="outOfDistance">{{{$i18n("security_status_out")}}}</p>
        </div>
  	</div>
  	<div class="box_wrapper security_status_btn">
  		{{$i18n("security_status_title")}}
  		<input class="toggle-switch" type="checkbox" v-model="securitybtnstatus" @click="toggle" >
  	</div>
    <div class='showSetting' v-show = "isSet" >
    	<p class="sec_title">
    		{{$i18n("security_set_title")}}
    	</p>
    	<div class="box_wrapper warning_settings">
  		    <div class="link_go go_seting">
                <a href="javascript:;" @click='openNotificationStatus'>{{$i18n("security_set")}}
                <img src="~assets/images/select_bg.png" alt=""></a>
            </div>
        </div>
  	</div>
  	<!-- 提示 -->
  	<div class="sec_tip">
		  <div class="title">{{paneltitle}}</div>
		  <div class="tip_con">
		  	<span>{{$i18n("security_warning_1")}}<br><i style="color:red;">{{$i18n("security_warning_2")}}
</i></span>
		  </div>
	</div>
</div>
</template>

<script>
import gaugeRing from 'components/gauge/radarring';

import jutils from 'jutils';
import db from 'dbs/hashmap';
import jsb from  'services/jsb';

export default {
    components: { gaugeRing },
  	data(){
  		return{
      		securitybtnstatus:false,//开关按钮状态
            connectBluetooth:false, //蓝牙已经连接上
            outOfDistance:false, // 蓝牙打开但未连接设备
            lockScreen:false, // 锁频通知
            mainScreen:false, // 未锁屏时通知
            sound:false, // 声音通知
            paneltitle:this.$i18n("security_warning_title"),
            isSet:true,//去设定是否显示
            nickname:"",//孩子昵称
  		}
  	},
  	methods:{
        init(width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';

            setTimeout(() => {
                this.$refs.dataRing.p_drawBG();
            }, 0);

            //判断去设定是否设定过 如果设定过则隐藏设定入口
            this.openNotificationStatus();
            //监听页面关闭事件页面关闭通知app开关已经关闭
            // this.addCloseWebCallback();
            //获取孩子昵称
            this.nickname = db.get("nickname");
        },


        update (width, height) {
            const size = Math.round(width * 0.5);
            this.$refs.dataRing.update(size, size);
            const ml = size * 0.5;
            this.$refs.dataRing.$el.style.marginLeft = '-' + ml + 'px';
            this.$refs.dataRing.$el.style.marginTop = '-' + (20 + ml) + 'px';
            setTimeout(() => {
                let cid = db.get("cid");

                let childStatus = db.get("securitystatus") || {};

                this.securitybtnstatus = !!childStatus[cid];
                console.log("cid",cid,"childStatus",childStatus,"securitybtnstatus",this.securitybtnstatus);

                if (this.securitybtnstatus) {  //判断开关是否已经开启过
                    if(db.get('bluetoothStatusCalls') === undefined) {
                      db.set('bluetoothStatusCalls', []);
                    }
                    const btCalls = db.get('bluetoothStatusCalls');
                    if(btCalls.indexOf(this.bluetoothStatusChange) < 0) {
                        btCalls.push(this.bluetoothStatusChange);
                    }
                    this.bluetoothStatusChange();
                    this.$refs.dataRing.drawRing();
                }else{
                    console.log(1111);
                    this.connectBluetooth=false, //蓝牙已经连接上
                    this.outOfDistance=false, // 蓝牙打开但未连接设备
                    this.$refs.dataRing.p_drawBG();
                }
            }, 0);

            //判断去设定是否设定过 如果设定过则隐藏设定入口
            this.openNotificationStatus();
            //监听页面关闭事件页面关闭通知app开关已经关闭
            // this.addCloseWebCallback();
            //获取孩子昵称
            this.nickname = db.get("nickname");
        },

        // addCloseWebCallback() {
        //     if(db.get('appCloseWebCalls') === undefined) {
        //         db.set('appCloseWebCalls', []);
        //     }
        //     const calls = db.get('appCloseWebCalls');
        //     if(calls.indexOf(this.appCloseWebCallback) < 0) {
        //         calls.push(this.appCloseWebCallback);
        //     }
        // },

        // appCloseWebCallback(successcallb,fialcallb){
        //     let cid = db.get("cid");
        //     let securitystatus = db.get("securitystatus");
        //     if(securitystatus){
        //         if(securitystatus[cid] === true){
        //             if(successcallb && typeof successcallb === "function"){
        //                 successcallb(()=>{
        //                     jsb.syncBlueSecurity(false,
        //                         () => { 
        //                         console.log("安全距离外");
        //                     });
        //                 });
        //             }
        //         }else{
        //           if(fialcallb && typeof fialcallb === "function"){
        //               fialcallb();
        //           }
        //           console.log("安全距离关闭状态");
        //         }
        //     }else{
        //         if(fialcallb && typeof fialcallb === "function"){
        //             fialcallb();
        //         }
        //         console.log("么有开启安全距离");
        //     }
        // },

    	//开启或关闭按钮
  	    toggle(e) {
            let childStatus = db.get("bluetoothStatus");
            console.log(childStatus);
                let toggles = e.target.checked;
                if(toggles){   //判断开关是否已经开启
                    if(childStatus !== 0){
                        this.$dispatch('showalert', { 
                            alert_content: this.$i18n("bluetooth_connect"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        setTimeout(() => {
                            this.securitybtnstatus = false;
                        }, 1);
                        return;
                    }
                    const calls = db.get('bluetoothStatusCalls');
                    if(calls.indexOf(this.bluetoothStatusChange) < 0) {
                        calls.push(this.bluetoothStatusChange);
                    }
                    let cid = db.get("cid");
                    if(db.get("securitystatus") == undefined){
                        db.set('securitystatus', {});
                    }
                    const securitystatus = db.get("securitystatus");
                    securitystatus[cid] = true;

                    this.connectBluetooth = true;
                    this.outOfDistance = false;
                    this.securitybtnstatus = true;
                    this.$refs.dataRing.drawRing();
                    this.listenChildBluetooth();
                    //this.getNotificationStatus();
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n("security_alert_open"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }else{
                    const calls = db.get('bluetoothStatusCalls');
                    const idx = calls.indexOf(this.bluetoothStatusChange);
                    if(idx > -1) {
                        calls.splice(idx, 1);
                    }
                    this.securitybtnstatus = false;
                    //关闭开关，则清空画布，只画出背景
                    window.cancelAnimationFrame(this.$refs.dataRing.timer);
                    this.$refs.dataRing.p_clear();
                    this.$refs.dataRing.p_drawBG();
                    this.connectBluetooth = false;
                    this.outOfDistance = false;
                    let cid = db.get("cid");
                    if(db.get("securitystatus") == undefined){
                        db.set('securitystatus', {});
                    }
                    const securitystatus = db.get("securitystatus");
                    securitystatus[cid] = false;
                    this.listenChildBluetooth();
                    this.securitybtnstatus = false;
                    //this.bluetoothStatusChange();
                    this.$dispatch('showalert', { 
                        alert_content: this.$i18n("security_alert_close"),
                        btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                    });
                }
  	    },

        bluetoothStatusChange(){
            if(db.get('bluetoothStatus') == 0) {
                this.connectBluetooth = true;
                this.outOfDistance = false;
            }else{
                this.connectBluetooth = false;
                this.outOfDistance = true;
            }
        },

        listenChildBluetooth (){
            jsb.syncBlueSecurity(this.securitybtnstatus,
                () => {
                console.log("安全距离外");
            });
  	    },

        openNotificationStatus (){
            jsb.openNotificationStatus( () => {
                setTimeout(() => {
                    console.log("通知没有开启");
                }, 500);

            },()=>{
                setTimeout(() => {
                    this.isSet = false;
                }, 500);
            });
        }
    }
};
</script>

<style scoped>
  /*红色 #ef5361*/
  body{ color:#313131;}
  .security{}

  .security .security_status_bg{ position: relative;}
  .security .security_status_bg img{ width:100%; display: block;}
  .security .data-ring { position: absolute; top: 50%; left: 50%; margin-top: -100px; margin-left: -80px; }
  .security .health-header p { position: absolute; width: 100%; height: 2rem; top: 50%;  text-align: center; color: rgba(255, 255, 255, 0.8); }
  .security .health-header .data {     font-size: 1rem; color: #FFF; margin-top: -2.6rem; width: 4rem; left: 50%; margin-left: -2rem;}
  .security .health-header .tip {font-size: .8rem; }

  .security .security_status_btn{ position:relative; margin-top:-25px; overflow:hidden; padding:3% 3%; box-sizing:border-box;}
  .security .security_status_btn input{ float: right;}
  .security .sec_title{ padding:5% 4% 2% 5%; font-size: 1rem; color:#646464;}
  .security .warning_settings{}
  .security .warning_settings .go_seting a{ text-align: left; padding:.7rem; overflow:hidden;}
  .security .warning_settings .go_seting a img{ margin-top: -6px; width: 13px; top: 50%; position: absolute; right: 10px; left: auto;}
  .security .warning_settings p{ display:inline-block; width:32%; text-align: center; padding:6% 0;}
  .security .warning_settings p img{display:block; width:80%; margin:0 auto;}
  .security .warning_settings p span{display:block; text-align: center; color:#646464; padding: 6px 0;}
  .security .warning_settings p i{display:inline-block; margin:0 auto; font-size: .8rem; color:#fff; background: #86d349; border-radius:10px; padding:0px 8px;}
  .security .warning_settings p i.act{background:#ef5361;}
  .security .warning_settings .link_go{border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;}

  .security .sec_tip{ background: #fff; margin:4% 4% 18% 4%; border-radius: 5px; box-shadow: 0 0 5px #e2e2e2;position: relative;z-index: 999;}
  .security .sec_tip .title{ padding:2% 4%; color:red; font-size: .9rem; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom:1px solid #e1e1e1; background:linear-gradient(to bottom, #fff 0%,#f6f6f6 100%);}
  .security .sec_tip .tip_con{}
  .security .sec_tip .tip_con p{ text-align: center; background:url(~assets/images/img_band_title_line@3x.png) no-repeat scroll center center; background-size: 50%; font-size: 1.1rem; margin-top:5%;}

  .security .sec_tip .tip_con span{display:block; padding:2% 3%; color:#646464; font-size:.8rem;}

  .security .sec_tip .tip_head{margin-top:-50px;}
  .security .sec_tip .tip_head img{width:70px; height:70px; display:block; margin:0 auto;}
  
</style>
