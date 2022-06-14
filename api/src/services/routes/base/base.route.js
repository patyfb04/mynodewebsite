class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype)
             .filter(method => method !== 'constructor' && !method.startsWith('_'))
    }

    list(entityName) {
        return{
            path: '/'+ entityName +'s',
            method:'GET',
            handler :(request, headers) =>{
                console.log('LIST ' + entityName, request.params)
                return this.db.read(entityName)
            }
        }
    }

    get(entityName) {
        return{
            path: '/'+ entityName +'/:id',
            method:'GET',
            handler :(request, headers) =>{
                console.log('GET '+ entityName, request.params)
                return this.db.read(this.entityName, request.params)
            }
        }
    }

    
    create(entityName) {
        return {
            path: '/'+ entityName +'/create',
            method:'POST',
            handler :(request, headers) =>{
                console.log('CREATE ' + entityName, request.body)
                return this.db.create(this.entityName, request.body)
            }
        }
    }

    update(entityName) {
        return{
            path: '/'+ entityName +'/update',
            method:'POST',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE ' + entityName, {id: id}, request.body)
                return this.db.update(this.entityName, id, request.body)
            }
        }
    }

    delete(entityName) {
        return {
            path: '/'+ entityName +'/delete',
            method:'POST',
            handler :(request, response) =>{
                const id = {id: request.body.id}
                console.log('DELETE '+ entityName, id, request.body)
                 this.db.delete(this.entityName, id, request.body)
                 return response.status(200).json({})
            }
        }
    }
}

module.exports = BaseRoute