import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';
import  { Artwork }  from './artwork';

@Injectable()
export class ArtworkService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'artworks', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'artwork/'+ id, this.requestOptions);
    }

    public create(client : Artwork): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/create', client, this.requestOptions);
    }

    public update(client : Artwork): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/update', client, this.requestOptions);
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/delete/' +id, this.requestOptions);
    }
}