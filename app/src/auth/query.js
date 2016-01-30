function connect(cb) {
    if(!connection) return cb(1);
    connection.connect(function(err) {
        if(err) handleError(err);
        else cb(null);
    });
}

function makeRequest(query,cb) {
    connect(function(err) {
        if(err) {
            handleError();
            cb(1,null,null);
        }
        connection.query(query, function (err, rows, fields) {
            if (!err) cb(null,rows, fields);
            else handleError(err);
            connection.end();
        });
    })
}

function queryMaker() {
    return {
        'users': "Select * from users"
    }
}

var query=new queryMaker()
