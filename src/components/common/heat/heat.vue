<template>
    <div class="heat_content">
	    <div class="heat_con">
	    	<canvas id="heatChart" width="100%" height="80"></canvas>
	    	<span class="line_slow">{{$i18n("heat_j")}}</span>
	    	<span class="line_resting">{{$i18n("heat_m")}}</span>
	    	<span class="line_fastest">{{$i18n("heat_k")}}</span>
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
	        ctx:document.getElementById("heatChart"),//获取canvas元素
	        labels:["","12", "13", "14", "15", "16", "17", this.$i18n("grow_today")],//x轴坐标数据
	        lineTension:0.5,//line弯曲平滑程度
	        borderColor: "#ef5361",//边框颜色
	        pointBackgroundColor: "#ef5361",//point点bg颜色
	        data_line_slow: [50,50,50,50,50,50,50,50,50],//目标线最慢
	        data_line_resting: [90,90,90,90,90,90,90,90,90],//目标线静熄
	        data_line_fastest: [140,140,140,140,140,140,140,140,140],//目标线最快
	        data: [,75, 95, 65, 7, 9,85,],//line线的对应x轴坐标
	        min:0,//y轴刻度最小值
	        max: 200,//y轴刻度最大值
	        stepSize: 40,//y轴刻度间隔
        }
  		this.drawHeat(config_info);//方法调用
  		this.computeTarget(config_info)
  	},
  	methods:{
  		drawHeat(config_info){
		    var ctx = config_info.ctx;
			    var data = {
			    	labels: config_info.labels,
		        	datasets: [
				        {
					      	data: config_info.data_line_slow,
					      	borderDash:[5,5],//设置为虚线
					      	fill:false,//填充为否
					      	pointRadius:0,//圆点大小 目前为0  不显示
					      	borderWidth:1,
					      	borderColor:"#93daf3",
				        },
				        {
					      	data: config_info.data_line_resting,
					      	borderDash:[5,5],//设置为虚线
					      	fill:false,//填充为否
					      	pointRadius:0,//圆点大小 目前为0  不显示
					      	borderWidth:1,
					      	borderColor:"#b7e494",
				        },
				        {
					      	data: config_info.data_line_fastest,
					      	borderDash:[5,5],//设置为虚线
					      	fill:false,//填充为否
					      	pointRadius:0,//圆点大小 目前为0  不显示
					      	borderWidth:1,
					      	borderColor:"#f698a1",
					      	backgroundColor:"#f00"
				        },
				        {
							fill: false,
							lineTension: config_info.lineTension,
							beginAtZero:false,
							borderColor: config_info.borderColor,
							pointBorderColor: "#fff",
							pointBackgroundColor:config_info.pointBackgroundColor,
							pointBorderWidth: 2,
							pointRadius: 5,
							data: config_info.data,
				        }
		            ]
			  };
			  var options = {
			  	legend: {
		        display: false,//上方方块信息不显示
		      },
		      scales: {
		      	xAxes:[{
		          gridLines:{
		          	display:false,//x轴线不显示
		          },
		          ticks: {
		            fontColor:"#c2c2c2",//x轴的字体颜色
		          }
		      	}],
		        yAxes: [{
		          type: 'linear',
		          gridLines:{
		            drawBorder:false,//是否划线
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
		              		return "";//y轴第一个刻度不显示
		              	}
		                return value;
		              }
		          }
		        }]
		      }
			  }
				var LineChart = new Chart(ctx, {
			    type: 'line',
			    data: data,
			    options: options
		    });
  		},
  		computeTarget(config_info){
  			var _this = this.$el;
  			var canvas = _this.querySelector("canvas");
  			var canvas_height = canvas.height;
  			var line_slow_height = config_info.data_line_slow[1]*canvas_height/config_info.max;
  			var line_slow_bottom = line_slow_height*100/canvas_height;
  			_this.querySelector(".line_slow").style.bottom = line_slow_bottom+ "%";
  			var line_resting_height = config_info.data_line_resting[1]*canvas_height/config_info.max;
  			var line_resting_bottom = line_resting_height*100/canvas_height;
  			_this.querySelector(".line_resting").style.bottom = line_resting_bottom+ "%";
  			var line_fastest_height = config_info.data_line_fastest[1]*canvas_height/config_info.max;
  			var line_fastest_bottom = line_fastest_height*100/canvas_height;
  			_this.querySelector(".line_fastest").style.bottom = line_fastest_bottom + "%";
  		},
  	},
}

</script>

<style scoped>
	.heat_content{ width:92%; margin:4%; background: #fff;}
	.heat_content .heat_title{
	border-top-left-radius: 5px; border-top-right-radius: 5px; padding:3%;
	background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 100%);
	}
	.heat_content .heat_con{ padding:3%; position: relative;}
	.heat_content .heat_con span{font-size: .6rem; -webkit-text-size-adjust:none; border-radius:10px;color:#fff; padding:0% 2%; position:absolute; z-index: 4; left:8%;}
	.heat_content .heat_con .line_slow{background: rgba(147,218,243,0.6);}
	.heat_content .heat_con .line_resting{background: rgba(183,228,148,0.6);}
	.heat_content .heat_con .line_fastest{background: rgba(246,152,161,0.6);}

	.heat_content .heat_tab{ padding:3%; text-align: center; font-size: 0;}
	.heat_content .heat_tab a{
	display:inline-block; padding:2% 8%; border:1px solid #ff9c0c; color:#ff9c0c; font-size: .8rem;
	}
	.heat_content .heat_tab a.act{background:#ff9c0c; color:#fff;}
	.heat_content .heat_tab a:nth-child(1){border-top-left-radius: 5px; border-bottom-left-radius: 5px;}
	.heat_content .heat_tab a:nth-child(3){
		border-top-right-radius: 5px; border-bottom-right-radius: 5px; margin-left:-1px;
	}
	.heat_content .heat_tab a:nth-child(2){margin-left:-1px;}
</style>
