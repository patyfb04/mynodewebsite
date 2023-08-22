import { BookDeliverableService } from './bookDeliverable.service';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { BookService } from './../books/book.service';
import { Book } from './../books/book';
import { BookDeliverable } from './bookDeliverable';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';
import { BookPaymentBalanceService } from './../bookPaymentBalance/bookPaymentBalance.service';
import { BookPaymentBalance } from '../bookPaymentBalance/bookPaymentBalance';

@Component({
  selector: 'book-deliverable-view',
  templateUrl: './bookDeliverable.component.html',
  styleUrls: ['./bookDeliverable.component.sass']
})
export class BookDeliverableComponent implements OnInit, OnChanges {
  public isAdmin: boolean = false;
  public displayedColumns: string[] = [ 'book', 'status', 'amount', 'modifiedDate', 'link', 'id'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<BookDeliverable>;
  public book = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public bookId: number = 0;
  public bookDeliverableStatus = new FormControl();
  public status: string = '';

  @Output() backToEvent = new EventEmitter<string>();
  @Input() selectedBook : Book;

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private activateRoute: ActivatedRoute,
    private bookDeliverableService: BookDeliverableService,
    private bookService: BookService,
    private bookPaymentBalanceService : BookPaymentBalanceService) {
    this.dataSource = new MatTableDataSource<BookDeliverable>();

    this.myForm = new FormGroup({
      description: new FormControl(''),
      link: new FormControl(''),
      amount: new FormControl('')
    });

    this.filteredOptions = this.book.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )

    this.display = true;

    this.loadData();
  }

  filter(val: string): Observable<any> {
    return this.bookService.getAll()
      .pipe(
        map(response => response.filter((option: Book) => {
          return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  public ngOnChanges(changes : any)
  {
    if(changes.selectedBook.currentValue != undefined) {
      console.log('Changes',changes.selectedBook.currentValue);
    }
  }

  public ngOnInit(): void {
    this.loadData();
  }

//dropdrowns

public onBookChange(option: Book) {
  this.bookId = option.id === undefined ? 0 : option.id;
}

public onStatusChange(option: string) {
  this.status = option;
}


//TABLE ---------------------------------------------------

public displayForm(eventName: any, id: any) {
  this.display = eventName == 'edit' ? true : !this.display;
  this.isEdit = eventName == 'edit' ? true : false;

  if(!this.display) {
    this.clearForm();
  }

  if (eventName == 'edit') {
    this.initForm(id);
    this.selectedId = id;
  } else {
    this.clearForm();
  }
}

onSubmit(form: FormGroup) {

  const bookdeliverable = new BookDeliverable(0, this.selectedBook.id == undefined? 0 : this.selectedBook.id , form.value.description, this.status, form.value.amount, form.value.link, new Date());

  if (this.isEdit) {
    bookdeliverable.id = this.selectedBook.id;
    this.update(bookdeliverable);
  }
  else {
    this.create(bookdeliverable);
    this.clearForm();
  }
}

public create(bookdeliverable: BookDeliverable) {

  delete bookdeliverable['id'];
  bookdeliverable.bookId = this.selectedBook.id == null ? 0 : this.selectedBook.id ;
  bookdeliverable.status = this.status;

    this.bookDeliverableService.create(bookdeliverable).subscribe((result1: any) => {
      this.loadData();
      this.updateBookPayments(bookdeliverable);
    });

}

public update(bookdeliverable: BookDeliverable) {
  bookdeliverable.bookId = this.selectedBook.id == undefined ? 0 : this.selectedBook.id;
  bookdeliverable.bookTitle = this.selectedBook.title;
  bookdeliverable.status = this.status;
  bookdeliverable.id = this.selectedId;
  console.log(bookdeliverable)
    this.bookDeliverableService.update(bookdeliverable).subscribe((result1: any) => {
      this.loadData();
      this.updateBookPayments(bookdeliverable);
    });
}

public delete(id: number) {

  this.bookDeliverableService.delete({ id: id }).subscribe((result: any) => {
    this.loadData();
  })
}

public clearForm() {
  this.myForm.reset();
}

// update book payment balance
public updateBookPayments(bookDeliverable: BookDeliverable) {

  this.bookPaymentBalanceService.getAll().subscribe((result : any) => {

    var filterByBook = result.filter(function(bookpayment : BookPaymentBalance){
        return bookpayment.bookId == bookDeliverable.bookId
    });

    if(filterByBook.length > 0) {
      var total = parseFloat(filterByBook[0].totalAmountPaid) + parseFloat(bookDeliverable.amount.toString());
      var paymentUpdate = new BookPaymentBalance(filterByBook[0].id, filterByBook[0].bookId, total, new Date());
      this.bookPaymentBalanceService.update(paymentUpdate).subscribe((result1: any) => {
      });
    }
    else {
      var paymentCreate = new BookPaymentBalance(0, bookDeliverable.bookId, bookDeliverable.amount, new Date());
      delete paymentCreate['id'];
      this.bookPaymentBalanceService.create(paymentCreate).subscribe((result1: any) => {
      });
    }
  })
}

  public initForm(id: number) {
    this.bookDeliverableService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {

        this.myForm.patchValue({
          description: result[0].description,
          amount: result[0].amount,
          modifiedDate: result[0].modifiedDate,
          link: result[0].link
        });

        this.bookDeliverableStatus.setValue(result[0].status);
        this.myForm.patchValue({
          bookDeliverableStatus: result[0].status
        });

        this.bookService.getById(result[0].bookId).subscribe((result1: any) => {
          this.book.setValue(result1[0].title);

          this.myForm.patchValue({
            book: result[0].title
          });
        })
      }
    })
  }

  public loadData() {
    this.bookDeliverableService.getAll().subscribe((result: BookDeliverable[]) => {
      this.dataSource.data = result.filter(c => c.bookId == this.selectedBook.id);
       this.dataSource.data.forEach((bookDeliverable: BookDeliverable) => {
        this.bookService.getById(bookDeliverable.bookId).subscribe((result1: any) => {
          if(result1[0] != undefined) {
            bookDeliverable.bookId = result1[0].id;
            bookDeliverable.bookTitle =  result1[0].title;
          }
        });
      });
    })
  }

  public doFilter = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public goToUrl(url: string) {
    window.open(url, '_blank')
  }

  public backTo(){
    this.backToEvent.emit('back');
  }
}
