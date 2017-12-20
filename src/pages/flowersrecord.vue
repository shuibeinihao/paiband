
<style scoped>
    .flowers_record{padding:.6rem;}
    .flowers_record .record_box{background: #fff; margin-bottom:.6rem; border-radius:5px; border:1px solid #dcdcdc;}
    .flowers_record .record_box .list_con{padding:1rem; border-top:1px solid #ebebeb; overflow:hidden; font-size: .9rem; text-align: right;}
    .flowers_record .record_box .list_con:nth-child(1){border:none;}
    .flowers_record .record_box .list_con span{float:left; color:#B758D7;}
    .flowers_record .record_box .list_con span.color{color:#4EC656;}
    .flowers_record .record_box .list_con span img{display: inline-block; width:1.2rem; position: relative; top:.2rem; left:.5rem;}
    .flowers_record .record_box .list_con b{font-weight: bold; font-size: 1.2rem; padding-right:.8rem;}
    .flowers_record .record_box .list_con i{position:relative; bottom:.05rem;}
    .flowers_record .record_box .record_box_con{padding:1rem; border-top:1px solid #ebebeb; overflow:hidden;}
    .flowers_record .record_box .record_box_con:nth-child(1){border:none;}
    .flowers_record .record_box .record_box_con .title{font-size: 1rem; color:#B758D7; text-align: left;}
    .flowers_record .record_box .record_box_con .time{overflow:hidden; text-align: right; margin-top:.5rem;}
    .flowers_record .record_box .record_box_con .time .time_con{float:left; position:relative; top:.2rem; font-size: .9rem;}
    .flowers_record .record_box .record_box_con .time .addmin{font-size: 1.2rem; color:#B758D7; padding-right:.8rem;}
    .flowers_record .record_box .record_box_con .time .addmin b{ font-weight: bold;}
    .flowers_record .record_box .record_box_con .time i{font-size:.9rem;position:relative; bottom:.05rem; }
    .flowers_record .record_box .min_info .title{ color:#4EC656;}
    .flowers_record .record_box .min_info .time .addmin{ color:#4EC656;}
</style>

<template>
    <div class="flowers_record" v-on:touchstart="loadMoreStart($event)" v-on:touchmove="loadMoreMove($event)" v-on:touchend="loadMoreEnd($event)">
        <div class="record_box">
            <p class="list_con">
                <span>{{$i18n("flower_hostory_have")}}<img src="~assets/images/icon_largeflower.png" alt=""></span><b>{{flowersdata.reward_num}}</b><i>{{$i18n("flower_duo")}}</i>
            </p>
            <p class="list_con">
                <span>{{$i18n("flower_reward1")}}</span><b>{{flowersdata.reward_times}}</b><i>{{$i18n("flower_times")}}</i>
            </p>
        </div>
        <div class="record_box">
            <p class="list_con">
                <span class="color">{{$i18n("flower_hostory_exchange")}}<img src="~assets/images/icon_largeflower.png" alt=""></span><b>{{flowersdata.exchange_num}}</b>{{$i18n("flower_duo")}}
            </p>
            <p class="list_con">
                <span>{{$i18n("flower_wish_exchange")}}</span><b>{{flowersdata.exchange_times}}</b><i>{{$i18n("flower_times")}}</i>
            </p>
        </div>
        <div class="record_box">
            <div class="record_box_con" :class="{'min_info':flowersrecord.type == 2}" v-for="flowersrecord in flowersdatalist">
               <p class="title"><span v-if="flowersrecord.type == 1">{{$i18n("flower_reward")}}</span><span v-else>{{$i18n("flower_wish")}}</span>{{flowersrecord.remark}}</p>
               <p class="time"><span class="time_con">{{flowersrecord.create_time}}</span> <span class="addmin"><label v-if="flowersrecord.type == 1">+</label><label v-else>-</label><b>{{flowersrecord.num}}</b></span><i>{{$i18n("flower_duo")}}</i></p>
            </div>
        </div>
    </div>
</template>

<script>
    import flowersService from 'services/flowers';
    export default {
        data(){
            return{
                flowersdata:{},//小红花数据
                flowersdatalist:{},//列表
                pagesize:5,
                page:1,
                mx:0,
                me:0,
                total:0,
            }
        },
        methods: {
            init(width, height) {
                //获得孩子当前小红花数据
                flowersService.getFlowers(this.getFlowersSuccess,this.getFlowersError);
                //小红花奖励/兑换记录列表
                flowersService.getFlowersList(this.page,this.pagesize,this.getFlowersListSuccess,this.getFlowersListError);
            },
            update(width, height) {
                //获得孩子当前小红花数据
                flowersService.getFlowers(this.getFlowersSuccess,this.getFlowersError);
                //小红花奖励/兑换记录列表
                flowersService.getFlowersList(this.page,this.pagesize,this.getFlowersListSuccess,this.getFlowersListError);
            },
            getFlowersSuccess(data){
                console.log("getFlowersSuccess",data);
                if(data.http_code == 200){
                    this.flowersdata = data.data;
                }else{
                    console.log("flowers数据获取失败");
                }
            },
            getFlowersListSuccess(data){
                console.log("getFlowersListSuccess",data);
                if (data.http_code == 200) {
                    this.total = data.data.totals;
                    console.log(this.total);
                    this.flowersdatalist = data.data.data;
                }else{
                    console.log("list数据获取失败");
                }
            },
            getFlowersError(error){
                console.log(error);
            },
            getFlowersListError(error){
                console.log(error);
            },
            loadMoreStart(event){
               this.mx = event.touches[0].pageY;
            },
            loadMoreMove(event){
                this.me = this.mx-event.touches[0].pageY;
            },
            loadMoreEnd(event){
                if(this.me > 100){ // 右移动 10 个像素以上
                    if(this.pagesize < this.total) {
                        this.pagesize = this.pagesize + 5;
                        console.log(this.pagesize,this.total);
                        this.update();
                    }else{
                        if(this.total > 20){
                            this.$dispatch("showtip",this.$i18n("flower_hostory_null"));
                        }
                        return false;
                    }
                }else if(this.me < -50){// 左移动
                      console.log("右");
                }else{// 没动
                      console.log("原地");
                }
            },
        }
    };
</script>







