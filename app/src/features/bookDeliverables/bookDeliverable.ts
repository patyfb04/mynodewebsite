export class BookDeliverable {
    public id? : number;
    public bookId : number;
    public description : string;
    public  status  : string;
    public  link  : string;
    public  amount  : number;
    public  modifiedDate  : Date;
    public bookTitle : string = '';
    public clientName : string = '';

    constructor(id: number, bookId: number, description:string, status:string, amount:number,link: string, modifiedDate: Date){
        this.id = id
        this.bookId = bookId
        this.description = description
        this.status = status //Sketch /In Process / Delivered / Revision
        this.amount = amount
        this.link = link
        this.modifiedDate = modifiedDate
    }
}
