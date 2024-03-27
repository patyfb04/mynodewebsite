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
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as moment from 'moment';
import { ClientService } from '../clients/client.service';
import { Client } from '../clients/client';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  public bookDeliverable : BookDeliverable;
  public clientName : string;

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

  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;

  constructor(private activateRoute: ActivatedRoute,
    private bookDeliverableService: BookDeliverableService,
    private bookService: BookService,
    private clientService: ClientService,
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
            this.clientService.getById(result1[0].clientId).subscribe((result2 : any) => {
              bookDeliverable.clientName = result2[0].name;
            });
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

  public generateInvoiceData(bookDeliverable : BookDeliverable) : void{
    let number = this.getRandomInvoiceId(1000, 5000000);
    console.log('this.bookDeliverable', bookDeliverable);
    console.log('number', number);
    console.log('moment().toString()', moment().format('dddd, MMMM Do YYYY'));
    this.downloadAsPdf(bookDeliverable, number);
  }

    public async downloadAsPdf(bookDeliverable :BookDeliverable, invoiceId : number) {
      var pdf = {
        content: [
          {
            columns: [
              {
                image: await this.getBase64ImageFromURL(
                "./../../assets/img/logo1.png"
                )
                ,width: 150,
              },
              [
                {
                  text: 'Invoice',
                  color: '#333333',
                  width: '*',
                  fontSize: 28,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: 'Invoice No.',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: invoiceId.toString(),
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Date Issued',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: moment().format('dddd, MMMM Do YYYY'),
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Status',
                          color: '#aaaaab',
                          bold: true,
                          fontSize: 12,
                          alignment: 'right',
                          width: '*',
                        },
                        {
                          text: 'PAID',
                          bold: true,
                          fontSize: 14,
                          alignment: 'right',
                          color: 'green',
                          width: 100,
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          {
            columns: [
              {
                text: 'From',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
              {
                text: 'To',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
            ],
          },
          {
            columns: [
              {
                text: 'Patricia Braga',
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: bookDeliverable.clientName,
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
            ],
          },
          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: 'Invoice No. ' + invoiceId.toString(),
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i: any, node: any) {
                return 1;
              },
              vLineWidth: function(i: any, node: any) {
                return 1;
              },
              hLineColor: function(i: number, node: any) {
                if (i === 1 || i === 0) {
                  return '#bfdde8';
                }
                return '#eaeaea';
              },
              vLineColor: function(i: any, node: any) {
                return '#eaeaea';
              },
              hLineStyle: function(i: any, node: any) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i: any, node: any) {
                return 10;
              },
              paddingRight: function(i: any, node: any) {
                return 10;
              },
              paddingTop: function(i: any, node: any) {
                return 2;
              },
              paddingBottom: function(i: any, node: any) {
                return 2;
              },
              fillColor: function(rowIndex: any, node: any, columnIndex: any) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 80],
              body: [
                [
                  {
                    text: 'ITEM DESCRIPTION',
                    fillColor: '#eaf2f5',
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                  },
                  {
                    text: 'ITEM TOTAL',
                    border: [false, true, false, true],
                    alignment: 'right',
                    fillColor: '#eaf2f5',
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                  },
                ],
                [
                  {
                    text: bookDeliverable.description,
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                    alignment: 'left',
                  },
                  {
                    border: [false, false, false, true],
                    text: 'USD $' + bookDeliverable.amount.toString(),
                    fillColor: '#f5f5f5',
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          '\n',
          '\n\n',
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i: any, node: any) {
                return 1;
              },
              vLineWidth: function(i: any, node: any) {
                return 1;
              },
              hLineColor: function(i: any, node: any) {
                return '#eaeaea';
              },
              vLineColor: function(i: any, node: any) {
                return '#eaeaea';
              },
              hLineStyle: function(i: any, node: any) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i: any, node: any) {
                return 10;
              },
              paddingRight: function(i: any, node: any) {
                return 10;
              },
              paddingTop: function(i: any, node: any) {
                return 3;
              },
              paddingBottom: function(i: any, node: any) {
                return 3;
              },
              fillColor: function(rowIndex: any, node: any, columnIndex: any) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [
                  {
                    text: 'Payment Subtotal',
                    border: [false, true, false, true],
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                  {
                    border: [false, true, false, true],
                    text: 'USD $' + bookDeliverable.amount.toString(),
                    alignment: 'right',
                    fillColor: '#f5f5f5',
                    margin: [0, 5, 0, 5],
                  },
                ],

                [
                  {
                    text: 'Total Amount',
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                  },
                  {
                    text: 'USD $' + bookDeliverable.amount.toString(),
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
        ],
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true,
            margin: [0, 50, 0, 3],
          },
          notesText: {
            fontSize: 10,
          },
        },
        defaultStyle: {
          columnGap: 20,
          //font: 'Quicksand',
        },
      };
      let filename = 'Invoice';
      pdfMake.createPdf(pdf).download(filename);
    }

    private getBase64ImageFromURL(url: string) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0);
          var dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = url;
      });
    }

    private getRandomInvoiceId (min = 1000, max = 500000) : number {
      min = Math.ceil(min);
      max = Math.floor(max);
      const num =  Math.floor(Math.random() * (max - min + 1)) + min;
      return num;
    };

}

