export class Video {
    public id? : number;
    public  title  : string;
    public  description  : string;
    public  link  : string;
    public  thumbnail  : string;
    public  display  : boolean;


    constructor(id :number,title:string, description:string, thumbnail:string, link:string, display:boolean){
        this.id = id
        this.description = description
        this.thumbnail = thumbnail
        this.link = link
        this.display = display
        this.title = title
    }
}
