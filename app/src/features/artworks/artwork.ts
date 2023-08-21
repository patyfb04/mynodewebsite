export class Artwork {
    public id? : number;
    public clientId? : number;
    public title : string;
    public  description  : string;
    public  link  : string;
    public  thumbnail  : string;
    public  image  : string;
    public  display  : boolean;
    public  createdDate  : Date;
    public  totalPaid  : number;
    public  category  : string;
    public  tools  : string;
    public show?: boolean;

    constructor(id :number, clientId:number, title:string, description:string, tools:string, thumbnail:string,
                image:string, link:string, category:string, createdDate:Date, totalPaid:number, display:boolean, show:boolean){
        this.id = id
        this.clientId = clientId
        this.title = title
        this.description = description
        this.tools = tools
        this.thumbnail = thumbnail
        this.image = image
        this.link = link
        this.category = category // realism / children / cartoon / vectorial / sculpture / painting / drawing
        this.createdDate = createdDate,
        this.totalPaid = totalPaid,
        this.display = display
        this.show = show
    }
}
