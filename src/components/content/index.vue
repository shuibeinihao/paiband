<template>
    <div class="content">
        <router-view v-ref:view></router-view>
    </div>
</template>

<script>
    import db from 'dbs/hashmap';

    export default {
        methods: {
            contentChange() {
                if(this.p_viewInitState[this.$route.name]) {
                    setTimeout(() => {
                        const $view = this.$refs.view;
                        if($view && $view.update && typeof $view.update === 'function') {
                            $view.update(db.get('screenWidth'), db.get('screenHeight'));
                        }
                    }, 0);
                } else {
                    this.p_viewInitState[this.$route.name] = true;
                    setTimeout(() => {
                        const $view = this.$refs.view;
                        if($view && $view.init && typeof $view.init === 'function') {
                            $view.init(db.get('screenWidth'), db.get('screenHeight'));
                        }
                    }, 0);
                }
            },
        },

        data() {
            return {
                p_viewInitState: { }
            };
        }
    };
</script>

<style scoped>
    .content {
        padding: 0rem 0rem 0;
    }
    .content.no-footer {
        padding: 0rem 0 .8rem 0;
    }
    /*transition="back" keep-alive*/
   /*.back-transition {
      transition: transform .5s ease;
    }
    .back-enter{
      transform: translate(100%,0);
    }
    .back-leave {
      transform: translate(-100%,0);
    }*/
</style>
