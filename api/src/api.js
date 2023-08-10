const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
var cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
app.options('*', cors())
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './src/assets/img' })
app.use('/static', express.static('public'))

app.use(bodyParser.raw())
app.use(bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))

const upload = multer({ dest: './images/' })

const PORT = 5000
const PostGresDB = require('./database/strategies/postgres')
const ContextStrategy = require('./database/strategies/base/contextStrategy')

const UserRoutes = require('./services/routes/user.routes')
const ClientRoutes = require('./services/routes/client.routes')
const BookRoutes = require('./services/routes/book.routes')
const BookDeliverableRoutes = require('./services/routes/bookDeliverable.routes')
const BookPaymentBalanceRoutes = require('./services/routes/bookPaymentBalance.routes')
const ArtworkRoutes = require('./services/routes/artwork.routes')
const TestimonialRoutes = require('./services/routes/testimonial.routes')
const ContactRoutes = require('./services/routes/contact.routes')
const ServiceRoutes = require('./services/routes/service.routes')

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
    const testimonialRoutes = mapRoutes(new TestimonialRoutes(contextDB), TestimonialRoutes.methods())
    const contactRoutes = mapRoutes(new ContactRoutes(contextDB), ContactRoutes.methods())
    const serviceRoutes = mapRoutes(new ServiceRoutes(contextDB), ServiceRoutes.methods())
    const formRoute = mapRoutes(new ServiceRoutes(contextDB), ServiceRoutes.methods())

    const allRoutes = [
        ...userRoutes,
        ...clientRoutes,
        ...bookRoutes,
        ...bookDeliverableRoutes,
        ...bookPaymentBalanceRoutes,
        ...artworkRoutes,
        ...testimonialRoutes,
        ...contactRoutes,
        ...serviceRoutes,
        ...formRoute
    ]

    await contextDB.connect()
    console.log('is db connected?', await contextDB.isConnected())

    //routes
    allRoutes.forEach(route => {
        if (route.path.indexOf('upload') <= 0) 
        {
            app[route.method.toLowerCase()](route.path, (req, res) => {
                route.handler(req, res).then((result) => {
                    if (typeof (result) == 'object') res.send(result)
                    else {
                        if (result == 1) { res.status(200).json({}) }
                        else { { res.status(500).json({}) } }
                    }
                })
            })
        } 
        else  // if uploads
        {
            app[route.method.toLowerCase()](route.path,  multipartMiddleware, (req, res) => {
                console.log('route.path=>', route.path)
                route.handler(req, res).then((result) => {
                    if (typeof (result) == 'object') res.send(result)
                    else {
                        if (result == 1) { res.status(200).json({}) }
                        else { { res.status(500).json({}) } }
                    }
                })
            })
        }


    });

    return app;
}

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

module.exports = main()