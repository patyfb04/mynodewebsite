const BaseRoute = require('./base/base.route')

class BookDeliverableRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'bookDeliverable'
    }

    list() {
        return{
            path: '/bookDeliverables',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST Deliverable', request.params)
                return this.db.read(this.entityName)
            }
        }
    }

    get() {
        return{
            path: '/bookDeliverable/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET BOOK Deliverable', request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/bookDeliverable/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE BOOK Deliverable', request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update() {
        return{
            path: '/bookDeliverable/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE BOOK Deliverable', {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/bookDeliverable/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE BOOK Deliverable', request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }

}

module.exports = BookDeliverableRoutes