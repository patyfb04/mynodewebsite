import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit  {
  title = 'app';
  public response: Observable<any>;

  constructor(private appService: AppService) {
    this.response = new Observable<any>();
  }

  public ngOnInit(): void {
    this.response = this.appService.getUsers();
}
}
