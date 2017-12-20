'use strict';

const i18n = {
    install(Vue, options) {
        Vue.prototype.$lang = (options && options['lang']) || 'cn';
        Vue.prototype.$i18n = k => {
            if(typeof k === 'string') {
                const lang = (options && options['lang']) || 'cn';
                if(window.language_desc && typeof window.language_desc === 'object') {
                    if(window.language_desc[k] && window.language_desc[k][lang] !== undefined) {
                        return window.language_desc[k][lang];
                    } else {
                        return k;
                    }
                }
                return k;
            }
            throw new Error('this.$i18n() receive a string parameter as key!');
        };
    }
};

export default i18n;
