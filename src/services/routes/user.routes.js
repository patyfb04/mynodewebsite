const BaseRoute = require('./base/base.route')

class UserRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
    }

    list() {
        return{
            path: '/users',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST USERS', request.params)
                return this.db.read('user')
            }
        }
    }

    get() {
        return{
            path: '/user/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET USER', request.params)
                return this.db.read('user', request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/user/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE USER', request.body)
                return this.db.create('user', request.body)
            }
        }
    }

    update() {
        return{
            path: '/user/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE USER', {id: id}, request.body)
                return this.db.update('user', {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/user/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE USER', request.params)
                return this.db.delete('user', request.params)
            }
        }
    }

}

module.exports = UserRoutes