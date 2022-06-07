export class Client {
    public id : number;
    public name : string;
    public  email  : string;
    public  active  : string;

    constructor(id: number, name:string, email:string, active:string){
        this.id = id
        this.name = name
        this.email = email
        this.active = active
    }
}
