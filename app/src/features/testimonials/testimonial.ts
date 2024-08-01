import { Book } from "../books/book";

export class Testimonial {
    public id? : number;
    public author : string;
    public comment : string;
    public display : boolean;
    public authorName : string = '';
    public books : Book[];

    constructor(id:number, author: string, comment: string, display: boolean){
            this.id = id
            this.author = author
            this.comment = comment
            this.display = display
    }
}
