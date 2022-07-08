import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Service } from './service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'service-view',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {
  public serviceDescription: Observable<any>;
  public userId: any;

  constructor(private activateRoute: ActivatedRoute, private serviceService: ServiceService) {
    this.serviceDescription = new Observable<any>();
  }

  public ngOnInit(): void {
    this.serviceService.getAll().subscribe((result : any) => {
      console.log(result)
      this.serviceDescription = result[0];
    })

  }
}
