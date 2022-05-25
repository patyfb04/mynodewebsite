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
            method:'PUT',
            handler :(request, headers) =>{
                const id = {id: request.body.id}
                console.log('UPDATE ' + entityName, {id: id}, request.body)
                return this.db.update(this.entityName, {id: id}, request.body)
            }
        }
    }

    delete(entityName) {
        return {
            path: '/'+ entityName +'/delete/:id',
            method:'DELETE',
            handler :(request, headers) =>{
                console.log('DELETE ' + entityName, request.params)
                return this.db.delete(this.entityName, request.params)
            }
        }
    }
}

module.exports = BaseRoute