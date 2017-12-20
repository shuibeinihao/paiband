<template>
    <div class="footer-health">
        <ul class="items">
            <li v-for="item in healthItems" class="item" track-by="$index" data-name="{{ item.name }}" 
            @click="footerHealthChange" :class="item.select ? 'select' : ''">
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
                for(let i = 0; i < this.healthItems.length; i++) {
                    this.healthItems[i].select = this.healthItems[i].name === name;
                }
            },

            footerHealthChange(e) {
                let child = e.target;
                while(!(/li/i).test(child.nodeName) || child.className.indexOf('item') < 0) {
                    child = child.parentNode;
                }
                const name = child.dataset.name;
                if(this.selectedHealthItem.name !== name) {
                    this.$dispatch('page-change', 'health-' + name);
                    this.selectItem(name);
                }

            }
        },

        data() {
            return {
                healthItems: [
                    {
                        showName: '运动',
                        name: 'sport',
                        select: true
                    },
                    {
                        showName: '睡眠',
                        name: 'sleep',
                        select: false
                    },
                    {
                        showName: '心率',
                        name: 'heart',
                        select: false
                    }
                ]
            };
        },

        computed: {
            selectedHealthItem() {
                for(let i = 0; i < this.healthItems.length; i++) {
                    if(this.healthItems[i].select) {
                        return this.healthItems[i];
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .footer-health {
        height: 100%;
    }
    .footer-health .items {
        height: 100%;
    }
    .footer-health .items .item {
        display: inline-block;
        height: 100%;
        width: 33.3%;
    }
    .footer-health .items .item .icon {
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 100%;
        height: 2rem;
        display: block;
    }
    .footer-health .items .item .icon.sport {
        background-image: url('~assets/images/footer/tab_bar_band_walk_nor@3x.png');
        background-size:25px;
    }
    .footer-health .items .item.select .icon.sport {
        background-image: url('~assets/images/footer/tab_bar_band_walk_sel@3x.png');
    }
    .footer-health .items .item .icon.sleep {
        background-image: url('~assets/images/footer/tab_bar_band_sleep_nor@3x.png');
        background-size:25px;
    }
    .footer-health .items .item.select .icon.sleep {
        background-image: url('~assets/images/footer/tab_bar_band_sleep_sel@3x.png');
    }
    .footer-health .items .item .icon.heart {
        background-image: url('~assets/images/footer/tab_bar_band_heart_nor@3x.png');
        background-size:25px;
    }
    .footer-health .items .item.select .icon.heart {
        background-image: url('~assets/images/footer/tab_bar_band_heart_sel@3x.png');
    }
    .footer-health .items .item .name {
        font-size: 0.8rem;
        text-align: center;
    }
</style>
