<template>
    <div class="footer-clock">
        <ul class="items">
            <li v-for="item in clockItems" class="item" track-by="$index" data-name="{{ item.name }}" 
            @click="footerClockChange" :class="item.select ? 'select' : ''">
                <a class="icon" :class="item.name"></a>
                <p class="name">{{ item.showName }}</p>
            </li>
            <li class="item sync_btn"><a @click="syncClock" href="javascript:;">同步</a></li>
        </ul>
    </div>
</template>

<script>
    import jutils from 'jutils';

    export default {
        methods: {
            selectItem(name) {
                for(let i = 0; i < this.clockItems.length; i++) {
                    this.clockItems[i].select = this.clockItems[i].name === name;
                }
            },

            footerClockChange(e) {
                let child = e.target;
                while(!(/li/i).test(child.nodeName) || child.className.indexOf('item') < 0) {
                    child = child.parentNode;
                }
                const name = child.dataset.name;
                if(this.selectedClockItem.name !== name) {
                    this.$dispatch('page-change', 'clock-' + name);
                    this.selectItem(name);
                }
            },

            syncClock() {
                this.$dispatch('sync-all-data');
            }
        },

        data() {
            return {
                clockItems: [
                    {
                        showName: '工作日',
                        name: 'workday',
                        select: true
                    },
                    {
                        showName: '周末',
                        name: 'weekend',
                        select: false
                    }
                ]
            };
        },

        computed: {
            selectedClockItem() {
                for(let i = 0; i < this.clockItems.length; i++) {
                    if(this.clockItems[i].select) {
                        return this.clockItems[i];
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .footer-clock {
        height: 100%;
        background:#fff;
    }
    .footer-clock .items {
        height: 100%;
        overflow:hidden;
    }
    .footer-clock .items .item {
        display: inline-block;
        height: 100%;
        width: 32%;
        float:left;
    }
    .footer-clock .items .sync_btn{ text-align: center;}
    .footer-clock .items .sync_btn a{display:inline-block; font-size: .9rem; padding:4px 25px;  background:#8c3ffa; border-radius:20px; color:#fff; margin-top:12px;}
    .footer-clock .items .item .icon {
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
        height: 2rem;
        display: block;
    }
    .footer-clock .items .item .icon.workday {
        background-image: url('~assets/images/footer/tab_bar_band_work_nor@3x.png');
        background-size: 24px;
    }
    .footer-clock .items .item.select .icon.workday {
        background-image: url('~assets/images/footer/tab_bar_band_work_sel@3x.png');
    }
    .footer-clock .items .item .icon.weekend {
        background-image: url('~assets/images/footer/tab_bar_band_weekend_nor@3x.png');
        background-size:24px;
    }
    .footer-clock .items .item.select .icon.weekend {
        background-image: url('~assets/images/footer/tab_bar_band_weekend_sel@3x.png');
    }
    .footer-clock .items .item .name {
        font-size: 0.7rem;
        text-align: center;
        color:#b5b5b5;
        position:relative;
        top:-3px;
    }
    .footer-clock .items .item.select .name{color:#646464;}
</style>
