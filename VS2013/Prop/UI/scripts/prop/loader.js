prop.loader = {
    prefixPath: prop.domain + '/contents/',
    postfixPage: '.html',
    // {path,success  | [ prefix+path+postfix ] | exactly [ path ]  }
    xhr: function (op) {
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
                op.success(data, op);
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
                // something went wrong

                ops("status is " + this.status, 'error', this);
            }
        }

        var client = new XMLHttpRequest();
        client.onreadystatechange = handler;
        client.open("GET", op.prefix + op.path + op.postfix);
        client.send();
    },
    get: function (url, success, op) {
        op = def(op, {});
        op.path = url;
        op.success = success;
        op.type = 'GET';
        prop.loader.xhr(op);
    }
}