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
  public booksList: Observable<any>;
  public clientId: any;
  public isAdmin: boolean = false;
  
  constructor(private activateRoute: ActivatedRoute, private bookService: BookService) {
    this.booksList = new Observable<any>();
    this.isAdmin = activateRoute.snapshot.url.length > 0 ? activateRoute.snapshot.url[0].path == "admin" : false;
  }

  public ngOnInit(): void {
    this.bookService.getAll().subscribe((result : any) => {
      this.booksList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
