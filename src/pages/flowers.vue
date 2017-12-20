<template>
    <div class="flowers">
        <div class="flowers_top">
            <p class="img_pic"><img src="~assets/images/icon_largeflower.png" alt=""></p>
            <p class="num_info">x&nbsp;{{flowersdata.current_num}}</p>
            <p class="btn_info" @click="openFlowersTip"><img src="~assets/images/icon_largeflower.png" alt="">{{$i18n("flower_get_desc")}}</p>
            <a href="javascript" v-link="{name:'flowersrecord'}">{{$i18n("flower_history")}}</a>
        </div>
        <div class="flowers_bottom">
            <div class="flowers_menu">
                <a href="javascript:;" :class="{'act':isTabShow}" @click="reward" class="reward_btn">{{$i18n("flower_reward_1")}}</a>
                <a href="javascript:;" :class="{'act':!isTabShow}" @click="wish" class="wish_btn">{{$i18n("flower_wish_1")}}</a>
            </div>
            <div class="flowers_con">
                <div class="reward_con" v-if="isTabShow" transition="fadeIn">
                    <div class="input_num">
                        <input type="tel" v-model="fillrewardnum" placeholder={{$i18n("flower_fill_num")}}>
                        <span>{{$i18n("flower_duo")}}</span>
                    </div>
                    <input type="text" class="input_text" v-model="fillrewardtext" placeholder={{$i18n("flower_tip_1")}}></input>
                    <div class="btn_wrap">
                        <p>{{$i18n("flower_tip_2")}}</p>
                        <a href="javascript:;" @click="reward_flowers">{{$i18n("flower_tip_3")}}</a>
                    </div>
                </div>
                <div class="wish_con" v-else transition="fadeIn">
                    <div class="input_num">
                        <input type="tel" v-model="fillwishnum" placeholder={{$i18n("flower_fill_num")}}>
                        <span>{{$i18n("flower_duo")}}</span>
                    </div>
                    <input class="input_text" v-model="fillwishtext" type="text" placeholder={{$i18n("flower_tip_4")}}></input>
                    <div class="btn_wrap">
                        <p>{{$i18n("flower_tip_5")}}</p>
                        <a href="javascript:;" @click="wish_flowers">{{$i18n("flower_tip_6")}}</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="mark_info" v-show="isMark"></div> -->
        <paiband-mask v-ref:mask></paiband-mask>
        <div class="flowers_pop" v-show="isPop" transition="fadeInOut">
            <p class="title">{{titlename}}</p>
            <p class="artice"><span>{{nickname}}</span>{{articename}}</p>
            <p class="num_change"><img src="~assets/images/icon_largeflower.png" alt=""><span>x</span>{{numchange}}</p>
            <a href="javascript:;" class="ok_btn" @click="ok_btn">{{$i18n("btn_name_confirm")}}</a>
        </div>
        <div class="flowers_tip" v-show="flowersTip" transition="fadeInOut">
            <p class="title">{{$i18n("flower_wish_get")}}</p>
            <p class="con">{{$i18n("flower_wish_con")}}</p>
            <p class="title">{{$i18n("flower_wish_in")}}</p>
            <p class="con">{{$i18n("flower_wish_in_1")}}</p>
            <p class="con color">{{$i18n("flower_wish_in_2")}}</p>
            <a href="javascript:;" @click="closeFlowersTip"></a>
        </div>
        <div class="flowers_pop is_flowers_pop" v-show="isOkFlowersPop" transition="fadeInOut">
            <p class="title">{{isOkTitle}}</p>
            <p class="artice">{{isOkArtice}}</p>
            <p class="num_change"><img src="~assets/images/icon_largeflower.png" alt=""><span>x</span>{{numchange}}</p>
            <p class="btn_wrap">
                <a href="javascript:;" class="ok_btn" @click="cancel_btn">{{$i18n("btn_name_cancel")}}</a>
                <a href="javascript:;" class="ok_btn" @click="isokbtn">{{$i18n("btn_name_confirm")}}</a>
            </p>
        </div>
    </div>
</template>

<script>
    import flowersService from 'services/flowers';
    import db from 'dbs/hashmap';
    import jsb from "services/jsb";
    import paibandMask from 'components/mask';
    export default {
        components:{ paibandMask },
        data(){
            return{
                isTabShow:true,//显示哪个tab
                isPop:false,//成功之后弹窗
                titlename:"",//标题
                nickname:"",//孩子名称
                articename:"",//获得还是奖励
                numchange:"",//获得或者奖励小红花数量
                flowersTip:false,//小花说明是否显示
                flowersdata:{},//小红花数据
                fillrewardnum:"",//需要奖励的小花个数
                fillrewardtext:"",//奖励时鼓励的话语
                fillwishnum:"",//需要兑换的小花的数量
                fillwishtext:"",//需要兑换的备注
                isOkFlowersPop:false,//二次确认框
                isOkTitle:"",//二次确认标题
                isOkArtice:"",//二次确认
            }
        },
        methods: {
            init(width, height) {
                //获得孩子当前小红花数据
                flowersService.getFlowers(this.getFlowersSuccess,this.getFlowersError);
            },
            update(width, height) {
                //获得孩子当前小红花数据
                flowersService.getFlowers(this.getFlowersSuccess,this.getFlowersError);
            },
            getFlowersSuccess(data){
                console.log("getFlowersSuccess",data);
                if(data.http_code == 200){
                    this.flowersdata = data.data;
                }else{
                    console.log("flowers数据获取失败");
                }
            },
            getFlowersError(error){
                console.log(error);
            },
            reward(){
                this.isTabShow = !this.isTabShow;
            },
            wish(){
                this.isTabShow = !this.isTabShow;
            },
            reward_flowers(){
                if(!this.fillrewardnum){
                    this.fillrewardnum = 1;
                }
                if((/^[1-9]+[0-9]*$/).test(this.fillrewardnum) && this.fillrewardnum > 99){
                    this.$dispatch("showtip",this.$i18n("flower_b_1"));
                    this.fillrewardnum = "";
                }else if(!(/^[1-9]+[0-9]*$/).test(this.fillrewardnum)){
                    this.$dispatch("showtip",this.$i18n("flower_b_2"));
                    this.fillrewardnum = "";
                }else if(this.fillrewardtext.length > 20){
                    this.$dispatch("showtip",this.$i18n("flower_b_3"));
                }else{
                    this.titlename = this.$i18n("flower_b_4");
                    this.nickname = db.get("nickname") || this.$i18n("flower_b_5");
                    this.articename = this.$i18n("flower_b_6");
                    this.numchange = this.fillrewardnum || 1 ;
                    let bluetoothstatus = db.get("bluetoothStatus");
                    console.log("bluetoothstatus",bluetoothstatus);
                    if(bluetoothstatus == 0){
                        if(!this.fillrewardnum){
                            this.fillrewardnum = 1;
                        }
                    this.$refs.mask.showMark(true);
                    this.isOkFlowersPop = true;
                    this.isOkTitle = this.$i18n("flower_b_7");
                    this.isOkArtice = this.fillrewardtext || this.$i18n("flower_b_8");
                    }else{
                        this.$dispatch("showtip",this.$i18n("bluetooth_connect"));
                    }
                }
            },
            wish_flowers(){
                if(!this.fillwishnum){
                    this.fillwishnum = 1;
                }
                if((/^[1-9]+[0-9]*$/).test(this.fillwishnum) && this.fillwishnum > this.flowersdata.current_num){
                    this.$dispatch("showtip",this.$i18n("flower_b_9"));
                    this.fillwishnum = "";
                }else if(!(/^[1-9]+[0-9]*$/).test(this.fillwishnum)){
                    this.$dispatch("showtip",this.$i18n("flower_b_10"));
                    this.fillwishnum = "";
                }else if(this.fillwishtext.length > 20){
                    this.$dispatch("showtip",this.$i18n("flower_b_11"));
                }else{
                    this.titlename = this.$i18n("flower_b_12");
                    this.nickname = db.get("nickname") || this.$i18n("flower_b_5");
                    this.articename = this.$i18n("flower_b_13");
                    this.numchange = this.fillwishnum || 1;
                    let bluetoothstatus = db.get("bluetoothStatus");
                    if(bluetoothstatus == 0){
                        if(!this.fillwishnum){
                            this.fillwishnum = 1;
                        }
                    this.$refs.mask.showMark(true);
                    this.isOkFlowersPop = true;
                    this.isOkTitle = this.$i18n("flower_b_14");
                    this.isOkArtice = this.fillwishtext || this.$i18n("flower_b_15");
                    }else{
                        this.$dispatch("showtip",this.$i18n("bluetooth_connect"));
                    }
                }
            },
            settingsFlowersSuccess(data){
                console.log("settingsFlowersSuccess",data);
                if(data.http_code == 200){
                    this.update();
                    this.$refs.mask.showMark(true);
                    this.isPop = true;
                }
            },
            settingsFlowersError(error){
                console.log(error);
            },
            ok_btn(){
                this.$refs.mask.showMark(false);
                this.isPop = false;
            },
            cancel_btn(){
                this.$refs.mask.showMark(false);
                this.isOkFlowersPop = false;
            },
            isokbtn(){
                this.$refs.mask.showMark(false);
                this.isOkFlowersPop = false;
                if(this.titlename == this.$i18n("flower_b_4")){

                    let rewardtext = this.fillrewardtext || this.$i18n("flower_b_8");
                    let device_id = db.get("device_id");
                    let flowers_info_config = {
                        device_id:device_id,
                        current_num:this.flowersdata.current_num,
                        num_info:this.numchange,
                        action:"add_num",

                    };
                    jsb.syncWriteFlowers(flowers_info_config, device_id,
                        () => {
                            setTimeout(() => {
                                this.fillrewardtext = "";
                                this.fillrewardnum = "";
                                //奖励时通知服务器传递的参数
                                let settings_flowers_config = {
                                    type:1,
                                    num:this.numchange,
                                    remark:rewardtext,
                                };
                                flowersService.settingsFlowers(settings_flowers_config,this.settingsFlowersSuccess,this.settingsFlowersError);
                            }, 500);
                        },

                        () => {
                            this.$dispatch("showtip",this.$i18n("flower_b_17"));
                        }
                    );
                }else{
                    let wishtext = this.fillwishtext || this.$i18n("flower_b_15");
                    let device_id = db.get("device_id");
                    let flowers_info_config = {
                        device_id:device_id,
                        current_num:this.flowersdata.current_num,
                        num_info:this.numchange,
                        action:"minus_num",
                    };
                    jsb.syncWriteFlowers(flowers_info_config, device_id,
                        () => {
                            setTimeout(() => {
                                this.fillwishtext = "";
                                this.fillwishnum = "";
                                //奖励时通知服务器传递的参数
                                let settings_flowers_config = {
                                    type:2,
                                    num:this.numchange,
                                    remark:wishtext,
                                };
                                flowersService.settingsFlowers(settings_flowers_config,this.settingsFlowersSuccess,this.settingsFlowersError);
                            }, 500);
                        },

                        () => {
                            this.$dispatch("showtip",this.$i18n("flower_b_18"));
                        }
                    );
                }
            },
            openFlowersTip(){
                this.$refs.mask.showMark(true);
                this.flowersTip = true;
            },
            closeFlowersTip(){
                this.$refs.mask.showMark(false);
                this.flowersTip = false;
            },
        }
    };
</script>

<style scoped>
    .flowers{padding:.8rem;}
    .flowers .flowers_top{background: #fff; position:relative; border-radius:5px; border:1px solid #ebebeb;}
    .flowers .flowers_top a{display:inline-block; position:absolute; font-size: 1rem; color:#B758D7; top:1rem; right:1rem;}
    .flowers .flowers_top .img_pic{ text-align: center;}
    .flowers .flowers_top .img_pic img{display: block; width:20%; margin:1rem auto;}
    .flowers .flowers_top .num_info{text-align: center; font-size: 1rem; color:#000; padding-bottom:1rem;}
    .flowers .flowers_top .btn_info{padding:.6rem 0; border-top:1px solid #ebebeb; font-size: 0.9rem; color:#000; text-align: center;}
    .flowers .flowers_top .btn_info img{display:inline-block; width:7%; position: relative; top:.22rem; right:.4rem;}
    .flowers .flowers_bottom{background: #fff; margin-top:1rem; border-radius:5px; border:1px solid #dcdcdc;}
    .flowers .flowers_bottom .flowers_menu{border-bottom:1px solid #ebebeb; overflow:hidden;}
    .flowers .flowers_bottom .flowers_menu a{display:inline-block; width:50%; font-size: 1rem; color:rgba(0,0,0,0.5); text-align: center; float:left; padding:.6rem 0; background:rgba(0,0,0,0.04);}
    .flowers .flowers_bottom .flowers_menu a.act{background:#fff; color:#B758D7;}
    .flowers .flowers_con{padding:1rem;}
    .flowers .flowers_con .reward_con .input_num{position:relative; padding:0 .8rem;  background:rgba(0,0,0,0.04);}
    .flowers .flowers_con .reward_con .input_num span{position:absolute; font-size: .9rem; right:1rem; top:.8rem; color:#000;}
    .flowers .flowers_con .reward_con .input_num input{display:inline-block; outline:none; width:90%; text-align: left; border:none; background:none; font-size: .8rem; padding:1rem 0;}
    .flowers .flowers_con .reward_con .input_text{margin-top:1rem;  background:rgba(0,0,0,0.04); outline: none; padding:1rem 5%; overflow:hidden; height:auto; font-size:.8rem; display:block; width:90%; border:none;}
    .flowers .flowers_con .reward_con .btn_wrap{ margin-top:1.6rem;}
    .flowers .flowers_con .reward_con .btn_wrap p{ text-align: center; font-size: .8rem; color:rgba(0,0,0,0.3); padding:.5rem 0;}
    .flowers .flowers_con .reward_con .btn_wrap a{display:block; width:100%; font-weight: bold; padding:.5rem 0; text-align: center; font-size: 1rem; border-radius:5px; color:#fff; background:#B758D7;}
    .flowers .flowers_con .reward_con .btn_wrap a:active{opacity:0.8;}

    .flowers .flowers_con .wish_con .input_num{position:relative; padding:0 .8rem;  background:rgba(0,0,0,0.04);}
    .flowers .flowers_con .wish_con .input_num span{position:absolute; font-size: .9rem; right:1rem; top:.8rem; color:#000;}
    .flowers .flowers_con .wish_con .input_num input{display:inline-block; outline:none; width:90%; text-align: left; border:none; background:none; font-size: .8rem; padding:1rem 0;}
    .flowers .flowers_con .wish_con .input_text{margin-top:1rem;  background:rgba(0,0,0,0.04); outline: none; padding:1rem 5%; font-size: .8rem; display:block; width:90%; border:none; }
    .flowers .flowers_con .wish_con .btn_wrap{ margin-top:1.6rem;}
    .flowers .flowers_con .wish_con .btn_wrap p{ text-align: center; font-size: .8rem; color:rgba(0,0,0,0.3); padding:.5rem 0;}
    .flowers .flowers_con .wish_con .btn_wrap a{display:block; width:100%; font-weight: bold; padding:.5rem 0; text-align: center; font-size:1rem; border-radius:5px; color:#fff; background:#4EC656;}
    .flowers .flowers_con .wish_con .btn_wrap a:active{opacity: 0.8;}
    .flowers .flowers_pop{ position:fixed; width:84%; left:8%; top:25%; background:#fff; border-radius:5px; z-index: 111;}
    .flowers .flowers_pop .title{text-align: center; padding:1rem 0 0.6rem 0; font-size: 1rem; color:#000; font-weight: bold;}
    .flowers .flowers_pop .artice{text-align: center; font-size: 1rem; padding:.5rem .5rem;}
    .flowers .flowers_pop .artice span{color:#B758D7;}
    .flowers .flowers_pop .num_change{ text-align: center; color:#B758D7; font-size: 1.2rem;}
    .flowers .flowers_pop .num_change img{display:inline-block; width:1.2rem; position:relative; top:.2rem;}
    .flowers .flowers_pop .num_change span{display:inline-block; padding:0 .6rem}
    .flowers .flowers_pop .ok_btn{width:60%; margin:1rem auto; display:block; text-align: center; color:#fff; font-size:1rem; background:#B758D7; padding:.4rem 0; border-radius:5px;}
    .mark_info{position:fixed; top:0%; z-index: 103; left:0%; width:100%; height:100%; background:rgba(0,0,0,0.7);}
    .flowers_tip{ position:absolute; width:100%; color:#fff; height:100%; top:5%; z-index: 120; left:0;}
    .flowers_tip .title{font-size: 1rem; font-weight: bold; padding:2rem 1rem 1rem 1rem;}
    .flowers_tip .con{font-size: .875rem; padding:0rem 1rem;}
    .flowers_tip .color{color:#FFF469; margin-top:1rem;}
    .flowers_tip a{ display:block; width:3.2rem; height:3.2rem; position:absolute; bottom:4rem; left:50%; margin-left:-1.6rem;
    background:url(~assets/images/btn_50_x_nor@3x.png) no-repeat; background-size: 100% 100%;}

    .flowers .is_flowers_pop .title{font-size: 1rem; padding:1rem 0 .6rem 0;}
    .flowers .is_flowers_pop .btn_wrap { text-align:center;}
    .flowers .is_flowers_pop .btn_wrap .ok_btn{display:inline-block; width:6rem; padding:0.4rem 0; margin:1rem .5rem;}
</style>
