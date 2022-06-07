import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-view',
  templateUrl: './adminView.component.html',
  styleUrls: ['./app.component.sass']
})
export class AdminViewComponent  implements OnInit  {
  public response: Observable<any>;

  constructor(private appService: AppService) {
    this.response = new Observable<any>();
  }

  public ngOnInit(): void {
    this.response = this.appService.getUsers();
}
}
