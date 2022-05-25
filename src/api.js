const http = require('http')
const Promise = require('fs/promises')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

const PORT = 5000
const PostGresDB = require('./database/strategies/postgres')
const ContextStrategy = require('./database/strategies/base/contextStrategy')

const UserRoutes = require('./services/routes/user.routes')

app.listen(PORT, () => {
    console.log(`node listening on port ${PORT}`)
})

async function main() {
    const contextDB = new ContextStrategy(new PostGresDB())

    // const routes
    const userRoutes = mapRoutes(new UserRoutes(contextDB), UserRoutes.methods())
   
    
    await contextDB.connect()
    console.log('is db connected?', await contextDB.isConnected())

    //routes
    userRoutes.forEach(route => {
        app[route.method.toLowerCase()](route.path, (req, res) => { 
            route.handler(req,res).then((result)=>{
                console.log(result)
                if(typeof(result) == 'object') res.send(result)
                else res.sendStatus(200)
            })
        })
   });
    
    return app;
}

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

module.exports = main()