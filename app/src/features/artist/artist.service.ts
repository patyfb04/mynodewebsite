import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Artist }  from './artist';

@Injectable()
export class ArtistService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'contacts', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'contact/'+ id, this.requestOptions);
    }

    public update(artist : Artist): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'contact/update', artist, this.requestOptions);
    }
}
