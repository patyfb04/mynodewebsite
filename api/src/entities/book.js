const Client = require('./client')

class Book {
    constructor({id, clientId, title, status, link, thumbnail}) {
        this.id = id
        this.clientId = clientId
        this.title = title
        this.status = status //Published / In Process / Cancelled
        this.link = link
        this.thumbnail = thumbnail
    }
}

module.exports = Book