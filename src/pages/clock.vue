<template>
    <div class="clock">
        <router-view v-ref:view></router-view>
    </div>
</template>

<script>
  export default {
      methods: {
            init(width, height) {
                const $view = this.$refs.view;
                if($view && $view.init && typeof $view.init === 'function') {
                    $view.init(width, height);
                }
            },

            update(width, height) {
                const $view = this.$refs.view;
                if($view && $view.update && typeof $view.update === 'function') {
                    $view.update(width, height);
                }
            }
        }
  };
</script>

<style scoped>
</style>
