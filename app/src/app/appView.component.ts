import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './appView.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppViewComponent {
  public response: Observable<any>;

  public display: any = {
    service: false,
    contact: false,
    books: false,
    artworks: false
  };

  constructor(private appService: AppService) {
    this.response = new Observable<any>();
  }

  public displayView(event: Event, view: any) {
    event.preventDefault();
    this.display = {
      service: false,
      contact: false,
      books: false,
      artworks: false
    };

    return this.display[view] = true;
  }
}
