export class Client {
    public id? : number;
    public name : string;
    public  email  : string;
    public  active  : boolean;

    constructor(id: number, name:string, email:string, active:boolean){
        this.id = id
        this.name = name
        this.email = email
        this.active = active
    }
}
