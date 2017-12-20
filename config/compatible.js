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
                var t = document.createTextNode('');
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
})();
