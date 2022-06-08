import { Component, OnInit } from '@angular/core';
import { BookPaymentBalanceService } from './bookPaymentBalance.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-payment-balances-view',
  templateUrl: './bookPaymentBalance.component.html',
  styleUrls: ['./bookPaymentBalance.component.sass']
})
export class BookPaymentBalanceComponent implements OnInit {
  public bookPaymentBalancesList: Observable<any>;
  public clientId: any;

  constructor(private activateRoute: ActivatedRoute, private bookPaymentBalanceService: BookPaymentBalanceService) {
    this.bookPaymentBalancesList = new Observable<any>();
  }

  public ngOnInit(): void {
    this.bookPaymentBalanceService.getAll().subscribe((result : any) => {
      this.bookPaymentBalancesList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
