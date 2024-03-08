import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Home }  from './home';

@Injectable()
export class HomeService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'homes', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'home/'+ id, this.requestOptions);
    }

    public update(home : Home): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'home/update', home, this.requestOptions);
    }
}
