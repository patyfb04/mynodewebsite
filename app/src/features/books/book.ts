export class Book {
    public id? : number;
    public clientId : number;
    public title : string;
    public  status  : string;
    public  link  : string;
    public  thumbnail  : string;
    public authorName : string = '';

    constructor(id: number, clientId: number, title:string, status:string, link:string,thumbnail: string){
        this.id = id
        this.clientId = clientId
        this.title = title
        this.status = status //Published / In Process / Cancelled
        this.link = link
        this.thumbnail = thumbnail
    }
}
