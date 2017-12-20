<template>
    <canvas class="gauge-halfring" width="{{ width }}" height="{{ height }}"></canvas>
</template>

<script>
    import jutils from 'jutils';

    export default {
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
            drawRing(percent = 0.1, color = 'blue') {
                this.p_clear();
                this.p_drawBG();

                const canvas = this.$el;
                const radius = Math.min(canvas.width * 0.5, canvas.height);
                const scalel = 10 * (window.devicePixelRatio || 1);
                const scalew = 2 * (window.devicePixelRatio || 1);
                const count = 50;
                const startangle = -Math.PI;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = color;
                ctx.lineWidth = scalew;
                ctx.lineCap = 'round';
                const per_angle = Math.PI / (count - 1);
                const center = [canvas.width * 0.5, canvas.height - scalew];
                ctx.translate(center[0], center[1]);
                ctx.beginPath();
                for(var i = 0; i < Math.floor(count * percent); i++) {
                    const cos = Math.cos(startangle + per_angle * i);
                    const sin = Math.sin(startangle + per_angle * i);
                    ctx.moveTo(radius * cos, radius * sin);
                    ctx.lineTo((radius - scalel) * cos, (radius - scalel) * sin);
                }
                ctx.stroke();
                ctx.restore();
            },

            p_drawBG() {
                const canvas = this.$el;
                const radius = Math.min(canvas.width * 0.5, canvas.height);
                const scalel = 10 * (window.devicePixelRatio || 1);
                const scalew = 2 * (window.devicePixelRatio || 1);
                const count = 50;
                const startangle = -Math.PI;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = '#e1e1e1';
                ctx.lineWidth = scalew;
                ctx.lineCap = 'round';
                const per_angle = Math.PI / (count - 1);
                const center = [canvas.width * 0.5, canvas.height - scalew];
                ctx.translate(center[0], center[1]);
                ctx.beginPath();
                for(var i = 0; i < count; i++) {
                    const cos = Math.cos(startangle + per_angle * i);
                    const sin = Math.sin(startangle + per_angle * i);
                    ctx.moveTo(radius * cos, radius * sin);
                    ctx.lineTo((radius - scalel) * cos, (radius - scalel) * sin);
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

        ready() {
            jutils.fixCanvasSmooth(this.$el);
        }
    };
</script>

<style scoped>
</style>
