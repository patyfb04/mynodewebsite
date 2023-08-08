import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';

@Injectable()
export class BaseService {
    public rootURL: string = environment.production ? "http://patriciabraga-api.onrender.com/" :"http://localhost:5000/";
    public requestOptions : any;
    public requestOptionsFile : any;

    constructor() {
        console.log('API =>', this.rootURL)

        this.requestOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            }),
        };

        this.requestOptionsFile = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data  boundary=MyBoundary',
                'Accept':'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            }),
        };

    }
}
