<template>
	<div class="panel">
		<div class="title">{{paneltitle}}<span>{{panelunit}}</span></div>
		<slot></slot>
	</div>
</template>

<script>
    export default {
      	props:{
      		paneltitle:{type:String},
            panelunit:{type:String},
      	},
      	data(){
      		return{}
      	}
    };
</script>

<style scoped>
    .panel{ background: #fff; border-radius: 5px; box-shadow: 0 0 5px #e2e2e2; }
    .panel .title{ padding:0 2%; height:2rem; line-height: 2rem; color:#313131; font-size: .8rem; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom:1px solid #e1e1e1; background:linear-gradient(to bottom, #fff 0%,#f6f6f6 100%);}
    .panel .title span{display: inline-block; float:right; color:#959595; font-size: .7rem; padding-top:3px;}
</style>
