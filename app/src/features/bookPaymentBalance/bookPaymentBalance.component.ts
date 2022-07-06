import { BookPaymentBalanceService } from './bookPaymentBalance.service';
import { BookDeliverableService } from './../bookDeliverables/bookDeliverable.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from './../books/book.service';
import { Book } from './../books/book';
import { BookDeliverable } from './../bookDeliverables/bookDeliverable';
import { BookPaymentBalance } from './bookPaymentBalance';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'book-payment-balances-view',
  templateUrl: './bookPaymentBalance.component.html',
  styleUrls: ['./bookPaymentBalance.component.sass']
})
export class BookPaymentBalanceComponent implements OnInit {
  public isAdmin: boolean = false;
  public displayedColumns: string[] = ['book',  'totalAmountPaid', 'modifiedDate'];
  public display: boolean = false;
  public isEdit: boolean = false;
  public myForm: FormGroup;
  public selectedId: any;
  public dataSource: MatTableDataSource<BookPaymentBalance>;

  public book = new FormControl();
  public options = [];
  public filteredOptions: Observable<any>;
  public bookId: number = 0;

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
            private bookPaymentBalanceService: BookPaymentBalanceService,
            private bookDeliverableService: BookDeliverableService,
            private bookService: BookService) {

              this.dataSource = new MatTableDataSource<BookPaymentBalance>();
          
              this.myForm = new FormGroup({
                totalAmountPaid: new FormControl('')
              });
          
              this.filteredOptions = this.book.valueChanges.pipe(
                startWith(''),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(val => {
                  return this.filter(val || '')
                })
              )
  }

  filter(val: string): Observable<any> {
    return this.bookService.getAll()
      .pipe(
        map(response => response.filter((option: Book) => {
          return option.title.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  public ngOnInit(): void {
    this.loadData();
  }


//TABLE ---------------------------------------------------


  public initForm(id: number) {
    this.bookPaymentBalanceService.getById(id).subscribe((result: any) => {
      if (result.length > 0) {
        
        this.myForm.patchValue({
          totalAmountPaid: result[0].totalAmountPaid,
          modifiedDate: result[0].modifiedDate
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
    this.bookPaymentBalanceService.getAll().subscribe((result: BookPaymentBalance[]) => {
      this.dataSource.data = result;

       this.dataSource.data.forEach((bookPaymentBalance: BookPaymentBalance) => {

        this.bookService.getById(bookPaymentBalance.bookId).subscribe((result1: any) => {
          if(result1[0] != undefined) {
            bookPaymentBalance.bookTitle =  result1[0].title;
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

}
