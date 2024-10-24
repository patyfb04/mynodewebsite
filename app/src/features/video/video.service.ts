import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Video }  from './video';

@Injectable()
export class VideoService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'videos', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'video/'+ id, this.requestOptions);
    }

    public create(video : Video): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'video/create', video, this.requestOptions);
    }

    public update(video : Video): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'video/update', video, this.requestOptions);
    }

    public delete(video : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'video/delete', video, this.requestOptions);
    }
}
