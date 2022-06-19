class ContextStrategy {
    constructor(strategy) {
        this.database = strategy
    }

    async create(entityName, item) {
        return await this.database.create(entityName, item)
    }

    async read(entityName, query) {
        return await this.database.read(entityName, query)
    }
    async update(entityName, query, item) {
        return await this.database.update(entityName, query, item)
    }

    async delete(entityName, query) {
        return await this.database.delete(entityName, query)
    }

    async isConnected(){
        return await this.database.isConnected()
    }

    async connect(){
        return await this.database.connect()
    }
    
}

 module.exports = ContextStrategy