export class Website {
  public id? : number;
  public  title  : string;
  public  description  : string;
  public  link  : string;
  public  thumbnail  : string;
  public  display  : boolean;


  constructor(id :number,title:string, description:string, thumbnail:string, link:string){
      this.id = id
      this.description = description
      this.thumbnail = thumbnail
      this.link = link
      this.title = title
  }
}
