const BaseRoute = require('./base/base.route')

class ClientRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
    }

    list() {
        return{
            path: '/clients',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST CLIENTS', request.params)
                return this.db.read('client')
            }
        }
    }

    get() {
        return{
            path: '/client/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET CLIENT', request.params)
                return this.db.read('client', request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/client/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE CLIENT', request.body)
                return this.db.create('client', request.body)
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
                return this.db.update('client', {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/client/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE CLIENT', request.params)
                return this.db.delete('client', request.params)
            }
        }
    }

}

module.exports = ClientRoutes