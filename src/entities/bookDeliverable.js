class BookDeliverable {
    constructor({id, bookId, description, status, amount, link, modifiedDate}){
        this.id = id
        this.bookId = bookId
        this.description = description
        this.status = status //Sketch /In Process / Delivered / Revision
        this.amount = amount
        this.link = link
        this.modifiedDate = modifiedDate

    }
}
module.exports = BookDeliverable