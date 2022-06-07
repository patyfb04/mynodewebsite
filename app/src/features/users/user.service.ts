import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class UserService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getUsers(): Observable<any> {
        console.log(this.requestOptions)
        return this.httpClient.get<any>(this.rootURL +'users', this.requestOptions);
    }
}