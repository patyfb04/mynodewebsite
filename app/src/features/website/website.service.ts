import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Website }  from './website';

@Injectable()
export class WebsiteService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'websites', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'website/'+ id, this.requestOptions);
    }

    public create(Website : Website): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'website/create', Website, this.requestOptions);
    }

    public update(Website : Website): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'website/update', Website, this.requestOptions);
    }

    public delete(Website : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'website/delete', Website, this.requestOptions);
    }
}
