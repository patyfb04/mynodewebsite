import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
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

    public create(bookPaymentBalance : BookPaymentBalance): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/create', bookPaymentBalance, this.requestOptions);
    }

    public update(bookPaymentBalance : BookPaymentBalance): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/update', bookPaymentBalance, this.requestOptions);
    }

    public delete(bookPaymentBalance : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'bookPaymentBalance/delete', bookPaymentBalance, this.requestOptions);
    }
}
