<template>
    <div class="mark_info" v-show="isMark" transition="fadeInOut" @click="clickMask"></div>
</template>

<script>
  export default {
		data() {
		  return {
		    isMark: false,
            clickCall: null,
            flag: undefined
		  }
		},
		methods:{
			showMark(isShow, flag, clickcall) {
                if(isShow) {
                    if(flag != this.flag) {
                        this.flag = flag;
                        this.clickMask();
                    }
                    clickcall && typeof clickcall === 'function' && (this.clickCall = clickcall);
                }

				this.isMark = isShow;
                this.$dispatch("noslide",isShow);
			},
            clickMask() {
                this.clickCall && typeof this.clickCall === 'function' && this.clickCall();
                this.clickCall = null;
                this.$dispatch("noslide",false);
            },
		}
	}
</script>

<style scoped>
    .mark_info{position:fixed; width:100%; height:100%; background: rgba(0,0,0,0.6); left:0; top:0; z-index: 9;}
</style>
