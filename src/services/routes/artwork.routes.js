const BaseRoute = require('./base/base.route')

class ArtworkRoutes extends BaseRoute{

    constructor(db){
        super()
        this.db = db
        this.entityName = 'artwork'
    }

    list() {
        return{
            path: '/artworks',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST artwork', request.params)
                return this.db.read(this.entityName)
            }
        }
    }

    get() {
        return{
            path: '/artwork/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET artwork', request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create() {
        return{
            path: '/artwork/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE artwork', request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update() {
        return{
            path: '/artwork/update',
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE artwork', {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete() {
        return{
            path: '/artwork/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE artwork', request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }

}

module.exports = ArtworkRoutes