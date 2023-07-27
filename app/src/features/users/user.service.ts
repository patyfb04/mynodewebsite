import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { User }  from './user';

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

    public create(user : User): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/create', user, this.requestOptions);
    }

    public update(user : User): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/update', user, this.requestOptions);
    }

    public delete(client : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'user/delete', client, this.requestOptions);
    }
}
