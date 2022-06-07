import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class UserService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'users', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'user/'+ id, this.requestOptions);
    }

    public create(user : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/create', user, this.requestOptions);
    }

    public update(user : any, id: number): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/update/' +id, user, this.requestOptions);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/delete/' +id, this.requestOptions);
    }
}