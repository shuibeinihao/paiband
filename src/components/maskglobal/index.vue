<template>
    <div class="mark_info" v-show="isMark" @click="clickMask"></div>
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
			},
            clickMask() {
                this.clickCall && typeof this.clickCall === 'function' && this.clickCall();
                this.clickCall = null;
            }
		}
	}
</script>

<style scoped>
    .mark_info{position:fixed; width:100%; height:100%; background: rgba(0,0,0,0.6); left:0; top:0; z-index: 250;}
</style>
