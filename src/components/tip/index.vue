<template>
    <div class="tip_info" :class="{'tip_info_animate':isAnimate}">
      <p>{{tip_text}}</p>
    </div>
</template>

<script>
  export default {
  	components: {},
		data() {
		  	return {
			    isAnimate:false,
			    tip_text:{},
			    tip_content_arr:[],
		  	}
		},
		methods:{
			showTip(text){
				this.tip_content_arr.push(text);
				this.handelTip();
			},
			handelTip(){
				if(this.tip_content_arr.length && !this.isAnimate){
					this.tip_text = this.tip_content_arr.shift();
					this.isAnimate = true;
					var _this = this;
					setTimeout(function(){
						_this.isAnimate = false;
						if(_this.tip_content_arr.length){
							setTimeout(function(){_this.handelTip()},300);
						}
					},2000);
			    }
			},
		}
	}
</script>

<style scoped>
    .tip_info{position:fixed; width:60%; transition:all .5s; border-radius:10px; left:20%; top:-40%; z-index: 202; }
    .tip_info_animate{top:40%; transition:all .5s;}
    .tip_info p{font-size: 1rem; text-align: center; border-radius:10px;  background: rgba(0,0,0,0.6); color:#fff; padding:5% 4%;}
</style>
