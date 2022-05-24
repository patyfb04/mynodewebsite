const { headers } = require('hapi/lib/cors')
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
                return this.db.read('user')
            }
        }
    }

}

module.exports = UserRoutes