<template>
  <div class="bar_content">
    <div class="bar_con">
    	<canvas id="barChart" width="100%" height="80"></canvas>
    </div>
  </div>
</template>

<script>
  import Chart from "Chart"
  export default {
  	data(){
	    return{
	    }
    },
  	ready:function(){
      var config_info = {
        ctx:document.getElementById("barChart"),//获取canvas元素
        labels:["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "18", "19", "20", "21", "22", "23"],//x轴坐标数据
        data:[30,40,22,222,22,14,12,15,33,18,19,44,12,15,17,18,19,17,18,19,17,18,19],//bar的对应x轴坐标
        backgroundColor:[ "#f00","#fff3b1","#fff3b1","#fff3b1","#fff3b1","#fff3b1",],
        min:0,//y轴刻度最小值
        max: 250,//y轴刻度最大值
        stepSize: 50,//y轴刻度间隔
        categoryPercentage: 0.9,//控制每个柱状图无间隙显示
        barPercentage: 1,//控制每个柱状图无间隙显示
        callback:function(value){
        	if(value == 0){
          		return "";
          	}
  				else if ((value % 4) == 0) {
  					return value.toString() + ":00";
  				}
  				return '';
        },
      }
  		this.drawBar(config_info);
  	},
  	methods:{
  		drawBar(config_info){
		    var ctx = config_info.ctx;
			  var data = {
			  	labels:config_info.labels,
			    datasets: [{
						data:config_info.data ,
						backgroundColor:config_info.backgroundColor,
						fill:false,
          }]
			  };
			  var options = {
			  	legend: {
		        display: false,
		      },
		      scales: {
		      	xAxes:[{
		          gridLines:{
		          	display:false,
		          },
              categoryPercentage: config_info.categoryPercentage,//控制每个柱状图无间隙显示
              barPercentage: config_info.barPercentage,//控制每个柱状图无间隙显示
		          stacked: false,//是否堆叠
		          ticks: {
		            fontColor:"#c2c2c2",
		            callback:config_info.callback,
		          },
		      	}],
		        yAxes: [{
		          type: 'linear',
		          stacked: false,
		          gridLines:{
		            drawBorder:false,//y轴是否划线
		            color:"#f5f5f5",
		            zeroLineColor:"#ebebeb",//y轴第一条线的颜色
		            tickMarkLength:0,//距离左边距离为零
		          },
		          ticks: {
		            min: config_info.min,
		            max: config_info.max,
		            stepSize: config_info.stepSize,
		            fontColor:"#c2c2c2",
	              callback: function(value, index, values) {
	              	if(value == 0){
	              		return "";
	              	}
	                return value;
	              }
		          },
		        }]
		      }
			  }
				var LineChart = new Chart(ctx, {
			    type: 'bar',
			    data: data,
			    options: options
		    });
  		}
  	},
  }

</script>

<style scoped>
  .bar_content{  background: #fff;}
  .bar_content .bar_title{
    border-top-left-radius: 5px; border-top-right-radius: 5px; padding:3%;
    background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 100%);
  }
  .bar_content .bar_con{ padding:3%;}
  .bar_content .bar_tab{ padding:3%; text-align: center; font-size: 0;}
  .bar_content .bar_tab a{
    display:inline-block; padding:2% 8%; border:1px solid #ff9c0c; color:#ff9c0c; font-size: .8rem;
  }
  .bar_content .bar_tab a.act{background:#ff9c0c; color:#fff;}
  .bar_content .bar_tab a:nth-child(1){border-top-left-radius: 5px; border-bottom-left-radius: 5px;}
  .bar_content .bar_tab a:nth-child(3){
  	border-top-right-radius: 5px; border-bottom-right-radius: 5px; margin-left:-1px;
  }
  .bar_content .bar_tab a:nth-child(2){margin-left:-1px;}
</style>
