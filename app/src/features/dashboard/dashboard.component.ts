import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from '../books/book.service'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../clients/client.service';
import { BookPaymentBalanceService } from '../bookPaymentBalance/bookPaymentBalance.service';
import { BookDeliverableService } from '../bookDeliverables/bookDeliverable.service';
import { Book } from '../books/book';
import { MatTableDataSource } from '@angular/material/table';
import { BookDeliverable } from '../bookDeliverables/bookDeliverable';
import { BookPaymentBalance } from '../bookPaymentBalance/bookPaymentBalance';
import { float } from 'aws-sdk/clients/cloudfront';



@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

  public bookInProgressList: Book[];
  public dataSource: MatTableDataSource<Book>;
  public total : number = 0;
  public currencyConverted : float = 0.0;

  constructor(private activateRoute: ActivatedRoute,
              private bookService: BookService,
              private clientService: ClientService,
              private bookPaymentBalanceService : BookPaymentBalanceService,
              private bookDeliverableService : BookDeliverableService) {

                this.loadData();
            }

    public loadData() {
      this.bookService.getAll().subscribe((result: Book[]) =>
      {
        this.bookInProgressList = result.filter(c=>  c.status == "In Progress");
        this.bookInProgressList.forEach((book: Book) =>
        {
            this.bookDeliverableService.getAll().subscribe((result1: BookDeliverable[]) => {
              if(result1.length > 0) {

                var deliverablesOfBook = result1.filter(c=> c.bookId == book.id);
                book.numberOfDeliverables = deliverablesOfBook.length;
              }
            });

          this.bookPaymentBalanceService.getAll().subscribe((result1: BookPaymentBalance[]) => {
            if(result1.length > 0) {

              var bookPaymentBalance = result1.filter(c => c.bookId == book.id);
              book.totalAmountPaid = bookPaymentBalance[0].totalAmountPaid;
              this.total +=  book.totalAmountPaid;
              this.currencyConverted = Math.round(this.total * 1.36);
            }
          });

          this.clientService.getById(book.clientId).subscribe((result1: any) => {
            if(result1[0] != undefined) {
              book.authorName = result1[0].name;
            }
          });

        });
      })
    }

}
