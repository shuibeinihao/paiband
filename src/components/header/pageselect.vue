<template>
    <div class="page-selector">
        <span class="slide_icon"></span>
        <div v-for="cate in category" class="category">
            <p class="title">{{ cate.title }}</p>
            <ul class="cates">
                <li v-for="item in cate.items" class="cates-item" :class="item.select ? 'active': ''"
                @click="selectPage" data-page="{{ item.page }}">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div v-show="isShowVersion" style="font-size:0.8rem;color:#999;margin-left:0.5rem;">version: {{version}}</div>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import config from 'src/config';

    export default {
        props: {
            category: {
                type: Array,
                require: true
            }
        },

        methods: {
            selectPage(e) {
                const active = document.querySelector('.page-selector .category .cates .cates-item.active');
                jutils.removeClass(active, 'active');
                const target = e.target;
                jutils.addClass(target, 'active');
                this.$dispatch('page-change', target.dataset.page);
            }
        },

        data() {
            return {
            };
        },

        computed: {
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
    .slide_icon{display:inline-block; width:12px; height:7px; background:url(~assets/images/slide_icon.jpg) no-repeat scroll center center; background-size:10px; position: absolute; left:50%; top:-6px;}
    .page-selector {
        padding:0.2rem 0.5rem;
        position:relative;
    }
    .category {
        margin: 0.5rem 0;
    }
    .category .title {
        font-size: .9rem; color:#646464;
        padding:2% 3% 1% 3%;
    }
    .category .title:nth-child(1){padding-top:0;}
    .category .cates {
        line-height: 2.5rem;
    }
    .category .cates .cates-item {
        display: inline-block;
        width: 5.6rem;
        height: 2.2rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        text-align: center;
        line-height: 2.4rem;
        margin: 0 0.3rem .5rem .3rem;
        border: solid 1px #f5f5f5;
        font-size: 1rem;
        color:#646464;
    }
    .category .cates .cates-item.active {
        background-color: #fff;
        border: solid 1px #8b49f6;
        color: #8b49f6;
    }
</style>
