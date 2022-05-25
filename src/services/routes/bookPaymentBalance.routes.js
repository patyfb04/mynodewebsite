const BaseRoute = require('./base/base.route')

class BookPaymentBalanceRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'bookPaymentBalance'
    }

    list() {
        return{
            path: '/bookPaymentBalances',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST bookPaymentBalances', request.params)
                return this.db.read(this.entityName)
            }
        }
    }

    get() {
        return{
            path: '/bookPaymentBalance/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET  bookPaymentBalance', request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/bookPaymentBalance/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE bookPaymentBalance', request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update() {
        return{
            path: '/bookPaymentBalance/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE bookPaymentBalance', {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/bookPaymentBalance/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE bookPaymentBalance', request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }

}

module.exports = BookPaymentBalanceRoutes