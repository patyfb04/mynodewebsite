const Book = require('./book')

class BookPaymentBalance {
    constructor({id, bookId, totalAmountPaid, modifiedDate}){
        this.id = id
        this.bookId = bookId
        this.totalAmountPaid = totalAmountPaid
        this.modifiedDate = modifiedDate
    }
}

module.exports = BookPaymentBalance