<template>
  <div class="growrecord">
  	<div class="panel_wrapper">
  		<div class="panel pop_height_data">
		    <div class="title">全部身高数据<a v-link="{name:'setting'}">去更新</a></div>
		    <div class="thead">
			  	<span>身高(CM)</span>
			  	<span>状态</span>
			  	<span>记录日期</span>
			 </div>
		    <div class="content_info">
		    	<p v-for="height_records in heightRecords">
		    		<span>{{height_records.height}}</span>
		    		<span>{{height_records.status_text}}</span>
		    		<span>{{height_records.time}}</span>
		    	</p>
		    </div>
	    </div>
		   <div class="panel pop_weight_data">
			    <div class="title">全部体重数据<a v-link="{name:'setting'}">去更新</a></div>
		    <div class="thead">
			  	<span>体重(KG)</span>
			  	<span>状态</span>
			  	<span>记录日期</span>
			</div>
		    <div class="content_info">
		    	<p v-for="weight_records in weightRecords">
		    		<span>{{weight_records.weight}}</span>
		    		<span>{{weight_records.status_text}}</span>
		    		<span>{{weight_records.time}}</span>
		    	</p>
		    </div>
		</div>
  	</div>
	    <div class="item_icon">
		  	<span class="act"></span>
		  	<span></span>
	    </div>
  </div>
</template>

<script>
import $ from "zepto";
import expert from "services/expert";
export default {
	data(){
		return{
			heightRecords:[],
			weightRecords:[],
			endHTime:"",
			endWTime:"",
		}
	},
	ready:function(){
    	this.touchGetDate();
	},
	methods:{
		init(width,height){
	        expert.getHeightRecords(this.endHTime,this.updateHeightRecords, this.updateHeightRecordsError);
	        expert.getWeightRecords(this.endWTime,this.updateWeightRecords, this.updateWeightRecordsError);
		},
	    update() {
			expert.getHeightRecords(this.endHTime,this.updateHeightRecords, this.updateHeightRecordsError);
			expert.getWeightRecords(this.endWTime,this.updateWeightRecords, this.updateWeightRecordsError);
        },
		updateHeightRecords(data){
			if(data.data){
				let harr = ["偏矮","标准","偏高"];
			    for(let i = 0; i<data.data.length; i++){
			      	data.data[i].status_text =  harr[data.data[i].status];
			    }
		     this.heightRecords = data.data;
		    }else{
		    	this.$dispatch("showtip","数据获取失败");
		    }
	    },
	    updateHeightRecordsError(error){
	        this.$dispatch("showtip",error);
	    },
	    updateWeightRecords(data){
	    	if(data.data){
		    	let harr = ["重度消瘦","轻度消瘦","标准","偏重","肥胖"];
		        for(let i = 0; i<data.data.length; i++){
		      		data.data[i].status_text =  harr[parseInt(data.data[i].status)+1];
		        }
		    this.weightRecords = data.data;
		    }else{
		    	this.$dispatch("showtip","数据获取失败");
		    }
	    },
	    updateWeightRecordsError(error){
	        this.$dispatch("showtip",error);
	    },
	    touchGetDate(){
	        var mx = 0;
	        var me = 0;
	        var currut_index = 0;
	  		var touch_target = this.$el.querySelector(".panel_wrapper");
	  		var childnodes = this.$el.querySelector(".item_icon").getElementsByTagName("span");
	  		touch_target.addEventListener("touchstart",function(e){
	  			me = 0;
	        	mx=e.touches[0].pageX;
	  	    });
		    touch_target.addEventListener("touchmove",function(e){
		      	e.preventDefault();
		      	me = mx-e.touches[0].pageX;
		    });
		    touch_target.addEventListener("touchend",function(e){
		      	//e.preventDefault();
		      	if(me>50){ // 右移动 10 个像素以上
			        console.log("左");
			        currut_index = 0?1:0;
			        $(e.target).parents(".panel").hide();
			        $(e.target).parents(".panel").siblings().show();
			        childnodes[0].className == "act"?childnodes[0].className = "":childnodes[0].className = "act";
			        childnodes[1].className == "act"?childnodes[1].className = "":childnodes[1].className = "act";
				}else if(me<-50){// 左移动
				    console.log("又");
				    currut_index = 0?1:0;
				    $(e.target).parents(".panel").hide();
			        $(e.target).parents(".panel").siblings().show();
			        childnodes[0].className == "act"?childnodes[0].className = "":childnodes[0].className = "act";
			        childnodes[1].className == "act"?childnodes[1].className = "":childnodes[1].className = "act";
				}else{// 没动
				        console.log("原地");
				}
		    });
		},
	}
}
</script>

<style scoped>
.panel{ background: #fff; margin:4%; border-radius: 5px; box-shadow: 0 0 5px #e2e2e2;}
.panel .title{ padding:2%; color:#313131; font-size: 1rem; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom:1px solid #e1e1e1; background:linear-gradient(to bottom, #fff 0%,#f6f6f6 100%); overflow:hidden;}
.panel .title a{display:inline-block; float:right; font-size: .7rem; color:#959595; padding:3px 5px 3px 23px; background:url(~assets/images/update_icon.png) no-repeat scroll left center; background-size: 20px;}
.item_icon{text-align:center;}
.item_icon span{display: inline-block; width:8px; height:8px; margin:0 2px; background: #fff; border-radius: 50%;}
.pop_weight_data{display:none;}
.panel .thead{ border-bottom:1px solid #e1e1e1; box-shadow: 0 4px 10px #f5f5f5; padding:2%; overflow:hidden;}
.panel .thead span{display:inline-block; color:#959595; font-size: .9rem;}
.panel .thead span:nth-child(2){margin:0 auto; text-align: center; width:4rem; position: absolute; left:50%; margin-left:-2rem;}
.panel .thead span:nth-child(3){float:right;}
.panel .content_info{height:20rem; overflow:scroll; padding:0 4%;}
.panel .content_info p{border-bottom:1px solid #e1e1e1; padding:4% 0; position:relative;}
.panel .content_info p:nth-last-child(1){border-bottom:none;}
.panel .content_info p span{display:inline-block; color:#646464; font-size: .9rem;}
.panel .content_info p span:nth-child(2){margin:0 auto; text-align: center; width:4rem; position: absolute; left:50%; margin-left:-2rem;}
.panel .content_info p span:nth-child(3){float:right;}
.item_icon span.act{background:#8c3ffa;}
</style>
