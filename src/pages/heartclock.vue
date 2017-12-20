<template>
    <div>
        <a href="javascript:;" v-link="{name:'heartclocklist'}" class="heart-clock-info">
            <span class="title">{{$i18n("heart_clock_num")}}</span>
            <span class="number">{{ p_clockNum }}/{{ p_clockTotalNum }}</span>
            <i class="arrow"></i>
        </a>
        <p class="heart-clock-desc">{{$i18n("heart_clock_desc")}}</p>
        <panel v-ref:list class="test-list" paneltitle={{$i18n("heart_list_title")}}>
            <div class="list-title">
                <span class="time">{{$i18n("heart_list_time")}}</span>
                <span class="rate">{{$i18n("heart_list_data")}}</span>
            </div>
            <ul v-if="p_testList && p_testList.length > 0" class="list">
                <li class="list-item" v-for="test in p_testList">
                    <span class="item-time">{{ test.time }}</span>
                    <span class="item-rate">{{ test.rate }}</span>
                </li>
            </ul>
            <div v-show="!p_testList.length" class="no-tip">
                <img src="~assets/images/img_band_tips@3x.png">
                <p>{{$i18n("heart_list_nodata")}}</p>
            </div>
        </panel>
    </div>
</template>

<script>
    import panel from 'components/common/panel';

    import service from 'services/heartclock';

    export default {
        components: { panel },

        methods: {
            init(width, height) {
                /*this.$refs.list.$el.querySelector('.list').onscroll = this.p_handleListScroll;*/
                service.getHeartTestRecord(this.p_updateTestList, this.p_updateTestListError);
                service.getHeartClockList(this.p_updateClockList, this.p_updateClockListError);
                /*service.addHeartClock('10:10', data => console.log(data), error => console.log(error));*/
            },

            update(width, height) {
                service.getHeartTestRecord(this.p_updateTestList, this.p_updateTestListError);
                service.getHeartClockList(this.p_updateClockList, this.p_updateClockListError);
            },

            p_updateTestList(data) {
                this.p_testList = data.data.list;
            },

            p_updateTestListError(error) {
                console.log('获取心率测定列表失败');
            },

            p_updateClockList(data) {
                this.p_clockTotalNum = data.data.max_clock_count || 0;
                this.p_clockNum = (data.data.list || []).length;
            },

            p_updateClockListError(error) {
                console.log('获取心率定时列表失败');
            },

            p_handleListScroll(e) {
                const target = e.target;
                if(target.scrollTop + target.clientHeight >= target.scrollHeight && !this.p_updating) {
                    this.p_updating = true;
                }
            }
        },

        data() {
            return {
                p_updating: false,
                p_testList: [],
                p_clockNum: 0,
                p_clockTotalNum: 0
            };
        },

        computed: {
            testList() {
                const arr = [];
                for(let i = 0; i < 20; i++) {
                    arr.push({
                        time: '2011/11/11 11:11',
                        rate: Math.floor(Math.random() * 50) + 50
                    });
                }
                return arr;
            }
        }
    };
</script>

<style scoped>
    .test-list {
        width: 90%;
        margin: 1rem auto 0rem auto;
    }
    .test-list .list-title {
        color: #959595;
        padding: 0.5rem;
        white-space: nowrap;
        font-size: .9rem;
    }
    .test-list .list-title .time {
        display: inline-block;
        width: 60%;
        text-align: left;
    }
    .test-list .list-title .rate {
        display: inline-block;
        width: 38%;
        text-align: right;
    }
    .test-list .list {
        border-top: 1px solid #eee;
        padding: 0 0.5rem;
        height: 16rem;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .test-list .list .list-item {
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom: 1px solid #e1e1e1;
        color: #646464;
        white-space: nowrap;
        font-size: .9rem;
    }
    .test-list .list .list-item:last-child {
        border-bottom: none;
    }
    .test-list .list .list-item .item-time {
        display: inline-block;
        width: 60%;
        text-align: left;
    }
    .test-list .list .list-item .item-rate {
        display: inline-block;
        width: 40%;
        text-align: center;
    }
    .test-list .no-tip {
        position: relative;
        min-height: 15rem;
        text-align: center;
    }
    .test-list .no-tip img {
        width: 8rem;
        height: 8rem;
        position: absolute;
        top: 50%;
        margin-top: -6rem;
        left: 50%;
        margin-left: -4rem;
    }
    .test-list .no-tip p {
		width: 100%;
		position: absolute;
		top: 50%;
		margin-top: 3rem;
        color: #959595;
        font-size: 0.9rem;
    }
    .heart-clock-info {
        display: block;
        width: 90%;
        margin: 0.5rem auto 0 auto;
        background-color: #FFF;
        border-radius: 5px;
        box-shadow: 0 0 5px #e2e2e2;
        height: 3rem;
        line-height: 3rem;
        color: #999;
        white-space: nowrap;
    }
    .heart-clock-info .title {
        display: inline-block;
        width: 60%;
        padding-left: 0.5rem;
        color:#959595;
    }
    .heart-clock-info .number {
        display: inline-block;
        width: 25%;
        text-align: right;
        color:#646464;
    }
    .heart-clock-info .arrow {
        display: inline-block;
        -webkit-transform: rotate(135deg); 
        transform: rotate(45deg);
        transform-origin: 100% 50%;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #9a9a9a;
        border-style: solid;
    }
    .heart-clock-desc {
        margin: 0.5rem auto 0 auto;
        width: 86%;
        font-size: 0.74rem;
    }
</style>
