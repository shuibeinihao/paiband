<style scoped>
    .paibandfaq{padding:0 1.2rem;}
    .paibandfaq .title_info{font-size: 1rem; padding-bottom:2px; margin-bottom:2px; color:#000; border-bottom:1px solid #999; margin-top:1.5rem;}
    .paibandfaq .con{font-size: .9rem; line-height: 22px;color:rgb(89, 89, 89);}
    .paibandfaq .con span{display: block; line-height: 22px;}
    .paibandfaq .title{font-size: .9rem; padding:4px 0; color:rgb(112, 48, 160); text-align: 
        center;}
    .paibandfaq .gif_img{display:block;}
    .paibandfaq .gif_img img{display:block; width:100%; margin:1rem auto 0 auto;}
    .paibandfaq .text_info{text-align:center; display:block; color:blue;}
</style>

<template>
    <div class="paibandfaq">
        <p class="title_info">{{$i18n("faq_grow_title")}}</p>
        <p class="con">{{$i18n("faq_grow_1")}}</p>
        <p class="title">{{$i18n("faq_sport_title")}}</p>
        <p class="con">{{$i18n("faq_sport_1")}}</p>
        <p class="title">{{$i18n("faq_sleep_title")}}</p>
        <p class="con">{{$i18n("faq_sleep_1")}}</p>
        <p class="title">{{$i18n("faq_heart_title")}}</p>
        <p class="con">{{$i18n("faq_heart_1")}}</p>
        <p class="title">{{$i18n("faq_expert_title")}}</p>
        <p class="con">{{$i18n("faq_expert_1")}}</p>
        <p class="title_info">{{$i18n("faq_achive")}}</p>
        <p class="title">{{$i18n("faq_achive_title")}}</p>
        <p class="con">
            <span>{{$i18n("faq_achive_1")}}
            </span>
            <span>
                {{$i18n("faq_achive_2")}}
            </span>
        </p>
        <p class="title_info"> {{$i18n("faq_other_title")}}</p>
        <p class="con"> {{$i18n("faq_other_1")}}</p>
        <p class="title">{{$i18n("faq_clock_title")}}</p>
        <p class="con">{{$i18n("faq_clock_1")}}</p>
        <p class="title">{{$i18n("faq_security_title")}}</p>
        <p class="con">{{$i18n("faq_security_1")}}</p>
        <p class="title">{{$i18n("faq_setting_title")}}</p>
        <p class="con">{{$i18n("faq_setting_1")}}</p>
        <p class="title">{{$i18n("faq_mypaiband_title")}}</p>
        <p class="con">{{$i18n("faq_mypaiband_1")}}</p>
        <p class="title_info">{{$i18n("faq_question")}}</p>
        <p class="title">{{$i18n("faq_q_1")}}</p>
        <p class="con">{{$i18n("faq_a_1_1")}}</p>
        <div>
            <a href="http://v.qq.com/x/page/c03570t6gqr.html" target="_blank" class="gif_img"><img src="~assets/images/up_wrist.gif" alt=""></a>
            <a href="http://v.qq.com/x/page/c03570t6gqr.html" target="_blank" class="con text_info">{{$i18n("paibandfaq_1")}}</a>
            <a href="http://v.qq.com/x/page/e0357yesen7.html" target="_blank" class="gif_img"><img src="~assets/images/wrist.gif" alt=""></a>
            <a href="http://v.qq.com/x/page/e0357yesen7.html" target="_blank" class="con text_info">{{$i18n("paibandfaq_2")}}</a>
            <a href="http://v.qq.com/x/page/v0357kg69hm.html" target="_blank" class="gif_img"><img src="~assets/images/double_click.gif" alt=""></a>
            <a href="http://v.qq.com/x/page/v0357kg69hm.html" target="_blank" class="con text_info">{{$i18n("paibandfaq_3")}}</a>
        </div>
        <p class="title">{{$i18n("faq_q_2")}}</p>
        <p class="con">{{$i18n("faq_a_2_1")}}</p>
        <p class="title">{{$i18n("faq_q_3")}}</p>
        <p class="con">{{$i18n("faq_a_3_1")}}</p>
        <p class="title">{{$i18n("faq_q_4")}}</p>
        <p class="con">{{$i18n("faq_a_4_1")}}</p>
        <p class="title">{{$i18n("faq_q_5")}}</p>
        <p class="con">{{$i18n("faq_q_5_1")}}</p>
        <p class="title">{{$i18n("faq_q_6")}}</p>
        <p class="con">{{$i18n("faq_a_6_1")}}</p>
        <p class="title_info">{{$i18n("faq_service_title")}}</p>
        <p class="con">{{$i18n("faq_service_1")}}<br><br><a href="tel:400-920-6161">{{$i18n("faq_service_2")}}</a><br>{{$i18n("faq_service_3")}}</p>
    </div>
</template>

<script>
export default {
  	data(){
  		return{
  		}
  	},
  	methods:{
        init(width, height) {
        },
        update (width, height) {
        },
    }
};
</script>


