import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './appView.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppViewComponent  implements OnInit  {
  public response: Observable<any>;

  constructor(private appService: AppService) {
    this.response = new Observable<any>();
  }

  public ngOnInit(): void {
    this.response = this.appService.getUsers();
}
}
