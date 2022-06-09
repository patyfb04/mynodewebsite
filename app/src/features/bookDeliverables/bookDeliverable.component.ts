import { Component, OnInit } from '@angular/core';
import { BookDeliverableService } from './bookDeliverable.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-deliverable-view',
  templateUrl: './bookDeliverable.component.html',
  styleUrls: ['./bookDeliverable.component.sass']
})
export class BookDeliverableComponent implements OnInit {
  public bookDeliverableList: Observable<any>;
  public clientId: any;

  constructor(private activateRoute: ActivatedRoute, private bookDeliverableService: BookDeliverableService) {
    this.bookDeliverableList = new Observable<any>();
  }

  public ngOnInit(): void {
    this.bookDeliverableService.getAll().subscribe((result : any) => {
      this.bookDeliverableList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
