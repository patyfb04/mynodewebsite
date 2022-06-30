import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';
import  { Book }  from './book';

@Injectable()
export class BookService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'books', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'book/'+ id, this.requestOptions);
    }

    public create(book : Book): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'book/create', book, this.requestOptions);
    }

    public update(book : Book): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'book/update', book, this.requestOptions);
    }

    public delete(book : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'book/delete', book, this.requestOptions);
    }

    public uploadFile(formData : FormData): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'book/upload', formData);
    }

}