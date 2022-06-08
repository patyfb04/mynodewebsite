import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'books-view',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {
  public clientsList: Observable<any>;
  public clientId: any;

  constructor(private activateRoute: ActivatedRoute, private bookService: BookService) {
    this.clientsList = new Observable<any>();
  }

  public ngOnInit(): void {
    this.bookService.getAll().subscribe((result : any) => {
      this.clientsList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
