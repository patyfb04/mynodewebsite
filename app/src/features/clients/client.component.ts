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
  public dataSource: Observable<any>;
  public clientId: any;
  public displayedColumns: string[] = ['name', 'email', 'active', 'id'];
  
  constructor(private activateRoute: ActivatedRoute, private clientService: ClientService) {
    this.dataSource = new Observable<any>();
  }

  public ngOnInit(): void {
    this.clientService.getAll().subscribe((result : any) => {
      this.dataSource = result;
    })

    this.activateRoute.params.subscribe((params : any)=> {
      if (params["id"] !== undefined) {
        this.clientId = params["id"]
      }
    })
  }

  public edit(id: number) {
    console.log(id)
  }

}
