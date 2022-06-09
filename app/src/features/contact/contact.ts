export class Contact {
    public id : number;
    public description : string;
    public email : string;

    constructor(id:number, description: string, email : string){
            this.id = id
            this.description = description
            this.email = email
    }
}
