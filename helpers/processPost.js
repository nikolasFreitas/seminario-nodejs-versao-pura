var http = require('http');

function processPost(req, res, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(req.method == 'POST') {
        req.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                res.writeHead(413, {'Content-Type': 'text/plain'}).end();
                req.connection.destroy();
            }
        });

        req.on('end', function() {
            req.post = queryData;
            callback();
        });

    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end();
    }
}

module.exports = processPost