import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clients-view',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
  public clientsList: Observable<any>;
  public clientId: any;

  constructor(private activateRoute: ActivatedRoute, private clientService: ClientService) {
    this.clientsList = new Observable<any>();
  }

  public ngOnInit(): void {
    this.clientService.getAll().subscribe((result : any) => {
      this.clientsList = result;
    })

    this.activateRoute.params.subscribe(params => {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }
}
