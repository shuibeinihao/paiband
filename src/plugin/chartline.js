import Chart from 'chart.js';
// Chart.defaults.advancedLine = Object.assign(Chart.defaults.line, {
//     heatBlocks: [],
//     goalLines: []
// });
Chart.controllers.advancedLine = Chart.controllers.line.extend({
    name: 'advancedLine',
    draw(ease) {
        if(ease <= 1)  {
            const canvas = this.chart.chart.canvas;
            const ctx = this.chart.chart.ctx;
            const ca = this.chart.chartArea;
            const deviceRatio = this.chart.chart.currentDevicePixelRatio;

            const options = this.chart.options;
            const meta = this.getMeta();

            const yScale = this.getScaleForId(this.getMeta().yAxisID);

            ctx.save();
            let fontSize = 10 + deviceRatio;
            ctx.font = fontSize + 'px Helvetica, Hiragino\ Sans\ GB, Microsoft\ Yahei, 微软雅黑, Arial, sans-serif';
            for(let i = 0; i < options.heatBlocks.length; i++) {
                const vstart = yScale.getPixelForValue(options.heatBlocks[i].values[0]);
                const vend = yScale.getPixelForValue(options.heatBlocks[i].values[1]);
                ctx.fillStyle = options.heatBlocks[i].color;
                ctx.beginPath();
                ctx.rect(ca.left, vend, (ca.right - ca.left), vstart - vend);
                ctx.fill();
                ctx.fillStyle = options.heatBlocks[i].textColor;
                //ctx.fillText(options.heatBlocks[i].text, ca.right - options.heatBlocks[i].text.length * fontSize, vend + fontSize);
                ctx.fillText(options.heatBlocks[i].text, ca.right - ctx.measureText(options.heatBlocks[i].text).width, vend + fontSize);
            }
            ctx.restore();

            ctx.save();
            ctx.font = 8 + deviceRatio + 'px Helvetica, Hiragino\ Sans\ GB, Microsoft\ Yahei, 微软雅黑, Arial, sans-serif';
            for(let i = 0; i < options.goalLines.length; i++) {
                const v = yScale.getPixelForValue(options.goalLines[i].value);
                ctx.save();
                ctx.setLineDash([5]);
                ctx.strokeStyle = options.goalLines[i].color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, v);
                ctx.lineTo(canvas.width, v);
                ctx.stroke();
                ctx.restore();
                ctx.save();
                ctx.fillStyle = options.goalLines[i].color;
                ctx.beginPath();
                ctx.arc(ca.left + 5 + deviceRatio, v, 5 + deviceRatio, Math.PI * 0.5, Math.PI * 1.5);
                //ctx.rect(ca.left + 5 + deviceRatio, v - 5 - deviceRatio, (8 + deviceRatio) * options.goalLines[i].text.length, 10 + 2 * deviceRatio);
                ctx.rect(ca.left + 5 + deviceRatio, v - 5 - deviceRatio, 4 * deviceRatio + ctx.measureText(options.goalLines[i].text).width, 10 + 2 * deviceRatio);
                //ctx.arc(ca.left + 5 + deviceRatio + (8 + deviceRatio) * options.goalLines[i].text.length, v, 5 + deviceRatio, Math.PI * 1.5, Math.PI * 0.5)
                ctx.arc(ca.left + 5 + deviceRatio + (4 * deviceRatio) + ctx.measureText(options.goalLines[i].text).width, v, 5 + deviceRatio, Math.PI * 1.5, Math.PI * 0.5)
                ctx.closePath();
                ctx.fill();
                ctx.restore();
                ctx.fillStyle = options.goalLines[i].textColor;
                //ctx.fillText(options.goalLines[i].text, ca.left + 2 + deviceRatio, v + 3 + 0.5 * deviceRatio);
                ctx.fillText(options.goalLines[i].text, ca.left + 5 + deviceRatio + 2 * deviceRatio, v + 0.35 * (8 + deviceRatio));
            }
            ctx.restore();
        }
        Chart.controllers.line.prototype.draw.apply(this, arguments);
    },
    resize(){
        console.log("resize");
    },
    clear(){
        console.log("clear");
    },

});
