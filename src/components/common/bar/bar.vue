<template>
    <div class="bar_content">
        <div class="bar_con" :style="{width: width, height: height}">
        	<canvas id="barChart" width="100%" height="80"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js"
export default {
    props: {
        width: {
            type: String,
            default: null
        },
        height: {
            type: String,
            default: null
        }
    },
  	data(){
	    return{
            myChart: undefined
	    }
    },
  	methods:{
       //根据config数据得到相应的柱状图方法
  		drawBar(config_info){
		    const ctx = config_info.ctx;
			const data = {
			  	labels:config_info.labels,
			    datasets: [{
			        data: config_info.data,
				    backgroundColor:config_info.backgroundColor,
				    fill:false,
                }]
		    };
			const options = {
                maintainAspectRatio: config_info['maintainAspectRatio'] !== false,
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
                            autoSkip: false,
                            maxRotation: 0,
		                    fontColor:"#c2c2c2",
		                    callback: config_info.xCallBack || (v => v)
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
	                        callback: config_info.yCallBack || (v => v)
		                },
		            }]
                }
			};
           if(this.myChart) {
                this.myChart.data.datasets = data.datasets;
                this.myChart.data.labels = data.labels;
                this.myChart.update();
            } else {
                this.myChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: options
                });
            }
  		},
        //根据数据得到相对应的颜色值方法
        formetBackgroundColor(_data){
            var arr = [];
            for(var i=0; i<=_data.length; i++){
                if(_data[i]==200){
                    arr.push("#a2d0fc");
                }else if(_data[i]==100){
                    arr.push("#fbc0a2");
                }else if(_data[i]==300){
                    arr.push("#c5a2fc");
                }
            }
            return arr;
        },
  	},
}

</script>

<style scoped>
    #barChart{-webkit-user-select: none;}
    .bar_content{ background: #fff;}
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
