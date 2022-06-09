import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  public isAdmin : boolean = false;

 constructor(private appService: AppService, private routes: Router) {

    this.routes.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
           this.isAdmin = val.url == "/admin" ? true : false;
        }
    });
  }


}
