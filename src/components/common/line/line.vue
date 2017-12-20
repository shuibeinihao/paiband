<template>
    <div class="line_content">
	    <div class="line_con" :style="{width: width, height: height}">
	    	<canvas id="lineChart" width="100%" height="80"></canvas>
	    </div>
    </div>
</template>

<script>
    import Chart from "chart.js";

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
            myChart: undefined,
	    }
    },
  	methods:{
  		drawLine(config_info){
		    var ctx = config_info.ctx || this.$el.querySelector('#lineChart');
            var data = {
                labels: config_info.labels,
                datasets: [
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
                maintainAspectRatio: config_info['maintainAspectRatio'] !== false,
                heatBlocks: config_info.heatBlocks || [],
                goalLines: config_info.goalLines || [],
                legend: {
                    display: false,//上方方块信息不显示
                },
                scales: {
                    xAxes:[{
                        gridLines:{
                            display:false,//x轴线不显示
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0,
                            fontColor:"#c2c2c2",//x轴的字体颜色
                            callback: config_info.xCallBack || (v => v)
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
                            callback: config_info.yCallBack || (v => v)
                        },
                        backColor:config_info.backColor
                        //y轴增加一个参数对象，里面设置数组choseColor，给纵向每一行分别增加颜色,showtext数组放入每行对应的文字描述
                    }]
                }
            }
            //每次new一个实例会多出来一个iframe 不每次new一个实例 修改目标不会刷新页面

	         //    if(this.myChart) {
	         //        this.myChart.data.datasets = data.datasets;
	         //        this.myChart.data.labels = data.labels;
	         //        //this.myChart.update();
		        // } else {
		            this.myChart = new Chart(ctx, {
		                type: 'advancedLine',
		                data: data,
		                options: options
		            });
		        // }

				/*if(this.myChart) {*/
					/*this.myChart.data.datasets = data.datasets;*/
					/*this.myChart.data.labels = data.labels;*/
					/*this.myChart.update();*/
				/*} else {*/
					/*this.myChart = new Chart(ctx, {*/
						/*type: 'advancedLine',*/
						/*data: data,*/
						/*options: options*/
					/*});*/
				/*}*/
  		    },
  		touchGetDate(){
	        var mx = 0;
	        var me = 0;
	  		var touch_target = this.$el.querySelector("canvas");
	  		touch_target.addEventListener("touchstart",function(e){
	        	mx=e.touches[0].pageX;
	  		});
	        touch_target.addEventListener("touchmove",function(e){
	      		me = mx-e.touches[0].pageX;
	        });
	        touch_target.addEventListener("touchend",function(e){
		      	if(me>50){ // 右移动 10 个像素以上
			        console.log("左");
			        return false;
				}else if(me<-50){// 左移动
				      console.log("右");
				}else{// 没动
				      console.log("原地");
				}
	        });
  		},
  	},
}

</script>

<style scoped>
	#lineChart{position:relative; z-index: 2;-webkit-user-select: none;}
	.line_content{ background: #fff;}
	.line_content .line_con{ padding:3%; position: relative;}
</style>
