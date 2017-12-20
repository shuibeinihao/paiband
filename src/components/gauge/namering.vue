<template>
    <canvas class="gauge-namering" width="{{ width }}" height="{{ height }}"></canvas>
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

            drawRing(index = 0, percent = 0.5, labels = [this.$i18n('grow_level_weight_lightlower'),this.$i18n('grow_level_weight_standard'),this.$i18n('grow_level_weight_lighthigher'),this.$i18n('grow_level_weight_higher'),this.$i18n('grow_level_weight_lower')]) {
                this.p_clear();
                this.p_drawBG(labels);

                const canvas = this.$el;
                const center = [canvas.width * 0.5, canvas.height * 0.5];
                const radius = (Math.min(canvas.width, canvas.height) - 40 * (window.devicePixelRatio || 1)) * 0.5;
                const ctx = canvas.getContext('2d');

                ctx.save();

                ctx.translate(center[0], center[1]);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';

                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.closePath()
                ctx.fill();

                ctx.beginPath();
                const angle = -Math.PI / 2 + (index + 1) * Math.PI * 2 / labels.length * percent;
                ctx.moveTo(radius * Math.cos(angle - Math.PI / 36), radius * Math.sin(angle - Math.PI / 36));
                ctx.lineTo((radius + 6 * (window.devicePixelRatio || 1)) * Math.cos(angle), (radius + 6 * (window.devicePixelRatio || 1)) * Math.sin(angle));
                ctx.lineTo(radius * Math.cos(angle + Math.PI / 36), radius * Math.sin(angle + Math.PI / 36));
                ctx.closePath();
                ctx.fill();

                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(0, 0, radius - 6 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                ctx.restore();
            },

            p_drawBG(labels) {
                const canvas = this.$el;
                const radius = Math.min(canvas.width, canvas.height) * 0.5 - 5;
                const scalel = 5 * (window.devicePixelRatio || 1);
                const scalew = 2 * (window.devicePixelRatio || 1);
                const fontSize = 10 * (window.devicePixelRatio || 1);
                const count = 24;
                const startangle = -Math.PI * 0.5;
                const ctx = canvas.getContext('2d');
                ctx.save();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = scalew;
                ctx.font = fontSize + 'px Helvetica, Hiragino\ Sans\ GB, Microsoft\ Yahei, 微软雅黑, Arial, sans-serif';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                const per_angle = Math.PI * 2 / labels.length;
                const center = [canvas.width * 0.5, canvas.height * 0.5];
                ctx.translate(center[0], center[1]);
                ctx.beginPath();
                for(let i = 0; i < labels.length; i++) {
                    const text = labels[i];
                    let bper_label_angle = 0;
                    let aper_label_angle = 0;
                    let per_label_angle = 0;
                    let all_label_angle = 0;
                    const per_line_angle = Math.PI / 70;
                    ctx.save();
                    let upsideDown = false;
                    if(per_angle * (i + 1 - 0.5) > Math.PI * 0.5 && per_angle * (i + 1 - 0.5) < Math.PI * 1.5) {
                        upsideDown = true;
                        ctx.rotate(per_angle * (i + 0.5) - Math.PI);
                    } else {
                        ctx.rotate(per_angle * (i + 0.5));
                    }
                    ctx.save();
                    if(upsideDown) {
                        for(let j = text.length - 1; j > -1; j--) {
                            aper_label_angle = Math.atan(ctx.measureText(text[j]).width / radius) * 2 * 0.6;
                            all_label_angle += aper_label_angle;
                        }
                    } else {
                        for(let j = 0; j < text.length; j++) {
                            aper_label_angle = Math.atan(ctx.measureText(text[j]).width / radius) * 2 * 0.6;
                            all_label_angle += aper_label_angle;
                        }
                    }
                    ctx.rotate(-all_label_angle * 0.5);
                    if(upsideDown) {
                        for(let j = text.length - 1; j > -1; j--) {
                            aper_label_angle = Math.atan(ctx.measureText(text[j]).width / radius) * 2 * 0.6;
                            ctx.rotate((upsideDown ? 1 : -1) * 0.5 * (bper_label_angle + aper_label_angle));
                            ctx.fillText(text[j], -ctx.measureText(text[j]).width * 0.5, upsideDown ? 0.96*radius: (fontSize - radius));
                            bper_label_angle = aper_label_angle;
                        }
                    } else {
                        for(let j = 0; j < text.length; j++) {
                            aper_label_angle = Math.atan(ctx.measureText(text[j]).width / radius) * 2 * 0.6;
                            ctx.rotate((upsideDown ? -1 : 1) * 0.5 * (bper_label_angle + aper_label_angle));
                            ctx.fillText(text[j], -ctx.measureText(text[j]).width * 0.5, upsideDown ? radius: (fontSize - radius));
                            bper_label_angle = aper_label_angle;
                        }
                    }
                    ctx.restore();
                    let count = 2;
                    while(per_angle - all_label_angle - per_line_angle * count > Math.PI / 35) {
                        const ra = ((upsideDown ? 1 : -1) * Math.PI + all_label_angle + count * per_line_angle) * 0.5;
                        const cosr = Math.cos(ra);
                        const sinr = Math.sin(ra);
                        ctx.moveTo((radius - fontSize * 0.25) * cosr, (radius - fontSize * 0.25) * sinr);
                        ctx.lineTo((radius - fontSize * 0.25 - scalel) * cosr, (radius - fontSize * 0.25 - scalel) * sinr);
                        const la = ((upsideDown ? 1 : -1) * Math.PI - all_label_angle - count * per_line_angle) * 0.5;
                        const cosl = Math.cos(la);
                        const sinl = Math.sin(la);
                        ctx.moveTo((radius - fontSize * 0.25) * cosl, (radius - fontSize * 0.25) * sinl);
                        ctx.lineTo((radius - fontSize * 0.25 - scalel) * cosl, (radius - fontSize * 0.25 - scalel) * sinl);
                        count += 2;
                    }
                    ctx.restore();
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
            /*jutils.fixCanvasSmooth(this.$el);*/
        }
    };
</script>

<style scoped>
</style>