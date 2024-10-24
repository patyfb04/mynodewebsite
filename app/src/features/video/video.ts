export class Video {
    public id? : number;
    public  title  : string;
    public  description  : string;
    public  link  : string;
    public  thumbnail  : string;


    constructor(id :number, thumbnail:string, link:string,  description:string, title:string){
        this.id = id
        this.description = description
        this.thumbnail = thumbnail
        this.link = link
        this.title = title
    }
}
