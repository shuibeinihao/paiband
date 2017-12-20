<template>
	<div v-show="isAlertShow">
        <div class="alert_info" :class="{'alert_info_animate':isAnimate}">
            <div class="alert_content"></div>
            <div class="alert_btn" :class="{ 'alert_btn_one': isOne, 'alert_btn_two': isTwo}">
                <a @click="closeAlert(btn.btn_name)" v-for="btn in alert_config.btns">{{btn.btn_name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
  	components: {},
		data() {
		    return {
			    isTwo: false,
			    isOne: false,
			    isAnimate:false,
			    alert_config:{},
			    alert_content_arr:[],
		        isAlertShow: false
		    }
		},
		methods:{
			showAlert(text, rightnow = false){
                if(rightnow) {
                    this.alert_content_arr = [text];
                } else {
                    this.alert_content_arr.push(text);
                }
				if(this.alert_content_arr.length == 1){
					this.handleCurrConfig();
				}
                this.isAlertShow = true;
				this.isAnimate = true;
			},
			closeAlert(btn_text){
				this.alert_content_arr.shift();
				if(this.alert_content_arr.length){
					this.handleCurrConfig();
				} else {
					this.isAnimate = false;
                    this.isAlertShow = false;
					this.$dispatch("closeinfo");
					for(let i = 0; i<this.alert_config.btns.length; i++){
			            if(btn_text == this.alert_config.btns[i].btn_name){
			            	const callback=this.alert_config.btns[i].callback;
			                if(callback && typeof callback == 'function'){
			                	callback();
			                }
					    }
					}
				}
			},
			handleCurrConfig(){
				this.alert_config = Object.assign({btns:[]}, this.alert_content_arr[0]);
                this.$el.querySelector('.alert_content').innerHTML = this.alert_config.alert_content || '';
				if(this.alert_config.btns.length == 1){
					this.isOne = true;
					this.isTwo = false;
				}else if(this.alert_config.btns.length == 2){
					this.isTwo = true;
					this.isOne = false;
			    }
			    else if(this.alert_config.btns.length == 0){
					this.isTwo = false;
					this.isOne = false;
			    }
			},
		}
	}
</script>

<style scoped>
    .alert_info{display:block; position:fixed; width:82%; height:auto; transition:all .5s; background: #fff; border-radius:5px;  z-index: 300; top:0%; left:5%; padding:0% 4%;}
    .alert_info_animate{top:25%; transition:all .5s;}
    .alert_info .alert_content{position: relative; word-break:break-all; font-size: .9rem; padding:7% 0; color:#000; text-align:center;}
    .alert_info .alert_btn a{display:block; color:#2196F3;text-align: center; font-size: 1rem; }
    .alert_info .alert_btn_one,
    .alert_info .alert_btn_two{overflow:hidden;}
    .alert_info .alert_btn_one a{width:100%; float:left; border-top:1px solid #e1e1e1; padding:2% 0;}
    .alert_info .alert_btn_two a{width:50%; float:left; border-top:1px solid #e1e1e1; padding:2% 0;}
    .alert_info .alert_btn_two a:nth-child(2){display: block; border-left:1px solid #e1e1e1; margin-left:-1px;}
    .alert_info .alert_btn_none{display:none;}


</style>
