'use strict';

const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');
const uglifyjs = require('uglify-js');

const getVersion = () => {
    const config = fs.readFileSync(path.resolve(__dirname, '../src/config.js'), 'utf8');
    const match = config.match(/version:\s*['"]?(\d+\.\d+\.\d+)\s+build-(\w+)['"]?/);
    if(match) {
        return [match[1], match[2]];
    }
    return ['1.0.0', Math.random().toString().slice(2, 10)];
};

const makeVInfo = stats => {
    const version = getVersion();
    const vinfo_path = path.join(__dirname, '../dist/vinfo.json');
    const vinfo_fd = fs.openSync(vinfo_path, 'w+');
    fs.closeSync(vinfo_fd);
    const vinfo = {};
    vinfo['buildHash'] = stats.hash;
    vinfo['buildDate'] = (new Date()).toLocaleString();
    vinfo['buildVersion'] = 'v' + version[0];
    vinfo['buildNumber'] = version[1];
    vinfo['cache'] = !!(process.argv.indexOf('--cache') > -1);
    //const params = process.argv.slice(2);
    //for(let i = 0; i < params.length; i++) {
        //if(params[i] === '--buildversion') {
            //if(i === params.length - 1) {
                //throw new Error('no build version');
            //}
            //vinfo['buildVersion'] = params[i + 1];
            //break;
        //}
    //}
    //vinfo['updatePolicy'] = 'default';
    //vinfo['storePolicy'] = 'default';
    //vinfo['cacheList'] = getCacheFiles(`./dist/${ versionHash }/`);
    vinfo['moduleList'] = [];
    const binfo = {};
    binfo['buildDate'] = (new Date()).toLocaleString();
    binfo['buildNumber'] = version[1];
    binfo['moduleList'] = [];
    const html_path = path.join(__dirname, '../dist', `/${ 'v' + version[0]  }/index.html`);
    const html = fs.readFileSync(html_path, 'utf8');
    const $ = cheerio.load(html);
    $('body script[src]').map((index, v) => {
        const info = $(v).attr('src').match(/^v(\d+\.\d+\.\d+)\/(\w+)\/(\w+)\.js/);
        if(info) {
            vinfo['moduleList'].push({ name: info[2], hash: info[3], type: 'js', });
            binfo['moduleList'].push({ name: info[2], hash: info[3], type: 'js', });
        }
    });
    binfo['chunkList'] = [];
    let chunk;
    for(let i = 0; i < stats.compilation.chunks.length; i++) {
        chunk = stats.compilation.chunks[i];
        binfo['chunkList'].push({ chunkname: chunk['name'], chunkid: chunk['id'], chunkids: chunk['ids'], chunkFullHash: chunk['hash'], chunkRenderedHash: chunk['renderedHash']} );
    }
    fs.writeFileSync(vinfo_path, JSON.stringify(vinfo, null, '\t'), 'utf8');

    const binfo_path = path.join(__dirname, `../dist/${vinfo['buildVersion']}/${vinfo['buildNumber']}.json`);
    const binfo_fd = fs.openSync(binfo_path, 'w+');
    fs.closeSync(binfo_fd);
    fs.writeFileSync(binfo_path, JSON.stringify(binfo, null, '\t'), 'utf8');

    //console.log('buildinfo', vinfo);
};

const makeShell = () => {
    const version = 'v' + getVersion()[0];
    const template_path = path.join(__dirname, '../dist', `/${ version  }/index.html`);
    const html = fs.readFileSync(template_path, 'utf8');
    const $ = cheerio.load(html);
    $('body script[src]').map((index, v) => {
        const info = $(v).attr('src').match(/^v(\d+\.\d+\.\d+)\/(\w+)\/(\w+)\.js/);
        if(info) {
            $(v).remove();
        }
    });
    const loaderjs_path = path.join(__dirname, './bz.js');
    const bz = uglifyjs.minify(loaderjs_path).code;
    const compatible = `
        !(function() {
            var loadPre = function() {
                var head = document.getElementsByTagName('head')[0];
                var loaded = [];
                head.appendChild(createLink('//h5-en.putao.com/en/paiband/app.ad6c6e32652c8ce11d2d.css'));
                head.appendChild(createScript('//h5-en.putao.com/en/paiband/static/js/jUtils.min.js', function() {
                    loaded.push('jutils');
                    loadApp();
                }));
                head.appendChild(createScript('//h5-en.putao.com/en/paiband/static/js/Chart.min.js', function() {
                    loaded.push('chart');
                    loadApp();
                }));
                head.appendChild(createScript('//h5-en.putao.com/en/paiband/static/js/zepto.min.js', function() {
                    loaded.push('zepto');
                    loadApp();
                }));
                var loadApp = function() {
                    if(loaded.length == 3) {
                        var body = document.getElementsByTagName('body')[0];
                        body.appendChild(createScript('//h5-en.putao.com/en/paiband/app.1d4f1734710081bb1eb5.js'));
                    }
                };
            };
            var compareVersion = function(v1, v2) {
                var a = v1.split('.');
                var b = v2.split('.');
                return a[0] > b[0] || (a[0] == b[0] && a[1] > b[1] || (a[0] == b[0] && a[1] == b[1] && a[2] > b[2]));
            };
            var createScript = function(src, cb) {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.src = src;
                cb & (s.onload = cb);
                return s;
            };
            var createLink = function(href) {
                var l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = href;
                return l;
            };
            if(/paiparent_version_([\\d\\.]+)/.test(window.navigator.userAgent)) {
                var v = window.navigator.userAgent.match(/paiparent_version_([\\d\\.]+)/);
                if(v) {
                    if(compareVersion(v[1], '1.0.0')) {
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        var t = document.createTextNode('${ bz }');
                        s.appendChild(t);
                        document.getElementsByTagName('body')[0].appendChild(s);
                    } else {
                        loadPre();
                    }
                } else {
                    loadPre();
                }
            } else {
                loadPre();
            }
        })();`;
    $('body').append(`<script type="text/javascript">${ uglifyjs.minify(compatible, {fromString: true}).code }</script>`);
    //$('body').append(`<script type="text/javascript">${ uglifyjs.minify(loaderjs_path).code }</script>`);
    const minify = require('html-minifier').minify;
    const result = minify($.html(), {
      removeAttributeQuotes: true
    });
    const html_path = path.join(__dirname, '../dist/index.html');
    const fd = fs.openSync(html_path, 'w+');
    fs.closeSync(fd);
    fs.writeFileSync(html_path, result, 'utf8');
};

exports.getVersion = getVersion;
exports.makeVInfo = makeVInfo;
exports.makeShell = makeShell;
