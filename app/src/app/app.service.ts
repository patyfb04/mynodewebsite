import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';

@Injectable()
export class AppService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }
}
