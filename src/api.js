const http = require('http')
const Hapi = require('hapi')
const PORT = 5000
const PostGresDB = require('./database/strategies/postgres')
const ContextStrategy = require('./database/strategies/base/contextStrategy')

const UserRoutes = require('./services/routes/user.routes')

const app = new Hapi.Server({
    port: PORT
})

function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}


async function main() {
    const contextDB = new ContextStrategy(new PostGresDB())
   
    // const routes
    const userRoutes = new UserRoutes(contextDB)

    app.route([
        ...mapRoutes(userRoutes, UserRoutes.methods())
    ])

    await app.start()
    await  contextDB.connect()
    console.log('server running at', app.info.port)
    console.log('is db connected?',  await contextDB.isConnected())

    return app;
}
module.exports = main()