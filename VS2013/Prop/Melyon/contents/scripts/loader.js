prop.loader = {
    prefixPath: prop.domain + '/pages/',
    postfixPage: '.html',
    // {path,success  | [ prefix+path+postfix ] | exactly [ path ]  }
    xhr: function (op, th) {
        op = def(op, {});
        op.type = def(op.type, 'GET');
        op.prefix = def(op.prefix, prop.loader.prefixPath);
        op.postfix = def(op.postfix, prop.loader.postfixPage);

        if (def(op.exactly, false)) {
            op.postfix = '';
            op.prefix = '';
        }

        if (!def(op.path)) { ops("not found impelementaion for path.", 'warning'); return; }

        function processData(data) {
            // taking care of data
            if (def(op.success)) {
                th.content = data;
                th.options = op;
                op.success(th);
            }
            op.response = data;
            return op;
        }

        function handler() {
            if (this.readyState == this.DONE) {
                if (this.status == 200) {
                    // success!
                    processData(this.responseText);
                    return;
                }
                if (def(op.error))
                    op.error(this);

                // something went wrong 
                ops("status is " + this.status, 'error', this);
            }
        }

        var client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open("GET", op.prefix + op.path + op.postfix);
        client.send();
    }
}

prop.html = {
    content: '',
    script: '',
    scriptFiles: [],
    options: {},
    incode: function (cnt) {
        function de(cn) {
            return cn.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;')
                .replace(/"/g, '&quot;');
        }

        if (def(this.isInstance))
        { this.content = de(this.content); }
        else return de(cnt);
    },
    decode: function (cnt) {
        function de(cn) {
            return cn.replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#x27;/g, "'")
                .replace(/&#x2F;/g, '\/')
                .replace(/&quot;/g, '"');
        }

        if (def(this.isInstance))
        { this.content = de(this.content); }
        else return de(cnt);
    },
    //{  beforContent, afterContent,isText}
    setInner: function (obj, op) {
        op = def(op, {});
        if (def(this.isInstance)) {
            if (def(obj.value)) {
                obj.value = (def(op.afterContent, false) ? obj.value : "") + this.content + (def(op.beforContent, false) ? obj.value : "");
            }
            else if (!def(op.isText, false) && def(obj.innerHTML)) {
                obj.innerHTML = (def(op.afterContent, false) ? obj.innerHTML : "") + this.content + (def(op.beforContent, false) ? obj.innerHTML : "");
            }
            else if (def(obj.innerText)) {
                obj.innerText = (def(op.afterContent, false) ? obj.innerText : "") + this.content + (def(op.beforContent, false) ? obj.innerText : "");
            }
        }
        else throw 'can not use like singleton method';
        return this;
    },
    // term : default value ['<inner-body />']
    setOuter: function (obj, terms, sub) {
        if (def(this.isInstance)) {
            if (!def(terms) || !def(terms[0].length)) {
                obj.innerHTML = obj.innerHTML.replaceAll(def(terms, '<hd>inner-body</hd>'), this.content);
            }
            else {
                var elmt = document.createElement("div");
                this.setInner(elmt);
                var th = this;
                _for(terms, function (it, i) {
                    it = it.replace('#[', '').replace(']', '');
                    var elm = elmt.getElementsByTagName(it);
                    if (elm.length > 0) {
                        elm = elm[elm.length - 1];
                        if (def(sub)) {
                            sub(elm, obj, it);
                        }
                        else {
                            obj.innerHTML = obj.innerHTML.replaceAll('#[' + it + ']', elm.innerHTML);
                        }
                    }
                });
            }
        }
        else throw 'can not use like singleton method';

        return this;
    },
    replace: function (obj) {
        if (def(this.isInstance)) {

            var elmt = document.createElement(obj.tagName);

            _each(obj.attributes, function (xt, x) { elmt.setAttribute(x, xt); });

            this.setInner(elmt);

            obj.parentNode.replaceChild(obj, elmt);
        }
        else throw 'can not use like singleton method';

        return this;
    },
    getScript: function () {
        var elmt = document.createElement("div");
        this.setInner(elmt);
        var scripts = elmt.getElementsByTagName("script");
        var th = this;
        _for(scripts, function (it, i) {
            if (it.src) {
                /* !!! under construction */
                th.scriptFiles.push(it.src);
            }
            else {
                th.script += it.innerHTML;
            }


        });

        _for_r(scripts, function (it, i) {
            try { it.outerHTML = ""; } catch (e) { }
        });

        this.content = elmt.innerHTML;

        return this;
    },
    loadScript: function (fun) {
        var s = '';
        var th = this;
        function t() {
            th.script = s + th.script;
            fun(th);
            return th;
        }
        prop.loader.gets(this.scriptFiles, function (o) {
            s += o.content;
        }, t);

        return this;
    },
    runScript: function () {
        window.eval(def(this.script, ''));
        return this;
    },
    defaultSuccess: function (op) {
        this.getScript().setOuter(def(op.container, document.body), def(op.term, _null), def(op.sub, _null)).loadScript(function (p) {

            p.runScript();
        });

        return this;
    }
}
//  'pages'+url+'.html'  , { container , term ,success:f(o), exactly}
prop.loader.get = function (url, op) {
    op = def(op, {});
    op.path = url;
    op.success = def(op.success, function (o) {
        o.defaultSuccess(op);
    });
    op.type = 'GET';
    this.isInstance = true;
    prop.loader.xhr(op, this);
},

prop.loader.get.prototype = prop.html;

prop.loader.gets = function (ops, loader, end) {
    var i = 0;
    function load(th) {
        th.progress = (100 * i / ops.length);
        if (ops.length > i) {
            new prop.loader.get(def(ops[i].url, ops[i]), {
                success: function (o) {
                    i++;
                    loader(o);
                    load(th);
                },
                error: function (th) {
                    i++;
                    load(th);
                },
                exactly: true
            });
        } else {
            end();
        }
    }
    load(this);
}

prop.loader.gets.prototype = {
    progress: 0.,
};