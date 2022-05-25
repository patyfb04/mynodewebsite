const BaseRoute = require('./base/base.route')

class ClientRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'client'
    }

    list() {
        return{
            path: '/clients',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST CLIENTS', request.params)
                return this.db.read(this.entityName)
            }
        }
    }

    get() {
        return{
            path: '/client/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET CLIENT', request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/client/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE CLIENT', request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update() {
        return{
            path: '/client/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE CLIENT', {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/client/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE CLIENT', request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }

}

module.exports = ClientRoutes