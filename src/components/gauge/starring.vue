<template>
    <canvas class="gauge-ring" width="{{ width }}" height="{{ height }}"></canvas>
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
            update(width, height) {
                if(width > 0 && height > 0) {
                    this.$el.width = width;
                    this.$el.height = height;
                    jutils.fixCanvasSmooth(this.$el);
                }
            },

            drawRing(percent) {
                this.p_clear();
                this.p_drawBG();

                if(percent > 0) {
                    const canvas = this.$el;
                    const radius = (Math.min(canvas.width, canvas.height) - 35 * (window.devicePixelRatio || 1)) * 0.5;
                    const scalew = 5 * (window.devicePixelRatio || 1);
                    const startangle = -Math.PI * 0.5;
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
                    ctx.lineWidth = scalew;
                    ctx.lineCap = 'round';
                    const center = [canvas.width * 0.5, canvas.height * 0.5];
                    ctx.translate(center[0], center[1]);
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, startangle, startangle + percent * Math.PI * 2)
                    ctx.stroke();
                    ctx.restore();
                }
            },

            p_drawBG() {
                const canvas = this.$el;
                const radius = Math.min(canvas.width, canvas.height) * 0.5;
                const scalel = 5 * (window.devicePixelRatio || 1);
                const scalew = 1 * (window.devicePixelRatio || 1);
                const gap = 15 * (window.devicePixelRatio || 1);
                const count = 200;
                const startangle = -Math.PI * 0.5;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = scalew;
                const per_angle = Math.PI * 2 / count;
                const center = [canvas.width * 0.5, canvas.height * 0.5];
                ctx.translate(center[0], center[1]);
                ctx.beginPath();
                for(let i = 0; i < count; i++) {
                    const cos = Math.cos(startangle + per_angle * i);
                    const sin = Math.sin(startangle + per_angle * i);
                    ctx.moveTo((radius - gap) * cos, (radius -gap) * sin);
                    ctx.lineTo((radius - gap - scalel) * cos, (radius - gap - scalel) * sin);
                }
                const star_angle = Math.PI / 5;
                let star_start_angle = star_angle;
                ctx.moveTo(radius * Math.cos(star_start_angle), radius * Math.sin(star_start_angle));
                for(let i = 1; i < 10; i++) {
                    if(i % 2 === 0) {
                        ctx.lineTo(radius * Math.cos(star_start_angle + i * star_angle), radius * Math.sin(star_start_angle + i * star_angle));
                    } else {
                        ctx.lineTo((radius - 2 * gap) * Math.cos(star_start_angle + i * star_angle), (radius - 2 * gap) * Math.sin(star_start_angle + i * star_angle));
                    } 
                }
                ctx.lineTo(radius * Math.cos(star_start_angle), radius * Math.sin(star_start_angle));

                star_start_angle = star_start_angle + star_angle;
                ctx.moveTo(radius * Math.cos(star_start_angle), radius * Math.sin(star_start_angle));
                for(let i = 1; i < 10; i++) {
                    if(i % 2 === 0) {
                        ctx.lineTo(radius * Math.cos(star_start_angle + i * star_angle), radius * Math.sin(star_start_angle + i * star_angle));
                    } else {
                        ctx.lineTo((radius - 2 * gap) * Math.cos(star_start_angle + i * star_angle), (radius - 2 * gap) * Math.sin(star_start_angle + i * star_angle));
                    } 
                }
                ctx.lineTo(radius * Math.cos(star_start_angle), radius * Math.sin(star_start_angle));

                ctx.stroke();
                ctx.restore();
            },

            p_clear() {
                const canvas = this.$el;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };
</script>

<style scoped>
</style>
