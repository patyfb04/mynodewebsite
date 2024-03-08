export class Home {
  public id? : number;
  public img1 : string;
  public img2 : string;
  public img3 : string;
  public img4 : string;
  public img5 : string;
  public link1 : string;
  public link2 : string;
  public link3 : string;
  public link4 : string;
  public link5 : string;
  public txt1 : string;
  public txt2 : string;
  public txt3 : string;
  public txt4 : string;
  public txt5 : string;

  constructor(id:number,
    img1: string,
    link1: string,
    txt1: string,
    img2: string,
    link2: string,
    txt2: string,
    img3: string,
    link3: string,
    txt3: string,
    img4: string,
    link4: string,
    txt4: string,
    img5: string,
    link5: string,
    txt5: string){

          this.id = id
          this.img1 = img1;
          this.img2 = img2;
          this.img3 = img3;
          this.img4 = img4;
          this.img5 = img5;
          this.link1 = link1;
          this.link2 = link2;
          this.link3 = link3;
          this.link4 = link4;
          this.link5 = link5;
          this.txt1 = txt1;
          this.txt2 = txt2;
          this.txt3 = txt3;
          this.txt4 = txt4;
          this.txt5 = txt5;
  }
}
