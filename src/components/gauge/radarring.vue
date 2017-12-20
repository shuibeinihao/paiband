<template>
    <canvas class="gauge-ring" width="{{ width }}" height="{{ height }}"></canvas>
</template>

<script>
    import jutils from 'jutils';

    export default {
        data(){
            return {
                timer:null
            }
        },
        props: {
            width: {
                type: Number,
                require: true,
                default: 300
            },
            height: {
                type: Number,
                require: true,
                default: 300
            }
        },

        methods: {
            update(width, height) {
                if(width > 0 && height > 0) {
                    this.$el.width = width;
                    this.$el.height = height;
                    jutils.fixCanvasSmooth(this.$el);
                }
            },

            drawRing() {
                // this.p_clear();
                // this.p_drawBG();

                const canvas = this.$el;
                const radius = (Math.min(canvas.width, canvas.height) - 5 * (window.devicePixelRatio || 1)) * 0.5;
                const scalel = 5 * (window.devicePixelRatio || 1);
                const startangle = -Math.PI * 0.5;
                const ctx = canvas.getContext('2d');
                let num = 0;
                let me = this
                const scanning = () => {
                    me.p_clear();
                    me.p_drawBG();
                    ctx.save();
                    const start_angle = 0 + (num)/10;
                    const end_angle = Math.PI * (0.75)+start_angle;
                    const g_rad = 4 * radius / 5;
                    const gradient = ctx.createLinearGradient(g_rad * Math.cos(end_angle), g_rad * Math.sin(end_angle), g_rad * Math.cos(start_angle), g_rad * Math.sin(start_angle));
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    ctx.fillStyle = gradient;
                    const center = [canvas.width * 0.5, canvas.height * 0.5];
                    ctx.translate(center[0], center[1]);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.arc(0, 0, 4 * radius / 5, start_angle, end_angle);
                    ctx.fill();

                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.beginPath();
                    ctx.arc(0, 0, 2 * (radius - scalel) / 5 - 1, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    ctx.restore();
                    num += 0.5;
                    me.timer = window.requestAnimationFrame(scanning);
                };
                scanning();
            },

            p_drawBG() {
                const canvas = this.$el;

                const radius = Math.min(canvas.width, canvas.height) * 0.5;
                const scalel = 5 * (window.devicePixelRatio || 1);
                const scalew = 1 * (window.devicePixelRatio || 1);
                const count = 200;
                const startangle = -Math.PI * 0.5;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = scalew;
                const per_angle = Math.PI * 2 / count;
                const center = [canvas.width * 0.5, canvas.height * 0.5];
                ctx.translate(center[0], center[1]);
                ctx.beginPath();
                for(let i = 0; i < count; i++) {
                    const cos = Math.cos(startangle + per_angle * i);
                    const sin = Math.sin(startangle + per_angle * i);
                    ctx.moveTo(radius * cos, radius * sin);
                    ctx.lineTo((radius - scalel) * cos, (radius - scalel) * sin);
                }
                for(let i = 0; i < 8; i++) {
                    const cos = Math.cos(-Math.PI * 0.5 + i * Math.PI * 2 / 8);
                    const sin = Math.sin(-Math.PI * 0.5 + i * Math.PI * 2 / 8);
                    const rad = 2 * (radius - scalel) / 5;
                    ctx.moveTo(rad * cos, rad * sin);
                    ctx.lineTo((radius - scalel) * cos, (radius - scalel) * sin);
                }
                ctx.moveTo(0, 0);
                for(let i = 2; i < 5; i++) {
                    const rad = i * (radius - scalel) / 5;
                    ctx.arc(0, 0, rad, 0, Math.PI * 2);
                }
                ctx.stroke();
                ctx.restore();
            },

            p_clear() {
                const canvas = this.$el;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        },

        beforeDestroy(){
            window.cancelAnimationFrame(this.timer);
            this.p_clear();
        }
    };
</script>

<style scoped>
</style>
