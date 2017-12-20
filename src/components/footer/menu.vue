<template>
    <ul class="footer-menu">
        <li class="menu" v-for="page in p_pageCategory">
            <a class="menu-btn" v-if="!!page.page" @click="selectPage(page.page)">
                <img :src="page.icon"></img>
                <p><span>{{ page.title }}</span></p>
            </a>
            <a class="menu-btn" v-else @click="showMenu($index)">
                <img :src="page.icon"></img>
                <p><span>{{ page.title }}</span><i class="txt"></i></p>
            </a>
            <ul class="menu-list" v-if="page.items.length > 0" v-show="page.select">
                <li v-for="item in page.items" :class="{ selected: item.select }">
                    <a @click="selectPage(item.page)">{{ item.name }}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    import jutils from 'jutils';

    import healthFooter from 'components/footer/health';
    import clockFooter from 'components/footer/clock';
    import achiveFooter from 'components/footer/achive';

    export default {
        components: { healthFooter, clockFooter, achiveFooter },

        methods: {
            getPageName(page) {
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    if(this.p_pageCategory[i].page === page) {
                        return this.p_pageCategory[i].title;
                    } else {
                        for(let j = 0; j < this.p_pageCategory[i].items.length; j++) {
                            if(this.p_pageCategory[i].items[j].page === page) {
                                return this.p_pageCategory[i].items[j].name;
                            } 
                        }
                    }
                }
                return null;
            },

            showMenu(idx) {
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    if(this.p_pageCategory[i].select) {
                        this.p_pageCategory[i].select = false;
                    } else {
                        this.p_pageCategory[i].select = i === idx ;
                    }
                }
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    if(this.p_pageCategory[i].select) {
                        break;
                    }
                    if(i === this.p_pageCategory.length - 1) {
                        this.hideMenu();
                    }
                }
                if(this.p_pageCategory[idx] && this.p_pageCategory[idx].select) {
                    this.$dispatch('togglemark', true, 'menu', this.hideMenu.bind(this));
                }
            },

            hideMenu() {
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    if(this.p_pageCategory[i].select) {
                        this.p_pageCategory[i].select = false;
                    }
                }
                this.$dispatch('togglemark', false, 'menu');
            },

            setSelectPage(page) {
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    for(let j = 0; j < this.p_pageCategory[i].items.length; j++) {
                        if(this.p_pageCategory[i].items[j].page === page) {
                            this.p_pageCategory[i].items[j].select = true;
                        } else {
                            this.p_pageCategory[i].items[j].select = false;
                        }
                    }
                }
            },

            selectPage(page) {
                for(let i = 0; i < this.p_pageCategory.length; i++) {
                    if(this.p_pageCategory[i].page === page) {
                        this.$dispatch('page-change', page);
                    } else {
                        for(let j = 0; j < this.p_pageCategory[i].items.length; j++) {
                            if(this.p_pageCategory[i].items[j].select) {
                                if(this.p_pageCategory[i].items[j].page === page) {
                                } else {
                                    this.p_pageCategory[i].items[j].select = false;
                                }
                            } else {
                                if(this.p_pageCategory[i].items[j].page === page) {
                                    this.p_pageCategory[i].items[j].select = true;
                                    this.$dispatch('page-change', page);
                                }
                            }
                        }
                    }
                }
                this.hideMenu();
            }
        },

        data() {
            return {
                p_pageCategory: [
                    {
                        title: '成长健康',
                        select: false,
                        icon: require('assets/images/footer/icon_24_01@3x.png'),
                        items: [
                            { select: true, name: this.$i18n('page_name_sport'), page: 'health-sport'},
                            { select: false, name: this.$i18n('page_name_sleep'), page: 'health-sleep'},
                            { select: false, name: this.$i18n('page_name_heart'), page: 'health-heart'},
                            { select: false, name: this.$i18n('page_name_grow'), page: 'expert'},
                        ]
                    },
                    {
                        title: this.$i18n('page_name_achive'),
                        select: false,
                        icon: require('assets/images/footer/icon_24_03@3x.png'),
                        page: 'achive-task',
                        items: [ ]
                    },
                    {
                        title: '其他功能',
                        select: false,
                        icon: require('assets/images/footer/icon_24_02@3x.png'),
                        items: [
                            { select: false, name: this.$i18n('page_name_clock'), page: 'clock-all'},
                            { select: false, name: this.$i18n('page_name_security'), page: 'security'},
                            { select: false, name: this.$i18n('page_name_setting'), page: 'setting'},
                            { select: false, name: this.$i18n('page_name_mypaiband'), page: 'mypaiband'},

                        ]
                    }
                ]
            };
        },
    };
</script>

<style scoped>
    .footer-menu{display:none;}
    .menu {
        display: table-cell;
        position: relative;
    }
    .menu .menu-btn {
        width: 100%;
        height: 100%;
        display: inline-block;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-left: 1px solid #e1e1e1;
        border-right: 1px solid rgba(0, 0, 0, 0);
        border-top: 1px solid #e1e1e1;
        font-size: 0.7rem;
    }
    .menu .menu-btn img {
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        margin: 0.3rem auto 0 auto;
    }
    .menu .menu-btn p {
        /*height: 1.4rem;*/
        position: relative;
        line-height: 1rem;
    }
    .menu .menu-btn p span {
        display: inline-block;
        vertical-align: middle;
    }
    .menu .menu-btn .txt {
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        vertical-align: middle;
        background-image: url('~assets/images/footer/icon_12_06@3x.png');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
    .menu .menu-list {
        width: 90%;
        position: absolute;
        bottom: 3.6rem;
        margin: 0 auto;
        left: 0;
        right: 0;
        background-color: #FFF;
        border-radius: 4px;
        line-height: 2.75rem;
    }
    .menu .menu-list:after {
        border: 10px solid transparent;
        border-top: 10px solid #FFF;
        margin-left: -10px;
        margin-top: -4px;
        width: 0;
        height: 0;
        position: absolute;
        content: ' '
    }
    .menu .menu-list li {
        border-top: 1px solid #e1e1e1;
        font-size: 0.8rem;
    }
    .menu .menu-list li:first-child {
        border-top: none;
    }
    .menu .menu-list li.selected {
        /*background-color: rgba(0, 0, 0, 0.5);*/
    }
    .menu .menu-list li a {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #313131;
        font-size: 0.875rem;
    }
    .menu .menu-list li.selected a {
        /*color: #FFF;*/
    }
</style>
