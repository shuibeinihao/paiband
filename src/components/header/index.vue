<template>
    <div class="header">
        <a class="btn-back" @click="historyGoBack"></a>
       <!--  <a class="btn-close" @click="webClose"></a> -->
        <a class="btn-func" :class="{'isTopText':isTopText}">
            <span v-show="!isPageInfoShow">{{ p_appStatus }}</span>
            <span class="pagetitle" @click = "showVersion"> {{ p_pageTitle || $i18n('page_name_default') }} </span>
            <span v-show="isListNull" class="list_null">
                <img src="~assets/images/list_null.png" alt="">
                <!-- <i>{{list_null}}</i> -->
            </span>

            <span v-show="isPageInfoShow">{{ p_pageInfo }}</span>
        </a>
        <!-- <a class="btn-user" @click="showChildSelector" :style="selectedChild && { backgroundImage: 'url(' + selectedChild.head + ')'}"></a> -->
        <div class="selector" v-show="showSelector">
            <child-selector v-show="isChildSelectorShow" v-ref:child-selector :children="childrenInfo"
            @child-change="childChange">
            </child-selector>
        </div>
    </div>
</template>

<script>
    import childSelector from 'components/header/childselect';

    import jutils from 'jutils';

    import config from 'src/config';
    import db from 'dbs/hashmap';
    import service from 'services';
    import jsb from 'services/jsb';

    export default {
        components: { childSelector },

        methods: {
            hasChildrenInfo() {
                return !!this.p_childrenInfo.length;
            },

            updateTitle(title) {
                this.p_pageTitle = title;
                this.showPageInfo(false);
            },
            toptextinfo(isShowText,textInfo){
                this.showPageInfo(isShowText,textInfo);
            },

            showVersion(){
                //点击五次显示版本号
                this.count++;
                console.log(this.count);
                if(this.count >= 5){
                    this.$dispatch('showtip', "最新版本:"+config.version);
                    this.count = 0;
                }
            },

            updateChilrenInfo() {
                /*{*/
                    /*cid: 1,*/
                    /*device_id: 11,*/
                    /*name: 'aaaa',*/
                    /*head: 'images',*/
                    /*select: true,*/
                    /*bluetooth: 0 //0已经连接手环 1连接中 2未连接 3未打开蓝牙*/
                /*},*/
                service.getChildrenDevices(data => {
                    console.log("getChildrenDevices",data);
                    if(data['http_code'] !== 200) {
                        this.$dispatch('showtip', "获取绑定设备列表失败");
                        // this.p_appStatus = '获取绑定设备列表失败';
                        // this.isListNull = true;
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
                        // this.p_childrenInfo = list;
                        // console.log(this.p_childrenInfo);
                        // const firstChild = this.p_childrenInfo[0];
                        // firstChild.select = true;

                    
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
                                // this.p_appStatus = this.p_childrenInfo[i].name;
                                currentChild.cid = this.p_childrenInfo[i].cid;
                                currentChild.device_id = this.p_childrenInfo[i].device_id;
                            }
                        }

                        this.$dispatch('childinfo-loaded', currentChild.cid, currentChild.device_id);

                        // setTimeout(() => {
                        //     this.$refs.childSelector.init();
                        // }, 0);
                    } else {
                        // this.p_appStatus = '无绑定的设备';
                        // this.isListNull = true;
                        
                    }
                }, error => {
                    // this.p_appStatus = '获取帐号信息失败';
                    // this.isListNull = true;
                });
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

            historyGoBack() {
                this.$dispatch('history-goback');
            },

            // webClose() {
            //     this.$dispatch('closeweb');
            // },

            childChange(cid) {
                let deviceid;
                for(let i = 0; i < this.p_childrenInfo.length; i++) {
                    const child = this.p_childrenInfo[i];
                    if(child.cid == cid) {
                        deviceid = child.device_id;
                        break;
                    }
                }

                // this.p_appStatus = this.selectedChild.name;

                // this.$dispatch('child-change', cid, deviceid);
            },

            // showChildSelector(show) {
            //     if(this.hasChildrenInfo()) {
            //         if(typeof show !== 'boolean') {
            //             show = undefined;
            //         }
            //         this.isChildSelectorShow = show === undefined ? !this.isChildSelectorShow : show;
            //         this.$dispatch('togglemark',this.isChildSelectorShow, 'header', (() => {
            //             this.showChildSelector(false);
            //         }).bind(this));
            //     } else {
            //         this.$dispatch('showtip', "没有孩子信息");
            //     }
            // },

            showPageInfo(isshow, txt = '') {
                this.p_pageInfo = txt;
                this.isPageInfoShow = !!isshow;
            }
        },

        data() {
            return {
                p_appStatus: '',
                p_childrenInfo: [],
                p_pageTitle: '',
                isChildSelectorShow: false,
                isTopText:false,//默认top文字显示
                isPageInfoShow: false,
                p_pageInfo: '',
                count:0,
                list_null:"",//没有绑定孩子账号
                isListNull:false,//没有绑定孩子账号显示
            };
        },

        computed: {
            selectedChild() {
                for(let i = 0; i < this.p_childrenInfo.length; i++) {
                    if(this.p_childrenInfo[i].select) {
                        return this.p_childrenInfo[i];
                    }
                }
                return null;
            },

            showSelector() {
                return this.isChildSelectorShow;
            },

            childrenInfo() {
                return this.p_childrenInfo;
            }
        }
    };
</script>

<style scoped>
    a.btn-back {
        display: inline-block;
        float: left;
        margin-left:4%;
        width: 2rem;
        height: 100%;
        background-image: url('~assets/images/btn/btn_20_back_p_nor@3x.png');
        background-position: center center;
        background-size: 20px;
        background-repeat: no-repeat;
    }
    a.btn-back:active {
        background-image: url('~assets/images/btn/btn_20_back_p_sel@3x.png');
    }
    a.btn-close {
        display: inline-block;
        width: 1.5rem;
        float:left;
        height: 100%;
        line-height: 2.8rem;
        z-index: 2;
        background-image: url('~assets/images/btn/btn_20_close_p_nor@3x.png');
        background-position: center center;
        background-size: 20px;
        background-repeat: no-repeat;
    }
    a.btn-close:active {
        background-image: url('~assets/images/btn/btn_20_close_p_sel@3x.png');
    }
    .btn-func {
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        margin: 0 4.5rem;
        text-align: center;
        font-size: 1rem;
    }
    .btn-func .list_null{ position: absolute; display:block; top:7rem;}
    .btn-func .list_null img{width:80%; display:block; margin:0 auto;}
    .btn-func .list_text{ position: absolute; display:block; top:10rem;}
    .btn-func span{display:block; font-size: .8rem; position:relative; top:0px; color:#b5b5b5;}
    .btn-func .pagetitle{ font-size: 1rem; color:#313131;}
    .isTopText{}
    .isTopText span{display:none; }
    .btn-user {
        display: inline-block;
        float: right;
        width: 1.6rem;
        height: 1.6rem;
        position:relative;
        top:10px;
        right:4%;
        background-image: url('~assets/images/img_head_kid_default@2x.jpg');
        background-color: #CCC;
        border-radius: 100% 100%;
        border: 1px solid #BBB;
        background-position: center center;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .selector {
        background-color: #fff;
        margin-top:2.81rem;
    }
    .slidetriangedown{
        content: "";
        display: inline-block;
        transform: rotate(135deg);
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #9a9a9a;
        border-style: solid;
        position: absolute;
        top: 52%;
        margin-left: 5px;
    }
    .slidetriangeup{
        content: "";
        display: inline-block;
        transform: rotate(-45deg);
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #9a9a9a;
        border-style: solid;
        position: absolute;
        top: 60%;
        margin-left: 5px;
    }
</style>
