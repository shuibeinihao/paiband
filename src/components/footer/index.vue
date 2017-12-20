<template>
    <div class="footer">
        <health-footer v-ref:health-footer v-show="isHealthFooterShow"></health-footer>
        <clock-footer v-ref:clock-footer v-show="isClockFooterShow"></clock-footer>
        <achive-footer v-ref:achive-footer v-show="isAchiveFooterShow"></achive-footer>
    </div>
</template>

<script>
    import jutils from 'jutils';

    import healthFooter from 'components/footer/health';
    import clockFooter from 'components/footer/clock';
    import achiveFooter from 'components/footer/achive';

    export default {
        components: { healthFooter, clockFooter, achiveFooter },

        methods: {
            showHealthFooter(show, name) {
                name && this.$refs.healthFooter.selectItem(name);
                this.isHealthFooterShow = show;
                this.isClockFooterShow = false;
                this.isAchiveFooterShow = false;
            },

            showClockFooter(show, name) {
                name && this.$refs.clockFooter.selectItem(name);
                this.isClockFooterShow = show;
                this.isHealthFooterShow = false;
                this.isAchiveFooterShow = false;
            },

            showAchiveFooter(show, name) {
                name && this.$refs.achiveFooter.selectItem(name);
                this.isAchiveFooterShow = show;
                this.isHealthFooterShow = false;
                this.isClockFooterShow = false;
            }
        },

        data() {
            return {
                isHealthFooterShow: false,
                isClockFooterShow: false,
                isAchiveFooterShow: false
            };
        },
    };
</script>

<style scoped>
    .footer {
    }
</style>
