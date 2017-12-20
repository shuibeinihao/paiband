
<template>
    <div class="container">
        <header class="starstype">{{$i18n("task_current_star")}}</header>
        <p class="band_level">{{level}}</p>
        <footer class="starstype">{{{$i18n("task_star_miss_l")}}}{{also_need}}个<span><img src="~assets/images/icon_12_07@3x.png" alt=""></span>{{$i18n("task_star_miss_r")}}</footer>
    </div>
</template>

<script>
    import service from 'services/achive';
    export default {
        data(){
            return{
                level: 0, //手环星级
                next_level_require: 0,  //下一等级升级所需星星数
                next_level_already_has:0, //下一等级升级已获得星星数
                also_need:0,  //到下一等级还需要多少颗星
                totalStars:0, //总共获得的星数
                completedata:0 // 升级完成率
            }
        },

        methods: {
            getData(width, height) {
                service.getCommonData( this.updateCommonData , this.updateError )
            },

            updateCommonData(data) {
                console.log(data)
                if (data.http_code == 200) {
                    this.level = data.data.common_level.level || 0;
                    this.next_level_require = data.data.common_level.next_level_require || 0;
                    this.next_level_already_has = data.data.common_level.next_level_already_has || 0;
                    this.totalStars = data.data.common_level.total_stars || 0;
                    //计算升级已经完成率
                    this.completedata = this.next_level_require&&this.next_level_already_has/this.next_level_require;
                    //计算距离升级还需要的星数
                    this.also_need = this.next_level_require-this.next_level_already_has;
                    if (this.also_need < 0) {
                        this.also_need = 0;
                        this.level ++ ;
                    }
                };
                this.$dispatch('transmit-rankdetail',this.totalStars, this.completedata);
            },

            updateError(error){
              console.log('updataCommonData',error)
            }
        }
    };
</script>

<style scoped>
 /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
  /*公用*/

    body{ color:#313131;}
    .container{text-align: center;color: #fff;height: 4.2666666667rem;padding-top: 2.2rem;}
    .container .starstype{font-size: 0.6866666667rem; color:#fff;}
    .container .starstype span{display:inline;}
    .container .starstype span img{width:.7rem;}
    .container .band_level{font-size: 2rem;font-family: AkzidenzGrotesk;}
</style>

