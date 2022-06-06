const BaseRoute = require('./base/base.route')

class UserRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
        this.entityName = 'user'
    }

    list() {
        return super.list(this.entityName)
    }

    get() {
        return super.get(this.entityName)
    }

    
    create() {
        return  super.create(this.entityName)
    }

    update() {
         return  super.update(this.entityName)
    }

    delete() {
        return  super.delete(this.entityName)
    }

}

module.exports = UserRoutes