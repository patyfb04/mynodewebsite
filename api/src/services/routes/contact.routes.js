const BaseRoute = require('./base/base.route')

class ContactRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
        this.entityName = 'contact'
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

module.exports = ContactRoutes