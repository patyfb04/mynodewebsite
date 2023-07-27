import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
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

    public create(artwork : Artwork): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/create', artwork, this.requestOptions);
    }

    public update(artwork : Artwork): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/update', artwork, this.requestOptions);
    }

    public delete(artwork : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/delete', artwork, this.requestOptions);
    }

    public uploadFile(formData : FormData): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'artwork/upload', formData);
    }
}
