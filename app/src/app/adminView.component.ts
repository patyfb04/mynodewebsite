import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { EncrDecrService } from 'src/common/services/encr-decr.service';
import { LocalStorageService } from 'src/common/services/localStorage.service';
import { User } from 'src/features/users/user';
import { Book } from 'src/features/books/book';

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
    bookPaymentBalance: false,
    bookDeliverable: false,
    testimonial: false,
    artist : false,
    service: false,
    dashboard: false
  };

  public selectedBook: Book;

  constructor(private appService: AppService,
              private localStorageService: LocalStorageService,
              private encrDecrService: EncrDecrService)
              {
                var key = this.localStorageService.get("key")?? null
                var encrypted = this.localStorageService.get("encrypted") ?? null
                if(key === null ||  encrypted === null)
                {
                  this.display["login"] = true
                }
              }

  ngOnInit(): void {
    let authorized = this.localStorageService.get("authorized")
    if(authorized == null || authorized == undefined)
    {
      this.display  = {
        home: false,
        users: false,
        clients : false,
        books: false,
        artworks: false,
        bookPaymentBalance: false,
        testimonial: false,
        artist : false,
        service: false,
        login: true
      }
      this.displayView(null,'login');
    } else
    {
      let currentPage = this.localStorageService.get("adminPage")
      if(currentPage != null)
      {
        this.displayView(null, currentPage)
      }
      else{
        this.displayView(null, 'dashboard')
      }
    }
  }

  public displayView(event: Event | null, view: any)
  {
    if(event != null)
    {
      event.preventDefault();
    }
    this.display  = {
      home: false,
      users: false,
      clients : false,
      books: false,
      artworks: false,
      bookPaymentBalance: false,
      bookDeliverable: false,
      testimonial: false,
      artist : false,
      service: false,
      login: false,
      dashboard: false
    }

    this.localStorageService.set("adminPage", view)
    return this.display[view] = true
  }

  public onBookEvent(event: any)
  {
    this.selectedBook = event.book;

    if(event.eventName == 'Deliverable'){
        this.display.bookDeliverables = true;
        this.displayView(null, 'bookDeliverables');
    } else {
      this.display.bookPaymentBalances = true;
      this.displayView(null, 'bookPaymentBalances');
    }
  }

  public onBackEvent(event: any)
  {
      this.display.book = true;
      this.displayView(null, 'books');
  }

  public authorization(user: User |  null)
  {
    if(user !== null)
    {
      this.display.login = false
      this.localStorageService.set("authorized", user.password)
    }
    else
    {
      this.display.login = true
    }
  }

  public logout(event: Event)
  {
    event.preventDefault();
    this.localStorageService.removeKey("authorized")

    this.display  = {
      home: false,
      users: false,
      clients : false,
      books: false,
      artworks: false,
      bookPaymentBalance: false,
      testimonial: false,
      artist : false,
      service: false,
      login: true
    }

  }
}
