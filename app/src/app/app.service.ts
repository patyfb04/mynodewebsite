import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/BaseService';

@Injectable()
export class AppService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }
}