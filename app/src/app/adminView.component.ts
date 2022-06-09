import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'admin-view',
  templateUrl: './adminView.component.html',
  styleUrls: ['./app.component.sass']
})


export class AdminViewComponent implements OnInit {

  public currentRoute: any;
  public display: any = {
    home: false,
    users: false,
    clients : false,
    books: false,
    artworks: false,
    bookPaymentBalance: false
  };

  constructor(private appService: AppService) {
  }

  public ngOnInit(): void {

  }

  public displayView(event: Event, view: any) {
    event.preventDefault();
    this.display  = {
      home: false,
      users: false,
      clients : false,
      books: false,
      artworks: false,
      bookPaymentBalance: false
    };

    return this.display[view] = true;
  }
}
