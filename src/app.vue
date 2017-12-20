<template>
    <div class="wrapper">
       <!--  <paiband-header v-ref:header  @childinfo-loaded="childInfoLoaded" @closeweb="closeWeb"  @togglemark="showmask" @history-goback="historyBack" @showalert="showalert" @closealert="closeAlert" @showtip = "showtip" @showloading = "showloading" @closeloading = "closeloading" ></paiband-header> -->
        <paiband-content v-ref:content :class="{ 'noSlide':isMaskShow }" @showalert="showalert" @closealert="closeAlert" @toptextinfo="toptextinfo" @noslide = "noSlideInfo" @showtip = "showtip" @togglemark="showmask"  @show-sync-loading = "showSyncLoading" @hide-sync-loading = "hideSyncLoading"></paiband-content>
       <!--  <paiband-footer v-ref:footer v-show="isFooterShow" @page-change="pageChange"></paiband-footer>
        <paiband-footer-menu v-ref:menu @page-change="pageChange" @togglemark="showmask"></paiband-footer-menu> -->
        <paiband-mask v-ref:mask></paiband-mask>
        <paiband-alert v-ref:alert @closeinfo = "closemask"></paiband-alert>
        <paiband-tip v-ref:tip @closetipinfo = "closemask"></paiband-tip>
        <!-- <paiband-loading v-ref:loading @closeloadinginfo = "closemask"></paiband-loading> -->
        <paiband-syncloading v-ref:sync-loading></paiband-syncloading>
        <div class="global-transparent-mask" v-show="isGlobalTransMaskShow"></div>
    </div>
</template>

<script>
    // import paibandHeader from 'components/header';
    import paibandContent from 'components/content';
    // import paibandFooter from 'components/footer';
    // import paibandFooterMenu from 'components/footer/menu';
    import paibandMask from 'components/mask';
    import paibandAlert from 'components/alert';
    import paibandTip from 'components/tip';
    // import paibandLoading from 'components/loading';
    import paibandSyncloading from 'components/loading/syncloading';

    import router from 'router';

    import db from 'dbs/hashmap';
    // import appService from 'services';
    import jsb from 'services/jsb';
    // import syncService from 'services/sync';
    import expert from "services/expert";
    import service from 'services';

    export default {
        components: { paibandContent, paibandMask ,paibandAlert ,paibandTip, paibandSyncloading},

        methods: {

            historyBack() {
                if(this.routerHistory.length) {
                    this.needHistoryBack = true;
                    router.go(this.routerHistory.pop());
                } else {
                    this.closeWeb();
                }
            },

            closeWeb() {

                // if(db.get("appCloseWebCalls")){
                //     //传入完成时执行函数
                //     db.get("appCloseWebCalls")[0]((successcallb)=>{
                //         this.showalert({
                //             alert_content: '<p>安全距离开启中，是否要退出。<p>',
                //             btns: [
                //                 { btn_name: '取消' },
                //                 {
                //                     btn_name: '确定',
                //                     callback: () => {
                //                         //安全距离页面成功之后通知app开关状态
                //                         if(successcallb && typeof successcallb === "function"){
                //                             successcallb();
                //                             jsb.closeWeb();
                //                         }
                //                     }
                //                 }
                //             ]
                //         });
                //     },()=>{
                //         jsb.closeWeb();
                //     });
                // }else{
                jsb.closeWeb();
                // }
            },


            updateChilrenInfo() {
                /*{*/
                    /*bluetooth: 0 //0已经连接手环 1连接中 2未连接 3未打开蓝牙*/
                /*},*/
                service.getChildrenDevices(data => {
                    console.log("getChildrenDevices",data);
                    if(data['http_code'] !== 200) {
                        this.showtip(this.$i18n("account_error"));
                        return ;
                    }

                    if(data.data.devices.length > 0)  {
                        // this.isListNull = false;
                        const list = data.data.devices;
                        list.forEach(value => Object.assign(value, {
                            'name': value.nickname,
                            'head': value.avatar ? value.avatar : 'static/images/img_head_kid_default@2x.jpg',
                            'age': this.jsGetAge(value.birthday),
                            'select': false,
                            'bluetooth': 3
                        }));
                        this.p_childrenInfo = list;

                        let currentcid = db.get("cid");
                        console.log("currentcid",currentcid);
                        let currentChild = [];
                        for(let i = 0; i<this.p_childrenInfo.length; i++){
                            if(currentcid == this.p_childrenInfo[i].cid){
                                db.set('age', this.p_childrenInfo[i].age);
                                db.set('nickname', this.p_childrenInfo[i].name);
                                db.set('gender', this.p_childrenInfo[i].gender);
                                db.set('cid', this.p_childrenInfo[i].cid);
                                db.set('device_id', this.p_childrenInfo[i].device_id);
                                currentChild.cid = this.p_childrenInfo[i].cid;
                                currentChild.device_id = this.p_childrenInfo[i].device_id;
                            }
                        }
                        this.childInfoLoaded(currentChild.cid,currentChild.device_id);
                        this.jumpPage();
                    } else {
                        console.log("用户信息为空");
                    }
                }, error => {
                    console.log("用户信息获取失败");
                });
            },

            childInfoLoaded(cid,currentdevice_id) {

                //侦听蓝牙状态变更
                jsb.listenBluetoothStatus(data => {
                    if(data.device_id === currentdevice_id) {
                        db.set('bluetoothStatus', data.status);

                        console.log("监听",db.get("bluetoothStatus"));
                        const btCalls = db.get('bluetoothStatusCalls').slice();
                        if(btCalls && btCalls instanceof Array) {
                            for(let i = 0; i < btCalls.length; i++) {
                                btCalls[i] && typeof btCalls[i] === 'function' && btCalls[i]();
                            }
                        }
                    }
                });

                 //获取蓝牙
                jsb.getBluetoothStatus(currentdevice_id, data => {
                    if(data.device_id === currentdevice_id) {
                        db.set('bluetoothStatus', data.status);
                        if(db.get('bluetoothStatusCalls') === undefined) {
                            db.set('bluetoothStatusCalls', []);
                        }

                        const calls = db.get('bluetoothStatusCalls');
                        if(calls.indexOf(this.bluetoothStatusChange) < 0) {

                            calls.push(this.bluetoothStatusChange);
                            if(calls && calls instanceof Array) {
                                for(let i = 0; i < calls.length; i++) {
                                    calls[i] && typeof calls[i] === 'function' && calls[i]();
                                }
                            }
                        }
                    }
                }, error => {
                    this.showtip(this.$i18n("bluetooth_error_state"));
                });
            },

            bluetoothStatusChange() {
                if(db.get('bluetoothStatus') == 0) {
                    this.checkOtaUpdate();
                    const calls = db.get('bluetoothStatusCalls');
                    const idx = calls.indexOf(this.bluetoothStatusChange);
                    if(idx > -1) {
                        calls.splice(idx, 1);
                    }
                }
            },

            checkOtaUpdate(callback) {
                const deviceid = db.get('device_id');
                console.log("deviceid",deviceid);
                jsb.getSystemInfo(deviceid, info => {
                    console.log("info",info);
                    //在同步浮层上显示电量
                    this.$refs.syncLoading.updateBatter(info.battery);
                });
            },

            jumpPage(){
                this.isHeightWeight();
                if(this.lastTransition) {
                    this.p_handleRouterChange(this.lastTransition);
                }
            },

            jsGetAge(strBirthday){
                let returnAge;
                let strBirthdayArr=strBirthday.split("-");
                console.log(strBirthdayArr);
                let birthYear = strBirthdayArr[0];
                let birthMonth = strBirthdayArr[1];
                let birthDay = strBirthdayArr[2];
                let d = new Date();
                let nowYear = d.getFullYear();
                let nowMonth = d.getMonth() + 1;
                let nowDay = d.getDate();

                if(nowYear == birthYear)
                {
                    returnAge = 0;//同年 则为0岁
                }
                else
                {
                    let ageDiff = nowYear - birthYear ; //年之差
                    if(ageDiff > 0)
                    {
                        if(nowMonth == birthMonth)
                        {
                            let dayDiff = nowDay - birthDay;//日之差
                            if(dayDiff < 0)
                            {
                                returnAge = ageDiff - 1;
                            }
                            else
                            {
                                returnAge = ageDiff ;
                            }
                        }
                        else
                        {
                            let monthDiff = nowMonth - birthMonth;//月之差
                            if(monthDiff < 0)
                            {
                                returnAge = ageDiff - 1;
                            }
                            else
                            {
                                returnAge = ageDiff ;
                            }
                        }
                    }
                    else
                    {
                        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return returnAge;//返回周岁年龄
            },

            isHeightWeight(){

                //获取孩子身高记录
                expert.getHeightRecords(undefined,data=>{
                    if(data.http_code == 200){
                        if(data.data.length == 0){
                            setTimeout(()=>{
                                router.go({name:"expert",query: {sta: 1}});
                            },100);
                        }else if(data.data.length > 0){
                            //判断日期大与两个月没有更新的情况
                            var time1 = data.data[data.data.length - 1].time;
                            console.log("data.data",time1);
                            var d = new Date();
                            var time2 = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                            var timesinfo = (this.getDate(time2).getTime()-this.getDate(time1).getTime())/(1000*60*60*24);

                            if(timesinfo > 60){
                                setTimeout(()=>{
                                    router.go({name:"expert",query: {sta: 2}});
                                },1000);
                            }else{
                                expert.getWeightRecords(undefined,data=>{
                                if(data.http_code == 200){
                                    if(data.data.length == 0){
                                        setTimeout(()=>{
                                            router.go({name:"expert",query: {sta: 1}});
                                        },100);
                                    }
                                    else if(data.data.length > 0){
                                        //判断日期大与两个月没有更新的情况
                                        var time1 = data.data[data.data.length - 1].time;
                                        console.log("data.data",time1);
                                        var d = new Date();
                                        var time2 = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                                        var timesinfo = (this.getDate(time2).getTime()-this.getDate(time1).getTime())/(1000*60*60*24);

                                        if(timesinfo > 60){
                                            setTimeout(()=>{
                                                router.go({name:"expert",query: {sta: 2}});
                                            },100);
                                        }
                                    }
                                }else{
                                    console.log("获取体重数据失败,请稍后重试！");
                                }
                                }, error=>{
                                    console.log("获取体重数据失败,请检查网络后重试！");
                                });
                            }
                        }
                    }else{
                        console.log("获取身高数据失败,请稍后重试！");
                    }
                }, error=>{
                    console.log("获取身高数据失败,请检查网络后重试！");
                });
            },

            //判断当前日期与给定日期是否大于两个月
            getDate(strDate){
                if(strDate==null||strDate===undefined) return null;
                    var date = new Date();
                try{
                    if(strDate == undefined){
                        date= null;
                    }else if(typeof strDate == 'string'){
                        strDate = strDate.replace(/:/g,'-');
                        strDate = strDate.replace(/ /g,'-');
                        var dtArr = strDate.split("-");
                    if(dtArr.length>=3&&dtArr.length<6){
                        date=new Date(dtArr[0], dtArr[1], dtArr[2]);
                    }else if(date.length>8){
                        date=new Date(Date.UTC(dtArr[0],dtArr[1]-1,dtArr[2],dtArr[3]-8,dtArr[4],dtArr[5]));
                    }
                    }else{
                        date = null;
                    }
                    return date;
                }catch(e){
                  console.log('格式化日期出现异常：' + e.message);
                }
            },

            //显示遮罩层
            showmask(isShow, flag, clickcall){
                this.$refs.mask.showMark(isShow, flag, clickcall);
            },
            //显示alert
            showalert(text, rightnow){
                this.$refs.alert.showAlert(text, rightnow);
                this.showmask(true,1,this.clickCloseMask);
            },
            clickCloseMask(){
                this.$refs.alert.closeAlert();
                this.showmask(false);
            },
            closeAlert(btnname) {
                this.$refs.alert.closeAlert(btnname);
                this.showmask(false);
            },
            //显示tip
            showtip(text){
                this.$refs.tip.showTip(text);
            },
            //显示loading
            // showloading(text){
            //     this.$refs.loading.showLoading(text);
            //     this.showmask(true);
            // },
            showSyncLoading(config){
                this.$refs.syncLoading.showLoading(config);
            },
            hideSyncLoading(){
                this.$refs.syncLoading.hideLoading();
            },
            // closeloading(){
            //     this.$refs.loading.closeLoading();
            // },
            //关闭遮罩层
            closemask(){
                this.showmask(false);
            },
            toptextinfo(isShowText,textInfo){
                this.$refs.header.toptextinfo(isShowText,textInfo);
            },
            noSlideInfo(info){
                this.isMaskShow = info;
            },
            p_handleRouterChange(transition) {
                /*console.log('routerchange', transition);*/
                if(transition.to.name === undefined) {
                    transition.redirect({ name: 'health-sport' });
                    // this.$refs.menu.setSelectPage('health-sport');
                } else if(transition.to.name === 'health') {
                    transition.redirect({ name: 'health-sport' });
                    // this.$refs.menu.setSelectPage('health-sport');
                } else if((/health-\w+/).test(transition.to.name)) {
                    this.p_addHistory(transition);
                    // this.$refs.menu.setSelectPage(transition.to.name);
                } else if((/clock-\w+/).test(transition.to.name)) {
                    this.p_addHistory(transition);
                    // this.$refs.menu.setSelectPage(transition.to.name);
                } else if(transition.to.name === 'clock') {
                    // this.$refs.menu.setSelectPage('clock');
                } else if((/achive-\w+/).test(transition.to.name)) {
                    this.p_addHistory(transition);
                    // this.$refs.menu.setSelectPage(transition.to.name);
                }
                else {
                    this.p_addHistory(transition);
                    // this.$refs.menu.setSelectPage(transition.to.name);
                }

                transition.next();
                this.needHistoryBack = false;

                // const title = this.$refs.menu.getPageName(transition.to.name);
                // title && this.$refs.header.updateTitle(title);
            },
            p_addHistory(transition) {
                !this.needHistoryBack && transition.from.name && this.routerHistory.push({ name: transition.from.name });
            },
            hasChildrenInfo() {
                return !!this.p_childrenInfo.length;
            },
        },

        data() {
            return {
                isMaskShow: false,
                lastTransition: null,
                routerHistory: [],
                needHistoryBack: false,
                isOtaUpdateChecked: false,
                isGlobalTransMaskShow: false,
                p_childrenInfo:[],
            }
        },

        ready() {
            jsb.listenHistoryBack(() => {
                this.historyBack();
            });

            router.beforeEach(transition => {
                this.lastTransition = transition;
                if(this.hasChildrenInfo()) {
                    this.p_handleRouterChange(transition);
                } else {
                    this.updateChilrenInfo();
                }
            });

            router.afterEach(transition => {
                this.$refs.content.contentChange();
            });
        },
    };
</script>
<style scoped>
    .global-transparent-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0);
        z-index: 210;
    }
    .noSlide{
        overflow:hidden;
        height:100%;
        position:relative;
    }
</style>
