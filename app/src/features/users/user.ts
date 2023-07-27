export class User {
    public id? : number | null;
    public login : string;
    public password : string;

    constructor(id:number | null, login: string, password: string){
            this.id = id
            this.login = login
            this.password = password
    }
}
