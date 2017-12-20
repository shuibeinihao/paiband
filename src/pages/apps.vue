<template>
    <div class="apps">
        <div class="box_wrapper app_manage" v-for="app in p_appList">
        	<p class="manage_head">
        		<span><img :src="app.icon" alt=""></span>
        		<b>{{ app.name || '这里显示应用的名称' }}</b>
        		<i>{{ app.state || '' }}</i>
        	</p>
            <div class="app-desc">
                <p class="app-title">应用介绍</p>
                <p class="app-intro">{{ app.desc }}</p>
                <p class="app-intro">请使用iPad下载安装游戏。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import service from 'services/apps';

    export default {
        methods: {
            init(width, height) {
                /*service.getAppList(this.p_updateAppList, this.p_updateAppListError);*/
            },

            update(width, height) {
                /*service.getAppList(this.p_updateAppList, this.p_updateAppListError);*/
            },

            p_updateAppListError(error) {
                this.$dispatch('showtip', '获取应用列表失败');
            }
        },

        data() {
            return {
                p_appList: [
                    {
                        icon: require('assets/images/appicon.png'),
                        name: '酷跑护卫队',
                        state: '',
                        desc: '将运动与游戏结合，让孩子足不出户达到一整天所需消耗的运动量。健康专家给予专业数据分析，根据孩子身高体重年龄等各项数据综合提出孩子每天所需消耗的卡路里，以维持健康身形。',
                        down_url: ''
                    }
                ]
            };
        }
    };
</script>

<style scoped>
    /*红色 #ef5361*/
    .apps .app_manage{margin-top:4%;}
    .apps .app_manage .manage_head{overflow:hidden; position:relative; padding:4%; border-bottom:1px solid #e1e1e1;}
    .apps .app_manage .manage_head span{display: inline-block; margin-right:4%; float:left; background: #ccc; border-radius:5px;}
    .apps .app_manage .manage_head span img{display:block; width:2.5rem; height: 2.5rem; border-radius: 5px;}
    .apps .app_manage .manage_head b{color:#646464; display:block;}
    .apps .app_manage .manage_head i{display:block; font-size: 0.7rem; color:#b5b5b5;}
    .apps .app_manage .app-desc {
        padding: 0.5rem 0.3rem;
    }
    .apps .app_manage .app-desc .app-title {}
    .apps .app_manage .app-desc .app-intro {
        font-size: 0.8rem;
        color: #646464;
        word-break: break-all;
    }
    .apps .app_manage .app-desc .app-down {
        display: block;
        font-size: 0.8rem;
        margin: 0.5rem 0;
        background-color: #8c43f6;
        border-radius: 4px;
        color: #FFF;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
    }
    .apps .app_manage .app-desc .app-down.app-disabled {
        background-color: #ccc;
    }

</style>
