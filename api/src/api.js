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
const ClientRoutes = require('./services/routes/client.routes')
const BookRoutes = require('./services/routes/book.routes')
const BookDeliverableRoutes = require('./services/routes/bookDeliverable.routes')
const BookPaymentBalanceRoutes = require('./services/routes/bookPaymentBalance.routes')
const ArtworkRoutes = require('./services/routes/artwork.routes')

app.listen(PORT, () => {
    console.log(`node listening on port ${PORT}`)
})

async function main() {
    const contextDB = new ContextStrategy(new PostGresDB())

    // const routes
    const userRoutes = mapRoutes(new UserRoutes(contextDB), UserRoutes.methods())
    const clientRoutes = mapRoutes(new ClientRoutes(contextDB), ClientRoutes.methods())
    const bookRoutes = mapRoutes(new BookRoutes(contextDB), BookRoutes.methods())
    const bookDeliverableRoutes = mapRoutes(new BookDeliverableRoutes(contextDB), BookDeliverableRoutes.methods())
    const bookPaymentBalanceRoutes = mapRoutes(new BookPaymentBalanceRoutes(contextDB), BookPaymentBalanceRoutes.methods())
    const artworkRoutes = mapRoutes(new ArtworkRoutes(contextDB), ArtworkRoutes.methods())

    const allRoutes = [
        ...userRoutes,
        ...clientRoutes,
        ...bookRoutes,
        ...bookDeliverableRoutes,
        ...bookPaymentBalanceRoutes,
        ...artworkRoutes
    ]

    await contextDB.connect()
    console.log('is db connected?', await contextDB.isConnected())

    //routes
    allRoutes.forEach(route => {
        console.log(route)
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