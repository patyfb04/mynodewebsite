import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Client }  from './client';

@Injectable()
export class ClientService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'clients', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'client/'+ id, this.requestOptions);
    }

    public create(client : Client): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'client/create', client, this.requestOptions);
    }

    public update(client : Client): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'client/update', client, this.requestOptions);
    }

    public delete(client : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'client/delete', client, this.requestOptions);
    }
}
