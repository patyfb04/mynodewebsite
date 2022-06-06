class ICrud {
    async create(item) {
        throw new NotImplementedException()
    }
    async read(query) {
        throw new NotImplementedException()
    }

    async update(id, item) {
        throw new NotImplementedException()
    }

    async delete(id) {
        throw new NotImplementedException()
    }

    isConnected(){
        throw new NotImplementedException()
    }
    
   async  connect(){
        throw new NotImplementedException()
    }
}

class NotImplementedException extends Error {
    constructor() {
        super("db not implemented")
    }
}

module.exports = ICrud