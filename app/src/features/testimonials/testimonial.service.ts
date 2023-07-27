import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/common/services/base-service.service';
import  { Testimonial }  from './testimonial';

@Injectable()
export class TestimonialService extends BaseService{

    constructor(private httpClient: HttpClient) {
       super();
    }

    public getAll(): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'testimonials', this.requestOptions);
    }

    public getById(id : number): Observable<any> {
        return this.httpClient.get<any>(this.rootURL +'testimonial/'+ id, this.requestOptions);
    }

    public create(testimonial : Testimonial): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'testimonial/create', testimonial, this.requestOptions);
    }

    public update(testimonial : Testimonial): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'testimonial/update', testimonial, this.requestOptions);
    }

    public delete(client : any): Observable<any> {
        return this.httpClient.post<any>(this.rootURL +'testimonial/delete', client, this.requestOptions);
    }
}
