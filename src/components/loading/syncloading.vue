<template>
    <div class="sync-loading" v-show="isShow" :class="{'isBg':isBg}"  transition="drop">
        <span class="loading-state-logo" :class="logoState"></span>
        <span class="loading-state-txt">{{ txt }}
            <p v-show="isBatteryShow">
                <b>{{batteryinfo || "N/A"}}%</b>
                <span>
                    <i :style="{ width: (batteryinfo/100)*24 + 'px'}" :class="{'batteyred':batteryred}"></i>
                </span>
            </p>
        </span>
        <span class="loading-sync" :class="{'isSync':isSync}" v-show="resync" @click="resyncCall">{{$i18n("btn_name_retry")}}</span>
    </div>
</template>

<script>
    export default {
        methods: {
            /*
            * config {
            *     mode: 'sync' 'ok' 'fail' 'overtime'
            *     resyncback: 重试回调
            * }
            */
            showLoading(config) {
                console.log("config",config);
                switch(config.mode) {
                    case 'ok':
                        this.logoState.sync = false;
                        this.logoState.ok = true;
                        this.logoState.fail = false;
                        this.txt = this.$i18n("syncdata_success");
                        this.resync = false;
                        break;
                    case 'fail':
                        this.logoState.sync = false;
                        this.logoState.ok = false;
                        this.logoState.fail = true;
                        this.txt = this.$i18n("syncdata_fail");
                        this.resync = !!config.resyncback;
                        break;
                    case 'overtime':
                        this.logoState.sync = false;
                        this.logoState.ok = false;
                        this.logoState.fail = true;
                        this.txt = this.$i18n("syncdata_timeout");
                        this.resync = !!config.resyncback;
                        break;
                    case 'sync':
                    default:
                        this.logoState.sync = true;
                        this.logoState.ok = false;
                        this.logoState.fail = false;
                        this.txt = this.$i18n("syncdata_processing");
                        this.resync = false;
                }
                const resyncbk = config.resyncback;
                resyncbk && typeof resyncbk === 'function' && (this.resyncback = resyncbk);
                this.isShow = true;
                this.isBg = false;
            },

            isOther(){
                this.isBatteryShow = false;
                this.isSync = true;
                this.isBg = true;
                console.log(this.resync);
            },

            reClock(){
                this.isBg = false;
                this.isBatteryShow = true;
                this.isSync = false;
            },

            hideLoading() {
                this.resyncback = undefined;
                this.isShow = false;
                this.reClock();
            },

            updateBatter(power){
                this.batteryinfo = power;
            },

            resyncCall() {
                this.resyncback && typeof this.resyncback === 'function' && this.resyncback();
            },
        },

        computed:{
            batteryred(){
                if(this.batteryinfo < 21){
                    return true;
                }else{
                    return false;
                }
            },
            // batterywidth(){
            //     return 24/this.batteryinfo
            // },
        },

        data() {
            return {
                resync:false,
                resyncback: undefined,
                isShow: false,
                sync: false,
                isBatteryShow:true,
                isSync:false,//别的页面需要显示重试按钮不要显示电量的时候
                isBg:false,//换背景
                txt: this.$i18n("syncdata_processing"),
                batteryinfo:"",
                logoState: {
                    'sync': true,
                    'ok': false,
                    'fail': false
                }
            };
        }
    };
</script>

<style scoped>
    .sync-loading {
        width: 100%;
        height: 2.2rem;
        position: fixed;
        top: 0rem;
        background-color: rgba(139, 73, 246, 0.8);
        z-index: 102;
    }

    .isBg{background-color: rgba(254, 79, 49, 0.9);}
    .sync-loading .loading-state-logo {
        width: 1.6rem;
        height: 1.6rem;
        display: inline-block;
        float: left;
        margin: 0.35rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @-webkit-keyframes rotate {
        from { -webkit-transform: rotate(0deg); }
        to { -webkit-transform: rotate(360deg); }
    }
    .sync-loading .loading-state-logo.sync {
        animation: rotate 1s linear 0s infinite;
        -webkit-animation: rotate 1s linear 0s infinite;
        background-image: url('~assets/images/snyc_success.png');
    }
    .sync-loading .loading-state-logo.ok {
        background-image: url('~assets/images/icon_30_11@3.png');
    }
    .sync-loading .loading-state-logo.fail {
        background-image: url('~assets/images/snyc_error.png');
        width: 1.4rem;
        height: 1.4rem;
    }
    .sync-loading .loading-state-txt {
        height: 100%;
        display:block;
        text-align: left;
        line-height: 2.2rem;
        color: #FFF;
    }
    .sync-loading .loading-state-txt span{
        display:inline-block; 
        margin:auto;
        position:absolute;
        right:1.2rem;
        bottom:0;
        top:0;
        width:1.5rem;
        height:.6rem; 
        border-radius:2px;
        border:1px solid #fff;
    }
    .sync-loading .loading-state-txt b{
        display:inline-block; 
        margin:auto;
        position:absolute;
        right:3.2rem;
        bottom:0;
        top:0;
        width:2.5rem;
        height:.6rem; 
        line-height: .7rem;
        font-size: .6rem;
        text-align: right;
    }
    .sync-loading .loading-state-txt i{
        display:inline-block; 
        position:absolute;
        left:0;
        top:0;
        height:100%; 
        border-radius:2px;
        background:#ccc;
        background:#6add74;
    }
    .sync-loading .loading-state-txt .batteyred{
        background:#ff6200;
    }

    .sync-loading .loading-state-txt span:after{
        content: "";
        width:1px;
        height:.4rem;
        background:#fff;
        position:absolute;
        right:-3px;
        top:2px;
    }
    .sync-loading .loading-state-txt span:before{
        content: "";
        width:1px;
        height:.3rem;
        background:#fff;
        position:absolute;
        right:-4.6px;
        top:3px;
    }
    .sync-loading .loading-resync {
        width: 3rem;
        height: 1rem;
        background-color: #FFF;
        display: inline-block;
        margin:auto 0;
        position:absolute;
        top:0;
        right:4rem;
        bottom:0;
        border-radius: 1rem;
        color: #8c3ffa;
        font-size: 0.7rem;
    }
    .sync-loading .loading-sync {
        width: 3rem;
        height: 1rem;
        display: inline-block;
        margin:auto 0;
        position:absolute;
        top:0;
        right:4rem;
        bottom:0;
        border-radius: 1rem;
        border:1px solid #fff;
        color: #fff;
        text-align: center;
        font-size: 0.7rem;
    }
    .sync-loading .isSync{right:1rem;}
    .sync-loading .loading-sync:after {
        clear: both;
    }
    .sync-loading .loading-resync:after {
        clear: both;
    }
    .sync-loading .loading-resync i {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        float: left;
        margin-left: 0.1rem;
        background-image: url('~assets/images/icon_16_45@3x.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .drop-transition {
        transition: all 0.5s linear;
        top: 0rem;
    }
    .drop-enter {
        top:-2.8rem;
    }
    .drop-leave {
        top:  -2.8rem;
    }
</style>
