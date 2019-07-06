var express = require('express')

var app1 = express()
app1.get('/', (req, res) => {
    res.send('asdfasdf')
})
app1.listen(9090)

function view(app){
    var stacks = app._router.stack
    var result = []
    for(var item of stacks){
        if(item.route){
            var obj = {}
            console.log(item.route)
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
}

module.exports = view

