import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BaseService {
    public rootURL: string = "http://localhost:5000/";
    public requestOptions : any;

    constructor() {

        this.requestOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            }),
        };


    }
}