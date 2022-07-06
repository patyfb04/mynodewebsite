import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';
import  { BookDeliverable }  from './bookDeliverable';

@Injectable()
export class BookDeliverableService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'bookDeliverables', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'bookDeliverable/'+ id, this.requestOptions);
    }

    public create(bookdeliverable : BookDeliverable): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookDeliverable/create', bookdeliverable, this.requestOptions);
    }

    public update(bookdeliverable : BookDeliverable): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookDeliverable/update', bookdeliverable, this.requestOptions);
    }

    public delete(bookdeliverable : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookDeliverable/delete', bookdeliverable, this.requestOptions);
    }
}