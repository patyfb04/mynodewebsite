import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
public rootURL : string = "http://localhost:5000/users";

   constructor(private httpClient: HttpClient) {

   }

   public makeCall(): Observable<any> {
       return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/posts/1');
   }
}