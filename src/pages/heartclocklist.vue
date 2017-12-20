<template>
    <div class="heartlist">
        <div class="getup" v-show="heartListShow">
            <p class="set_title" v-show="!noClockTipShow">{{$i18n("heartclock_title")}} {{ currheartnum }}/{{ max_clock_count }}</p>
            <div class="box_wrapper time_list">
                <p v-for="heatl in heartlist" v-if="!(heatl.modify && heatl.modify.indexOf('delete') > -1)">
                    <span class="delect_info" @click="delect_info"  data="{{heatl.clock_id}}" v-show="delectInfoShow" transition="fadeIn"></span>
                    <span class="time_info">{{heatl.time}}</span>
                    <span class="edit_info" v-show="editInfoShow" transition="fadeIn" @click="editClockInfo" data="{{heatl.clock_id}}"></span>
                </p>
             </div>
         </div>
         <div class="no_clock_tip" v-show="!editingShow && noClockTipShow">
            <img v-if="$lang == 'en'" src="~assets/images/img_banf_tips_clock@3x-en.png" alt="">
            <img v-else="" src="~assets/images/img_banf_tips_clock@3x.png" alt="">
         </div>
         <div class="no_clock" v-show="!editingShow">
            <span @click="edit_info" class="edit" :class="{ disable: !editable }"><i></i><span>{{$i18n("btn_name_edit")}}</span></span>
            <span @click="add_clock" class="add" :class="{ disable: !addable }"><i></i><span>{{$i18n("btn_name_add")}}</span></span>
             <!-- <span @click="sync_clock" class="sync" :class="{ disable: !syncable }"><i></i><span>同步</span></span> -->
         </div>
         <div class="no_clock editing" v-show="editingShow">
            <span class="cancel" @click="cancel_info"><i></i><span>{{$i18n("btn_name_cancel")}}</span></span>
            <span class="ok_btn" @click="ok_btn_info"><i></i><span>{{$i18n("btn_name_save")}}</span></span>
         </div>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import db from 'dbs/hashmap';
    import jsb from "services/jsb";

    import heartclock from "services/heartclock";
    import syncService from 'services/sync';

    export default {
        data(){
            return{
                delectInfoShow:false,//删除按钮是否显示
                editInfoShow:false,//编辑按钮是否显示
                editingShow:false,//底部编辑框是否显示
                max_clock_count:0,//最大列表数量
                heartListShow:true,//是否显示定时列表
                currheartnum:0,//当前数量
                heartlist:[],//定时列表
                clock_edit_config:{},
            }
        },
        computed: {
            editable() {
                return this.currheartnum > 0 && this.currheartnum <= this.max_clock_count;
            },
            addable() {
                return this.currheartnum < this.max_clock_count;
            },
            syncable() {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].modify != undefined) {
                        return true;
                    }
                }
                return false;
            },
            noClockTipShow() {
                return this.currheartnum == 0;
            }
        },
        methods:{
            init(width, height) {
                //获取定时列表
                heartclock.getHeartClockList(this.updateHeartClockList, this.updateHeartClockListError);
            },

            update() {
                //获取定时列表
                heartclock.getHeartClockList(this.updateHeartClockList, this.updateHeartClockListError);
            },

            updateState() {
                this.currheartnum = 0;
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(['delete', 'add-delete'].indexOf(this.heartlist[i].modify) < 0) {
                        this.currheartnum += 1;
                    }
                }
            },

            updateHeartClockList(data) {
                if(data.http_code == 200){
                    this.max_clock_count = data.data.max_clock_count;
                    this.currheartnum = (data.data.list || []).length;
                    this.heartlist = data.data.list || [];
                }
            },

            updateHeartClockListError(error){
                this.$dispatch("showtip",error);
            },

            edit_info(){
                if(this.editable) {
                    this.delectInfoShow = true;
                    this.editInfoShow = true;
                    this.editingShow = true;
                }
            },

            delect_info(e){
                let clock_id = $(e.target).attr('data');
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].clock_id == clock_id) {
                        if(this.heartlist[i].modify && this.heartlist[i].modify.indexOf('add') > -1) {
                            this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { modify: 'add-delete' }));
                        } else {
                            this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { modify: 'delete' }));
                        }
                        break;
                    }
                }
                this.updateState();
            },

            deleteHeartClock(data) {
                this.update();
            },

            deleteHeartClockError(error) {
                this.$dispatch('showtip', error);
            },

            cancel_info() {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].modify === 'add-delete') {
                        this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { modify: 'add' }));
                    } else if(this.heartlist[i].modify === 'delete') {
                        this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { modify: undefined }));
                    } else if(this.heartlist[i].modify === 'add-change') {
                        this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { 
                            modify: 'add',
                            time: this.heartlist[i].oldTime
                        }));
                    } else if(this.heartlist[i].modify === 'change') {
                        this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { 
                            modify: undefined,
                            time: this.heartlist[i].oldTime
                        }));
                    }
                }
                this.updateState();
                this.delectInfoShow = false;
                this.editInfoShow = false;
                this.editingShow = false;
            },

            ok_btn_info() {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].modify === 'add-delete') {
                        this.heartlist.splice(i, 1);
                        i -= 1;
                    } else if(this.heartlist[i].modify === 'add-change') {
                        this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { modify: 'add' }));
                    }
                }
                this.sync_clock();
                this.updateState();
                this.delectInfoShow = false;
                this.editInfoShow = false;
                this.editingShow = false;
            },

            add_clock() {
                //点击添加闹钟显示select
                if(this.addable) {
                    let values = [{from: 0, to: 24, step: 1}, {from: 0, to: 60, step: 1}];
                    //jsb调用select接口

                    jsb.showSelector(this.$i18n("heartclocklist_set_time"), values, [], this.addClockSuccessBack, this.addClockCancelBack);
                }
            },

            addClockSuccessBack(data) {
                console.log("addClockSuccessBack",data);
                //点击select确定之后调用添加闹钟接口
                let timeinfo = ('0' + data.values[0]).substr(-2) + ':' + ('0' + data.values[1]).substr(-2);
                for(let i = 0; i<this.heartlist.length;i++){
                  if(this.heartlist[i].time === timeinfo){
                    this.$dispatch("showtip",this.$i18n("heartclock_tip_repeat"));
                    return;
                  }
                }
                this.heartlist.push({
                    'clock_id': 'local' + jutils.makeSimpleGUID(),
                    'time': timeinfo,
                    'modify': 'add'
                });
                this.sync_clock();
                this.updateState();
            },

            addClockCancelBack(error) {
                console.log("addClockCancelBack",error);
            },

            addHeartClock(data) {
                console.log(data);
                //tianjia成功重新获取闹钟列表
                this.update();
            },

            addHeartClockError(error) {
                if(error){
                    this.$dispatch('showtip', this.$i18n("heartclock_error_add_service"));
                }
            },

            editClockInfo(e) {
                //点击编辑修改闹钟调出select
                this.clock_edit_config.clock_id = $(e.target).attr('data');
                let values = [{from: 0, to: 24, step: 1}, {from: 0, to: 60, step: 1}];

                //点击修改select显示当前的时间
                let default_values = [];
                 for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.clock_edit_config.clock_id == this.heartlist[i].clock_id) {
                        default_values.push(...this.heartlist[i].time.split(':'));
                        break;
                    }
                }

                //jsb调用select接口

                jsb.showSelector(this.$i18n("heartclock_edit_title"), values, default_values, this.editClockSuccessBack, this.editClockCancelBack);
            },

            editClockSuccessBack(data) {
                //点击select确定之后调用修改闹钟接口
                this.clock_edit_config.time = ('0' + data.values[0]).substr(-2) + ':' + ('0' + data.values[1]).substr(-2);
                for(let i = 0; i<this.heartlist.length;i++){
                    if(this.heartlist[i].time === this.clock_edit_config.time){
                      this.$dispatch('showtip', this.$i18n("clock_error_existed"));
                      return;
                    }
                }
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].clock_id == this.clock_edit_config.clock_id) {
                        if(this.heartlist[i].modify && this.heartlist[i].modify.indexOf('add') > -1) {
                            this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { 
                                modify: 'add-change',
                                oldTime: this.heartlist[i].time,
                                time: this.clock_edit_config.time
                            }));
                        } else {
                            this.heartlist.$set(i, Object.assign({}, this.heartlist[i], { 
                                modify: 'change',
                                oldTime: this.heartlist[i].time,
                                time: this.clock_edit_config.time
                            }));
                        }
                        break;
                    }
                }
                this.updateState();
            },

            editClockCancelBack(error) {
                console.log("editClockCancelBack",error);
            },

            modifyHeartClock(data) {
                console.log(data);
                //修改成功重新获取闹钟列表
                this.update();
            },

            modifyHeartClockError(error) {
                if(error) {
                    this.$dispatch('showtip', this.$i18n("heartclocklist_edit_lose"));
                }
            },

            sync_clock() {
                if(this.syncable) {
                    console.log(this.heartlist);
                    const clock = [];
                    for(let i = 0; i < this.heartlist.length; i++) {
                        if(!this.heartlist[i].modify || ['add', 'change'].indexOf(this.heartlist[i].modify) > -1) {
                            clock.push(this.heartlist[i].time);
                        }
                    }
                    let status = db.get('bluetoothStatus');
                    if(status === 0) {
                        // db.set('isSync', true);
                        this.$dispatch('show-sync-loading', { mode: 'sync' });
                        syncService.syncWriteHeartClock(clock, () => {
                            this.submitSyncResult();
                        }, () => {
                            setTimeout(() => {
                                this.$dispatch('show-sync-loading', { mode: 'fail'});
                                this.$root.$refs.syncLoading.isOther();
                            }, 500);
                        });
                    } else if(status === 1) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_connecting"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('蓝牙正在连接中');
                    } else if(status === 2) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_connect"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('未连接到手环');
                    } else if(status === 3) {
                        this.$dispatch('showalert', {
                            alert_content: this.$i18n("bluetooth_open"),
                            btns: [ { btn_name: this.$i18n("btn_name_confirm")} ]
                        });
                        jutils.debugAlert('手机未开启蓝牙');
                    }else{
                        this.$dispatch('showtip', this.$i18n("bluetooth_error_state"));
                    }
                }
            },

            submitSyncResult() {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].modify === 'add') {
                        this.heartlist[i].submitID = jutils.makeSimpleGUID();
                        heartclock.addHeartClock(this.heartlist[i].time, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("heartclocklist_add_lose"));
                            this.submitSyncResultFail(error);
                        }, this.heartlist[i].submitID);
                    } else if(this.heartlist[i].modify === 'change') {
                        this.heartlist[i].submitID = jutils.makeSimpleGUID();
                        heartclock.modifyHeartClock(this.heartlist[i].clock_id, this.heartlist[i].time, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("heartclocklist_change_lose"));
                            this.submitSyncResultFail(error);
                        }, this.heartlist[i].submitID);
                    } else if(this.heartlist[i].modify === 'delete') {
                        this.heartlist[i].submitID = jutils.makeSimpleGUID();
                        heartclock.deleteHeartClock(this.heartlist[i].clock_id, this.submitSyncResultSuccess, error => {
                            this.$dispatch('showtip', this.$i18n("heartclocklist_delete_lose"));
                            this.submitSyncResultFail(error);
                        }, this.heartlist[i].submitID);
                    }
                }
            }, 

            submitSyncResultSuccess(data) {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].submitID === data['_request_id']) {
                        this.heartlist[i].submitState = 'success';
                        break;
                    }
                }
                if(this.checkAllSubmited()) {
                    this.update();
                    setTimeout(() => {
                        this.$dispatch('show-sync-loading', { mode: 'ok'});
                        setTimeout(() => {
                            this.$dispatch('hide-sync-loading');
                            db.set('isSync', false);
                        }, 1000);
                    }, 500);
                }
            },

            submitSyncResultFail(error) {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].submitID === error['_request_id']) {
                        this.heartlist[i].submitState = 'fail';
                        break;
                    }
                }
                if(this.checkAllSubmited()) {
                    this.update();
                    setTimeout(() => {
                        this.$dispatch('show-sync-loading', { mode: 'ok'});
                        setTimeout(() => {
                            this.$dispatch('hide-sync-loading');
                            db.set('isSync', false);
                        }, 1000);
                    }, 500);
                }
            },

            checkAllSubmited() {
                for(let i = 0; i < this.heartlist.length; i++) {
                    if(this.heartlist[i].submitID && !this.heartlist[i].submitState) {
                        return false;
                    }
                }
                return true;
            }
        }
  };
</script>

<style scoped>
    /*红色 #ef5361 紫色:8c3ffa;  字体颜色： #313131  边框颜色 ：e1e1e1 灰色：#b5b5b5*/
    /*公用*/
    body,html{background:#ebebeb; overflow:hidden;}
    .heartlist{margin-bottom:3.5rem;}
    .set_title{ padding:6% 4% 3% 4%; font-size: 1.1rem; color:#646464;}
    .no_clock_tip {position:fixed; bottom:3rem; left:0px;}
    .no_clock_tip img{width:60%; display:block; float:right; margin-right:1rem;}
    .no_clock{
        display: table;
        position: fixed;
        bottom: 0.6rem;
        height: 2.2rem;
        line-height: 2.2rem;
        left: 5%;
        width: 90%;
        background: rgba(44, 40, 60, 0.6);
        border-radius: 4px;
        transform:translate3D(0,0,0);
        -wekit-transform:translate3D(0,0,0);
    }
    .editing{
        transform:translate3D(0,0,0);
        -wekit-transform:translate3D(0,0,0);
    }
    .no_clock>span{
        display: table-cell;
        text-align: center;
        color: #FFF;
    }
    .no_clock i {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        margin-right: 3px;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        vertical-align: middle;
    }
    .no_clock>span>span{
        display: inline-block;
        vertical-align: middle;
        font-size: .9rem;
    }
    .no_clock .edit {
    }
    .no_clock .edit.disable {
        opacity: 0.3;
    }
    .no_clock .edit i {
        background-image: url('~assets/images/icon_16_56@3x.png');
    }
    .no_clock .add {
    }
    .no_clock .add.disable {
        opacity: 0.3;
    }
    .no_clock .add i {
        background-image: url('~assets/images/icon_16_57@3x.png');
    }
    .no_clock .sync {
    }
    .no_clock .sync.disable {
        opacity: 0.3;
    }
    .no_clock .sync i {
        background-image: url('~assets/images/icon_16_58@3x.png');
    }
    .no_clock.editing .cancel {
    }
    .no_clock.editing .cancel i {
        background-image: url('~assets/images/icon_30_09@3.png');
    }
    .no_clock.editing .ok_btn {
    }
    .no_clock.editing .ok_btn i {
        background-image: url('~assets/images/icon_30_11@3.png');
    }
    .no_clock span i{
        position:relative;
        bottom:.02rem;
    }

    .sync_btn{height:45px; position:fixed; bottom:0; left:0; width:100%; background: #fff; text-align: center;}
    .sync_btn a{display:inline-block; font-size: .9rem; padding:4px 25px;  margin-top:8px; background:#ef5361; border-radius:20px; color:#fff;}

    .time_list{padding:0 4%; box-sizing:border-box;}
    .time_list p{border-bottom:1px solid #e1e1e1; overflow:hidden; padding:2% 0;}
    .time_list p:nth-last-child(1){border-bottom:none;}
    .time_list span{display:inline-block;}
    .time_list span.delect_info{position:relative; bottom:0px; padding:0 5px; background: url(~assets/images/icon_20_54@3x.png) no-repeat; background-size: 20px; width:20px; height:20px; display:inline-block;}
    .time_list span.time_info {font-family: AkzidenzGrotesk; font-size: 2.2rem;}
    .time_list span.edit_info {float:right; position:relative; top:10px; background: url(~assets/images/update_icon.png) no-repeat; background-size: 20px; width:20px; height:20px; display:inline-block; }
</style>
