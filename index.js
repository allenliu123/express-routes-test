var express = require('express')
var swig = require('swig')

function view(app, port=9090){
    var stacks = app._router.stack
    var result = []
    for(var item of stacks){
        if(item.route){
            var obj = {}
            obj.path = item.route.path
            function methods(m){
                var methods = []
                if(m.get){ methods.push('get') }
                if(m.post){ methods.push('post') }
                if(m.put){ methods.push('put') }
                if(m.delete){ methods.push('delete') }
                return methods
            }
            obj.methods = methods(item.route.methods)
            result.push(obj)
        }
    }
    app.get('/apiview', (req, res) => {
        res.send(result)
    })
    var server = express()
    server.engine('html',swig.renderFile);
    server.set('views','./views');
    server.set('view engine','html');
    server.listen(port)
    server.get('/', (req, res) => {
        // res.send(result)
        res.render('index.html');
    })
}

module.exports = view