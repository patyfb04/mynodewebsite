export class BookPaymentBalance {
    public id : number;
    public bookId : number;
    public totalAmountPaid : number;
    public  modifiedDate  : Date;

    constructor(id: number, bookId: number, totalAmountPaid:number, modifiedDate:Date){
        this.id = id
        this.bookId = bookId
        this.totalAmountPaid = totalAmountPaid
        this.modifiedDate = modifiedDate
    }
}
