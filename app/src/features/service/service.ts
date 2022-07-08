export class Service {
    public id? : number;
    public description : string;
    public email : string;

    constructor(id:number, description: string){
            this.id = id
            this.description = description
    }
}
