import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';
import  { BookPaymentBalance }  from './bookPaymentBalance';

@Injectable()
export class BookPaymentBalanceService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'bookPaymentBalances', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'bookPaymentBalance/'+ id, this.requestOptions);
    }

    public create(client : BookPaymentBalance): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/create', client, this.requestOptions);
    }

    public update(client : BookPaymentBalance): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/update', client, this.requestOptions);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/delete/' +id, this.requestOptions);
    }
}