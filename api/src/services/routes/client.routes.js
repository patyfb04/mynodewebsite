const BaseRoute = require('./base/base.route')

class ClientRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'client'
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

module.exports = ClientRoutes