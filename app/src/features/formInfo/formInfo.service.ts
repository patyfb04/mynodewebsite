import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { FormInfo }  from './formInfo';

@Injectable()
export class FormInfoService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public sendEmail(formInfo : FormInfo): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'sendForm', formInfo, this.requestOptions);
    }

}
