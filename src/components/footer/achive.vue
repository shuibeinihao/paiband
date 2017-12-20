<template>
    <div class="footer-achive">
        <ul class="items">
            <li v-for="item in achiveItems" class="item" track-by="$index" data-name="{{ item.name }}" 
            @click="footerAchiveChange" :class="item.select ? 'select' : ''">
                <a class="icon" :class="item.name"></a>
                <p class="name">{{ item.showName }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import jutils from 'jutils';

    export default {
        methods: {
            selectItem(name) {
                for(let i = 0; i < this.achiveItems.length; i++) {
                    this.achiveItems[i].select = this.achiveItems[i].name === name;
                }
            },

            footerAchiveChange(e) {
                let child = e.target;
                while(!(/li/i).test(child.nodeName) || child.className.indexOf('item') < 0) {
                    child = child.parentNode;
                }
                const name = child.dataset.name;
                if(this.selectedAchiveItem.name !== name) {
                    this.$dispatch('page-change', 'achive-' + name);
                    this.selectItem(name);
                }
            }
        },

        data() {
            return {
                achiveItems: [
                    {
                        showName: '今日成就',
                        name: 'nowachive',
                        select: true
                    },
                    {
                        showName: '长期成就',
                        name: 'allachive',
                        select: false
                    },
                    {
                        showName: '排行榜',
                        name: 'rank',
                        select: false
                    }
                ]
            };
        },

        computed: {
            selectedAchiveItem() {
                for(let i = 0; i < this.achiveItems.length; i++) {
                    if(this.achiveItems[i].select) {
                        return this.achiveItems[i];
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .footer-achive {
        height: 100%;
        border-top:1px solid #e1e1e1;
        padding-bottom:3px;
    }
    .footer-achive .items {
        height: 100%;
    }
    .footer-achive .items .item {
        display: inline-block;
        height: 100%;
        width: 33.3%;
    }
    .footer-achive .items .item .icon {
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
        height: 2rem;
        display: block;
    }
    .footer-achive .items .item .icon.nowachive {
        background-image: url('~assets/images/footer/tab_bar_band_award_nor@3x.png');
        background-size: 25px;
    }
    .footer-achive .items .item.select .icon.nowachive {
        background-image: url('~assets/images/footer/tab_bar_band_award_sel@3x.png');
    }
    .footer-achive .items .item .icon.allachive {
        background-image: url('~assets/images/footer/tab_bar_band_trophy_nor@3x.png');
        background-size: 25px;
    }
    .footer-achive .items .item.select .icon.allachive {
        background-image: url('~assets/images/footer/tab_bar_band_trophy_sel@3x.png');
    }
    .footer-achive .items .item .icon.rank {
        background-image: url('~assets/images/footer/tab_bar_band_charts_nor@3x.png');
        background-size: 25px;
    }
    .footer-achive .items .item.select .icon.rank {
        background-image: url('~assets/images/footer/tab_bar_band_charts_sel@3x.png');
    }
    .footer-achive .items .item .name {
        font-size: 0.8rem;
        text-align: center;
        color:#646464;
    }
</style>

