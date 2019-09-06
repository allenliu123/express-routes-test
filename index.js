var express = require('express')
var swig = require('swig')
var listEndpoints = require('express-list-endpoints')

function view(app, port=9090){
    var routes = listEndpoints(app)
    var index = 0
    routes.forEach(element => {
        element.index = index++
        element.methods = element.methods[0]
    })
    console.log(routes)
    // var stacks = app._router.stack
    // var result = []
    // // console.log(stacks[4].regexp)
    // for(var item of stacks){
    //     if(item.route){
    //         var obj = {}
    //         obj.path = item.route.path
    //         function methods(m){
    //             var methods = []
    //             if(m.get){ methods.push('get') }
    //             if(m.post){ methods.push('post') }
    //             if(m.put){ methods.push('put') }
    //             if(m.delete){ methods.push('delete') }
    //             return methods
    //         }
    //         obj.methods = methods(item.route.methods)
    //         result.push(obj)
    //     }
    // }
    app.get('/apiview', (req, res) => {
        res.json(routes)
    })
    var server = express()
    server.engine('html', swig.renderFile)
    server.use('/public',express.static( __dirname + '/public'));
    server.set('views', __dirname + '/views')
    server.set('view engine','html')
    server.listen(port)
    server.get('/', (req, res) => {
        // res.send(result)
        var data = {}
        data.routes = routes
        res.render('index.html', data)
    })
}

module.exports = view