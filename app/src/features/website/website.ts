export class Website {
  public id? : number;
  public  title  : string;
  public  description  : string;
  public  link  : string;
  public  thumbnail  : string;
  public  display  : boolean;


  constructor( thumbnail:string, link:string,  description:string, title:string, id :number){
      this.id = id
      this.description = description
      this.thumbnail = thumbnail
      this.link = link
      this.title = title
  }
}
