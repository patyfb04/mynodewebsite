export class Testimonial {
    public id? : number;
    public clientId : number;
    public comment : string;
    public display : boolean;
    public authorName : string = '';

    constructor(id:number, clientId: number, comment: string, display: boolean){
            this.id = id
            this.clientId = clientId
            this.comment = comment
            this.display = display
    }
}
