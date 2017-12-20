<style scoped>
    .mypaiband{height:35rem;}
    .mypaiband p{ padding:1.2rem 0rem .5rem 1rem; color:#646464; text-align: left; font-size: 0.875rem;}
    .mypaiband .qrcodewrap{ background:#fff; overflow: hidden;}
    .mypaiband .qrcodewrap .qrcode_img{width:10rem; clear:both; height:10rem; margin:1rem auto; display:block; background:#ebebeb; overflow: hidden;}
    .mypaiband .qrcodewrap .qrcode_img img{display:block; width:100%; height:100%; border:none;}
    .mypaiband .qrcodewrap .qrcode_img b{ float:left; width:100%; font-size: 1rem; color:#959595; display:block; text-align: center; line-height: 10rem;}
    .mypaiband .qrcodewrap a{ display:block; padding:.2rem 0 1.2rem 0; font-size: 0.875rem; text-align: center; color:#959595;}
    .mypaiband .qrcodewrap .save_pic{display:block; padding:.6rem 0; border-top:1px solid #e1e1e1; text-align: center; color:#959595; font-size: 1rem;}
    .mypaiband .qrcodewrap .save_pic.color{color:#8B49F6;}

    .mypaiband .list_wrap{margin-top:1.2rem; background:#fff;}
    .mypaiband .list_wrap a{display:block; padding:.6rem; overflow: hidden; font-size: 1rem; color:#313131;}
    .mypaiband .list_wrap a b{ float: right; color:#959595;}
    .mypaiband .list_wrap .link_info{ border-top:1px solid #e1e1e1; background:url(~assets/images/right_icon.png) no-repeat scroll 97% center; background-size: .6rem;
    }

</style>

<template>
    <div class="mypaiband">
<<<<<<< HEAD
        <p  v-link="{name:'paibandfaq'}">{{$i18n('mypaiband_title')}}</p>
        <a href="javascript:;" class="color" v-link="{name:'paibandfaq'}">{{$i18n('mypaiband_faq')}}</a>
        
        <p>{{$i18n('mypaiband_qrcode')}}</p>
        <a href="javascript:;" style="text-align:left">{{$i18n('mypaiband_tip_save')}}</a>
        <span @click="savePic" v-show="isImg"><img :src="qrcode" alt=""></span>
        <span @click="savePic" v-show="isImg">{{$i18n('mypaiband_save')}}</span>

        <a style="padding-top:2.5rem;">{{$i18n('mypaiband_version')}}<br>{{version || $i18n('mypaiband_noversion')}}</a>
        <p style="padding:5rem 0"></p>

        <!-- <div class="unbind_btn" @click="unBindInfo"><a href="javascript:;">解除绑定</a></div> -->


=======
        <p>{{$i18n("mypaiband_qrcode")}}</p>
        <div class="qrcodewrap">
            <span @click="savePic" class="qrcode_img">
                <img :src="qrcode" alt=""  v-show="isImg"> 
                <b v-show="isError">{{$i18n("mypaiband_noversion")}}</b>
            </span>
            <a href="javascript:;">{{$i18n("mypaiband_save")}}</a>
            <span class="save_pic" :class="{'color':isImg}" @click="savePic">{{$i18n("mypaiband_tip_save")}}</span>
        </div>

        <div class="list_wrap">
            <a>{{$i18n("mypaiband_version")}}<b>{{version || $i18n("mypaiband_noversion")}}<b></a>
            <a href="javascript:;" class="link_info" v-link="{name:'paibandfaq'}">{{$i18n("mypaiband_title")}}</a>
        </div>
>>>>>>> i18n_test
    </div>
</template>

<script>
import jutils from 'jutils';
import db from 'dbs/hashmap';
import jsb from  'services/jsb';
export default {
  	data(){
  		return{
            isImg:false,
            version:"",
            qrcode:"",
            isError:false,
  		}
  	},
  	methods:{
        init(width, height) {
            this.getVersionQrcode();
        },

        update (width, height) {
            this.getVersionQrcode();
        },

        savePic(){
            if(this.isImg == false){
                return;
            }
            jsb.savePic((data)=>{
                console.log(data);
            });
        },

        getVersionQrcode(){
            this.version = db.get("version");
            this.qrcode = db.get("qrcode");
            if(this.qrcode){
                this.isImg = true;
            }else{
                this.isError = true;
            }
        },
    }
};
</script>


