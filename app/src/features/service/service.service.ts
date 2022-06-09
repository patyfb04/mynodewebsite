import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';
import  { Service }  from './service';

@Injectable()
export class ServiceService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'services', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'service/'+ id, this.requestOptions);
    }

    public update(user : Service): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'service/update', user, this.requestOptions);
    }
}