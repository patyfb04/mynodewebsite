const BaseRoute = require('./base/base.route')

class BookRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'book'
    }

    list() {
        return{
            path: '/books',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST BOOKS', request.params)
                return this.db.read(this.entityName)
            }
        }
    }

    get() {
        return{
            path: '/book/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET BOOK', request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/book/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE BOOK', request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update() {
        return{
            path: '/book/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE BOOK', {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/book/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE BOOK', request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }

}

module.exports = BookRoutes