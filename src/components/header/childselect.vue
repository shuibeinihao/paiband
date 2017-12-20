<template>
    <div class="child-selector">
        <span class="slide_icon"></span>
       
        <ul class="children">
            <li v-for="child in children" class="child" :class="child.select ? 'select': ''" track-by="$index" id="{{$index}}"
            @click="selectChild" data-cid="{{ child.cid }}">
                <div class="head" :style="{ backgroundImage: 'url(' + child.head + ')' }">
                    <i class="child-status" :class="getBluetoothStyle($index)"></i>
                </div>
                <p class="name">{{ child.name }}</p>
                <div class="status">
                    <span class="bluetooth" :class="getBluetoothStyle($index)"></span>
                    <span class="status-txt" v-show="!!getBluetoothStatusText($index)">{{ getBluetoothStatusText($index) }}</span>
                    <span class="operate" v-show="isChildBluetoothStatusOpen($index)" @click="operateBluetooth">请重试</span>
                    <span class="operate operate_nobg" v-show="isChildBluetoothStatusUnOpen($index)" @click="operateBluetooth">去开启</span>
                </div>
            </li>
        </ul>
        <div v-show="isShowVersion" style="font-size:0.8rem;color:#999;margin-left:0.5rem;">version: {{version}}</div>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import config from 'src/config';
    import db from 'dbs/hashmap';
    import service from 'services';
    import jsb from 'services/jsb';

    export default {
        props: {
            children: {
                type: Array,
                require: true
            }
        },
        methods: {
            init() {
                

                const selected = this.selectedChild;

                //默认显示第一个孩子的蓝牙状态提示
                let statusinfo = document.querySelectorAll(".children .status");
                statusinfo[0].style.display = "block";
                
                 
                // console.log('header init', selected);
                // db.set('cid', selected.cid);
                // db.set('deviceid', selected.device_id);

                //侦听蓝牙状态变更
                jsb.listenBluetoothStatus(data => {
                    
                    if(data.device_id === this.selectedChild.device_id) {
                        db.set('bluetoothStatus', data.status);
                        console.log("监听",db.get("bluetoothStatus"));

                        const btCalls = db.get('bluetoothStatusCalls').slice();
                        if(btCalls && btCalls instanceof Array) {
                            for(let i = 0; i < btCalls.length; i++) {
                                btCalls[i] && typeof btCalls[i] === 'function' && btCalls[i]();
                            }
                        }

                        for(let i = 1; i < this.children.length; i++) {
                            const childInfo = this.children[i];
                            if(childInfo.device_id === data.device_id) {
                                childInfo.bluetooth = data.status;
                                break;
                            }
                        }
                        this.selectedChild.bluetooth = data.status;
                        //console.log("childInfo.bluetooth",children.bluetooth); 
                    } else {
                        for(let i = 1; i < this.children.length; i++) {
                            const childInfo = this.children[i];
                            if(childInfo.device_id === data.device_id) {
                                childInfo.bluetooth = data.status;
                                break;
                            }
                        }
                    }
                });

                //检测并自动连接默认孩子蓝牙
                jsb.getBluetoothStatus(selected.device_id, data => {
                    //初始化所有孩子蓝牙状态
                    if(data.device_id === this.selectedChild.device_id) {
                        console.log(this.selectedChild);
                    }

                    //初始化当前孩子状态
                    if(data.device_id === this.selectedChild.device_id) {
                        console.log("data1",data);
                        db.set('bluetoothStatus', data.status);
                        const btCalls = db.get('bluetoothStatusCalls').slice();
                        if(btCalls && btCalls instanceof Array) {
                            console.log("btCalls",btCalls);
                            for(let i = 0; i < btCalls.length; i++) {
                                btCalls[i] && typeof btCalls[i] === 'function' && btCalls[i]();
                            }
                        }

                        this.selectedChild.bluetooth = data.status;

                        this.operateBluetooth();
                    }
                }, error => {
                    jutils.debugAlert('获取蓝牙状态失败');
                    this.$dispatch('showtip', '获取蓝牙状态失败');
                });
            },


            updateChildBluetoothStatus(deviceid, cid) {
                jsb.getBluetoothStatus(deviceid, data => {
                    if(this.selectedChild.device_id === data.device_id) {
                        db.set('bluetoothStatus', data.status);
                    }

                    for(let i = 1; i < this.children.length; i++) {
                        const childInfo = this.children[i];
                        if(childInfo.device_id === data.device_id) {
                            childInfo.bluetooth = data.status;
                            break;
                        }
                    }
                }, error => {
                    jutils.debugAlert('获取蓝牙状态失败');
                    this.$dispatch('showtip', '获取蓝牙状态失败');
                });
            },


            selectChild(e) {
                let child = e.target;
                while(!(/li/i).test(child.nodeName) || child.className.indexOf('child') < 0) {
                    child = child.parentNode;

                }

                //status显示当前
                let id = $(child).attr("id");
                let statusinfo = document.querySelectorAll(".children .status");
                for(let i = 0; i< statusinfo.length; i++){
                   statusinfo[i].style.display = "none";
                }
                statusinfo[id].style.display = "block";

                
                const cid = parseInt(child.dataset.cid);
                console.log("cid",cid);

                if(this.selectedChild.cid !== cid) {
                    const changeChild = () => {
                        const select = document.querySelector('.child-selector .children .child.select');
                        jutils.removeClass(select, 'select');
                        jutils.addClass(child, 'select');


                        for(let i = 0; i < this.children.length; i++) {
                            this.children[i].select = this.children[i].cid === cid;
                        }

                        let deviceid;
                        let gender;
                        let age;
                        let nickname;
                        for(let i = 0; i < this.children.length; i++) {
                            const child = this.children[i];
                            if(child.cid == cid) {
                                deviceid = child.device_id;
                                gender = child.gender;
                                age = child.age;
                                nickname = child.name;
                                break;
                            }
                        }

                        jsb.getBluetoothStatus(deviceid, data => {
                            if(this.selectedChild.device_id === data.device_id) {
                                db.set('bluetoothStatus', data.status);
                            }
                            for(let i = 1; i < this.children.length; i++) {
                                const childInfo = this.children[i];
                                if(childInfo.device_id === data.device_id) {
                                    childInfo.bluetooth = data.status;
                                    break;
                                }
                            }

                            this.operateBluetooth();
                        }, error => {
                            jutils.debugAlert('获取蓝牙状态失败');
                            this.$dispatch('showtip', '获取蓝牙状态失败');
                        });

                        db.set('cid', cid);
                        db.set('device_id', deviceid);
                        db.set('gender', gender);
                        db.set('age', age);
                        db.set('nickname', nickname);
                        this.$dispatch('child-change', cid);
                    };
                    //先判断当前孩子数据是否在同步中 是:给提示请同步完后切换
                    //否:判断当前孩子蓝牙是否链接 0连接qita未链接 是:断开当前孩子的蓝牙链接完成后 链接下一个孩子的蓝牙
                    //否:则直接链接下一个孩子的蓝牙 掉changeChild
                    if(db.get('isSync')) {
                        this.$dispatch('showalert', {
                            alert_content: '<p>正在同步数据中，请同步完后切换<p>',
                            btns: [
                                { btn_name: '确定' }
                            ]
                        });
                    } else {
                        if(db.get("bluetoothStatus") === 0){
                            jsb.disconnectBluetooth(db.get("deviceid"),() => {
                               
                               for(let i = 0; i < this.children.length; i++) {
                                    if(this.children[i].device_id == db.get("device_id")) {
                                       this.children[i].bluetooth = 3;
                                    }
                                }
                                changeChild();
                            },
                            () =>{
                                this.$dispatch("showtip","蓝牙断开失败");
                            });
                        }else{
                            changeChild();
                        }
                    }
                }
            },

            getBluetoothStyle(index) {
                if(this.children[index].bluetooth === 0) {
                    return 'active';
                } else if(this.children[index].bluetooth === 1) {
                    return 'connect';
                } else if(this.children[index].bluetooth === 2) {
                    return 'open';
                } else if(this.children[index].bluetooth === 3) {
                    return 'unopen';
                }
            },
            getBluetoothStatusText(index) {
                    if(this.children[index].bluetooth === 0) {
                        return '';
                    } else if(this.children[index].bluetooth === 1) {
                        return '蓝牙连接中...';
                    } else if(this.children[index].bluetooth === 2) {
                        return '未连接设备';
                    } else if(this.children[index].bluetooth === 3) {
                        return '未开启蓝牙';
                    }
            },

            isChildBluetoothStatusOpen(index) {
                if(this.children[index].bluetooth === 2) {
                        return true;
                }
            },
            isChildBluetoothStatusUnOpen(index) {
                if(this.children[index].bluetooth === 3) {
                        return true;
                }
            },

            operateBluetooth() {
                let deviceid;
                for(let i = 0; i < this.children.length; i++) {
                    const child = this.children[i];
                    if(child.cid == this.selectedChild.cid) {
                        deviceid = child.device_id;
                        break;
                    }
                }

                if(this.selectedChild.bluetooth === 2) {
                    this.selectedChild.bluetooth = 1;
                    //连接蓝牙
                    jsb.connectBluetooth(deviceid);
                } else if(this.selectedChild.bluetooth === 3) {
                    //打开手机蓝牙
                    jsb.openBluetooth(() => {
                        this.selectedChild.bluetooth = 1;
                        //连接蓝牙
                        jsb.connectBluetooth(deviceid);
                    }, error => {
                        jutils.debugAlert('打开蓝牙失败');
                        this.$dispatch('showtip', '打开蓝牙失败');
                    });
                }
            }
        },

        data() {
            return {
            };
        },

        computed: {
            selectedChild() {
                for(let i = 0; i < this.children.length; i++) {
                    if(this.children[i].select) {
                        return this.children[i];
                    }
                }
                return null;
            },
            // bluetoothStyle() {
            //     if(this.selectedChild) {
            //         if(this.selectedChild.bluetooth === 0) {
            //             return 'active';
            //         } else if(this.selectedChild.bluetooth === 1) {
            //             return 'connect';
            //         } else if(this.selectedChild.bluetooth === 2) {
            //             return 'open';
            //         } else if(this.selectedChild.bluetooth === 3) {
            //             return 'unopen';
            //         }
            //     }
            //     return '';
            // },
            // bluetoothStatusText() {
            //     if(this.selectedChild) {
            //         if(this.selectedChild.bluetooth === 0) {
            //             return '蓝牙已连接';
            //         } else if(this.selectedChild.bluetooth === 1) {
            //             return '蓝牙连接中...';
            //         } else if(this.selectedChild.bluetooth === 2) {
            //             return '未搜索到葡萄手环';
            //         } else if(this.selectedChild.bluetooth === 3) {
            //             return '手机未开启蓝牙';
            //         }
            //     }
            //     return '';
            // },
            version() {
                return config.version;
            },
            isShowVersion() {
                return !!config.showVersion;
            }
        }
    };
</script>

<style scoped>
    .slide_icon{display:inline-block; width:12px; height:7px; background:url(~assets/images/slide_icon.jpg) no-repeat scroll center center; background-size:10px; position: absolute; right:6.4%; top:-6px;}

    .child-selector {
        padding: 0.5rem;
        position:relative;
    }
    .child-selector .status {
        border-radius: 4px;
        font-size: .5rem;
        padding-bottom:10px;
        width: 4rem;
        margin:0 auto;
        display:none;
        text-align: center;
    }
    .child-selector .status span{display:block;}
    .child-selector .status .bluetooth {
        
    }
/*    .child-selector .status .bluetooth.active {
        background-image: url('~assets/images/bluetooth/icon_30_29@3x.png');
    }
    .child-selector .status .bluetooth.connect {
        background-image: url('~assets/images/bluetooth/icon_30_29@3x.png');
    }
    .child-selector .status .bluetooth.open {
        background-image: url('~assets/images/bluetooth/icon_30_30@3x.png');
    }
    .child-selector .status .bluetooth.unopen {
        background-image: url('~assets/images/bluetooth/icon_30_30@3x.png');
    }*/
    .child-selector .status .status-txt {
        color: #646464;
        font-size: .6rem;
        padding:5px 0;
    }
    .child-selector .status .operate {
        display:inline-block;
        border-radius: 10px;
        padding: .5% 20% .5% 20%;
        font-size: 0.7rem;
        color: #8b49f6;
        border:1px solid #8b49f6;
        background:#fff;
        margin:0 auto;
        text-align: center;
    }
    .child-selector .status .operate_nobg{
    }
    .child-selector .children {
        margin-top: 6%;
        display:table;
        height:100%;
        width:100%;
    }
    .child-selector .children .child {
        display: inline-block;
        width: 33.3%;
        vertical-align: top;
    }
    .child-selector .children .child .head {
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        background-image: url('http://h5.putao.com/head_default.png');
        background-size: 100% 100%;
        border-radius: 100% 100%;
        border: 1px solid #ccc;
    }
    .child-selector .children .child.select .head{
        border: 1px solid #8c3ffa;
    }
    .child-selector .children .child .head .child-status {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        margin-top: 2rem;
        margin-left: 2rem;
    }
    .child-selector .children .child .head .child-status.active {
        background-image: url('~assets/images/bluetooth_success.png');
    }
    .child-selector .children .child .head .child-status.connect {
         background-image: url('~assets/images/bluetooth_normal.png');
    }
    .child-selector .children .child .head .child-status.open {
        background-image: url('~assets/images/bluetooth_normal.png');
    }
    .child-selector .children .child .head .child-status.unopen {
        background-image: url('~assets/images/bluetooth_normal.png');
    }
/*    .child-selector .children .child.select .head .child-status {
        background-image: url('~assets/images/icon_16_43@3x.png');
    }*/
    .child-selector .children .name {
        text-align: center;
        color:#646464;
        font-size: .9rem;
        padding-top:5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        overflow: hidden;
    }
</style>
